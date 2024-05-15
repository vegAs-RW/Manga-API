import { CategoryRepository } from "../../infrastructure/repositories/MangaCategoryRepository"; 
import { Category, NewCategory } from "../entities/MangaCategory";

export class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    getAllCategories() {
        return this.categoryRepository.getAllCategories()       
    }

    createCategory(category: NewCategory) {
        return this.categoryRepository.createCategory(category)
    }

    updateCategory(category: Category) {
        if(!category.id || category.name.trim().length < 5) return;
        return this.categoryRepository.updateCategory(category)
    }

    deleteCategory(id: string) {
        return this.categoryRepository.deleteCategory(id)
    }
}