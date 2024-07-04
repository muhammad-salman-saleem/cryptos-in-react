const db = require('../models/index')

const addedUser =db.addedUser;


exports.addUser=async (user,userId)=>{
    try {
        const newUser ={
            ...user,
            userId:userId.id
        };
       const dbUser= await addedUser.create(newUser);
       return dbUser?dbUser.id:null;
        
    } catch (error) {
        throw new Error(error);
    }
}

module.exports =exports
