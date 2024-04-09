import { Request, Response, NextFunction } from "express";

// Middleware pour log les requetes
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const ninja = req.cookies.Ninja
    console.log(`${ninja} à fais une requête [${req.method}] sur la route [${req.path}]`);
    next();
} 