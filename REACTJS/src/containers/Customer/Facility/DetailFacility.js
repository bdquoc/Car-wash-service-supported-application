import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailFacility.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import EmployeeSchedule from '../Employee/EmployeeSchedule';
import EmployeeExtraInfor from '../Employee/EmployeeExtraInfor';
import ProfileEmployee from '../Employee/ProfileEmployee';
import { getAllDetailFacilityById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';


class DetailFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrEmployeeId: [],
            dataDetailFacility: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getAllDetailFacilityById({
                id: id,
            });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrEmployeeId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.employeeFacility;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrEmployeeId.push(item.employeeId)
                        })
                    }
                }

                this.setState({
                    dataDetailFacility: res.data,
                    arrEmployeeId: arrEmployeeId,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }


    render() {
        let { arrEmployeeId, dataDetailFacility } = this.state;
        let { language } = this.props;
        return (
            <div className="detail-facility-container">
                <HomeHeader />
                <div className="detail-facility-body">
                    <div className="description-facility">
                        {dataDetailFacility && !_.isEmpty(dataDetailFacility)
                            &&
                            <>
                                <h5><b>{dataDetailFacility.name}</b></h5>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailFacility.descriptionHTML }}>
                                </div>
                            </>

                        }
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
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailFacility);
