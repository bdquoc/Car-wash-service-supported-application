import facilityService from '../services/facilityService';

let createFacility = async (req, res) => {
    try {
        let infor = await facilityService.createFacility(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllFacility = async (req, res) => {
    try {
        let infor = await facilityService.getAllFacility();
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getDetailFacilityById = async (req, res) => {
    try {
        let infor = await facilityService.getDetailFacilityById(req.query.id, req.query.location);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let postInfoFacility = async (req, res) => {
    try {
        let infor = req.body;
        console.log('Received data:', infor);
        let response = await facilityService.saveDetailInforFacility(infor);
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



module.exports = {
    createFacility: createFacility,
    getAllFacility: getAllFacility,
    getDetailFacilityById: getDetailFacilityById,
    postInfoFacility: postInfoFacility
}