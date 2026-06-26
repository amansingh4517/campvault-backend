import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';


const app = express();

app.use(express.json());

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'CampusJugaad core operational.' });
});

// app.use() matches the prefix path: It tells Express, "Hey, any incoming request that starts with /api/users (regardless of whether it's a GET, POST, PUT, or DELETE) should be handed over to the userRouter.
app.use('/api/v1/users' , userRouter );


export default app;

