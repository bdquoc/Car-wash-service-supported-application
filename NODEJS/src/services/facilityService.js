const db = require("../models");

let createFacility = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address
                || !data.imageBase64
                || !data.descriptionHTML
                || !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameters',
                })
            } else {
                await db.Facility.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Create specialty succeed!'
                })
            }
        } catch (e) {
            console.log(e)
            reject(e);
        }
    })
}

let getAllFacility = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Facility.findAll({

            });
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errMessage: 'ok',
                errCode: 0,
                data
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailFacilityById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errMessage: 'Missing parameters',
                    errCode: 1,
                })
            }
            else {
                let data = await db.Facility.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown'],
                })

                if (data) {
                    let employeeFacility = [];

                    employeeFacility = await db.Employee_Infor.findAll({
                        where: { facilityId: inputId },
                        attributes: ['employeeId', 'provinceId'],
                    })
                    data.employeeFacility = employeeFacility;
                } else data = {}

                resolve({
                    errMessage: 'ok',
                    errCode: 0,
                    data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createFacility: createFacility,
    getAllFacility: getAllFacility,
    getDetailFacilityById: getDetailFacilityById
}