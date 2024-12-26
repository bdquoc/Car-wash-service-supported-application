import React, { Component } from 'react';
import { connect } from "react-redux";
import './EmployeeSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleEmployeeByDate } from '../../../services/userService';


class EmployeeSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
        }
    }

    async componentDidMount() {
        let { language } = this.props;

        console.log('moment vie: ', moment(new Date()).format('dddd - DD/MM'));
        console.log('moment en: ', moment(new Date()).locale('en').format('ddd - DD/MM'));
        this.setArrDays(language);

    }

    setArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        this.setState({
            allDays: allDays,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDays(this.props.language);
        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.employeeIdFromParent !== this.props.employeeIdFromParent !== -1) {
            let employeeId = this.props.employeeIdFromParent;
            let date = event.target.value;
            let res = await getScheduleEmployeeByDate(employeeId, date);
            console.log('check res schedule from react: ', res)
        }
    }

    render() {

        let { allDays } = this.state;

        return (

            <div className="employee-schedule-container">
                <div className="all-schedule">
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option
                                        value={item.value}
                                        key={index}
                                    >
                                        {item.label}
                                    </option>
                                )
                            }

                            )
                        }
                    </select>

                </div>
                <div className="all-available-time">

                </div>
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSchedule);
