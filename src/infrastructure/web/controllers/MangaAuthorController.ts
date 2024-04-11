import { Request, Response } from "express";
import { APIResponse } from "../../../utils/APIresponse";
import { MangaAuthorRepository } from "../../repositories/MangaAuthorRepository";

const authorRepository = new MangaAuthorRepository();

/**
 * Afficher à l'écran les datas comments via une requete avec l'id d'un post
 * @param req - requete http gérée via express
 * @param res - réponse http gérée par express
 */
export const getCommentsByPostId = (req: Request, res: Response) => {
    const {id} = req.params
    const author = authorRepository.getAuthorByMangaId(id)
    APIResponse(res, {
        statusCode: 200,
        message: "Ok",
        data: author
    })
}