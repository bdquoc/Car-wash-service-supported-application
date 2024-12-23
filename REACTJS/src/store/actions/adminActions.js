import actionTypes from "./actionTypes";
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopEmployeeHomeService,
    getAllEmployees, saveDetailEmployeeService
} from "../../services/userService";
import { toast } from 'react-toastify';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionStart error', e);
        }
    }
}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error', e);
        }
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Create new user succeeded');
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('createNewUser error', e);
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                toast.error('Fetch all users failed');
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error('Fetch all users failed');
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersStart error', e);
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success('Delete user succeeded');
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Delete user failed');
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error('Delete user failed');
            dispatch(deleteUserFailed());
            console.log('deleteAUser error', e);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Update user succeeded');
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Update user failed');
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error('Update user failed');
            dispatch(editUserFailed());
            console.log('deleteAUser error', e);
        }
    }
}


export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopEmployees = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopEmployeeHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_EMPLOYEES_SUCCESS,
                    dataEmployees: res.data
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_EMPLOYEES_FAILED
                });
            }
        } catch (e) {
            console.log('fetchTopEmployees error', e);
            dispatch({
                type: actionTypes.FETCH_TOP_EMPLOYEES_FAILED
            });

        }
    }
}

export const fetchTopEmployeesSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_EMPLOYEES_SUCCESS
})

export const fetchTopEmployeesFailed = () => ({
    type: actionTypes.FETCH_TOP_EMPLOYEES_FAILED
})

export const fetchAllEmployees = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllEmployees();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_EMPLOYEES_SUCCESS,
                    dataEp: res.data
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_EMPLOYEES_FAILED
                });
            }
        } catch (e) {
            console.log('fetchAllEmployees error', e);
            dispatch({
                type: actionTypes.FETCH_ALL_EMPLOYEES_FAILED
            });

        }
    }
}

export const saveDetailEmployee = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailEmployeeService(data);
            if (res && res.errCode === 0) {
                toast.success('Save detail employee succeeded');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_EMPLOYEE_SUCCESS
                });
            } else {
                console.log('saveDetailEmployee error', res);
                toast.error('Save detail employee failed');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_EMPLOYEE_FAILED
                });
            }
        } catch (e) {
            toast.error('Save detail employee failed');
            console.log('saveDetailEmployee error', e);
            dispatch({
                type: actionTypes.SAVE_DETAIL_EMPLOYEE_FAILED
            });

        }
    }
}