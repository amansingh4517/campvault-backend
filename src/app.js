import express from 'express';
// import dotenv from 'dotenv';


const app = express();

app.use(express.json());

app.get('/' , (req ,res) => {
    res.json({
        message : "server is running",
        version : "1.0.0"
    });
});

export default app;

