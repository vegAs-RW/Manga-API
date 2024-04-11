import { MangaAuthor } from '../../domain/entities/MangaAuthor';
import fs from 'fs';
import path from 'path';

/**
 * Repository qui gère le CRUD des auteurs
 */
export class MangaAuthorRepository {
    private filePath = path.join(__dirname, '..', 'data', 'categories.json');

    /**
     * Récupère tous les auteurs du fichier json
     * @returns {MangaAuthor[]}
     */
    getAllAuthors(): MangaAuthor[] {
        const data = fs.readFileSync(this.filePath, 'utf-8')
        return JSON.parse(data)
    }
    /**
     * @param {string} mangaId - identifiants du manga ou retrouver l'auteur
     * @return {MangaAuthor[]}
     */
    getAuthorByMangaId(mangaId: string): MangaAuthor[] {
        const authors = this.getAllAuthors();
        return authors.filter(author => author.mangaId === mangaId)
    }

    /**
     * 
     * @param {MangaAuthors[]} - tableau des auteurs 
     */
    saveAuthors(authors: MangaAuthor[]) {
        const data = JSON.stringify(authors);
        fs.writeFileSync(this.filePath, data)
    }
}