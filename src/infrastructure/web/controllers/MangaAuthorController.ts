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
        const authorId =req.params.id
        const author = await authorService.getAuthorById(authorId)
        if (!author) {
            APIResponse(res, { statusCode: 404, message: 'Author not found' });
        } else {
            console.table(author[0]);
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
    const {fullName, description, birthdate} = req.body
    try {
        const author = {fullName, description, birthdate}
        await authorService.createAuthor(author)
        APIResponse(res, {
            statusCode: 200,
            message: 'Author added successfully',
        })
    } catch (error){
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
    const {fullName, description, birthdate} = req.body
    const authorId= req.params.id
    try {
        if (!authorId) {
            // Si l'identifiant de l'auteur est manquant, renvoyer une erreur 404
            return APIResponse(res, {
                statusCode: 404,
                message: 'Author don\'t exist',
            })
        }
        const updatedAuthor = {id: authorId,fullName, description, birthdate}
        await authorService.updateAuthor(updatedAuthor)
        APIResponse(res, {
            statusCode: 200,
            message: 'Author updated successfully',
        })
    } catch (error){
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
        const authorId = req.params.id
        authorService.deleteAuthor(authorId)
        APIResponse(res, {
            statusCode: 200,
            message: 'Author deleted successfully',
        })
    } catch (err) {
        APIResponse(res, {
            statusCode: 500,
            message: 'Internal Server Error',
        })
    }
}