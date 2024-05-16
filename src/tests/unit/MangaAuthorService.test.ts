import { beforeAll, describe, it, expect } from "@jest/globals";
import { sql } from "drizzle-orm";

import { AuthorService } from "../../domain/services/MangaAuthorService";
import { NewAuthor, Author } from "../../domain/entities/MangaAuthor";
import { APIResponse } from "../../utils/APIresponse";
import { db } from "../../infrastructure/data";


describe('AuthorsService', () => {
    let authorService: AuthorService;
    let createdAuthorId: string | undefined;
    let newAuthor: NewAuthor = {
        fullName: 'Gege Akutami',
        description: 'Gege Akutami (芥見 下々, Akutami Gege?), est un mangaka japonais, principalement connu depuis 2018 comme l\'auteur de Jujutsu Kaisen. Gege Akutami est un nom de plume, son identité réelle étant inconnue.',
        birthdate: "1992-02-26"
    }
    

    beforeAll(async () =>{
        authorService = new AuthorService();
        await db.execute(sql`SET search_path TO test`)
    })

    it('should be a new author', async () => {
        createdAuthorId = await authorService.createAuthor(newAuthor)
        console.log(createdAuthorId);
        
        expect(createdAuthorId).toBeTruthy()
    })

    it('should get an author by its id', async () => {
        const author = await authorService.getAuthorById(createdAuthorId || '');
        expect(author[0]).toEqual(
            expect.objectContaining({
                id: createdAuthorId,
                fullName: newAuthor.fullName,
                description: newAuthor.description,
                birthdate: newAuthor.birthdate
            })
        )
    });

    it('should get all authors', async () => {
        const authors = await authorService.getAllAuthors();
        authors.forEach((author : any) => {
            expect(author).toMatchObject({
                id: expect.any(String),
                fullName: expect.any(String),
                description: expect.any(String),
                birthdate: expect.any(String)
            })
        })
    })

    
    it('should update an author', async () => {
        
        const updatedAuthorData: Author = {
            id: createdAuthorId || '',
            fullName: 'Updated Full Name',
            description: 'Updated Description',
            birthdate: '1990-01-01'
        };
        
    
        await authorService.updateAuthor(updatedAuthorData);
        console.log(createdAuthorId)
        const updatedAuthor = await authorService.getAuthorById(createdAuthorId || '');
        console.log(updatedAuthor)
         expect(updatedAuthor[0]).toEqual(
            expect.objectContaining({
                id: createdAuthorId,
                fullName: updatedAuthorData.fullName,
                description: updatedAuthorData.description,
                birthdate: updatedAuthorData.birthdate
            })
        );
    });
})