import { Manga } from "../entities/Manga";
import { MangasRepository } from "../../infrastructure/repositories/MangaRepository";
import { MangaAuthorRepository } from "../../infrastructure/repositories/MangaAuthorRepository";

export class MangaService {
    private mangasRepository: MangasRepository;
    private mangaAuthorRepository: MangaAuthorRepository;

    constructor(){
        this.mangasRepository = new MangasRepository();
        this.mangaAuthorRepository = new MangaAuthorRepository();
    }

    getAllMangas(): Manga[] {
        const mangas = this.mangasRepository.getAllMangas();
        for (const manga of mangas) {
            if(manga.id) {
                manga.author = this.mangaAuthorRepository.getAuthorByMangaId(manga.id) || []
            }
        }
        return mangas
    }

    getMangaById(id: string ): Manga | undefined {
        return this.mangasRepository.getMangaById(id)
    }

    addManga(manga: Manga) {
        const mangas = this.mangasRepository.getAllMangas();

        mangas.push({
            id: crypto.randomUUID(),
            ...manga
        })
        // On sauvegarde les posts
        this.mangasRepository.addNewManga(mangas);
    }
}