import { Request, Response, NextFunction } from "express";
// Importe la fonction de réponse API
import { APIResponse } from "../utils/APIresponse";
import jwt from 'jsonwebtoken'
 // Importe la configuration de l'environnement
import env from "../config/env"
import { CustomRequest } from "../types/custom";

// Récupère la clé secrète JWT de l'environnement
const {JWT_SECRET}= env

/**
 * Middleware pour vérifier l'authentification de l'utilisateur à l'aide de JWT.
 * @param req - L'objet Request d'Express.
 * @param res - L'objet Response d'Express.
 * @param next - La fonction pour passer au middleware suivant.
 */
export const isAuth = (req: CustomRequest, res: Response, next: NextFunction) => {
    // Récupère le token d'accès depuis les cookies de la requête
    const {accessToken} = req.cookies
    // Si aucun token d'accès n'est présent, renvoie une réponse d'erreur avec le statut 403
    if (!accessToken) {
        return APIResponse(res, {statusCode: 403, message: 'Missing token'})
    }
    try {
        // Décode le token d'accès avec la clé secrète JWT
        const decoded = jwt.verify(accessToken, JWT_SECRET);
        const {userId, name} = decoded as jwt.JwtPayload;

        // On ajoute le payload dans la propriété req pour l'utiliser dans les routes
        req.user = {userId, name}
        
        // Passe au middleware suivant ou au contrôleur suivant
        next()
    } catch(err) {
        // En cas d'erreur de décodage du token ou de token invalide, renvoie une réponse d'erreur avec le statut 401
        return APIResponse(res, {statusCode: 401, message: 'Unauthorized'})
    }
}