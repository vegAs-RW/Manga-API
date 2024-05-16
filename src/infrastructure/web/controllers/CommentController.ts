import { Request, Response } from "express";
import { APIResponse } from "../../../utils/APIresponse";
import { CommentService } from "../../../domain/services/CommentService";

const commentService = new CommentService();

export const createComment = async (req: Request, res: Response) => {
    try {
        const { mangasId } = req.params;
        const { userId } = req.user;
        const { content } = req.body;
        const newComment = { content, mangasId, author: userId }
        await commentService.createComment(newComment);
        APIResponse(res, { statusCode: 201, message: 'Comment created' });
    } catch (err) {
        APIResponse(res, { statusCode: 500, message: 'Internal server Error' });
    }
    
}

export const deleteCommentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        await commentService.deleteCommentById(id, userId);
        APIResponse(res, { statusCode: 200, message: 'Comment deleted' });
    } catch (err) {
        APIResponse(res, { statusCode: 500, message: 'Internal server Error' });
    }
}

export const getCommentsByMangaId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const comments = await commentService.getCommentById(id);
        console.table(comments)
        if (comments)
            APIResponse(res, { statusCode: 200, data: comments, message: 'OK' });
    } catch (err) {
        APIResponse(res, { statusCode: 500, message: 'Internal server Error' });
    }
    
};