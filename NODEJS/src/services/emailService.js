
require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        },
    });
    console.log('dataSend', dataSend);
    let info = await transporter.sendMail({
        from: 'DANG QUOC BAO WITH LUV !',
        to: dataSend.receiverEmail,
        subject: 'Thông tin đặt lịch bảo dưỡng xe',
        html: getBodyHTMLEmail(dataSend),
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
            <h3>Xin chào ${dataSend.customerName}!</h3>
            <p>Bạn nhận được email này vì bạn đã đặt lịch bảo dưỡng xe tại cửa hàng chúng tôi.</p>
            <h2>Thông tin đặt lịch bảo dưỡng xe</h2>
            <div><b>Thời gian: ${dataSend.time}</b></div>
            <div><b>Nhân viên: ${dataSend.employeeName}</b></div>

            <p>Nếu các thông tin trên là chính xác, vui lòng click vào đường link bên dưới
            để xác nhận đặt lịch.</p>
            <div><a href=${dataSend.redirectLink} target="_blank">Xác nhận đặt lịch</a></div>

            <div>Xin chân thành cảm ơn!</div>
        `;
    }
    if (dataSend.language === 'en') {
        result = `
            <h3>Hello ${dataSend.customerName}!</h3>
            <p>You are receiving this email because you have booked a car maintenance at our store.</p>
            <h2>Car maintenance booking information</h2>
            <div><b>Time: ${dataSend.time}</b></div>
            <div><b>Employee: ${dataSend.employeeName}</b></div>

            <p>If the above information is correct, please click on the link below
            to confirm the booking.</p>
            <div><a href=${dataSend.redirectLink} target="_blank">Confirm booking</a></div>

            <div>Thank you very much!</div>
        `;
    }
    return result;
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
            <h3>Xin chào ${dataSend.customerName}!</h3>
            <p>Bạn nhận được email này vì bạn đã đặt lịch bảo dưỡng xe tại cửa hàng chúng tôi.</p>
            <p>Thông tin đặt lịch/hóa đơn được gửi trong file đính kèm.</p>

            <div>Xin chân thành cảm ơn!</div>
        `;
    }
    if (dataSend.language === 'en') {
        result = `
            <h3>Hello ${dataSend.customerName}!</h3>
            <p>You are receiving this email because you have booked a car maintenance at our store.</p>
            <p>Booking/invoice information is sent in the attached file.</p>

            <div>Thank you very much!</div>
        `;
    }
    return result;
}

let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            });

            let info = await transporter.sendMail({
                from: '"goub" <dangquocbao137@gmail.com>',
                to: dataSend.email,
                subject: "Kết quả đặt lịch bảo dưỡng",
                html: getBodyHTMLEmailRemedy(dataSend),
                attachments: [
                    {
                        filename: `remedy-${dataSend.customerId}-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64, ")[1],
                        encoding: 'base64'
                    }
                ]
            })

            resolve(true)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment
}