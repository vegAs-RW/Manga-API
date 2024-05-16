import { Socket } from "socket.io";

import { RoomService } from "../../../../domain/services/RoomService";


const roomService = new RoomService();

export const createRoom = async (socket: Socket) => {
    try {
        const room = await roomService.createRoom();
        socket.emit('room', room);
    } catch (err) {
        console.log(err);
        socket.emit('error', 'Impossible de créer la salle');
    }
}

export const joinRoom = async (socket: Socket, roomId: string) => {
    try {
        const messages = await roomService.getAllMessagesByRoom(roomId); 
        socket.join(roomId);
        socket.emit('messages', messages);
    } catch (error) {
        console.error(error);
        socket.emit('error', 'Impossible de rejoindre la salle');
    }
}