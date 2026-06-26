import app from './src/app.js';
import pg from './src/config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

// 🌟 THIS IS WHAT KEEMS THE EVENT LOOP ALIVE
app.listen(PORT, () => {
  console.log(`🚀 CampusJugaad backend roaring to life on port http://localhost:${PORT}`);
});