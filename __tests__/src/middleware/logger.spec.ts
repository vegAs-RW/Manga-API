import { requestLogger } from '../../../src/middleware/logger' 
import { Request, Response, NextFunction } from "express";

// Mock des cookies de la requête
const mockRequest = {
    cookies: {
        Ninja: 'mockNinja'
    },
    method: 'GET',
    path: '/test'
} as unknown as Request;

// Mock de la réponse de la requête
const mockResponse = {} as Response;

// Mock de la fonction next
const mockNext = jest.fn() as NextFunction;

describe('requestLogger middleware', () => {
    test('should log request information and call next()', () => {
        // Redirige la sortie de la console vers un mock
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        // Appel de la fonction middleware
        requestLogger(mockRequest, mockResponse, mockNext);

        // Vérifie que la fonction console.log a été appelée avec les bonnes informations de requête
        expect(consoleSpy).toHaveBeenCalledWith('mockNinja a fais une requête [GET] sur la route [/test]');

        // Vérifie que la fonction next a été appelée
        expect(mockNext).toHaveBeenCalled();

        // Restaure la fonction console.log
        consoleSpy.mockRestore();
    });
});

