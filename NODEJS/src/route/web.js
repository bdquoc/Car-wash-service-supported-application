import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import employeeController from "../controllers/employeeController";
import customerController from "../controllers/customerController";
import specialtyController from "../controllers/specialtyController";
import facilityController from "../controllers/facilityController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    router.post('/api/login', userController.handleLoging);
    // router.post('/api/register', userController.handleRegister);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    router.get('/api/allcode', userController.getAllCode);

    router.get('/api/top-employee-home', employeeController.getTopEmployeeHome);
    router.get('/api/get-all-employees', employeeController.getAllEmployees);
    router.post('/api/save-infor-employees', employeeController.postInfoEmployee);
    router.get('/api/get-detail-employee-by-id', employeeController.getDetailEmployeeById);
    router.post('/api/bulk-create-schedule', employeeController.bulkCreateSchedule);
    router.get('/api/get-schedule-employee-by-date', employeeController.getScheduleByDate);
    router.get('/api/get-extra-infor-employee-by-id', employeeController.getExtraInforEmployeeById);
    router.get('/api/get-profile-employee-by-id', employeeController.getProfileEmployeeById);

    router.get('/api/get-list-customer-for-employee', employeeController.getListCustomerForEmployee);
    router.post('/api/send-remedy', employeeController.sendRemedy);

    router.post('/api/customer-book-appointment', customerController.postBookAppointment);
    router.post('/api/verify-book-appointment', customerController.postVerifyBookAppointment);

    router.post('/api/create-new-specialty', specialtyController.createSpecialty);
    router.get('/api/get-specialty', specialtyController.getAllSpecialty);
    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById);
    router.post('/api/save-infor-specialty', specialtyController.postInfoSpecialty);

    router.post('/api/create-new-facility', facilityController.createFacility);
    router.get('/api/get-facility', facilityController.getAllFacility);
    router.get('/api/get-detail-facility-by-id', facilityController.getDetailFacilityById);
    router.post('/api/save-infor-facility', facilityController.postInfoFacility);
    return app.use("/", router);
}

module.exports = initWebRoutes;
