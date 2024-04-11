import { Response } from "express";

// Définit une interface pour normaliser les réponses API
export interface INormalized {
    // Le code de statut HTTP de la réponse
    statusCode: number;
    // Le message associé à la réponse
    message: string;
    // Les données de la réponse qui peuvent avoir plusieurs types (optionnelles)
    data?: string[] | object | null | undefined;
}

/**
 * Fonction pour renvoyer une réponse API normalisée.
 * @param res - L'objet Response d'Express.
 * @param normalized - Un objet INormalized contenant les informations de la réponse normalisée.
 * @returns La réponse normalisée.
 */
export const APIResponse = (res: Response, normalized: INormalized): Response => {
    // Définit l'en-tête "X-powered-By" de la réponse avec une valeur spécifique
    res.setHeader("X-powered-By", "Jordan");
    // Renvoie une réponse JSON avec le code de statut, le message et les données spécifiées
    return res.status(normalized.statusCode).json({
        message: normalized.message,
        data: normalized.data
    })
}