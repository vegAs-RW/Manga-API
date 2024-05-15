import express from 'express'
import { addNewCategory, deleteCategory, getAllCategories, updateCategory } from '../controllers/MangaCategoryController';

const router = express.Router();

router.get('/', getAllCategories)
router.post('/', addNewCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

// Exporte le routeur pour une utilisation dans d'autres fichiers
export default router;