import {NextFunction, Request, Response} from "express";
import {verify} from "jsonwebtoken";
import {UsersRepository} from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import {AppError} from "@shared/errors/AppError";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    // Desestruturar o Bearer Token
    const [, token] = authHeader.split(" ");

    // Verificando o Token
    try {
      const { sub: user_id } = verify(token, "d0bc8036d40c4161caeb2c5e33c22c82") as IPayload;

      const usersRepository = new UsersRepository();

      const  user = await usersRepository.findById(user_id);

      if (!user) {
          throw new AppError("User does not exists!", 401);
      }

      request.user = {
          id: user_id
      }

      next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }
}