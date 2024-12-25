import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import employeeController from "../controllers/employeeController";

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



    return app.use("/", router);
}

module.exports = initWebRoutes;
