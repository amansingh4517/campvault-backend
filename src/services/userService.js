import * as userRepository from "../repositories/userRepository";
import bcrypt from "bcrypt";

export const registerUser = async (userData) => {
    const {name , email , password , role , number , location , college_id } = userData;

    const existingUser = userRepository.findUserByEmail(email.toLowerCase().trim());

    // Business Validation: Check if the user already exists
    if(existingUser){
        const error = new Error("User Already Registered");
        error.statusCode = 400;
        throw error;
    }

    // Hashing of password
    const salt = 23;
    const hashPassword = await bcrypt.hash(passoword,salt);

    const newUser = await userRepository.createUser({
        name,
        email : eamil.toLowerCase().trim(),
        password_hash : hashPassword,
        role : "student",
        number,
        location,
        college_id
    });

    return newUser;
};