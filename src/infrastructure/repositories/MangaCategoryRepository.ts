import { eq } from "drizzle-orm";
import { db } from "../data";
import { Category, NewCategory } from "../../domain/entities/MangaCategory";
import { categories } from "../data/schema";

export class CategoryRepository {

     /**
     * Récupère toutes les categories
     */
    getAllCategories() {
        try {
            return db.select({
                id: categories.id,
                name: categories.name,
                description: categories.description,
            }).from(categories)
            .execute();
        } catch(err) {
            console.error(err);
            throw new Error('Impossible de récupérer les catégories');
        }
    }

    /**
     * Ajoute une catégorie.
     * @param category - L'objet de la catégorie à ajouter.
     */
    createCategory(category: NewCategory) {
        try {
            return db.insert(categories).values(category).execute()
           } catch (err) {
            console.log(err)
            throw new Error('Impossible d\'ajouter une catégorie')
           }
    }
    
    /**
     * Supprime une catégorie.
     * @param id - L'identifiant de la catégorie à modifier.
     */
    deleteCategory(id: string) {
        try {
            return db.delete(categories).where(eq(categories.id, id)).execute()
        } catch (err) {
            console.log(err)
            throw new Error('Impossible de supprimer la catégorie')
        }
    }

    /**
     * Modifie une catégorie.
     * @param category - La catégorie à modifier.
     */
    updateAuthor(category: Category) {
        try {
            db.update(categories)
            .set(category)
            .where(eq(categories.id, category.id))
            .execute();
        } catch (err) {
            console.log(err)
            throw new Error('Impossible de modifier la catégorie séléctionné')
        }
    }
}