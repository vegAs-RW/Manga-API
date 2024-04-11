import express from "express";
import mangaRoutes from './mangaRoutes'
import userRoutes from './userRoutes'
import authRoutes from './authRoutes'
import mangaAuthorRoutes from './mangaAuthorRoutes'

const router = express.Router();

router.use('/auth', authRoutes)
router.use('/mangas', mangaRoutes)
router.use('/author', mangaAuthorRoutes)
router.use('/users', userRoutes)


export default router