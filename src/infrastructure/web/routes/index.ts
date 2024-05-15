import express from "express";
// Importe les routes pour les mangas
import mangaRoutes from './mangaRoutes'
// Importe les routes pour les utilisateurs
import userRoutes from './userRoutes'
// Importe les routes pour l'authentification
import authRoutes from './authRoutes'
// Importe les routes pour les auteurs de manga
import mangaAuthorRoutes from './mangaAuthorRoutes'
// Importe les routes pour les commentaires
import commentRoutes from './commentRoutes'
// Importe les routes pour les categories de mangas
import categoryRoutes from './mangaCategoryRoutes'

import { isAuth } from "../../../middleware/authMiddleware";
// Crée un routeur Express
const router = express.Router();

// Utilise les routes pour l'authentification sur le préfixe '/auth'
router.use('/auth', authRoutes)
// Utilise les routes pour les mangas sur le préfixe '/mangas'
router.use('/mangas',isAuth, mangaRoutes)
// Utilise les routes pour les auteurs de manga sur le préfixe '/author'
router.use('/author', isAuth, mangaAuthorRoutes)
// Utilise les routes pour les utilisateurs sur le préfixe '/users'
router.use('/users',isAuth, userRoutes)
// Utilise les routes pour les commentaires sur le préfixe '/comments'
router.use('/comments', isAuth, commentRoutes)
// Utilise les routes pour les categories sur le préfixe '/categories'
router.use('/categories', isAuth, categoryRoutes)

// Exporte le routeur pour une utilisation dans d'autres fichiers
export default router