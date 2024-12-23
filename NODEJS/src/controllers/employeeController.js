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

module.exports = {
    getTopEmployeeHome: getTopEmployeeHome
}