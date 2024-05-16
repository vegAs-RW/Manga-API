import { CommentRepository } from "../../infrastructure/repositories/CommentRepository";
import { NewComment } from "../entities/Comment";

export class CommentService {
    private commentRepository: CommentRepository;

    constructor() {
        this.commentRepository = new CommentRepository();
    }

    /**
     * Méthode pour récupérer un commentaire par son identifiant
     * @param id Identifiant du commentaire à récupérer
     * @returns Le commentaire correspondant à l'identifiant
     */
    getCommentById(id: string) {
        if (!id || id.trim().length < 5) return;
        return this.commentRepository.getCommentById(id);
    }

    /**
     * Méthode pour récupérer tous les commentaires
     * @returns Tous les commentaires
     */
    getAllComments() {
        return this.commentRepository.getAllComments();
    }

    /**
     * Méthode pour créer un nouveau commentaire
     * @param comment Nouveau commentaire à créer
     * @returns Le nouveau commentaire créé
     */
    createComment(comment: NewComment) {
        if (!comment || comment.content.trim().length < 5) return;
        return this.commentRepository.createComment(comment);
    }

    /**
     * Méthode pour supprimer un commentaire par son identifiant
     * @param id Identifiant du commentaire à supprimer
     * @param userId Identifiant de l'utilisateur qui supprime le commentaire
     * @returns Le commentaire supprimé
     */
    deleteCommentById(id: string, userId: string) {
        if (!id || id.trim().length < 5) return;
        return this.commentRepository.deleteCommentById(id, userId);
    }
}