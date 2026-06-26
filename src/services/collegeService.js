import * as collegeRepository from "../repositories/collegeRepository.js";

export const registerCollege = async (collegeData) => {
    const {name , location , domain} = collegeData;

    const noramlizeDomain = domain.toLowerCase().trim();

    return await collegeRepository.createCollege(name , location , noramlizeDomain);
};

export const fetchAllColleges = async () => {
   return await collegeRepository.getAllColleges();
};