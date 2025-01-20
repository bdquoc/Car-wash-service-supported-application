import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topEmployees: [],
    allEmployees: [],
    allFacilities: [],
    allScheduleTime: [],
    allRequiredEmployeeInfor: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_EMPLOYEES_SUCCESS:
            state.topEmployees = action.dataEmployees;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_EMPLOYEES_FAILED:
            state.topEmployees = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_EMPLOYEES_SUCCESS:
            state.allEmployees = action.dataEp;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_EMPLOYEES_FAILED:
            state.allEmployees = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_FACILITY_SUCCESS:
            state.allFacilities = action.dataFa;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_FACILITY_FAILED:
            state.allFacilities = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_EMPLOYEE_INFOR_SUCCESS:
            state.allRequiredEmployeeInfor = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_EMPLOYEE_INFOR_FAILED:
            state.allRequiredEmployeeInfor = [];
            return {
                ...state
            }
        default:
            return state;
    }
}


export default adminReducer;