import { CategoryRepository } from "../../infrastructure/repositories/MangaCategoryRepository"; 
import { Category, NewCategory } from "../entities/MangaCategory";

export class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    /**
     * Méthode pour récupérer toutes les catégories
     * @returns Toutes les catégories
     */
    getAllCategories() {
        return this.categoryRepository.getAllCategories()       
    }

    /**
     * Méthode pour créer une nouvelle catégorie
     * @param category Nouvelle catégorie à créer
     * @returns La nouvelle catégorie créée
     */
    createCategory(category: NewCategory) {
        return this.categoryRepository.createCategory(category)
    }

    /**
     * Méthode pour mettre à jour une catégorie existante
     * @param category Catégorie à mettre à jour
     * @returns La catégorie mise à jour
     */
    updateCategory(category: Category) {
        if(!category.id || category.name.trim().length < 5) return;
        return this.categoryRepository.updateCategory(category)
    }

    /**
     * Méthode pour supprimer une catégorie par son identifiant
     * @param id Identifiant de la catégorie à supprimer
     * @returns La catégorie supprimée
     */
    deleteCategory(id: string) {
        return this.categoryRepository.deleteCategory(id)
    }
}