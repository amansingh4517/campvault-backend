import * as collegeRepository from "../repositories/collegeRepository.js";

export const registerCollege = async (collegeData) => {
    const {name ,  domain , address , city ,state , pin_code , country} = collegeData;

    const noramlizeDomain = domain.toLowerCase().trim();

    return await collegeRepository.createCollege(name ,  domain , address , city ,state , pin_code , country);
};

export const fetchAllColleges = async () => {
   return await collegeRepository.getAllColleges();
};