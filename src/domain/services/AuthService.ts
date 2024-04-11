import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import env from "../../config/env";

const {JWT_SECRET, REFRESH_TOKEN} = env

export class AuthService {
    private refreshTokenStore: Map<string, string> = new Map();

    createAccessToken(id: string) : string {
        return jwt.sign({userId: id}, JWT_SECRET, {expiresIn: '15m'});
    }

    createRefreshToken(id: string) : string {
        const refreshToken = jwt.sign({userId: id}, REFRESH_TOKEN, {expiresIn: '5d'});
        this.refreshTokenStore.set(id, refreshToken)

        return refreshToken
    }

    refreshAccessToken(refreshToken: string): string | void {
        try {
            // On vérifie que le token en paramètre est bien valide
            const payload = jwt.verify(refreshToken, REFRESH_TOKEN) as jwt.JwtPayload;
            // On récupére ce même token dans notre store
            const storedRefreshToken = this.refreshTokenStore.get(payload.userId)
            // Si ce token existe dans le store, ca implique qu'il est valide.
            if ( storedRefreshToken === refreshToken) {
                // On génère un nouveau token de rafraichissement
                const newToken = this.createAccessToken(payload.userId)
                // On enregistre le nouveau token de rafraichissement
                this.refreshTokenStore.set(payload.userId, newToken)
            } else {
               throw new Error('Invalid refresh token') 
            }
        } catch {
            throw new Error('Invalid refresh token') 
        }
    }
}