import express from 'express';
import { login, register } from '../controllers/UserController';

// Crée un routeur Express
const router = express.Router()

// Définit la route pour la connexion des utilisateurs
router.post('/login', login)
// Définit la route pour l'enregistrement des utilisateurs
router.post('/register', register)

// Exporte le routeur pour une utilisation dans d'autres fichiers
export default router