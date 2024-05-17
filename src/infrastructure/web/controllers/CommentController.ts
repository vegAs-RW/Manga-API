import { Request, Response } from "express";
import { APIResponse } from "../../../utils/APIresponse";
import { CommentService } from "../../../domain/services/CommentService";

const commentService = new CommentService();

/**
 * Contrôleur pour la création d'un commentaire
 * @param req Requête HTTP contenant les données du commentaire à créer
 * @param res Réponse HTTP indiquant le résultat de l'opération
 */
export const createComment = async (req: Request, res: Response) => {
    try {
        // Récupère l'identifiant du manga à commenter, l'identifiant de l'utilisateur et le contenu du commentaire depuis la requête
        const { mangasId } = req.params;
        const { userId } = req.user;
        const { content } = req.body;
        // Crée un nouvel objet de commentaire avec les données récupérées
        const newComment = { content, mangasId, author: userId }
        // Appelle le service pour créer le commentaire avec les données spécifiées
        await commentService.createComment(newComment);
        // Envoie une réponse indiquant que le commentaire a été créé avec succès
        APIResponse(res, { statusCode: 201, message: 'Comment created' });
    } catch (err) {
        // En cas d'erreur, envoie une réponse indiquant une erreur interne du serveur
        APIResponse(res, { statusCode: 500, message: 'Internal server Error' });
    }
    
}

/**
 * Contrôleur pour la suppression d'un commentaire par son identifiant
 * @param req Requête HTTP contenant l'identifiant du commentaire à supprimer
 * @param res Réponse HTTP indiquant le résultat de l'opération
 */
export const deleteCommentById = async (req: Request, res: Response) => {
    try {
        // Récupère l'identifiant du commentaire et l'identifiant de l'utilisateur depuis la requête
        const { id } = req.params;
        const { userId } = req.user;
        // Appelle le service pour supprimer le commentaire avec les données spécifiées
        await commentService.deleteCommentById(id, userId);
        APIResponse(res, { statusCode: 200, message: 'Comment deleted' });
    } catch (err) {
        APIResponse(res, { statusCode: 500, message: 'Internal server Error' });
    }
}

/**
 * Contrôleur pour la récupération des commentaires par l'identifiant du manga
 * @param req Requête HTTP contenant l'identifiant du manga
 * @param res Réponse HTTP contenant les commentaires du manga
 */
export const getCommentsByMangaId = async (req: Request, res: Response) => {
    try {
        // Récupère l'identifiant du manga depuis les paramètres de la requête
        const { id } = req.params;
        // Appelle le service pour obtenir les commentaires associés à l'identifiant du manga
        const comments = await commentService.getCommentById(id);
        console.table(comments)
        // Vérifie s'il y a des commentaires
        if (comments)
            // Envoie une réponse contenant les commentaires avec un code de statut 200
            APIResponse(res, { statusCode: 200, data: comments, message: 'OK' });
    } catch (err) {
        APIResponse(res, { statusCode: 500, message: 'Internal server Error' });
    }
};