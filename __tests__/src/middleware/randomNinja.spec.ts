import { Request, Response, NextFunction } from "express";
import { RandomNinjaMW } from "../../../src/middleware/randomNinja";

// Création d'un mock pour la fonction res.cookie
const mockCookie = jest.fn();

// Mock des cookies de la requête
const mockRequest = {
    cookies: {} // Simule l'absence du cookie 'Ninja'
} as unknown as Request;

// Mock de la réponse de la requête
const mockResponse = {
    cookie: jest.fn() // Fonction jest.fn() pour simuler la fonction res.cookie()
} as unknown as Response;

// Mock de la fonction next
const mockNext = jest.fn() as NextFunction;

describe('RandomNinjaMW middleware', () => {
    beforeEach(() => {
        // Réinitialise le mock de la fonction res.cookie avant chaque test
        mockCookie.mockClear();
    });

    it('should not set a random ninja name to the cookie if it already exists and call next()', () => {
        // Définit un cookie 'Ninja' simulé dans la requête
        mockRequest.cookies.Ninja = 'mockNinja';

        // Appel de la fonction middleware
        RandomNinjaMW(mockRequest, mockResponse, mockNext);

        // Vérifie que la fonction res.cookie n'a pas été appelée car le cookie 'Ninja' existe déjà
        expect(mockCookie).not.toHaveBeenCalled();

        // Vérifie que la fonction next a été appelée
        expect(mockNext).toHaveBeenCalled();
    });
});
