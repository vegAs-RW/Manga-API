import { AuthService } from "../domain/services/AuthService";
import { Request, Response, NextFunction } from "express";
import { APIResponse } from "../utils/APIresponse";

// Crée une instance du service d'authentification
const authService = new AuthService()

/**
 * Middleware pour rafraîchir le jeton d'accès (access token) à partir du jeton de rafraîchissement (refresh token) s'il existe.
 * @param req - L'objet Request d'Express.
 * @param res - L'objet Response d'Express.
 * @param next - La fonction pour passer au middleware suivant.
 */
export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Récupère le jeton de rafraîchissement (refresh token) à partir des cookies de la requête
    const {refreshToken} = req.cookies;
    
    // Vérifie si le jeton de rafraîchissement existe
    if(!refreshToken) return next()

    try {
        // Tente de rafraîchir le jeton d'accès à partir du jeton de rafraîchissement
        const newAccessToken = authService.refreshAccessToken(refreshToken)
        // Si un nouveau jeton d'accès est généré avec succès
        if(newAccessToken) {
             // Définit le nouveau jeton d'accès dans le cookie 'accessToken' avec les options spécifiées
            res.cookie('accesToken', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            })
        }
        // Passe au middleware suivant ou au contrôleur suivant
        next();
    } catch (err) {
        // En cas d'erreur, affiche l'erreur dans la console et envoie une réponse d'erreur avec le statut 500
        console.error(err);
        return APIResponse(res, {statusCode:500, message: 'error'})
        
    }
}