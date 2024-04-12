import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../../config/env";

// Récupération des clés secrètes JWT depuis les variables d'environnement

const { JWT_SECRET, REFRESH_TOKEN } = env

export class AuthService {
    // Map pour stocker les jetons de rafraîchissement associés à l'ID de l'utilisateur
    private refreshTokenStore: Map<string, string> = new Map();

    /**
     * Crée un jeton d'accès JWT avec l'ID de l'utilisateur comme payload
     * @param id Identifiant de l'utilisateur
     * @returns Jeton d'accès JWT
     */
    createAccessToken(id: string): string {
        return jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: '5m' });
    }

    /**
     * Crée un jeton de rafraîchissement JWT avec l'ID de l'utilisateur comme payload
     * et le stocke dans le refreshTokenStore
     * @param id Identifiant de l'utilisateur
     * @returns Jeton de rafraîchissement JWT
     */
    createRefreshToken(id: string): string {
        const refreshToken = jwt.sign({ userId: id }, REFRESH_TOKEN, { expiresIn: '5d' });
        this.refreshTokenStore.set(id, refreshToken)
        return refreshToken
    }

    /**
     * Rafraîchit un jeton d'accès JWT en utilisant un jeton de rafraîchissement JWT valide
     * @param refreshToken Jeton de rafraîchissement JWT
     * @returns Nouveau jeton d'accès JWT ou undefined si le rafraîchissement échoue
     */
    refreshAccessToken(refreshToken: string): string | void {
        try {
            // Vérifie que le jeton de rafraîchissement est valide et récupère le payload
            const payload = jwt.decode(refreshToken) as jwt.JwtPayload;
            // Récupère le jeton de rafraîchissement associé à l'ID de l'utilisateur dans le store
            const storedRefreshToken = this.refreshTokenStore.get(payload.userId)
            // Vérifie que le jeton de rafraîchissement fourni correspond à celui stocké
            if (storedRefreshToken === refreshToken) {
                // Génère un nouveau jeton d'accès
                const newToken = this.createAccessToken(payload.userId)
                // Met à jour le jeton de rafraîchissement dans le store
                this.refreshTokenStore.set(payload.userId, newToken)
                
            } else {
                // Jeton de rafraîchissement invalide
                throw new Error('Invalid refresh token')
            }
        } catch {
            // Jeton de rafraîchissement invalide
            throw new Error('Invalid refresh token')
        }
    }
}