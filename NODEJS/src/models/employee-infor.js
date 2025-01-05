'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Employee_Infor extends Model {
        static associate(models) {
            Employee_Infor.belongsTo(models.User, { foreignKey: 'employeeId' });

            Employee_Infor.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceTypeData' });
            Employee_Infor.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceTypeData' });
            Employee_Infor.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentTypeData' });
        }
    }
    Employee_Infor.init({
        employeeId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        facilityId: DataTypes.INTEGER,
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