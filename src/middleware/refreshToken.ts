import { AuthService } from "../domain/services/AuthService";
import { Request, Response, NextFunction } from "express";
import { APIResponse } from "../utils/APIresponse";

const authService = new AuthService()

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const {refreshToken} = req.cookies;
    
    if(!refreshToken) return next()

    try {
        const newAccessToken = authService.refreshAccessToken(refreshToken)
        if(newAccessToken) {
            res.cookie('accesToken', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            })
        }
        next();
    } catch (err) {
        console.error(err);
        return APIResponse(res, {statusCode:500, message: 'error'})
        
    }
}