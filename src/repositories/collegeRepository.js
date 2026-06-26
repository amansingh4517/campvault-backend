import pool from '../config/db.js';

export const createCollege = async (name , location , domain) => {
    const query = `
    INSERT INTO college (name , location , domain) 
    VALUES ($1 , $2 , $3)
    RETURNING *;
    `;
    const values = [name , location , domain];
    const {rows} = await pool.query(query , values);
    return rows[0];
};

export const getAllColleges = async() => {
    const query = `SELECT * FROM college;`;
    const {rows} = await pool.query(query);
    return rows;
};