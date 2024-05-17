import { Request, Response } from "express";
import { APIResponse } from "../../../utils/APIresponse";
import { AuthorService } from "../../../domain/services/MangaAuthorService";
const authorService = new AuthorService();

/**
 * Afficher à l'écran les datas comments via une requete avec l'id d'un post
 * @param req - requete http gérée via express
 * @param res - réponse http gérée par express
 */
export const getAllAuthors = async (req: Request, res: Response) => {
    try {
        // Appelle la méthode getAllMangas de MangaService pour récupérer tous les mangas
        const authors = await authorService.getAllAuthors();
        // Envoie une réponse avec le statut 200 et les données des mangas
        APIResponse(res, {statusCode: 200, message: 'Ok', data: authors})
    } catch (err) {
        // En cas d'erreur, envoie une réponse avec le statut 500
        APIResponse(res, {statusCode: 500, message: 'Interne Server Error'})
    }
}

/**
 * Afficher à l'écran les datas comments via une requete avec l'id d'un post
 * @param req - requete http gérée via express
 * @param res - réponse http gérée par express
 */
export const getAuthorById = async (req: Request, res: Response) => {
    try {
        // Récupère l'identifiant de l'auteur depuis la requête
        const authorId =req.params.id
        // Récupère l'auteur par son identifiant
        const author = await authorService.getAuthorById(authorId)
        // Vérifie si l'auteur est trouvé
        if (!author) {
            APIResponse(res, { statusCode: 404, message: 'Author not found' });
        } else {
            console.table(author[0]);
            // Envoie une réponse avec le statut 200 et les données de l'auteur
            APIResponse(res, { statusCode: 200, message: 'OK', data: author[0] });
        }
    } catch (err) {
        // En cas d'erreur, envoie une réponse avec le statut 500
        APIResponse(res, {statusCode: 500, message: 'Interne Server Error'})
    }
}

/**
 * Afficher à l'écran les datas comments via une requete avec l'id d'un post
 * @param req - requete http gérée via express
 * @param res - réponse http gérée par express
 */
export const addNewAuthor = async (req:Request, res: Response) =>{
    // Récupère les données du nouvel auteur depuis la requête
    const {fullName, description, birthdate} = req.body
    try {
        // Crée un nouvel auteur avec les données spécifiées
        const author = {fullName, description, birthdate}
        // Appelle le service pour créer un nouvel auteur
        await authorService.createAuthor(author)
        // Envoie une réponse avec le statut 200
        APIResponse(res, {
            statusCode: 200,
            message: 'Author added successfully',
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
 * Afficher à l'écran les datas comments via une requete avec l'id d'un post
 * @param req - requete http gérée via express
 * @param res - réponse http gérée par express
 */
export const updateAuthor = async (req:Request, res: Response) =>{
    // Récupère les données de l'auteur mises à jour depuis la requête
    const {fullName, description, birthdate} = req.body
    const authorId= req.params.id
    try {
        // Vérifie si l'identifiant de l'auteur est manquant
        if (!authorId) {
            // Si l'identifiant de l'auteur est manquant, renvoyer une erreur 404
            return APIResponse(res, {
                statusCode: 404,
                message: 'Author don\'t exist',
            })
        }
        // Crée un objet contenant les données mises à jour de l'auteur
        const updatedAuthor = {id: authorId,fullName, description, birthdate}
        // Appelle le service pour mettre à jour l'auteur
        await authorService.updateAuthor(updatedAuthor)
        // Envoie une réponse avec le statut 200
        APIResponse(res, {
            statusCode: 200,
            message: 'Author updated successfully',
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
 * Afficher à l'écran les datas comments via une requete avec l'id d'un post
 * @param req - requete http gérée via express
 * @param res - réponse http gérée par express
 */
export const deleteAuthor = (req: Request, res: Response) =>{
    try {
        // Récupère l'identifiant de l'auteur depuis la requête
        const authorId = req.params.id
        // Appelle le service pour supprimer l'auteur
        authorService.deleteAuthor(authorId)
        // Envoie une réponse avec le statut 200
        APIResponse(res, {
            statusCode: 200,
            message: 'Author deleted successfully',
        })
    } catch (err) {
        // En cas d'erreur, envoie une réponse avec le statut 500
        APIResponse(res, {
            statusCode: 500,
            message: 'Internal Server Error',
        })
    }
}