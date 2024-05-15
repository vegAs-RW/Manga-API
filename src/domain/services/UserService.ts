import { NewUser, User, UserColumns } from "../entities/User";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";

export class UserService {
    private userRepository: UserRepository;
    // Constructeur pour initialiser le repository des utilisateurs
    constructor(){
        this.userRepository = new UserRepository();
    }

    /**
     * Récupère tous les utilisateurs
     * @returns Un tableau contenant tous les utilisateurs
     */
    getAllUsers() {
        return this.userRepository.getAllUsers();
    }

    /**
     * Récupère un utilisateur par son nom d'utilisateur
     * @param id Le nom d'utilisateur de l'utilisateur à récupérer
     * @param columns Les informations de l'utilisateur
     * @returns L'utilisateur correspondant au nom d'utilisateur ou undefined s'il n'existe pas
     */
    getUserById(id: string) {
        return this.userRepository.getUserById(id, {id:true, username: true, refreshToken: true})
    }
    
    /**
     * Récupère un utilisateur par son nom d'utilisateur
     * @param username Le nom d'utilisateur de l'utilisateur à récupérer
     * @returns L'utilisateur correspondant au nom d'utilisateur ou undefined s'il n'existe pas
     */
    getUserByUsername(username: string) {
        return this.userRepository.getUserByUsername(username, {id: true, username: true})
    }

    /**
     * Ajoute un nouvel utilisateur
     * @param user L'utilisateur à ajouter
     */
    addUser(user: NewUser): void {
        this.userRepository.createUser(user);
    }

    /**
     * Met à jour un utilisateur existant
     * @param updatedUser Les données mises à jour de l'utilisateur
     */
    updateUser(updatedUser: User): void {
        this.userRepository.updateUser(updatedUser)
    }

    /**
     * Supprime un utilisateur par son identifiant
     * @param id L'identifiant de l'utilisateur à supprimer
     */
    deleteUser(id: string): void {
        this.userRepository.deleteUser(id)
    }
}