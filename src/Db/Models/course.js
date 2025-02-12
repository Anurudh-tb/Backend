'use strict';
const {
  Model,DataTypes

} = require('sequelize');

const sequelize=require('../../Config/database')
module.exports=sequelize.define('course', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      teacherId: {
        type: DataTypes.INTEGER,
        references:{
          model:'teacher',
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
      modelName:'course',
      paranoid:false,
      freezeTableName:true
    }
  )
