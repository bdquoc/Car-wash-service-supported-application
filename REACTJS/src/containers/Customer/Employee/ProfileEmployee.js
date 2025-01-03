import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileEmployee.scss';
import { getProfileEmployeeById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';


class ProfileEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforEmployee(this.props.employeeId);
        this.setState({ dataProfile: data });
    }

    getInforEmployee = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileEmployeeById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        let { dataProfile } = this.state;
        let { language } = this.props;

        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className="profile-employee-container">
                <div className="info-employee">
                    <div
                        className="content-left"
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image})` }}>
                    </div>
                    <div className="content-right">
                        <div className="up">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="down">
                            {dataProfile && dataProfile.Markdown
                                && dataProfile.Markdown.description
                                &&
                                <span>
                                    {dataProfile.Markdown.description}
                                </span>

                            }
                        </div>
                    </div>
                </div>
                <div className="price">
                    Giá bảo dưỡng:
                    {dataProfile && dataProfile.Employee_Infor && language === LANGUAGES.VI &&
                        <NumberFormat
                            className="currency"
                            value={dataProfile.Employee_Infor.priceTypeData.valueVi}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                        />
                    }

                    {dataProfile && dataProfile.Employee_Infor && language === LANGUAGES.EN &&
                        <NumberFormat
                            className="currency"
                            value={dataProfile.Employee_Infor.priceTypeData.valueEn}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'$'}
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEmployee);
