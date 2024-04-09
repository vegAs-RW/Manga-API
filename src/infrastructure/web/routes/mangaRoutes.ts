import express  from "express";
import { getAllMangas, getMangaById } from "../controllers/MangaController";

const router = express.Router();

router.get('/', getAllMangas)
router.get('/:id', getMangaById)

export default router