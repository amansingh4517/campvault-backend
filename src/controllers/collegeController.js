import * as collegeService from '../services/collegeService.js';
import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2, "Name should atleast contain 2 character"),
    domain: z.url(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    pin_code: z.string().length(6, "Enter 6 digit pin code"),
    country: z.string().default("India")
});

export const registerCollege = async (req, res, next) => {

    try {
        const validate = registerSchema.safeParse(req.body);

        if (!validate.success) {
            const firstErrorMessage = validation.error.issues[0]?.message || "Validation failed";

            return res.status(400).json({
                error: firstErrorMessage
            });
        }

        const cleanData = validate.data;

        const collegeData = await collegeService.registerCollege(cleanData);

        return res.status(201).json({
            success: true,
            data: collegeData
        });
    }
    catch (error) {
        return next(error);
    }
    
}


export const getAllCollege = async (req , res , next) => {
    try{
        const colleges = await collegeService.getAllColleges();

        res.status(200).json({
            success : true,
            length : colleges.length,
            data : colleges
        })
    }
    catch (error) {
        return next(error);
    }
}