'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Employee_Infor extends Model {
        static associate(models) {

        }
    }
    Employee_Infor.init({
        employeeId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        addressFacility: DataTypes.STRING,
        nameFacility: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Employee_Infor',
        freezeTableName: true,
    });
    return Employee_Infor;
}