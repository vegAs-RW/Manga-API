import { and, eq } from "drizzle-orm";
import { db } from "../data";
import { messages } from "../data/schema";

export class MessageRepository {

    /**
     * Méthode pour créer un nouveau message
     * @param roomId Identifiant du salon de discussion
     * @param author Identifiant de l'auteur du message
     * @param content Contenu du message
     * @returns Le message créé
     */
    createMessage(roomId: string, author: string, content: string) {
        try {
            return db.insert(messages).values({
                author, 
                content, roomId
            }).execute();
        } catch (err) {
            console.log(err)
            throw new Error('Impossible de créer le message')
        }
    }

     /**
     * Méthode pour supprimer un message
     * @param id Identifiant du message à supprimer
     * @param userId Identifiant de l'utilisateur effectuant la suppression
     * @returns L'opération de suppression
     */
    deleteMessage(id: string, userId: string) {
        try {
            return db.delete(messages).where(and(eq(messages.id, id), eq(messages.author, userId)))
        } catch (err) {
            console.log(err);
            throw new Error('Impossible de supprimer le message')
        }
    }
}