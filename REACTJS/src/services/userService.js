import axios from '../axios';


const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    console.log('check data from service: ', data)
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    // return axios.delete('/api/delete-user', { id: userId })
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopEmployeeHomeService = (limit) => {
    return axios.get(`/api/top-employee-home?limit=${limit}`)
}

const getAllEmployees = () => {
    return axios.get(`/api/get-all-employees`)
}

const saveDetailEmployeeService = (inputData) => {
    return axios.post('/api/save-infor-employees', inputData);
}

const getDetailInforEmployee = (inputId) => {
    return axios.get(`/api/get-detail-employee-by-id?id=${inputId}`)
}

const saveBulkScheduleEmployee = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
}

const getScheduleEmployeeByDate = (employeeId, date) => {
    return axios.get(`/api/get-schedule-employee-by-date?employeeId=${employeeId}&date=${date}`)
}

const getExtraInforEmployeeById = (employeeId) => {
    return axios.get(`/api/get-extra-infor-employee-by-id?employeeId=${employeeId}`);
}
const getProfileEmployeeById = (employeeId) => {
    return axios.get(`/api/get-profile-employee-by-id?employeeId=${employeeId}`);
}

const postCustomerBookAppointment = (data) => {
    return axios.post('/api/customer-book-appointment', data);
}

const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data);
}

const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data);
}
export {
    handleLoginApi, getAllUsers, createNewUserService,
    deleteUserService, editUserService, getAllCodeService,
    getTopEmployeeHomeService, getAllEmployees,
    saveDetailEmployeeService, getDetailInforEmployee,
    saveBulkScheduleEmployee, getScheduleEmployeeByDate,
    getExtraInforEmployeeById, getProfileEmployeeById,
    postCustomerBookAppointment, postVerifyBookAppointment,
    createNewSpecialty
}