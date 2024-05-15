import jwt from "jsonwebtoken";
import env from "../../config/env";

import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { User } from "../entities/User";

// Récupération des clés secrètes JWT depuis les variables d'environnement

const { JWT_SECRET, REFRESH_TOKEN } = env

export class AuthService {
    // Map pour stocker les jetons de rafraîchissement associés à l'ID de l'utilisateur
    private refreshTokenStore: Map<string, string> = new Map();
    private UserRepository = new UserRepository()

    /**
     * Crée un jeton d'accès JWT avec l'ID de l'utilisateur comme payload
     * @param id Identifiant de l'utilisateur
     * @returns Jeton d'accès JWT
     */
    createAccessToken(id: string): string {
        return jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: '20m' });
    }

    /**
     * Crée un jeton de rafraîchissement JWT avec l'ID de l'utilisateur comme payload
     * et le stocke dans le refreshTokenStore
     * @param id Identifiant de l'utilisateur
     * @returns Jeton de rafraîchissement JWT
     */
    async createRefreshToken(id: string): Promise<string> {
        const refreshToken = jwt.sign({ userId: id }, REFRESH_TOKEN, { expiresIn: '5d' });
        const user = await this.UserRepository.getUserById(id, {id: true, refreshToken: true})
        if (user) {
            this.UserRepository.updateUser({...user, refreshToken: refreshToken}as User)
        }
        return refreshToken
    }

    /**
     * Rafraîchit un jeton d'accès JWT en utilisant un jeton de rafraîchissement JWT valide
     * @param refreshToken Jeton de rafraîchissement JWT
     * @returns Nouveau jeton d'accès JWT ou undefined si le rafraîchissement échoue
     */
    async refreshAccessToken(refreshToken: string): Promise<string | void> {
        try {
            // Vérifie que le jeton de rafraîchissement est valide et récupère le payload
            const payload = jwt.verify(refreshToken, REFRESH_TOKEN) as jwt.JwtPayload;
            const user = await this.UserRepository.getUserById(payload.userId, {id:true, refreshToken: true})

            if (user && user.refreshToken === refreshToken) {
                // On génère un nouveau token d'accès
                return this.createAccessToken(payload.userId);
            }
            // Récupère le jeton de rafraîchissement associé à l'ID de l'utilisateur dans le store
            const storedRefreshToken = this.refreshTokenStore.get(payload.userId)
            // Vérifie que le jeton de rafraîchissement fourni correspond à celui stocké
            if (storedRefreshToken === refreshToken) {
                // Génère un nouveau jeton d'accès
                const newAccessToken = this.createAccessToken(payload.userId)
                // Met à jour le jeton de rafraîchissement dans le store
                return newAccessToken;
                
            } else {
                if (user) {
                    user.refreshToken = ''
                    this.UserRepository.updateUser(user as User);
                }
                throw new Error('Invalid refresh token');
            }
        } catch (err) {
            console.error(err)
            // Jeton de rafraîchissement invalide
            throw new Error('Invalid refresh token')
        }
    }
}