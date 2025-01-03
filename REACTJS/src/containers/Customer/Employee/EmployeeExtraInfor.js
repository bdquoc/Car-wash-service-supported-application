import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EmployeeExtraInfor.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getScheduleEmployeeByDate } from '../../../services/userService';

class EmployeeExtraInfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language != prevProps.language) {
            //call api
        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor } = this.state;

        return (
            <div className="employee-extra-infor-container">
                <div className="content-up">
                    <div className="text-address">ĐỊA CHỈ BẢO DƯỠNG</div>
                    <div className="name-facility">Dịch vụ rửa xe Bảo Minh</div>
                    <div className="detail-address">202 Võ Văn Ngân - Linh Xuân - Thủ Đức - TP Hồ Chí Minh</div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false &&
                        <div className="short-infor">
                            GIÁ DỊCH VỤ: 250.000đ
                            <span onClick={() => this.showHideDetailInfor(true)}>
                                Xem chi tiết
                            </span>
                        </div>
                    }

                    {isShowDetailInfor === true &&
                        <>
                            <div className="title-price">GIÁ DỊCH VỤ:</div>
                            <div className="detail-infor">
                                <div className="price">
                                    <span className="left"> Giá dịch vụ</span>
                                    <span className="right">250.000đ</span>
                                </div>
                                <div className="note">
                                    Được ưu tiên giảm giá 10% khi đặt lịch qua BachoWash.com
                                </div>
                            </div>

                            <div className="payment">
                                Khách hàng có thể thanh toán chi phí bằng hình thức tiền mặt hoặc chuyển khoảnkhoản
                            </div>
                            <div className="hide-price">
                                <span onClick={() => this.showHideDetailInfor(false)}>
                                    Ẩn bảng giá
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