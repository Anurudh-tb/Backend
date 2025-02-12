'use strict';
const {
  Model,DataTypes
} = require('sequelize');
const bcrypt = require("bcrypt");
const sequelize=require('../../Config/database')
module.exports=sequelize.define('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      confirmPassword:{
        type :DataTypes.VIRTUAL,
        set(value){
          if(value === this.password){
            const hashPassword = bcrypt.hashSync(value,10);
            this.setDataValue("password",hashPassword);              
          }else{
            throw new Error(
              "password and confirm password must be the same",
              400
            );
          }
        }
    },
      last_login: {
        type: DataTypes.DATE
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },{
      modelName:'user',
      paranoid:false,
      freezeTableName:true
    }
  )