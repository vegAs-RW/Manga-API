import { and, eq } from "drizzle-orm";
import { db } from "../data";
import { comments, mangas, users } from "../data/schema";
import { NewComment } from "../../domain/entities/Comment";



export class CommentRepository {

    /**
     * Récupère un commentaire par son id.
     * @param id L'identifiant du commentaire.
     */
    getCommentById(id: string) {
        try {
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
            console.log(err)
            throw new Error('Impossible de récupérer le commentaire')
        }
    }

    /**
     * Ajouter un commentaire.
     * @param comment Le nouveau commentaire
     */
    createComment(comment: NewComment) {
        try {
            return db.insert(comments).values(comment).execute()
        } catch (err) {
            console.log(err)
            throw new Error('Impossible de créer le commentaire')
        }
    }

    /**
     * Supprime un commentaire par son id et l'id de l'auteur de ce commentaire.
     * @param id L'identifiant du commentaire.
     * @param userId L'identifiant de l'auteur du commentaire.
     */
    deleteCommentById(id: string, userId: string) {
        try{
            return db.delete(comments).where(
                and(
                    eq(comments.id, id),
                    eq(comments.author, userId)
                )
            ).execute()
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de supprimer le commentaire');
        }
    }

    /**
     * Récupère tous les commentaires.
     */
    getAllComments() {
        try {
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
            console.error(err);
            throw new Error('Impossible de récupérer les commentaires');
        }
    }
}