import * as userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (userData) => {
    const { name, email, password, role, number, location, college_id } = userData;

    const existingUser = await userRepository.findUserByEmail(email.toLowerCase().trim());

    // Business Validation: Check if the user already exists
    if (existingUser) {
        const error = new Error("User Already Registered");
        error.statusCode = 400;
        error.message = "User Already Registered";
        throw error;
    }

    // Hashing of password
    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await userRepository.createUser({
        name,
        email: email.toLowerCase().trim(),
        password_hash: hashPassword,
        role: "student",
        number,
        location,
        college_id
    });

    return newUser;
};


export const loginUser = async (loginData ) => {
    const { email, password } = loginData;

    const user = await userRepository.findUserByEmail(email.toLowerCase().trim());

    if (!user) {
        const error = new Error("User not found , First create a account");
        error.statusCode = 400;
        error.message = "User not found , First create a account";
        
        throw error;
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
        return { success: false, message: "INVALID_CREDENTIALS" };
    }

    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = jwt.sign(
        { id: user.id, role: user.role, college_id: user.college_id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );


    //while destructuring the user object we take out password_hash and remaining data of user in sanitizedUser and send it back to user (to protect password_hash from trasfering to user)
    const { password_hash, ...sanitizedUser } = user;

    return {
        success: true,
        token,
        user: sanitizedUser
    };
    
};