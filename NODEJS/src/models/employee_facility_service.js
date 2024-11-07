'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Employee_Facility_Service extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Employee_Facility_Service.init({
        employeeId: DataTypes.INTEGER,
        facilityId: DataTypes.INTEGER,
        serviceId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Employee_Facility_Service',
    });
    return Employee_Facility_Service;
};