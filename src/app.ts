import dotenv from 'dotenv'
dotenv.config();

import express, {Request, Response} from 'express'
import helmet from 'helmet';
import cookieParser from "cookie-parser";


import router from './infrastructure/web/routes'

import env from './config/env'

import { requestLogger } from './middleware/logger';
import { RandomNinjaMW } from './middleware/randomNinja';

const app = express();
const {PORT} = env;

app.use(helmet());
app.use(cookieParser());
app.use(requestLogger);

app.get("/", RandomNinjaMW, (req: Request, res: Response) => {
    const randomNinja = req.cookies.Ninja;
    res.send(`Salut ${randomNinja}`);
})

app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

