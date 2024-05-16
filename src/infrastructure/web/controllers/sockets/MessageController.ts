import { Socket } from "socket.io";
import { MessageService } from "../../../../domain/services/MessageService";
import { ne } from "drizzle-orm";

const messageService = new MessageService();

export const sendMessage = async (socket: Socket, data: {authorId: string, roomId: string, content: string}, userId: string) => {
    try {
        const message = await messageService.sendMessage({...data, author: userId})
        if(!message) throw new Error('Impossible de créer le message');
        socket.to(data.roomId).emit("message", message)

    } catch (err) {
        console.log(err)
        socket.emit('error', 'Impossible de créer le message');
    }
}

export const deleteMessage = async (socket: Socket, data: { id: string, roomId: string }, userId: string) => {
    try {
        await messageService.deleteMessage({...data, userId})
        socket.to(data.roomId).emit('deletedMessage', data.id)
    } catch (err) {
        console.log(err)
        socket.emit('error', 'Impossible de supprimer le message');
    }
}