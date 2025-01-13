const db = require("../models");

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name
                || !data.imageBase64
                || !data.descriptionHTML
                || !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameters',
                })
            } else {
                await db.Service.create({
                    name: data.name,
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
            reject(e);
        }
    })
}

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Service.findAll({

            });
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new ArrayBuffer(item.image, 'base64').toString('binary');
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

let getDetailSpecialtyById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errMessage: 'Missing parameters',
                    errCode: 1,
                })
            }
            else {
                let data = await db.Service.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown'],
                })

                if (data) {
                    let employeeSpecialty = [];
                    if (location === 'ALL') {
                        employeeSpecialty = await db.Employee_Infor.findAll({
                            where: { specialtyId: inputId },
                            attributes: ['employeeId', 'provinceId'],
                        })
                    } else {
                        employeeSpecialty = await db.Employee_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location
                            },
                            attributes: ['employeeId', 'provinceId'],
                        })
                    }

                    data.employeeSpecialty = employeeSpecialty;
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
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById
}