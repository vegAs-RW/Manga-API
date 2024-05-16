import { MangaAuthorRepository } from "../../infrastructure/repositories/MangaAuthorRepository";
import { Author, NewAuthor } from "../entities/MangaAuthor";

export class AuthorService {
    private authorRepository: MangaAuthorRepository;
    

    // Constructeur pour initialiser les repositories
    constructor() {
        this.authorRepository = new MangaAuthorRepository();
    }

    /**
     * Méthode pour récupérer tous les auteurs
     * @returns Tous les auteurs
     */
    getAllAuthors() {
        // Récupère tous les auteurs depuis le repository
        return this.authorRepository.getAllAuthors();
    }

    /**
     * Méthode pour récupérer un auteur par son identifiant
     * @param id Identifiant de l'auteur à récupérer
     * @returns L'auteur correspondant à l'identifiant
     */
    getAuthorById(id: string) {
        return this.authorRepository.getAuthorById(id)
    }

    /**
     * Méthode pour créer un nouvel auteur
     * @param author Nouvel auteur à créer
     * @returns L'identifiant du nouvel auteur créé
     */
     async createAuthor(author: NewAuthor) {
        if (author?.fullName?.trim().length < 1 || author?.description?.trim().length < 1) return;
        const newAuthor = await this.authorRepository.saveAuthor(author)
        return newAuthor[0].id
    }

    /**
     * Méthode pour mettre à jour un auteur
     * @param author Auteur à mettre à jour
     * @returns L'auteur mis à jour
     */
    async updateAuthor(author: Author) {
        return this.authorRepository.updateAuthor(author)
    }

    /**
     * Méthode pour supprimer un auteur par son identifiant
     * @param id Identifiant de l'auteur à supprimer
     * @returns L'auteur supprimé
     */
    deleteAuthor(id: string) {
       if(!id || id.trim().length < 1) return;
       return this.authorRepository.deleteAuthor(id)
    }
}