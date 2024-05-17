import { Server } from "socket.io";
import { createRoom, joinRoom } from "../controllers/sockets/RoomController";
import { sendMessage, deleteMessage } from "../controllers/sockets/MessageController";

import { authenticateSocket } from "../../../utils/socketCookies";

/**
 * Configure les événements du socket pour la gestion des salons de discussion et des messages.
 * @param io Instance du serveur Socket.io
 */
export function setupSocketEvent(io: Server) {
    io.on('connection', (socket) => {
    
        // Authentifie le socket pour obtenir l'identifiant de l'utilisateur
        /*const userId = authenticateSocket(socket);
        if (!userId) return; // Si l'authentification échoue, termine la connexion
        */
        console.log(`New connection, welcome ${socket.id} !`); // Affiche un message de bienvenue pour la nouvelle connexion

        // Écoute l'événement 'createRoom' pour la création d'un nouveau salon
        socket.on('createRoom', () => {
            createRoom(socket); // Exécute la fonction de création de salon
        });

        // Écoute l'événement 'joinRoom' pour rejoindre un salon existant
        socket.on('joinRoom', (roomId: string) => {
            joinRoom(socket, roomId); // Exécute la fonction de rejoindre le salon
        });

        // Écoute l'événement 'sendMessage' pour l'envoi d'un nouveau message dans un salon
        socket.on('sendMessage', (data) => {
            sendMessage(socket, data, socket.id); // Exécute la fonction d'envoi de message
        });

        // Écoute l'événement 'deleteMessage' pour la suppression d'un message dans un salon
        socket.on('deleteMessage', (data: { id: string, roomId: string }) => {
            deleteMessage(socket, data, socket.id); // Exécute la fonction de suppression de message
        });

        // Écoute l'événement 'disconnect' pour gérer la déconnexion d'un utilisateur
        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnected`); // Affiche un message indiquant la déconnexion de l'utilisateur
        });
    })
}