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
export const getMangaById = async (req: Request, res: Response) => {
     // Récupère l'identifiant du manga à partir des paramètres de la requête
    const {id} = req.params;
    // Appelle la méthode getMangaById de MangaService pour récupérer le manga par son identifiant
    const manga = await mangaService.getMangaById(id);
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
            data: manga[0]
        })
    }
}

/**
 * Ajoute un nouveau manga
 * @param req - L'objet Request d'Express.
 * @param res - L'objet Response d'Express.
 */
export const addNewManga = (req:Request, res: Response) =>{
    // Récupère les données du nouveau manga depuis la requête
    const {title, description, author, releaseDate, category} = req.body
    try {
        // Crée un nouveau manga avec les données spécifiées
        const newManga = {title, description, author, releaseDate, category}
        // Appelle le service pour ajouter le manga
        mangaService.addManga(newManga)
        // Envoie une réponse avec le statut 200
        APIResponse(res, {
            statusCode: 200,
            message: 'Manga added successfully',
        })
    } catch (error){
        // En cas d'erreur, envoie une réponse avec le statut 500
        APIResponse(res, {
            statusCode: 500,
            message: 'Internal Server Error',
        })
    }
}

/**
 * Supprime un manga par son identifiant.
 * @param req - L'objet Request d'Express.
 * @param res - L'objet Response d'Express.
 */
export const deleteManga = (req:Request, res: Response) =>{
    try {
        // Récupère l'identifiant du manga à supprimer depuis la requête
        const mangaId = req.params.id;
        // Appelle le service pour supprimer le manga
        mangaService.deleteManga(mangaId)
        // Envoie une réponse avec le statut 200
        APIResponse(res, {
            statusCode: 200,
            message: 'Manga deleted successfully',
        })
    } catch (error){
        // En cas d'erreur, envoie une réponse avec le statut 500
        APIResponse(res, {
            statusCode: 500,
            message: 'Internal Server Error',
        })
    }
}

/**
 * Met à jour un manga en utilisant son identifiant.
 * @param req - L'objet Request d'Express.
 * @param res - L'objet Response d'Express.
 */
export const updateManga = async (req:Request, res: Response) =>{
    // Récupère les données mises à jour du manga depuis la requête
    const {title, description, author, releaseDate, category} = req.body
    try {
        // Récupère l'identifiant du manga à mettre à jour depuis la requête
        const mangaId = req.params.id;
        // Crée un objet contenant les données mises à jour du manga
        const updatedManga = {id: mangaId, title, description, author, releaseDate, category}
        // Appelle le service pour mettre à jour le manga
        await mangaService.updateManga(updatedManga)
        // Envoie une réponse avec le statut 200
        APIResponse(res, {
            statusCode: 200,
            message: 'Manga updated successfully',
        })
    } catch (error){
        // En cas d'erreur, envoie une réponse avec le statut 500
        APIResponse(res, {
            statusCode: 500,
            message: 'Internal Server Error',
        })
    }
}