import { Request, Response } from "express";
import { MangaService } from "../../../domain/services/MangaService";
import {APIResponse} from '../../../utils/APIresponse';

// Crée une instance de MangaService
const mangaService = new MangaService()

/**
 * Récupère tous les mangas.
 * @param req - L'objet Request d'Express.
 * @param res - L'objet Response d'Express.
 */
export const getAllMangas = async (req: Request, res: Response) => {
    try {
        // Appelle la méthode getAllMangas de MangaService pour récupérer tous les mangas
        const mangas = await mangaService.getAllMangas();
        // Envoie une réponse avec le statut 200 et les données des mangas
        APIResponse(res, {statusCode: 200, message: 'Ok', data: mangas})
    } catch (err) {
        // En cas d'erreur, envoie une réponse avec le statut 500
        APIResponse(res, {statusCode: 500, message: 'Interne Server Error'})
    }
}

/**
 * Récupère un manga par son identifiant.
 * @param req - L'objet Request d'Express.
 * @param res - L'objet Response d'Express.
 */
export const getMangaById = (req: Request, res: Response) => {
     // Récupère l'identifiant du manga à partir des paramètres de la requête
    const mangaId = req.params.id;
    // Appelle la méthode getMangaById de MangaService pour récupérer le manga par son identifiant
    const manga = mangaService.getMangaById(mangaId);
    // Si le manga n'est pas trouvé, envoie une réponse avec le statut 404
    if (!manga) {
        APIResponse(res, {
            statusCode: 404,
            message: 'Manga not found'
        })
    // Si le manga est trouvé, envoie une réponse avec le statut 200 et les données du manga
    } else {
        APIResponse(res, {
            statusCode: 200,
            message: 'Found !',
            data: manga
        })
    }
}

export const addNewManga = (req:Request, res: Response) =>{
    try {
        const mangaData = req.body
        mangaService.addManga(mangaData)
        APIResponse(res, {
            statusCode: 200,
            message: 'Manga added successfully',
        })
    } catch (error){
        APIResponse(res, {
            statusCode: 500,
            message: 'Internal Server Error',
        })
    }
}