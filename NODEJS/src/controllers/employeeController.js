import employeeService from '../services/employeeService';

let getTopEmployeeHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await employeeService.getTopEmployeeHome(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllEmployees = async (req, res) => {
    try {
        let employees = await employeeService.getAllEmployees();
        return res.status(200).json(employees);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let postInfoEmployee = async (req, res) => {
    try {
        let infor = req.body;
        let response = await employeeService.saveDetailInforEmployee(infor);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    getTopEmployeeHome: getTopEmployeeHome,
    getAllEmployees: getAllEmployees,
    postInfoEmployee: postInfoEmployee
}