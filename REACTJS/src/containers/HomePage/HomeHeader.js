import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';

class HomeHeader extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i class="fas fa-bars"></i>
                            <div className="header-logo"></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div><b>Dịch vụ</b></div>
                            </div>
                            <div className="child-content">
                                <div><b>Sản phẩm</b></div>
                            </div>
                            <div className="child-content">
                                <div><b>Hệ thống</b></div>
                            </div>
                            <div className="child-content">
                                <div><b>Blog</b></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support"><i className="fas fa-question-circle"></i>Hỗ trợ</div>
                            <div className="flag">VN</div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title1">BOOKING CAR WASH SERVICE</div>
                        <div className="title2"><b>BẢO DƯỠNG CHĂM SÓC XE MỘT CÁCH TOÀN DIỆN</b></div>
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Tìm dịch vụ, thợ rửa xe" />
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-car"></i></div>
                                <div className="text-child">Detailing - Chăm sóc tại nhà</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i class="fas fa-cart-plus"></i></div>
                                <div className="text-child">Sản phẩm và phụ kiện </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-cogs"></i></div>
                                <div className="text-child">Bảo dưỡng phanh, thắng đĩa</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-wrench"></i></div>
                                <div className="text-child">Bảo dưỡng, thay lốp</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fab fa-searchengin"></i></div>
                                <div className="text-child">Bảo dưỡng khoang động cơ</div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
