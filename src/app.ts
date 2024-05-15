// Importe le module dotenv pour charger les variables d'environnement depuis un fichier .env
import dotenv from 'dotenv'
dotenv.config();
// Importe les modules express, helmet et cookie-parser
import express, {Request, Response} from 'express'

import http from 'http';
import helmet from 'helmet';
import cookieParser from "cookie-parser";
// Importe le routeur principal de l'application
import router from './infrastructure/web/routes'
// Importe les variables d'environnement depuis le fichier de configuration env.ts

import cors from 'cors';

import env from './config/env'
// Importe les middlewares personnalisés
import { requestLogger } from './middleware/logger';
import { RandomNinjaMW } from './middleware/randomNinja';
import { refreshTokenMiddleware } from './middleware/refreshToken';

// Crée une instance de l'application Express
const app = express();
// Récupère le port à partir des variables d'environnement
const {PORT, FRONTEND_URL} = env;

// Utilise les middlewares globaux
// Parse les requêtes avec un body au format JSON
app.use(express.json())
// Permet de traiter les données du corps de la requête au format URL-encoded
app.use(express.urlencoded({extended: true}))

app.use(cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    credentials: true
}))

// Ajoute des en-têtes de sécurité à la réponse HTTP
app.use(helmet());
// Parse les cookies de la requête
app.use(cookieParser());
// Middleware pour enregistrer les requêtes dans la console
app.use(requestLogger);
// Middleware random pour afficher un nom de ninja a la connexion
app.use(RandomNinjaMW)
// Route pour afficher un message avec le nom d'un ninja aléatoire à chaque requête sur la racine de l'API
app.get("/", (req: Request, res: Response) => {
    const randomNinja = req.cookies.Ninja;
    res.send(`Salut ${randomNinja}`);
})

// Utilise le routeur principal de l'application
app.use(router)

// Lance le serveur Express sur le port spécifié
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

