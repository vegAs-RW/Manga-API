import express from "express";
import { createComment, deleteCommentById, getCommentsByMangaId } from "../controllers/CommentController";


const router = express.Router();

router.get('/:id', getCommentsByMangaId);
router.delete('/:id', deleteCommentById)
router.post('/:mangasId', createComment)