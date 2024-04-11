import { User } from '../../domain/entities/User';
import fs from 'fs';
import path from 'path';


export class UserRepository {
    
    private filePath = path.join(__dirname, '..', 'data', 'users.json');

    // Méthode pour obtenir tous les utilisateurs
    getAllUsers(): User[] {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
    }

    // Méthode pour obtenir un utilisateur par son ID
    getUserByUsername(username: string): User| undefined {
        const users = this.getAllUsers();
        return users.find(user => user.username === username);
    }

    // Méthode pour ajouter un nouvel utilisateur
    addUser(user: User) {
        const users = this.getAllUsers();
        users.push({
            ...user,
            id: crypto.randomUUID()
        })
        this.saveUsers(users);
    }

    // Méthode pour mettre à jour un utilisateur existant
    updateUser(updatedUser: User): void {
        const users = this.getAllUsers();
        const index = users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
            users[index] = updatedUser;
            this.saveUsers(users);
        }
    }

    // Méthode pour supprimer un utilisateur par son ID
    deleteUser(id: string): void {
        const users = this.getAllUsers().filter(user => user.id !== id);
        this.saveUsers(users);
    }

    // Méthode pour enregistrer les utilisateurs dans le fichier JSON
    private saveUsers(users: User[]): void {
        const data = JSON.stringify(users, null, 2);
        fs.writeFileSync(this.filePath, data);
    }


}
