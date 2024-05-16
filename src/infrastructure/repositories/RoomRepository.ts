import { eq } from "drizzle-orm";
import { db } from "../data";

import { rooms, messages, users } from "../data/schema";

export class RoomRepository {


     /**
     * Méthode pour créer un nouveau salon de discussion
     * @returns Le salon de discussion créé
     */
    createRoom() {
        try {
            return db.insert(rooms).values({}).execute();
        } catch (err) {
            console.log(err)
            throw new Error('Impossible decréer le salon de discussion')
        }
    }

    /**
     * Méthode pour récupérer les messages d'un salon de discussion spécifique
     * @param roomId Identifiant du salon de discussion
     * @returns Les messages du salon de discussion spécifié
     */
    getMessagesByRoom(roomId: string) {
        try {
            return db.select({
                id: messages.id,
                content: messages.content,
                author: {
                    id: users.id,
                    username: users.username
                },
                date: messages.date
            }).from(rooms)
            .leftJoin(messages, eq(rooms.id, messages.roomId))
            .leftJoin(users, eq(messages.author, users.id))
            .where(eq(rooms.id, roomId))
            .execute();
        } catch (err) {
            console.log(err);
            throw new Error(`Impossible de charger les messages du salon ${roomId}`)
        }
    }
}