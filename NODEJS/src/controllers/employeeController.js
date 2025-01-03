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
        console.log('Received data:', infor);
        let response = await employeeService.saveDetailInforEmployee(infor);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
            errorDetail: e.message
        })
    }
}

let getDetailEmployeeById = async (req, res) => {
    try {
        let infor = await employeeService.getDetailEmployeeById(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        let infor = await employeeService.bulkCreateSchedule(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getScheduleByDate = async (req, res) => {
    try {
        let infor = await employeeService.getScheduleByDate(req.query.employeeId, req.query.date);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getExtraInforEmployeeById = async (req, res) => {
    try {
        let infor = await employeeService.getExtraInforEmployeeById(req.query.employeeId);
        return res.status(200).json(infor);
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
    postInfoEmployee: postInfoEmployee,
    getDetailEmployeeById: getDetailEmployeeById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforEmployeeById: getExtraInforEmployeeById
}