import { Manga } from "../entities/Manga";
import { MangasRepository } from "../../infrastructure/repositories/MangaRepository";


export class MangaService {
    private mangasRepository: MangasRepository;


    constructor(){
        this.mangasRepository = new MangasRepository();
    }

    getAllMangas(): Manga[] {
        return this.mangasRepository.getAllMangas();
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