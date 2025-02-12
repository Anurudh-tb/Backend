'use strict';
const {
  Model,DataTypes
} = require('sequelize');
const sequelize=require('../../Config/database')
module.exports=sequelize.define('student', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstname: {
        type: DataTypes.STRING
      },
      middlename: {
        type: DataTypes.STRING
      },
      lastname: {
        type: DataTypes.STRING
      },
      dob: {
        type: DataTypes.DATE
      },
      address: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.STRING
      },
      age: {
        type: DataTypes.INTEGER
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
      modelName:'student',
      paranoid:false,
      freezeTableName:true
    }
  )