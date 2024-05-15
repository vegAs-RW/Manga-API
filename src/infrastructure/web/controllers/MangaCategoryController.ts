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
    const {name, description} = req.body
    try {
        const category = {name, description}
        await categoryService.createCategory(category)
        APIResponse(res, {
            statusCode: 200,
            message: 'Category added successfully',
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
export const updateCategory = (req:Request, res: Response) =>{
    const {name, description} = req.body
    const categoryId= req.params.id
    try {
        const updatedCategory = {id: categoryId, name, description}
        categoryService.updateCategory(updatedCategory)
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

export const deleteCategory = (req: Request, res: Response) =>{
    try {
        const categoryId = req.params.id
        categoryService.deleteCategory(categoryId)
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