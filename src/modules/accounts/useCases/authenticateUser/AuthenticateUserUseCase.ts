import {compare} from "bcrypt";
import {sign} from 'jsonwebtoken'
import {inject, injectable} from "tsyringe";
import { AppError } from "@shared/errors/AppError";

import {IUsersRepository} from "@modules/accounts/repositories/IUsersRepository";
import {UsersRepositoryInMemory} from "../../repositories/in-memory/UsersRepositryInMemory";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        // Verifica se usuário existe
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or Password incorrect!")
        }

        // Verifica se a senha está correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or Password incorrect!");
        }

        // Gerar JWT - Token
        const token = sign({}, "d0bc8036d40c4161caeb2c5e33c22c82", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn;
    }

}

export { AuthenticateUserUseCase };