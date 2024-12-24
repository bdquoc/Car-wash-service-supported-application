import db from '../models/index';

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

let saveDetailInforEmployee = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.contentHTML || !inputData.id || !inputData.contentMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    employeeId: inputData.employeeId,
                }),
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



module.exports = {
    getTopEmployeeHome: getTopEmployeeHome,
    getAllEmployees: getAllEmployees,
    saveDetailInforEmployee: saveDetailInforEmployee
}