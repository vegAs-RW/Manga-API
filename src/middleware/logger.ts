import { Request, Response, NextFunction } from "express";

/**
 * Middleware pour enregistrer les requêtes effectuées.
 * @param req - L'objet Request d'Express.
 * @param res - L'objet Response d'Express.
 * @param next - La fonction pour passer au middleware suivant.
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    // Récupère la valeur du cookie 'Ninja' de la requête
    const ninja = req.cookies.Ninja
    // Enregistre les informations de la requête dans la console
    console.log(`${ninja} a fais une requête [${req.method}] sur la route [${req.path}]`);
    // Passe au middleware suivant ou au contrôleur suivant
    next();
} 