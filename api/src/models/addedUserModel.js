module.exports=(sequelize,DataTypes) =>{
    // table name = users
    const Users = sequelize.define("addedUsers",{
        firstName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false,
            isEmail:true 
        },
    },{timestamps:true});
    return Users;
}