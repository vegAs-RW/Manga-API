import express  from "express";
// Importe les fonctions de contrôleur pour récupérer tous les mangas et un manga par ID
import { getAllMangas, getMangaById } from "../controllers/MangaController";
// Importe le middleware d'authentification
import { isAuth } from "../../../middleware/authMiddleware";
// Crée un routeur Express
const router = express.Router();

// Définit une route GET pour récupérer tous les mangas, avec le middleware d'authentification
router.get('/', isAuth, getAllMangas)
// Définit une route GET pour récupérer un manga par ID, avec le middleware d'authentification
router.get('/:id', isAuth, getMangaById)

export default router