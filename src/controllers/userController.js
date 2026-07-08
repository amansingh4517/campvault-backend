import * as userService from '../services/userService.js'
import {z} from 'zod';

const registerSchema = z.object({
    name : z.string().min(2,"Name must be of atleast two character"),
    email : z.string().email("Please provide valid email").toLowerCase().trim(),
    password : z.string().min(6,"Password must be atleast 6 characters"),
    number : z.string().length(10),
    location: z.string().optional(),
    college_id : z.coerce.number({required_error: "College ID is required and must be a number"})
});

export const register = async (req, res, next) => {
    try {
        const validation = registerSchema.safeParse(req.body);

        if (!validation.success) {
            const firstErrorMessage = validation.error.issues[0]?.message || "Validation failed";
            
            return res.status(400).json({
                error: firstErrorMessage
            });
        }

        const cleanData = validation.data;

        const newUser = await userService.registerUser(cleanData);

        return res.status(201).json({
            message : "User Registered successfully",
            data : newUser
        });
    }

    catch (error) {
        return next(error);
    }

};

const loginSchema = z.object({
    email : z.string().email("Please provide the valid email").toLowerCase().trim(), 
    password : z.string().min(6 , "P")
})

export const login = async (req , res ,next) => {
    try {
        const validation = loginSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({ error : validation.error.errors[0].message });
        };

        const cleanData = validation.data;
        const result = await userService.loginUser(cleanData);

        if( !result.success && result.message === "INVALID_CREDENTIALS" ){
            return res.status(401).json({error: "Invalid email or password credentials."})
        }

        res.status(201).json({
            message : 'Login successful',
            token : result.token,
             user :result.user
        });


    }
    catch (error) {
        return next(error);
    }
};

export const getProfile = async (req , res , next) => {
    try{
        // Because the 'authenticate' middleware ran first, req.user exists!
        // It contains whatever we put inside jwt.sign() during login (id, role, college_id)

        return res.status(201).json({
            success : true,
            data : res.user
        });
    }
    catch(error){
        return next(error);
    }
};