import { Request, Response } from "express";
import { MangaService } from "../../../domain/services/MangaService";
import {APIResponse} from '../../../utils/APIresponse';

const mangaService = new MangaService()

export const getAllMangas = async (req: Request, res: Response) => {
    try {
        const mangas = await mangaService.getAllMangas();
        APIResponse(res, {statusCode: 200, message: 'Ok', data: mangas})
    } catch (err) {
        APIResponse(res, {statusCode: 500, message: 'Interne Server Error'})
    }
}

export const getMangaById = (req: Request, res: Response) => {
    const mangaId = req.params.id;
    console.log(mangaId)
    const manga = mangaService.getMangaById(mangaId);
    if (!manga) {
        APIResponse(res, {
            statusCode: 404,
            message: 'Manga not found'
        })
    } else {
        APIResponse(res, {
            statusCode: 200,
            message: 'Found !',
            data: manga
        })
    }
}