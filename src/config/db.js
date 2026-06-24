import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables from the root .env file
dotenv.config();

const {Pool} = pg;

const pool = new Pool({
    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    port : process.env.DB_PORT
});

pool.on('connect' , () => {
    console.log('PostgreSQL Connection Pool initialized successfully 🐘')
});

pool.on('Error' , (err) => {
    console.error('Unexpected error on idle PostgreSQL client', err)
});

export default pool;