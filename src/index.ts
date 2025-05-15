import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = 2203;

app.use(express.json());
app.use('/users', userRoutes);

mongoose.connect('mongodb://localhost:27017/realtime_chat?authSource=admin')
    .then(() => {
        console.log('Connected');
        app.listen(PORT, () => console.log(`Server on port: ${PORT}`));
    })
    .catch(err => console.error('Error in MongoDB connection', err));
