import { MangaAuthorRepository } from "../../infrastructure/repositories/MangaAuthorRepository";
import { Author, NewAuthor } from "../entities/MangaAuthor";

export class AuthorService {
    private authorRepository: MangaAuthorRepository;
    

    // Constructeur pour initialiser les repositories
    constructor() {
        this.authorRepository = new MangaAuthorRepository();
    }

    getAllAuthors() {
        // Récupère tous les auteurs depuis le repository
        return this.authorRepository.getAllAuthors();
    }

    createAuthor(author: NewAuthor) {
        if (author?.fullName?.trim().length < 1 || author?.description?.trim().length < 1) return;
        return this.authorRepository.saveAuthor(author)
    }

    updateAuthor(author: Author) {
        return this.authorRepository.updateAuthor(author)
    }

    deleteAuthor(id: string) {
       if(!id || id.trim().length < 1) return;
       return this.authorRepository.deleteAuthor(id)
    }
}