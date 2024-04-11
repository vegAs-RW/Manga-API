import { Request, Response } from "express";
import { UserService } from "../../../domain/services/UserService";
import { AuthService } from "../../../domain/services/AuthService";
import { APIResponse } from '../../../utils/APIresponse';
import { User } from "../../../domain/entities/User";
import env from '../../../config/env'
import bcrypt from 'bcrypt'


const { NODE_ENV } = env

const userService = new UserService();
const authService = new AuthService()



export const getUserByUsername = (req: Request, res: Response) => {
    const { username } = req.body
    const user = userService.getUserByUsername(username);
    if (user) {
        APIResponse(res, {
            statusCode: 200,
            message: 'User Found',
            data: user
        })
    } else {
        APIResponse(res, {
            statusCode: 404,
            message: 'User not Found'
        })
    }
}

export const updateUser = (req: Request, res: Response) => {
    const userId = req.params.id
    const updatedUserData: User = req.body
    const updatedUser: User = { ...updatedUserData, id: userId }
    userService.updateUser(updatedUser)
    APIResponse(res, {
        statusCode: 200,
        message: 'User successfully updated'
    })
}

export const deleteUser = (req: Request, res: Response) => {
    const userId = req.params.id;
    userService.deleteUser(userId);
    APIResponse(res, {
        statusCode: 200,
        message: 'User successfully deleted'
    })
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = userService.getUserByUsername(username)
        if (!user || !user.username) {
            return res.status(400).json({ message: 'Invalid request: username is missing' });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return APIResponse(res, { statusCode: 401, message: 'Auth failed' })
        }
        const accessToken = authService.createAccessToken(user.id as string)
        const refreshToken = authService.createRefreshToken(user.id as string)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: NODE_ENV === 'production'
        })
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: NODE_ENV === 'production'
        })
        APIResponse(res, {
            statusCode: 200,
            message: 'Successfully authenticated'
        })
    } catch (err) {
        console.error(err)
        APIResponse(res, {
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username?.trim() || !password.trim() || typeof username !== 'string' || typeof password !== 'string') {
            return APIResponse(res, {
                statusCode: 400,
                message: 'invalid username or password'
            })
        }
        const existingUsername = userService.getUserByUsername(username)
        if (existingUsername) return APIResponse(res, { statusCode: 409, message: 'user already exist' })

        const hashedPassword = await bcrypt.hash(password, 12)

        userService.addUser({ username, password: hashedPassword })
        APIResponse(res, { statusCode: 200, message: 'created succesfully' })
    } catch (err) {
        APIResponse(res, { statusCode: 500, message: 'Inernal server Error' })
    }
}