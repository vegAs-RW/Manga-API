import { Manga } from "../entities/Manga";
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
     * @returns Un tableau de mangas avec les auteurs
     */
    getAllMangas(): Manga[] {
        // Récupère tous les mangas depuis le repository
        const mangas = this.mangasRepository.getAllMangas();
        // Boucle à travers chaque manga pour récupérer son auteur
        for (const manga of mangas) {
            // Vérifie si l'identifiant du manga est défini
            if (manga.id) {
                // Récupère l'auteur du manga en fonction de son identifiant
                manga.author = this.mangaAuthorRepository.getAuthorByMangaId(manga.id) || []
            }
        }
        return mangas
    }

    /**
     * Récupère un manga par son identifiant
     * @param id L'identifiant du manga à récupérer
     * @returns Le manga correspondant à l'identifiant ou undefined s'il n'existe pas
     */
    getMangaById(id: string): Manga | undefined {
            const author = this.mangaAuthorRepository.getAuthorByMangaId(id)
            const manga = this.mangasRepository.getMangaById(id)
            // Vérifie si les identifiants du manga et de l'auteur sont définis
            if (author && manga) {
                // Récupère l'auteur du manga en fonction de son identifiant
                manga.author = this.mangaAuthorRepository.getAuthorByMangaId(id) || []
            }
        return this.mangasRepository.getMangaById(id)
        }

    /**
     * Ajoute un nouveau manga
     * @param manga Le manga à ajouter
     */
    addManga(manga: Manga) {
        // Récupère tous les mangas existants
        const mangas = this.mangasRepository.getAllMangas();
        // Ajoute le nouveau manga avec son identifiant unique
        mangas.push({
            id: crypto.randomUUID(),
            ...manga
        })
        // Sauvegarde les mangas mis à jour
        this.mangasRepository.addNewManga(mangas);
    }
}