import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageCustomer.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllCustomerForEmployee, postSendRemedy } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';


class ManageCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataCustomer: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }

    async componentDidMount() {

        this.getDataCustomer()
    }

    getDataCustomer = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        let res = await getAllCustomerForEmployee({
            employeeId: user.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataCustomer: res.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataCustomer()
        })
    }

    handleBtnConfirm = (item) => {
        console.log('check item: ', item)
        let data = {
            employeeId: item.employeeId,
            customerId: item.customerId,
            email: item.customerData.email,
            timeType: item.timeType,
            customerName: item.customerData.firstName
        }

        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })

        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            employeeId: dataModal.employeeId,
            customerId: dataModal.customerId,
            timeType: dataModal.timeType,
            language: this.props.language,
            customerName: dataModal.customerName
        });

        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send Remedy succeeds: ');
            this.closeRemedyModal();
            await this.getDataCustomer();
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Somthing wrongs...');
            console.log('Error send remedy: ', res)
        }
    }
    render() {
        let { dataCustomer, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;
        console.log('check', dataCustomer)
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className="manage-customer-container">
                        <div className="m-c-title">
                            Quản lý khách hàng đặt lịch bảo dưỡng
                        </div>
                        <div className="manage-customer-body row">
                            <div className="col-4 form-group">
                                <label>Chọn ngày bảo dưỡng</label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className="col-12 table-manage-customer">
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Họ và tên</th>
                                            <th>Địa chỉ</th>
                                            <th>Giới tính</th>
                                            <th>Actions</th>
                                        </tr>
                                        {dataCustomer && dataCustomer.length > 0 ?
                                            dataCustomer.map((item, index) => {
                                                let time = language === LANGUAGES.VI ?
                                                    item.timeTypeDataCustomer.valueVi : item.timeTypeDataCustomer.valueEn;
                                                let gender = language === LANGUAGES.VI ?
                                                    item.customerData.genderData.valueVi : item.customerData.genderData.valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.timeTypeDataCustomer.valueVi}</td>
                                                        <td>{item.customerData.firstName}</td>
                                                        <td>{item.customerData.address}</td>
                                                        <td>{item.customerData.genderData.valueVi}</td>
                                                        <td>
                                                            <button className="mc-btn-confirm"
                                                                onClick={() => this.handleBtnConfirm(item)}>
                                                                Xác nhận
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan="6" style={{ textAlign: "center" }}>no data</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCustomer);
