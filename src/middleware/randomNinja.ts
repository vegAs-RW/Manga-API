import { Request, Response, NextFunction } from "express";

const ninjas = ['Naruto', 'Itachi', 'Sasuke', 'Konoha Maru', 'Sasori', 'Pain', 'Kakashi'];

/**
 * Middleware pour attribuer un nom de ninja aléatoire s'il n'est pas déjà défini dans les cookies.
 * @param req - L'objet Request d'Express.
 * @param res - L'objet Response d'Express.
 * @param next - La fonction pour passer au middleware suivant.
 */
export const RandomNinjaMW = (req: Request, res: Response, next: NextFunction) => {
    // Vérifie si le cookie 'Ninja' n'existe pas dans la requête
    if (!req.cookies.ninja) {
        // Génère un index aléatoire dans la liste des ninjas
        const randomIndex = Math.floor(Math.random()* ninjas.length);
        // Récupère un ninja aléatoire à partir de l'index
        const randomNinja = ninjas[randomIndex];
        // Définit le cookie 'Ninja' avec le nom du ninja aléatoire et une durée de vie de 1 heure (3600000 ms)
        res.cookie('Ninja', randomNinja, {maxAge: 3600000})
        // Ajoute le nom du ninja aléatoire aux cookies de la requête
        req.cookies.Ninja = randomNinja;
    }
    // Passe au middleware suivant ou au contrôleur suivant
    next();
}
