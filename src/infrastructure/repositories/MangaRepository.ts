import { Manga } from "../../domain/entities/Manga";
import fs from 'fs';
import path from 'path';

export class MangasRepository {
    private mangas: Manga[] = [];

    private filePath = path.join(__dirname, '..', 'data', 'manga.json');

    constructor() {
        this.mangas = this.loadMangas();
    }

    loadMangas(): Manga[] {
        const data = fs.readFileSync(this.filePath, 'utf-8')
        return JSON.parse(data);
    }

    getAllMangas(): Manga[] {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
    }

    getMangaById(id: number) {
        return this.mangas.find(manga => manga.id === id)
    } 
}