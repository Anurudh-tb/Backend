'use strict';
const {
  Model,DataTypes
} = require('sequelize');
const sequelize=require('../../Config/database')
module.exports=sequelize.define('courseMapping', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      courseId: {
        type: DataTypes.INTEGER,
        references:{
          model:'course',
          key:'id'
        }
      },
      studentId: {
        type: DataTypes.INTEGER,
        references:{
          model:'student',
          key:'id'
        }
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
      modelName:'coursemapping',
      paranoid:false,
      freezeTableName:true
    }
  )