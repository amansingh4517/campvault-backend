import * as userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

export const registerUser = async (userData) => {
    const {name , email , password , role , number , location , college_id } = userData;

    const existingUser = await userRepository.findUserByEmail(email.toLowerCase().trim());

    // Business Validation: Check if the user already exists
    if(existingUser){

        return 
        const error = new Error("User Already Registered");
        error.statusCode = 400;
        error.message = "User Already Registered";
        throw error;
    }

    // Hashing of password
    const salt =10;
    const hashPassword = await bcrypt.hash(password,salt);

    const newUser = await userRepository.createUser({
        name,
        email : email.toLowerCase().trim(),
        password_hash : hashPassword,
        role : "student",
        number,
        location,
        college_id
    });

    return newUser;
};