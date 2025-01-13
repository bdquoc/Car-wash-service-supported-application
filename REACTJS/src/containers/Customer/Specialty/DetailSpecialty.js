import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import EmployeeSchedule from '../Employee/EmployeeSchedule';
import EmployeeExtraInfor from '../Employee/EmployeeExtraInfor';
import ProfileEmployee from '../Employee/ProfileEmployee';
import { getAllDetailSpecialtyById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';


class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrEmployeeId: [],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getAllDetailSpecialtyById({
                id: id,
                location: 'ALL'
            });

            let resProvince = await getAllCodeService('PROVINCE');

            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                let arrEmployeeId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.employeeSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrEmployeeId.push(item.employeeId)
                        })
                    }
                }

                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createAt: null,
                        keyMap: 'ALL',
                        type: "PROVINCE",
                        valueEn: "ALL",
                        valueVi: "Toàn quốc",
                    })
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrEmployeeId: arrEmployeeId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;

            let res = await getAllDetailSpecialtyById({
                id: id,
                location: location
            });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrEmployeeId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.employeeSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrEmployeeId.push(item.employeeId)
                        })
                    }
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrEmployeeId: arrEmployeeId,
                })
            }
        }
    }

    render() {
        let { arrEmployeeId, dataDetailSpecialty, listProvince } = this.state;
        let { language } = this.props;
        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                            &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}>
                            </div>
                        }
                    </div>
                    <div className="search-sp-employee">
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })
                            }
                        </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
