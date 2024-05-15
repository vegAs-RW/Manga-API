import express from 'express'
// Importe la fonction de contrôleur pour récupérer l'auteur par ID de manga
import { getAllAuthors, getAuthorById, deleteAuthor, updateAuthor, addNewAuthor } from '../controllers/MangaAuthorController'

// Crée un routeur Express
const router = express.Router()

// Définit une route GET pour récupérer l'auteur par l'ID du manga
router.get('/:id', getAuthorById)
router.get('/', getAllAuthors)
router.put('/:id', updateAuthor)
router.post('/', addNewAuthor)
router.delete('/:id', deleteAuthor)

// Exporte le routeur pour une utilisation dans d'autres fichiers
export default router;