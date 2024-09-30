import { NextFunction, Request, Response } from "express";
import { AppError } from "./error";
import { verify } from "jsonwebtoken";

class ValidadeToken {
  public validadeToken = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    const jwtKey = process.env.JWT_SECRET as string;

    console.log(authorization);
    

    if (!authorization) {
        throw new AppError(401, "Token is required.");
      }

    const [_prefix,token] = authorization.split(" ");

    const tokenDecoded = verify(token,jwtKey);

     res.locals.token=tokenDecoded; 
      return next();
  };
}

export const validadeToken = new ValidadeToken();
