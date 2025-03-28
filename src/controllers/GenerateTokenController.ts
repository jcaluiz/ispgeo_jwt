import { NextFunction, Request, Response } from "express";
import Token from "../middlewares/Token";
import HttpException from "../utils/HttpException";
import statusCodes from "../shared/statusCodes";

export default class GenerateTokenController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private token: Token;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.token = new Token();
  }

  public generateToken() {
    console.log("token aki no controller1");
    try {
      const user = this.req.body;
      const token = this.token.createToken(user);
      const hasItBeenValidated = this.token.isTokenValid(token);
      if (!hasItBeenValidated.validated) {
        throw new HttpException(
          statusCodes.unauthorized,
          hasItBeenValidated.message
        );
      }
      console.log("token aki no controller2", token);
      this.res.status(200).json({ token });
    } catch (error) {
      this.next(error);
    }
  }
}
