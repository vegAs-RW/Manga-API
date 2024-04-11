import { Request, Response } from "express";
import { register } from "../../../../../src/infrastructure/web/controllers/UserController";
import { UserService } from "../../../../../src/domain/services/UserService";
import { AuthService } from "../../../../../src/domain/services/AuthService";
import { APIResponse } from "../../../../../src/utils/APIresponse";
import bcrypt from 'bcrypt';

// Mock des services utilisés dans le contrôleur
jest.mock('../../../../../src/domain/services/UserService');
//jest.mock('../domain/services/AuthService');
jest.mock('../../../../../src/utils/APIresponse');


// Mock de la requête de test
const mockRequest = {
    body: {
        username: 'testUser',
        password: 'testPassword'
    }
} as unknown as Request;

// Mock de la réponse de la requête
const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
} as unknown as Response;

describe('register controller', () => {
    beforeEach(() => {
        // Efface les mocks avant chaque test
        jest.clearAllMocks();
    });

    it('should return 200 if username does not exist', async () => {
        // Simuler que le nom d'utilisateur n'existe pas dans la base de données
        UserService.prototype.getUserByUsername = jest.fn().mockReturnValue(undefined);

        // Appeler la fonction register avec la requête et la réponse simulées
        await register(mockRequest, mockResponse);

        // Vérifier que la fonction APIResponse a été appelée avec le bon message de succès
        expect(APIResponse).toHaveBeenCalledWith(mockResponse, { statusCode: 200, message: 'created succesfully' });

        // Vérifier que la fonction APIResponse n'a pas été appelée avec le message d'erreur
        expect(APIResponse).not.toHaveBeenCalledWith(mockResponse, { statusCode: 409, message: 'user already exist' });
    });
});