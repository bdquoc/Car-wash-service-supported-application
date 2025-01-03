import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EmployeeExtraInfor.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getExtraInforEmployeeById } from '../../../services/userService';
import NumberFormat from 'react-number-format';

class EmployeeExtraInfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language != prevProps.language) {
            //call api
        }

        if (this.props.employeeIdFromParent !== prevProps.employeeIdFromParent) {
            let res = await getExtraInforEmployeeById(this.props.employeeIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props;


        return (
            <div className="employee-extra-infor-container">
                <div className="content-up">
                    <div className="text-address">
                        <FormattedMessage id="customer.extra-infor-employee.text-address" />
                    </div>
                    <div className="name-facility">
                        {extraInfor && extraInfor.nameFacility ? extraInfor.nameFacility : ''}
                    </div>
                    <div className="detail-address">
                        {extraInfor && extraInfor.addressFacility ? extraInfor.addressFacility : ''}
                    </div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false &&
                        <div className="short-infor">
                            <FormattedMessage id="customer.extra-infor-employee.price" />
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                &&
                                <NumberFormat
                                    className="currency"
                                    value={extraInfor.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                            }

                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                &&
                                <NumberFormat
                                    className="currency"
                                    value={extraInfor.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                            }
                            <span className="detail" onClick={() => this.showHideDetailInfor(true)}>
                                <FormattedMessage id="customer.extra-infor-employee.detail" />
                            </span>
                        </div>
                    }

                    {isShowDetailInfor === true &&
                        <>
                            <div className="title-price">
                                <FormattedMessage id="customer.extra-infor-employee.price" />
                            </div>
                            <div className="detail-infor">
                                <div className="price">
                                    <span className="left">
                                        <FormattedMessage id="customer.extra-infor-employee.price" />
                                    </span>
                                    <span className="right">
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                            &&
                                            <NumberFormat
                                                className="currency"
                                                value={extraInfor.priceTypeData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        }
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                            &&
                                            <NumberFormat
                                                className="currency"
                                                value={extraInfor.priceTypeData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                            />
                                        }
                                    </span>
                                </div>
                                <div className="note">
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>

                            <div className="payment">
                                <FormattedMessage id="customer.extra-infor-employee.payment" />

                                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI
                                    ? extraInfor.paymentTypeData.valueVi : ''}
                                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN
                                    ? extraInfor.paymentTypeData.valueEn : ''}
                            </div>
                            <div className="hide-price">
                                <span onClick={() => this.showHideDetailInfor(false)}>
                                    <FormattedMessage id="customer.extra-infor-employee.hide-price" />
                                </span>
                            </div>
                        </>
                    }
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeExtraInfor);