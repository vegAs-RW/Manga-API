import express from 'express';
import { updateUser, deleteUser } from '../controllers/UserController';
import { isAuth } from "../../../middleware/authMiddleware";

const router = express.Router();

router.put('/:id', isAuth, updateUser)
router.delete('/:id', isAuth, deleteUser)

export default router;