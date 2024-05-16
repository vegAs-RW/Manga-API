import {Server} from 'socket.io';
import http from 'http'

import { setupSocketEvent } from './events';
import env from '../../../config/env';

const {FRONTEND_URL} = env;

export function initSocketServer(server: http.Server): Server {
    const io = new Server(server, {
        cors: {
            origin: FRONTEND_URL,
            methods: ['GET', 'PUT', 'PATCH', 'DELETE', 'POST'],
            credentials: true
        }
    });
    setupSocketEvent(io)

    return io;
}