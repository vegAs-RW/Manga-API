import { Request, Response, NextFunction } from "express";
import { APIResponse } from "../utils/APIresponse";
import jwt from 'jsonwebtoken'
import env from "../config/env"

const {JWT_SECRET}= env

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const {accessToken} = req.cookies
    if (!accessToken) {
        return APIResponse(res, {statusCode: 403, message: 'Missing token'})
    }
    try {
        // On decode le jwt dans le cookie 'accesstoken' avec notrez secret
        const decoded = jwt.verify(accessToken, JWT_SECRET);
        const {id, name} = decoded as jwt.JwtPayload;

        // On ajoute le payload dans la propriété req pour l'utiliser dans les routes
        req.user = {id, name}
        req.push({user: {id, name}})
        // On passe au controller suivant ou au mw suivant
        next()
    } catch(err) {
        // Jwt invalide, user pas autorisé à acceder a la ressource
        return APIResponse(res, {statusCode: 401, message: 'Unauthorized'})
    }
}