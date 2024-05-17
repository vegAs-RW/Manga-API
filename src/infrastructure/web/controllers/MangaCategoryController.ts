import { Request, Response } from "express";
import { APIResponse } from "../../../utils/APIresponse";
import { CategoryService } from "../../../domain/services/MangaCategoryService";

const categoryService = new CategoryService();

/**
 * Afficher à l'écran les datas comments via une requete avec l'id d'un post
 * @param req - requete http gérée via express
 * @param res - réponse http gérée par express
 */
export const getAllCategories = async (req: Request, res: Response) => {
    try {
        // Appelle la méthode getAllMangas de MangaService pour récupérer tous les mangas
        const categories = await categoryService.getAllCategories();
        // Envoie une réponse avec le statut 200 et les données des mangas
        APIResponse(res, {statusCode: 200, message: 'Ok', data: categories})
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
export const addNewCategory = async (req:Request, res: Response) =>{
    // Récupère les données de la nouvelle categorie depuis la requête
    const {name, description} = req.body
    try {
        // Crée une nouvelle categorie avec les données spécifiées
        const category = {name, description}
        // Appelle le service pour créer une nouvelle categorie
        await categoryService.createCategory(category)
        // Envoie une réponse avec le statut 200
        APIResponse(res, {
            statusCode: 200,
            message: 'Category added successfully',
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
export const updateCategory = (req:Request, res: Response) =>{
    // Récupère les données de la categorie mises à jour depuis la requête
    const {name, description} = req.body
    const categoryId= req.params.id
    try {
        // Crée un objet contenant les données mises à jour de la categorie
        const updatedCategory = {id: categoryId, name, description}
        // Appelle le service pour mettre à jour la categorie
        categoryService.updateCategory(updatedCategory)
        // Envoie une réponse avec le statut 200
        APIResponse(res, {
            statusCode: 200,
            message: 'Category updated successfully',
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
export const deleteCategory = (req: Request, res: Response) =>{
    try {
        // Récupère l'identifiant de la categorie depuis la requête
        const categoryId = req.params.id
        // Appelle le service pour supprimer la categorie
        categoryService.deleteCategory(categoryId)
        // Envoie une réponse avec le statut 200
        APIResponse(res, {
            statusCode: 200,
            message: 'Category deleted successfully',
        })
    } catch (err) {
        // En cas d'erreur, envoie une réponse avec le statut 500
        APIResponse(res, {
            statusCode: 500,
            message: 'Internal Server Error',
        })
    }
}