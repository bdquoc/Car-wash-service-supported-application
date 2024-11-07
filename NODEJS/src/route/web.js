import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/qb', (req, res) => {
        return res.send('qb')
    });

    return app.use("/", router);
}

module.exports = initWebRoutes;
