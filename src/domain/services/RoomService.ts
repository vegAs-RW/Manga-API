import { RoomRepository } from "../../infrastructure/repositories/RoomRepository";

export class RoomService {
    private roomRepository: RoomRepository;

    constructor() {
        this.roomRepository = new RoomRepository();
    }

    /**
     * Méthode pour créer un nouveau salon de discussion
     * @returns Le nouveau salon créé
     */
    createRoom() {
        try {
            return this.roomRepository.createRoom();
        } catch (err) {
            console.log(err)
            throw new Error('Impossibe de créer le salon')
        }
    }

    /**
     * Méthode pour récupérer tous les messages d'un salon de discussion
     * @param roomId Identifiant du salon
     * @returns Tous les messages du salon spécifié
     */
    getAllMessagesByRoom(roomId: string) {
        if ((!roomId || roomId.trim().length < 5)) return;
        return this.roomRepository.getMessagesByRoom(roomId)
    }
}