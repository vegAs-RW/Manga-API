import {db} from '../data'
import { authors } from '../data/schema';
import { eq } from 'drizzle-orm';
import { Author, NewAuthor } from '../../domain/entities/MangaAuthor';

/**
 * Repository qui gère le CRUD des auteurs
 */
export class MangaAuthorRepository {
   
    /**
     * Récupère tous les auteurs du fichier json
     * @returns {MangaAuthor[]} Un tableau contenant tous les auteurs de manga
     */
    getAllAuthors() {
        try {
            return db.select({
                id: authors.id,
                fullName: authors.fullName,
                description: authors.description,
                birthDate: authors.birthdate,
            }).from(authors)
            .execute()  
        }catch (err) {
            console.error(err)
            throw new Error('Impossible de récupérer les auteurs')
        }
    }

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
     * Enregistre les auteurs de manga dans le fichier JSON
     * @param {author} author L'auteur de manga à enregistrer
     */
    saveAuthor(author: NewAuthor) {
       try {
        return db.insert(authors).values(author).execute()
       } catch (err) {
        console.log(err)
        throw new Error('Impossible d\'ajouter un auteur')
       }
    }

    /**
     * Modifie un auteur.
     * @param author - L'auteur à modifier.
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
     * Supprime l'auteur d'un manga dans la base de données
     * @param id L'identifiant de l'auteur de manga à supprimer
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