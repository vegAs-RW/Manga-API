import { and, eq } from "drizzle-orm";
import { db } from "../data";
import { comments, mangas, users } from "../data/schema";
import { NewComment } from "../../domain/entities/Comment";



export class CommentRepository {

    /**
    * Récupère un commentaire par son identifiant.
    * @param id L'identifiant du commentaire.
    * @returns Les données du commentaire correspondant à l'identifiant spécifié.
    * @throws Une erreur si la récupération du commentaire échoue.
    */
    getCommentById(id: string) {
        try {
            // Récupère le commentaire avec ses informations détaillées
            return db.select({
                id: comments.id,
                mangasId: {
                    id: mangas.id,
                    title: mangas.title
                },
                content: comments.content,
                date: comments.date,
                author: {
                    id: users.id,
                    username: users.username
                }
            }).from(comments)
            .leftJoin(mangas, eq(mangas.id, comments.mangasId))
            .leftJoin(users, eq(users.id, comments.author))
            .where(eq(comments.id, id))
            .execute()
        } catch (err) {
            // En cas d'erreur, affiche l'erreur dans la console et lance une nouvelle erreur
            console.log(err)
            throw new Error('Impossible de récupérer le commentaire')
        }
    }

    /**
    * Ajoute un nouveau commentaire.
    * @param comment Les données du nouveau commentaire.
    * @returns Les données du commentaire ajouté.
    * @throws Une erreur si l'ajout du commentaire échoue.
    */
    createComment(comment: NewComment) {
        try {
            // Ajoute le nouveau commentaire à la base de données
            return db.insert(comments).values(comment).execute()
        } catch (err) {
            // En cas d'erreur, affiche l'erreur dans la console et lance une nouvelle erreur
            console.log(err)
            throw new Error('Impossible de créer le commentaire')
        }
    }

    /**
     * Supprime un commentaire par son id et l'id de l'auteur de ce commentaire.
     * @param id L'identifiant du commentaire.
     * @param userId L'identifiant de l'auteur du commentaire.
     * @throws Une erreur si la suppression du commentaire échoue.
     */
    deleteCommentById(id: string, userId: string) {
        try{
            // Supprime le commentaire en fonction de son identifiant et de l'identifiant de son auteur
            return db.delete(comments).where(
                and(
                    eq(comments.id, id),
                    eq(comments.author, userId)
                )
            ).execute()
        } catch (err) {
            // En cas d'erreur, affiche l'erreur dans la console et lance une nouvelle erreur
            console.error(err);
            throw new Error('Impossible de supprimer le commentaire');
        }
    }

    /**
     * Récupère tous les commentaires.
     * @returns Tous les commentaires avec leurs informations détaillées.
     * @throws Une erreur si la récupération des commentaires échoue.
     */
    getAllComments() {
        try {
            // Récupère tous les commentaires avec leurs informations détaillées
            return db.select({
                id: comments.id,
                content: comments.content,
                date: comments.date,
                mangaId: {
                    id: mangas.id,
                    title: mangas.title
                },
                author: {
                    id: users.id,
                    username: users.username
                }
            }).from(comments)
            .leftJoin(
                users, eq(users.id, comments.author)
            ).leftJoin(
                mangas, eq(mangas.id, comments.mangasId)
            ).execute();
        } catch(err) {
            // En cas d'erreur, affiche l'erreur dans la console et lance une nouvelle erreur
            console.error(err);
            throw new Error('Impossible de récupérer les commentaires');
        }
    }
}