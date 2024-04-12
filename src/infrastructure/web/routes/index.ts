import express from "express";
// Importe les routes pour les mangas
import mangaRoutes from './mangaRoutes'
// Importe les routes pour les utilisateurs
import userRoutes from './userRoutes'
// Importe les routes pour l'authentification
import authRoutes from './authRoutes'
// Importe les routes pour les auteurs de manga
import mangaAuthorRoutes from './mangaAuthorRoutes'
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

// Exporte le routeur pour une utilisation dans d'autres fichiers
export default router