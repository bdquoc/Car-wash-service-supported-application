import db from '../models/index';
require('dotenv').config();
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';

let buildUrEmail = (employeeId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&employeeId=${employeeId}`
    return result;
}

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.employeeId || !data.date || !data.timeType || !data.fullName
                || !data.selectedGender || !data.address
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                })
            } else {

                let token = uuidv4();
                await emailService.sendSimpleEmail({
                    language: data.language,
                    receiverEmail: data.email,
                    customerName: data.fullName,
                    time: data.timeString,
                    employeeName: data.employeeName,
                    redirectLink: buildUrEmail(data.employeeId, token)
                });

                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullName
                    },
                });
                if (user && user[0]) {
                    let booking = await db.Booking.findOrCreate({
                        where: { customerId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            employeeId: data.employeeId,
                            customerId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                    })
                    console.log('Booking result:', booking);
                }
                resolve({
                    errCode: 0,
                    message: 'Save infor customer succeeds!'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.employeeId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                })
            } else {
                console.log('employeeId:', data.employeeId);
                console.log('token:', data.token);
                let appointment = await db.Booking.findOne({
                    where: {
                        employeeId: data.employeeId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })

                if (appointment) {
                    appointment.statusId = 'S2';
                    await appointment.save();

                    resolve({
                        errCode: 0,
                        message: 'Update the appointment succeeds!'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        message: 'Appointment has been activated or does not exist'
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}