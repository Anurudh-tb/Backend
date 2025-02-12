'use strict';
const {
  Model,DataTypes
} = require('sequelize');
const sequelize=require('../../Config/database')
module.exports=sequelize.define('teacher', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      marital_status: {
        type: DataTypes.STRING
      },
      govt_id: {
        type: DataTypes.INTEGER
      },
      phone: {
        type: DataTypes.STRING
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
      modelName:'teacher',
      paranoid:false,
      freezeTableName:true
    }
  )