import express  from "express";
import { getAllMangas, getMangaById } from "../controllers/MangaController";
import { isAuth } from "../../../middleware/authMiddleware";
const router = express.Router();

router.get('/', isAuth, getAllMangas)
router.get('/:id', isAuth, getMangaById)

export default router