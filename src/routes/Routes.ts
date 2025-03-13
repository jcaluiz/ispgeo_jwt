import { NextFunction, Request, Response, Router } from "express";
import GenerateTokenController from "../controllers/GenerateTokenController";
import ErrorHandler from "../middlewares/ErrorHandler";

const routes = Router();

routes.post(
    '/generate-token',
    (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => new GenerateTokenController(req, res, next).generateToken(),
    ErrorHandler.handle,
)

export default routes;
