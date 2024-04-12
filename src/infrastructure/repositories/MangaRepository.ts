import { Manga } from "../../domain/entities/Manga";
import fs from 'fs';
import path from 'path';

/**
 * Repository qui gère le CRUD des mangas
 */
export class MangasRepository {
    private mangas: Manga[] = [];
    // Chemin du fichier JSON contenant les données des mangas
    private filePath = path.join(__dirname, '..', 'data', 'manga.json');

    // Charge les données des mangas lors de l'instanciation de la classe
    constructor() {
        this.mangas = this.loadMangas();
    }

     /**
     * Charge les données des mangas à partir du fichier JSON.
     * @returns Un tableau contenant les données des mangas.
     */
    loadMangas(): Manga[] {
        const data = fs.readFileSync(this.filePath, 'utf-8')
        return JSON.parse(data);
    }

    /**
     * Récupère tous les mangas.
     * @returns Un tableau contenant tous les mangas.
     */
    getAllMangas(): Manga[] {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
    }

    /**
     * Récupère un manga par son identifiant.
     * @param id - L'identifiant du manga à récupérer.
     * @returns Le manga correspondant à l'identifiant spécifié, ou undefined s'il n'existe pas.
     */
    getMangaById(id: string) {
        return this.mangas.find(manga => manga.id === id)
    } 

    /**
     * Ajoute un nouveau manga.
     * @param manga - Le manga à ajouter.
     */
    addNewManga(mangas: Manga[]) {
        const data = JSON.stringify(mangas)
        fs.writeFileSync(this.filePath, data)
    }
}