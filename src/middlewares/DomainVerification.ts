import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/HttpException";
import statusCodes from "../shared/statusCodes";

export default class DomainVerification {
  static verifyDomain(req: Request, res: Response, next: NextFunction) {
    const validDomains = [
      process.env.FRONT_URL,
      "localhost",
      "127.0.0.1", // Adicionando endereço local alternativo
    ].filter(Boolean) as string[];

    const requestDomain = req.headers.origin || req.headers.referer;

    // Permite requisições sem origem em ambiente de desenvolvimento
    if (process.env.NODE_ENV === "development" && !requestDomain) {
      return next();
    }

    if (
      !requestDomain ||
      !validDomains.some((domain) => requestDomain.includes(domain))
    ) {
      throw new HttpException(statusCodes.unauthorized, "Não Autorizado");
    }

    next();
  }
}
