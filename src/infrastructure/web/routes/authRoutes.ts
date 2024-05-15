import express from 'express';
import { login, logout, me, register } from '../controllers/UserController';
import { isAuth } from '../../../middleware/authMiddleware';

// Crée un routeur Express
const router = express.Router()

// Définit la route pour la connexion des utilisateurs
router.post('/login', login)
// Définit la route pour l'enregistrement des utilisateurs
router.post('/register', register)

router.get('/me', isAuth, me)

router.get('/logout', isAuth, logout)

// Exporte le routeur pour une utilisation dans d'autres fichiers
export default router