import { MessageRepository } from "../../infrastructure/repositories/MessageRepository";

export class MessageService{
    private messageRepository : MessageRepository;

    constructor() {
        this.messageRepository = new MessageRepository();
    }

    /**
     * Méthode pour envoyer un message
     * @param data Données du message à envoyer
     * @returns Le message envoyé
     */
    sendMessage(data: {roomId: string, author: string, content: string}) {
        if (!data.roomId || data.roomId?.trim()?.length < 5 ||
            !data.author || data.author?.trim()?.length < 5 ||
            !data.content || data.content?.trim()?.length < 5) {
                console.log('Impossible de créer le message')
                return;
            }
        return this.messageRepository.createMessage(data.roomId, data.author, data.content)
    }

    /**
     * Méthode pour supprimer un message
     * @param data Données du message à supprimer
     * @returns Le message supprimé
     */

    deleteMessage(data: {id: string, userId: string}) {
        if(!data.id || data.id?.trim()?.length < 5 || !data.userId || data.userId?.trim()?.length < 5) {
            console.log('Impossible de supprimer le message')
            return;
        }
        return this.messageRepository.deleteMessage(data.id, data.userId)
    }
}