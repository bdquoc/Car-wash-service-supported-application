import e from 'express';
import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';
import emailService from '../services/emailService';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;


let getTopEmployeeHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {

            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: users
            });
        } catch (e) {
            reject(e);
        }
    })
}

let getAllEmployees = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let employees = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                },
            })

            resolve({
                errCode: 0,
                data: employees
            });
        } catch (e) {
            reject(e);
        }
    })
}

let checkRequiredFields = (inputData) => {
    let arrFields = ['id', 'contentHTML', 'contentMarkdown', 'action',
        'selectedPrice', 'selectedPayment', 'selectedProvince', 'nameFacility',
        'addressFacility', 'note', 'specialtyId'
    ]

    let isValid = true;
    let element = '';
    for (let i = 0; i < arrFields.length; i++) {
        if (!inputData[arrFields[i]]) {
            isValid = false;
            element = arrFields[i]
            break;
        }
    }

    return {
        isValid: isValid,
        element: element
    }
}

let saveDetailInforEmployee = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkObj = checkRequiredFields(inputData);
            if (checkObj.isValid === false) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing required parameters: ${checkObj.element}`
                })
            } else {

                //upsert to Markdown table
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        employeeId: inputData.id,
                    })
                } else if (inputData.action === 'EDIT') {
                    let employeeMarkdown = await db.Markdown.findOne({
                        where: { employeeId: inputData.id },
                        raw: false,
                    })

                    if (employeeMarkdown) {
                        employeeMarkdown.contentHTML = inputData.contentHTML;
                        employeeMarkdown.contentMarkdown = inputData.contentMarkdown;
                        employeeMarkdown.description = inputData.description;
                        employeeMarkdown.updatedAt = new Date();
                        await employeeMarkdown.save();
                    }
                }

                //upsert to Employee_Infor table
                let employeeInfor = await db.Employee_Infor.findOne({
                    where: { employeeId: inputData.id },
                    raw: false
                })

                if (employeeInfor) {
                    //update
                    employeeInfor.employeeId = inputData.id;
                    employeeInfor.priceId = inputData.selectedPrice;
                    employeeInfor.provinceId = inputData.selectedProvince;
                    employeeInfor.paymentId = inputData.selectedPayment;
                    employeeInfor.addressFacility = inputData.addressFacility;
                    employeeInfor.nameFacility = inputData.nameFacility;
                    employeeInfor.note = inputData.note;
                    employeeInfor.specialtyId = inputData.specialtyId;
                    employeeInfor.facilityId = inputData.facilityId;

                    await employeeInfor.save()
                } else {
                    //create
                    await db.Employee_Infor.create({
                        employeeId: inputData.id,
                        priceId: inputData.selectedPrice,
                        provinceId: inputData.selectedProvince,
                        paymentId: inputData.selectedPayment,
                        addressFacility: inputData.addressFacility,
                        nameFacility: inputData.nameFacility,
                        note: inputData.note,
                        specialtyId: inputData.specialtyId,
                        facilityId: inputData.facilityId
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save detail infor employee success'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailEmployeeById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let data = await db.User.findOne({
                    where: { id: inputId },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['contentHTML', 'contentMarkdown', 'description']
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.Employee_Infor,
                            attributes: {
                                exclude: ['id', 'employeeId']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                            ]
                        }
                    ],
                    raw: false,
                    nest: true

                })

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }

                if (!data) data = {};

                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let bulkCreateSchedule = (data) => {
    console.log('check max: ', MAX_NUMBER_SCHEDULE)
    return new Promise(async (resolve, reject) => {
        console.log('DATA INPUT: ', data);
        try {
            if (!data.arrSchedule || !data.employeeId || !data.formatedDate) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }

                let existing = await db.Schedule.findAll({
                    where: { employeeId: data.employeeId, date: data.formatedDate },
                    attributes: ['timeType', 'date', 'employeeId', 'maxNumber'],
                    raw: true
                });

                console.log('check existing: ', existing)
                console.log('check create: ', schedule)

                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date;
                });

                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getScheduleByDate = (employeeId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!employeeId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        employeeId: employeeId,
                        date: date
                    },

                    include: [
                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.User, as: 'employeeData', attributes: ['firstName', 'lastName'] },
                    ],
                    raw: false,
                    nest: true
                })
                if (!dataSchedule) dataSchedule = [];
                resolve({
                    errCode: 0,
                    data: dataSchedule
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getExtraInforEmployeeById = (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let data = await db.Employee_Infor.findOne({
                    where: {
                        employeeId: idInput
                    },

                    attributes: {
                        exclude: ['id', 'employeeId']
                    },

                    include: [
                        { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                    ],

                    raw: false,
                    nest: true
                })
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getProfileEmployeeById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let data = await db.User.findOne({
                    where: { id: inputId },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.Employee_Infor,
                            attributes: {
                                exclude: ['id', 'employeeId']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                            ]
                        }
                    ],
                    raw: false,
                    nest: true

                })

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }

                if (!data) data = {};

                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getListCustomerForEmployee = (employeeId, date) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!employeeId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameters'
                });
            } else {
                let data = await db.Booking.findAll({
                    where: {
                        statusId: 'S2',
                        employeeId: employeeId,
                        date: date
                    },
                    include: [
                        {
                            model: db.User, as: 'customerData',
                            attributes: ['email', 'firstName', 'address', 'gender'],
                            include: [
                                {
                                    model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']
                                }
                            ]
                        },
                        {
                            model: db.Allcode, as: 'timeTypeDataCustomer', attributes: ['valueEn', 'valueVi']
                        }
                    ],
                    raw: false,
                    nest: true
                })
                console.log('check data: ', data)
                resolve({
                    errCode: 0,
                    data: data
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let sendRemedy = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.email || !data.employeeId || !data.customerId || !data.timeType || !data.imgBase64) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameters'
                });
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        employeeId: data.employeeId,
                        customerId: data.customerId,
                        timeType: data.timeType,
                        statusId: 'S2'
                    },
                    raw: false
                })

                if (appointment) {
                    appointment.statusId = 'S3';
                    await appointment.save()
                }

                await emailService.sendAttachment(data);
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    getTopEmployeeHome: getTopEmployeeHome,
    getAllEmployees: getAllEmployees,
    saveDetailInforEmployee: saveDetailInforEmployee,
    getDetailEmployeeById: getDetailEmployeeById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforEmployeeById: getExtraInforEmployeeById,
    getProfileEmployeeById: getProfileEmployeeById,
    getListCustomerForEmployee: getListCustomerForEmployee,
    sendRemedy: sendRemedy
}