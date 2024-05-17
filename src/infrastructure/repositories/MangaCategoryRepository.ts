import { eq } from "drizzle-orm";
import { db } from "../data";
import { Category, NewCategory } from "../../domain/entities/MangaCategory";
import { categories } from "../data/schema";

export class CategoryRepository {

    /**
     * Récupère toutes les catégories.
     * @returns Un tableau contenant toutes les catégories.
     * @throws Une erreur si la récupération des catégories échoue.
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
     * Ajoute une nouvelle catégorie.
     * @param category Les données de la nouvelle catégorie à ajouter.
     * @throws Une erreur si l'ajout de la catégorie échoue.
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
     * Supprime une catégorie existante.
     * @param id L'identifiant de la catégorie à supprimer.
     * @throws Une erreur si la suppression de la catégorie échoue.
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
     * Modifie une catégorie existante.
     * @param category Les données de la catégorie à modifier.
     * @throws Une erreur si la modification de la catégorie échoue.
     */
    updateCategory(category: Category) {
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