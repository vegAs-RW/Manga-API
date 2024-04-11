import { User } from '../../domain/entities/User';
import fs from 'fs';
import path from 'path';

/**
 * Classe représentant un repository pour gérer les opérations CRUD sur les utilisateurs.
 */
export class UserRepository {
    /** Chemin du fichier JSON contenant les données des utilisateurs */
    private filePath = path.join(__dirname, '..', 'data', 'users.json');

    /**
     * Récupère tous les utilisateurs à partir du fichier JSON.
     * @returns Un tableau contenant tous les utilisateurs.
     */
    getAllUsers(): User[] {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
    }

    /**
     * Récupère un utilisateur par son nom d'utilisateur.
     * @param username - Le nom d'utilisateur de l'utilisateur à récupérer.
     * @returns L'utilisateur correspondant au nom d'utilisateur spécifié, ou undefined s'il n'existe pas.
     */
    getUserByUsername(username: string): User | undefined {
        const users = this.getAllUsers();
        return users.find(user => user.username === username);
    }

    /**
     * Ajoute un nouvel utilisateur.
     * @param user - L'utilisateur à ajouter.
     */
    addUser(user: User) {
        const users = this.getAllUsers();
        users.push({
            ...user,
            id: crypto.randomUUID()
        })
        this.saveUsers(users);
    }

    /**
     * Met à jour un utilisateur existant.
     * @param updatedUser - L'utilisateur mis à jour.
     */
    updateUser(updatedUser: User): void {
        const users = this.getAllUsers();
        const index = users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
            users[index] = updatedUser;
            this.saveUsers(users);
        }
    }

    /**
     * Supprime un utilisateur par son ID.
     * @param id - L'identifiant de l'utilisateur à supprimer.
     */
    deleteUser(id: string): void {
        const users = this.getAllUsers().filter(user => user.id !== id);
        this.saveUsers(users);
    }

    /**
     * Enregistre les utilisateurs dans le fichier JSON.
     * @param users - Le tableau des utilisateurs à enregistrer.
     */
    private saveUsers(users: User[]): void {
        const data = JSON.stringify(users, null, 2);
        fs.writeFileSync(this.filePath, data);
    }
}
