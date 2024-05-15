import {db} from '../data';
import { NewManga, Manga, MangaColumns } from '../../domain/entities/Manga';
import { mangas, authors, comments, categories } from '../data/schema';
import { eq } from 'drizzle-orm';


/**
 * Repository qui gère le CRUD des mangas
 */
export class MangasRepository {

    /**
     * Récupère tous les mangas.
     * @returns Un tableau contenant tous les mangas.
     */
    getAllMangas(): Promise< any > {
       try {
            return db.select({
                id: mangas.id,
                title: mangas.title,
                description: mangas.description,
                author: {
                    id: authors.id,
                    fullName: authors.fullName,
                    birthdate: authors.birthdate
                },
                releaseDate: mangas.releaseDate,
                category: {
                    id: categories.id,
                    name: categories.name
                },
                comments: {
                    id: comments.id,
                    content: comments.content,
                    date: comments.date
                }
            }).from(mangas)
            .leftJoin(
                authors, eq(mangas.id, authors.id) 
            )
            .leftJoin(
                categories, eq(mangas.category, categories.id)
            )
            .leftJoin(
                comments, eq(mangas.id, comments.id)
            ).execute()
       } catch (err) {
            console.log(err)
            throw new Error('Impossible de récupérer les mangas')
       }
    }

    /**
     * Récupère un manga par son identifiant.
     * @param id - L'identifiant du manga à récupérer.
     * @returns Le manga correspondant à l'identifiant spécifié, ou undefined s'il n'existe pas.
     */
    getMangaById(id: string): Promise<any> {
        try {
            return db.select({
                id: mangas.id,
                title: mangas.title,
                description: mangas.description,
                author: {
                    id: authors.id,
                    fullName: authors.fullName,
                    birthdate: authors.birthdate
                },
                releaseDate: mangas.releaseDate,
                category: {
                    id: categories.id,
                    name: categories.name
                },
                comments: {
                    id: comments.id,
                    content: comments.content,
                    date: comments.date
                }
            }).from(mangas)
            .leftJoin(
                authors, eq(mangas.author, authors.id) 
            )
            .leftJoin(
                categories, eq(mangas.category, categories.id)
            )
            .leftJoin(
                comments, eq(mangas.id, comments.id) // attention ici
            ).where(eq(mangas.id, id))
       } catch (err) {
            console.log(err)
            throw new Error('Impossible de récupérer le manga')
       }
    } 

    /**
     * Récupère un manga par son titre.
     * @param title - Le titre du manga à récupérer.
     * @returns Le manga correspondant au titre spécifié, ou undefined s'il n'existe pas.
     */
    getMangaByTitle(title: string): Promise<Partial<Manga | undefined>> {
        try {
            return db.query.mangas.findFirst({
                where:eq(mangas.title, title),
            })
           } catch(err) {
            console.log(err)
            throw new Error('Impossible de récupérer le manga')
           } 
    }

    /**
     * Ajoute un nouveau manga.
     * @param manga - Le manga à ajouter.
     */
    addNewManga(manga: NewManga) {
        try {
            return db.insert(mangas).values(manga).returning({id: mangas.id}).execute()
           } catch(err) {
            console.error(err)
            throw new Error('Impossible d\'ajouter le manga')
           }
    }

    /**
     * Modifie un manga.
     * @param manga - Le manga à modifier.
     */
    updateManga(manga: Manga) {
        try {
            return db.update(mangas)
            .set(manga)
            .where(
                eq(mangas.id, manga.id))
            .execute();
           } catch (err) {
            console.error(err)
            throw new Error("Impossible de mettre à jour la fiche du manga")
           }
    }

    /**
     * Supprime manga.
     * @param id -  L'identifiant du manga à supprimer.
     */
    deleteManga(id: string) {
        try {
            return db.delete(mangas).where(eq(mangas.id, id)).execute()
        } catch (err){
            console.error(err)
            throw new Error('Suppression impossible')
        }
    }
}