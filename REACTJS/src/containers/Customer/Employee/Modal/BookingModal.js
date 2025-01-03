import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileEmployee from '../ProfileEmployee';
import _ from 'lodash';


class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        let { isOpenModal, closeBookingClose, dateTime } = this.props;
        let employeeId = '';
        if (dateTime && !_.isEmpty(dateTime)) {
            employeeId = dateTime.employeeId;
        }
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size="lg"
                centered
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">Thông tin đặt lịch bảo dưỡng</span>
                        <span className="right" onClick={closeBookingClose}>
                            <i class="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="booking-modal-body">
                        <div className="employee-infor">
                            <ProfileEmployee
                                employeeId={employeeId}
                                isShowDescriptionEmployee={false}
                                dataTime={dateTime}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>Họ tên</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>Số điện thoại</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>Email</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>Địa chỉ liên hệ</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>Lý do bảo dưỡng</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>Đặt cho ai</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>Giới tính</label>
                                <input className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button className="btn-booking-comfirm"
                            onClick={closeBookingClose}
                        >Xác nhận</button>
                        <button className="btn-booking-cancel"
                            onClick={closeBookingClose}
                        >Hủy</button>
                    </div>
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
