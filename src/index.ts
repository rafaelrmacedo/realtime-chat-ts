import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import { WebSocketServer } from 'ws';

const clients = new Map();
const app = express();
const PORT = 2203
const wss = new WebSocketServer({ port: PORT });

app.use(express.json());
app.use('/users', userRoutes);

mongoose.connect('mongodb://dev:dev@localhost:27017/realtime_chat?authSource=admin')
    .then(() => {
        console.log('Connected');
        app.listen(PORT, () => console.log(`Server on port: ${PORT}`));
    })
    .catch(err => console.error('Error in MongoDB connection', err));

wss.on('connection', (ws: any, req: any) => {
    const userId = new URL(req.url, 'http://localhost').searchParams.get('userId');
    clients.set(userId, ws);

    ws.on('message', (data: any) => {
        const { to, message } = JSON.parse(data);
        const receiver = clients.get(to);
        if (receiver) receiver.send(message);
    });

    ws.on('close', () => {
        clients.delete(userId);
    });
});
