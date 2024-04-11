import express from 'express'
// Importe la fonction de contrôleur pour récupérer l'auteur par ID de manga
import { getAuthorByMangaId } from '../controllers/MangaAuthorController'

// Crée un routeur Express
const router = express.Router()

// Définit une route GET pour récupérer l'auteur par l'ID du manga
router.get('/:id', getAuthorByMangaId)

// Exporte le routeur pour une utilisation dans d'autres fichiers
export default router;