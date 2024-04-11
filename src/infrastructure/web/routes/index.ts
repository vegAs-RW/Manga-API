import express from "express";
import mangaRoutes from './mangaRoutes'
import userRoutes from './userRoutes'
import authRoutes from './authRoutes'

const router = express.Router();

router.use('/mangas', mangaRoutes)
router.use('/users', userRoutes)
router.use('/auth', authRoutes)

export default router