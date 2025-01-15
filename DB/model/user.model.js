import {DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const userModel = sequelize.define('User',{
   id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
   },
   userName:{
    type:DataTypes.STRING,
    unique:true,
    allowNull:false
   },
   email:{
    type:DataTypes.STRING,
    unique:true,
    allowNull:false
   },
   password:{
    type:DataTypes.STRING,
    allowNull:false
   },
   confirmEmail:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
   },
   profilePic:{
    type:DataTypes.STRING,
    allowNull:true
   }
});

export default userModel;