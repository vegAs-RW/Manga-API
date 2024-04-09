import express from "express";
import mangaRoutes from './mangaRoutes'

const router = express.Router();

router.use('/mangas', mangaRoutes)

export default router