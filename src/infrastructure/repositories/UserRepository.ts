import {db} from '../data'
import { users } from '../data/schema';
import { User, NewUser, UserColumns } from '../../domain/entities/User';
import { eq } from 'drizzle-orm';

/**
 * Classe représentant un repository pour gérer les opérations CRUD sur les utilisateurs.
 */
export class UserRepository {
    /**
     * Récupère tous les utilisateurs à partir du fichier JSON.
     * @returns Un tableau contenant tous les utilisateurs.
     */
    getAllUsers():Promise<Partial<User>[]> {
        try {
            return db.query.users.findMany({
                columns: {
                    id: true,
                    username: true
                }
            })
        } catch (err) {
            console.log(err);
            throw new Error('Récupération des utilisateurs impossible')
        }
    }

    /**
     * Récupère un utilisateur par son nom d'utilisateur.
     * @param username - Le nom d'utilisateur de l'utilisateur à récupérer.
     * @returns L'utilisateur correspondant au nom d'utilisateur spécifié, ou undefined s'il n'existe pas.
     */
    getUserByUsername(username: string, columns: UserColumns): Promise<Partial<User | undefined>> {
        try {
            return db.query.users.findFirst({
                where: eq(users.username, username),
                columns
            })
        } catch (err) {
            console.log(err)
            throw new Error ('Impossible de récupérer l\'utilisateur')
        }
    }

    /**
     * Récupère un utilisateur par son id.
     * @param id - L'id de l'utilisateur à récupérer.
     * @returns L'utilisateur correspondant à l'id d'utilisateur spécifié, ou undefined s'il n'existe pas.
     */
    getUserById(id: string, columns: UserColumns): Promise<Partial<User | undefined>> {
        try {
         return db.query.users.findFirst({
             where: eq(users.id, id),
             columns
         })
        } catch (err) {
         console.error(err)
         throw new Error('Impossible de récupérer l\'utilisateur')
        }
     }

    /**
     * Ajoute un nouvel utilisateur.
     * @param user - L'utilisateur à ajouter.
     */
    createUser(user: NewUser) {
        try {
            return db.insert(users).values(user).execute();
           } catch (err) {
            console.error(err)
            throw new Error("Création de l\'utilisateur impossible")
           }
    }

    /**
     * Met à jour un utilisateur existant.
     * @param user - L'utilisateur mis à jour.
     */
    updateUser(user: User) {
        try {
            return db.update(users)
            .set(user)
            .where(
                eq(users.id, user.id))
            .execute();
           } catch (err) {
            console.error(err)
            throw new Error("Impossible de mettre à jour l\'utilisateur")
           }
    }

    /**
     * Supprime un utilisateur par son ID.
     * @param id - L'identifiant de l'utilisateur à supprimer.
     */
    deleteUser(id: string) {
       try {
        return db.delete(users).where(eq(users.id, id)).execute()
       } catch (err) {
        console.log(err)
        throw new Error('Suppression de l\'utilisateur impossible')
       }
    }

}
