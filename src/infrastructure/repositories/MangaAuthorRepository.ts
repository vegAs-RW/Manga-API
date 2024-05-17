import {db} from '../data'
import { authors } from '../data/schema';
import { eq } from 'drizzle-orm';
import { Author, NewAuthor } from '../../domain/entities/MangaAuthor';

/**
 * Repository qui gère le CRUD des auteurs
 */
export class MangaAuthorRepository {
   
    /**
     * Récupère tous les auteurs de manga.
     * @returns Un tableau contenant tous les auteurs de manga.
     * @throws Une erreur si la récupération des auteurs échoue.
     */
    getAllAuthors() {
        try {
            return db.select({
                id: authors.id,
                fullName: authors.fullName,
                description: authors.description,
                birthdate: authors.birthdate,
            }).from(authors)
            .execute()  
        }catch (err) {
            console.error(err)
            throw new Error('Impossible de récupérer les auteurs')
        }
    }

    /**
     * Récupère un auteur de manga par son identifiant.
     * @param id L'identifiant de l'auteur à récupérer.
     * @returns Les données de l'auteur correspondant à l'identifiant spécifié.
     * @throws Une erreur si la récupération de l'auteur échoue.
     */
    getAuthorById(id: string) {
        try {
            return db.select({
                id: authors.id,
                fullName: authors.fullName,
                description: authors.description,
                birthdate: authors.birthdate
            }).from(authors)
            .where(eq(authors.id, id))
       } catch (err) {
            console.log(err)
            throw new Error('Impossible de récupérer l\'auteur')
       }
    }

    
    /**
     * Enregistre un nouvel auteur de manga.
     * @param author Les données du nouvel auteur à enregistrer.
     * @returns Les données de l'auteur ajouté.
     * @throws Une erreur si l'ajout de l'auteur échoue.
     */
    saveAuthor(author: NewAuthor) {
       try {
        return db.insert(authors).values(author).returning({id: authors.id}).execute()
       } catch (err) {
        console.log(err)
        throw new Error('Impossible d\'ajouter un auteur')
       }
    }

    /**
     * Modifie un auteur de manga existant.
     * @param author Les données de l'auteur à modifier.
     * @throws Une erreur si la modification de l'auteur échoue.
     */
    updateAuthor(author: Author) {
        try {
            db.update(authors)
            .set(author)
            .where(eq(authors.id, author.id))
            .execute();
        } catch (err) {
            console.log(err)
            throw new Error('Impossible de modifier l\'auteur séléctionné')
        }
    }

    /**
     * Supprime un auteur de manga de la base de données.
     * @param id L'identifiant de l'auteur de manga à supprimer.
     * @throws Une erreur si la suppression de l'auteur échoue.
     */
    deleteAuthor(id: string) {
        try {
            return db.delete(authors).where(eq(authors.id, id)).execute()
        } catch (err) {
            console.log(err)
            throw new Error('Impossible de supprimer l\'auteur')
        }
    }
}