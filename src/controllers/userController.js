import * as userService from '../services/userService.js'

export const register = async (req, res, next) => {
    try {
        const { name, email, password, number, college_id } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "name , email , password are required field" });
        }

        const newUser = await userService.registerUser({ name, email, password, number, college_id });

        return res.status(201).json({
            message: "User Registered successfully",
            user: newUser
        });
    }

    catch (error) {
        return next(error);
    }

};


export const login = async (req , res ,next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error : "Email and password are required fields" });
        };

        const result = await userService.loginUser({email , password});

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