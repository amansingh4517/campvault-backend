import * as collegeRepository from "../repositories/collegeRepository.js";

export const registerCollege = async (collegeData) => {
    const {name ,  domain , address , city ,state , pin_code , country} = collegeData;

    const noramlizeDomain = domain.toLowerCase().trim();

    const exisitingCollege = await collegeRepository.findCollegeByDomain(noramlizeDomain);

    if(exisitingCollege){
        const error = new Error("A college with this domain is already registered.");
        error.statusCode = 400;
        error.message = "A college with this domain is already registered.";
        throw error;
    }

    return await collegeRepository.createCollege(name ,  domain , address , city ,state , pin_code , country);
};

export const getAllColleges = async () => {
   return await collegeRepository.getAllColleges();
};