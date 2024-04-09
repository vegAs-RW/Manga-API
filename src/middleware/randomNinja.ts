import cookieParser from "cookie-parser";
import { Request, Response, NextFunction } from "express";


const ninjas = ['Naruto', 'Itachi', 'Sasuke', 'Konoha Maru', 'Sasori', 'Pain', 'Kakashi'];
// Middleware pour attribuer un nom de ninja random 
export const RandomNinjaMW = (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.ninja) {
        const randomIndex = Math.floor(Math.random()* ninjas.length);
        const randomNinja = ninjas[randomIndex];

        res.cookie('Ninja', randomNinja, {maxAge: 3600000})
        req.cookies.Ninja = randomNinja;
    }
    next();
}
