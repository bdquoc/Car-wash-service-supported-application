import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import EmployeeSchedule from '../Employee/EmployeeSchedule';
import EmployeeExtraInfor from '../Employee/EmployeeExtraInfor';
import ProfileEmployee from '../Employee/ProfileEmployee';


class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrEmployeeId: [26, 27, 28, 29]
        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        let { arrEmployeeId } = this.state;
        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body">
                    <div className="description-specialty">

                    </div>
                    {arrEmployeeId && arrEmployeeId.length > 0 &&
                        arrEmployeeId.map((item, index) => {
                            return (
                                <div className="each-employee" key={index}>
                                    <div className="dt-content-left">
                                        <div className="profile-employee">
                                            <ProfileEmployee
                                                employeeId={item}
                                                isShowDescriptionEmployee={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="employee-schedule">
                                            <EmployeeSchedule
                                                employeeIdFromParent={item}
                                            />
                                        </div>
                                        <div className="employee-extra-infor">
                                            <EmployeeExtraInfor
                                                employeeIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })

                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
