export const adminMenu = [

    { //quản lí người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },

            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },

            {
                name: 'menu.admin.manage-employee', link: '/system/manage-employee'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },

            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'
            // },

            { //quản lí lịch làm việc của nhân viên     
                name: 'menu.employee.manage-schedule', link: '/employee/manage-schedule'

            },


        ]
    },

    { //quản lí cơ sở
        name: 'menu.admin.facility',
        menus: [
            {
                name: 'menu.admin.manage-facility', link: '/system/manage-facility'
            },
            {
                name: 'menu.admin.manage-detail-facility', link: '/system/manage-detail-facility'
            },

        ]
    },

    { //quản lí dịch vụ
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },

        ]
    },

];

export const employeeMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.employee.manage-schedule', link: '/employee/manage-schedule'
            },
            {
                name: 'menu.employee.manage-customer', link: '/employee/manage-customer'
            },
        ]
    }
];