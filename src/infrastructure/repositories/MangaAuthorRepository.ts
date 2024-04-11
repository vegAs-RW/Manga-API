import { MangaAuthor } from '../../domain/entities/MangaAuthor';
import fs from 'fs';
import path from 'path';

/**
 * Repository qui gère le CRUD des auteurs
 */
export class MangaAuthorRepository {
    private filePath = path.join(__dirname, '..', 'data', 'auteur.json');

    /**
     * Récupère tous les auteurs du fichier json
     * @returns {MangaAuthor[]} Un tableau contenant tous les auteurs de manga
     */
    getAllAuthors(): MangaAuthor[] {
        const data = fs.readFileSync(this.filePath, 'utf-8')
        return JSON.parse(data)
    }

    /**
     * Récupère les auteurs d'un manga en fonction de l'identifiant du manga
     * @param {string} mangaId L'identifiant du manga
     * @return {MangaAuthor[]} Un tableau contenant les auteurs du manga donné
     */
    getAuthorByMangaId(mangaId: string): MangaAuthor[] {
        const authors = this.getAllAuthors();
        return authors.filter(author => author.mangaId === mangaId)
    }

    /**
     * Enregistre les auteurs de manga dans le fichier JSON
     * @param {MangaAuthors[]} authors Les auteurs de manga à enregistrer
     */
    saveAuthors(authors: MangaAuthor[]) {
        const data = JSON.stringify(authors);
        fs.writeFileSync(this.filePath, data)
    }
}