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

    getMangaById(id:number ): Manga | undefined {
        return this.mangasRepository.getMangaById(id)
    }
}