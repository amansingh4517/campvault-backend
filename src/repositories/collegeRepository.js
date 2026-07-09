import pool from '../config/db.js';

export const createCollege = async (name , domain , address , city ,state , pin_code , country) => {
    const query = `
    INSERT INTO college (name , domain , address , city , state , pin_code , country) 
    VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 )
    RETURNING id , name , city , state;
    `;
    const values = [name , domain , address , city ,state , pin_code , country];
    const {rows} = await pool.query(query , values);
    return rows[0];
};

export const getAllColleges = async() => {
    const query = `SELECT * FROM college;`;
    const {rows} = await pool.query(query);
    return rows;
};

export const findCollegeByDomain = async (domain) => {
    const query = `SELECT FROM college where domain = $1;`
    const {rows} = await pool.query(query , [domain]);
    return rows[0];
};