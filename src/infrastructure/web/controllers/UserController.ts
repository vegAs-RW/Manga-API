import { Request, Response } from "express";
import { UserService } from "../../../domain/services/UserService";
import { AuthService } from "../../../domain/services/AuthService";
import { APIResponse } from '../../../utils/APIresponse';
import { User } from "../../../domain/entities/User";
import env from '../../../config/env'
import bcrypt from 'bcrypt'
import { CustomRequest } from "../../../types/custom";


const { NODE_ENV } = env

// Instanciation des services
const userService = new UserService();
export const authService = new AuthService()

/**
 * Fonction pour récupérer un utilisateur par son nom d'utilisateur.
 * @param req - La requête HTTP entrante.
 * @param res - La réponse HTTP à renvoyer.
 */
export const getUserByUsername = (req: Request, res: Response) => {
    // Récupère le nom d'utilisateur à partir du corps de la requête
    const { username } = req.body
     // Appelle la méthode getUserByUsername de UserService pour récupérer l'utilisateur par son nom d'utilisateur
    const user = userService.getUserByUsername(username, {id: true, username: true});
    // Si l'utilisateur est trouvé, envoie une réponse avec le statut 200 et les données de l'utilisateur
    if (user) {
        APIResponse(res, {
            statusCode: 200,
            message: 'User Found',
            data: user
        })
    // Si l'utilisateur n'est pas trouvé, envoie une réponse avec le statut 404
    } else {
        APIResponse(res, {
            statusCode: 404,
            message: 'User not Found'
        })
    }
}

/**
 * Fonction pour mettre à jour les informations d'un utilisateur.
 * @param req - La requête HTTP entrante.
 * @param res - La réponse HTTP à renvoyer.
 */
export const updateUser = async (req: Request, res: Response) => {
    // Récupère l'identifiant de l'utilisateur à partir des paramètres de la requête
    const userId = req.params.id
    // Récupère les données mises à jour de l'utilisateur à partir du corps de la requête
    let updatedUserData: User = req.body
    // Vérifie si le mot de passe a été modifié
    if (updatedUserData.password) {
        // Hasher le nouveau mot de passe avec bcrypt
        const hashedPassword = await bcrypt.hash(updatedUserData.password, 10);
        // Mettre à jour le mot de passe dans les données utilisateur avec le mot de passe hashé
        updatedUserData = { ...updatedUserData, password: hashedPassword };
    }
    // Crée un nouvel objet utilisateur avec les données mises à jour et l'identifiant
    const updatedUser: User = { ...updatedUserData, id: userId }
    // Appelle la méthode updateUser de UserService pour mettre à jour l'utilisateur
    userService.updateUser(updatedUser)
    // Envoie une réponse avec le statut 200 et un message de succès
    APIResponse(res, {
        statusCode: 200,
        message: 'User successfully updated'
    })
}

/**
 * Fonction pour supprimer un utilisateur.
 * @param req - La requête HTTP entrante.
 * @param res - La réponse HTTP à renvoyer.
 */
export const deleteUser = (req: Request, res: Response) => {
    // Récupère l'identifiant de l'utilisateur à partir des paramètres de la requête
    const userId = req.params.id;
    // Appelle la méthode deleteUser de UserService pour supprimer l'utilisateur
    userService.deleteUser(userId);
    // Envoie une réponse avec le statut 200 et un message de succès
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    APIResponse(res, {
        statusCode: 200,
        message: 'User successfully deleted'
    })
};

/**
 * Fonction pour l'authentification d'un utilisateur.
 * @param req - La requête HTTP entrante.
 * @param res - La réponse HTTP à renvoyer.
 */
export const login = async (req: Request, res: Response) => {
    try {
        // Récupère le nom d'utilisateur et le mot de passe à partir du corps de la requête
        const { username, password } = req.body;
        // Récupère l'utilisateur par son nom d'utilisateur
        const user = await userService.getUserByUsername(username, { id: true, username: true, password: true })
        // Si l'utilisateur n'existe pas ou s'il manque le nom d'utilisateur, envoie une réponse avec le statut 400
        if (!user) {
            return res.status(400).json({ message: 'Invalid request: username is missing' });
        }
        // Vérifie si le mot de passe est valide en le comparant avec le mot de passe haché de l'utilisateu
        const isValid = await bcrypt.compare(password, user.password as string);
        // Si le mot de passe n'est pas valide, envoie une réponse avec le statut 401
        if (!isValid) {
            return APIResponse(res, { statusCode: 401, message: 'Auth failed' })
        }
        // Crée un jeton d'accès et un jeton de rafraîchissement
        const accessToken = authService.createAccessToken(user.id as string)
        const refreshToken = await authService.createRefreshToken(user.id as string)
        // Définit les cookies pour le jeton de rafraîchissement et le jeton d'accès
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: NODE_ENV === 'production'
        })
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: NODE_ENV === 'production'
        })
        // Envoie une réponse avec le statut 200 et un message de succès
        APIResponse(res, {
            statusCode: 200,
            message: 'Successfully authenticated'
        })
        // En cas d'erreur, envoie une réponse avec le statut 500
    } catch (err) {
        console.error(err)
        APIResponse(res, {
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
}

/**
 * Fonction pour enregistrer un nouvel utilisateur.
 * @param req - La requête HTTP entrante.
 * @param res - La réponse HTTP à renvoyer.
 */
export const register = async (req: Request, res: Response) => {
    try {
        // Récupère le nom d'utilisateur et le mot de passe à partir du corps de la requête
        const { username, password } = req.body;
        // Vérifie si le nom d'utilisateur et le mot de passe sont valides
        if (!username?.trim() || !password.trim() || typeof username !== 'string' || typeof password !== 'string') {
            return APIResponse(res, {
                statusCode: 400,
                message: 'invalid username or password'
            })
        }
        // Vérifie si le nom d'utilisateur existe déjà
        const existingUsername = await userService.getUserByUsername(username, { username: true })
        // Si le nom d'utilisateur existe déjà, envoie une réponse avec le statut 409
        if (existingUsername) return APIResponse(res, { statusCode: 409, message: 'user already exist' })
        // Hache le mot de passe
        const hashedPassword = await bcrypt.hash(password, 12)
        // Ajoute un nouvel utilisateur avec le nom d'utilisateur et le mot de passe haché
        userService.addUser({ username, password: hashedPassword })
        // Envoie une réponse avec le statut 200 et un message de succès
        APIResponse(res, { statusCode: 200, message: 'created succesfully' })
    } catch (err) {
        // En cas d'erreur, envoie une réponse avec le statut 500
        APIResponse(res, { statusCode: 500, message: 'Inernal server Error' })
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        APIResponse(res, { statusCode: 200, message: 'Logout successful' });
    } catch(error) {
        console.error(error);
        APIResponse(res, {statusCode: 500, message: 'Internal server error'})
    }
}

export const me = async (req: CustomRequest, res: Response) => {
    try {
        // On récupère l'utilisateur stocké dans le token
        APIResponse(res, { statusCode: 200, message: 'OK', data: req.user });
    } catch(error) {
        console.error(error);
        APIResponse(res, {statusCode: 500, message: 'Internal server error'})
    }
}