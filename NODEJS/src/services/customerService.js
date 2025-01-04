import db from '../models/index';
require('dotenv').config();
import emailService from './emailService';

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.employeeId || !data.date || !data.timeType || !data.fullName) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                })
            } else {

                await emailService.sendSimpleEmail({
                    language: data.language,
                    receiverEmail: data.email,
                    customerName: data.fullName,
                    time: data.timeString,
                    employeeName: data.employeeName,
                    redirectLink: 'https://www.facebook.com/profile.php?id=100014256210644'
                });

                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    },
                });
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { customerId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            employeeId: data.employeeId,
                            customerId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }
                    })
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

module.exports = {
    postBookAppointment: postBookAppointment
}