import { Manga, NewManga } from "../entities/Manga";
import { MangasRepository } from "../../infrastructure/repositories/MangaRepository";
import { MangaAuthorRepository } from "../../infrastructure/repositories/MangaAuthorRepository";

export class MangaService {
    private mangasRepository: MangasRepository;
    private mangaAuthorRepository: MangaAuthorRepository;

    // Constructeur pour initialiser les repositories
    constructor() {
        this.mangasRepository = new MangasRepository();
        this.mangaAuthorRepository = new MangaAuthorRepository();
    }

    /**
     * Récupère tous les mangas avec leurs auteurs associés
     * @returns Un tableau de mangas
     */
    getAllMangas() {
        // Récupère tous les mangas depuis le repository
        return this.mangasRepository.getAllMangas();
    }

    /**
     * Récupère un manga par son identifiant
     * @param id L'identifiant du manga à récupérer
     * @returns Le manga correspondant à l'identifiant ou undefined s'il n'existe pas
     */
    getMangaById(id: string) {
        if (!id || id.trim().length < 1) return;
        return this.mangasRepository.getMangaById(id)
        }

    /**
     * Récupère un manga par son titre
     * @param title Le titre du manga à récupérer
     * @returns Le manga correspondant au titre ou undefined s'il n'existe pas
     */
    getMangaByTitle(title: string) {
        if (!title || title.trim().length < 1) return;
        return this.mangasRepository.getMangaByTitle(title)
        }
    
    /**
     * Ajoute un nouveau manga
     * @param manga Le manga à ajouter
     * @returns L'id du manga qui vient d'être créé
     */
    async addManga(manga: NewManga) {
        if (manga?.title?.trim().length < 1 || manga?.description?.trim().length < 1) return;
        const newManga = await this.mangasRepository.addNewManga(manga)
        return newManga[0].id
    }

    /**
     * Modifie un manga existant
     * @param manga Le manga à ajouter
     */
    updateManga(manga: Manga) {
        return this.mangasRepository.updateManga(manga)
    }

    /**
     * Supprime un manga existant
     * @param id L'identifiant du manga à supprimer
     */
    deleteManga(id: string) {
        return this.mangasRepository.deleteManga(id)
    }
}