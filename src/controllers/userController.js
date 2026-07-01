import * as userService from '../services/userService.js'

export const register = async (req , res , next) => {
    try{
        const {name , email , password , number , college_id} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({error : "name , email , password are required field"});
        }

        const newUser = await userService.registerUser({name , email , password , number , college_id});

        return res.status(201).json({
            message : "User Registered successfully",
            user : newUser
        });
    }

    catch (error){
        return next(error);
    }

};