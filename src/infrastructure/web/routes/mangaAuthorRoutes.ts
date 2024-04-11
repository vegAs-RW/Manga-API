import express from 'express'
import { getAuthorByMangaId } from '../controllers/MangaAuthorController'

const router = express.Router()

router.get('/:id', getAuthorByMangaId)

export default router;