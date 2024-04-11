import express from 'express';
// Importe les fonctions de contrôleur pour mettre à jour et supprimer un utilisateur
import { updateUser, deleteUser } from '../controllers/UserController';
// Importe le middleware d'authentification
import { isAuth } from "../../../middleware/authMiddleware";

// Crée un routeur Express
const router = express.Router();

// Définit une route PUT pour mettre à jour un utilisateur par ID, avec le middleware d'authentification
router.put('/:id', isAuth, updateUser)
// Définit une route DELETE pour supprimer un utilisateur par ID, avec le middleware d'authentification
router.delete('/:id', isAuth, deleteUser)

export default router;