import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/image.png';
import { FormattedMessage } from 'react-intl';

class HomeHeader extends Component {

    render() {
        console.log('check props: ', this.props)
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i class="fas fa-bars"></i>
                            <img className="header-logo" src={logo} />
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.service" /></b></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.product" /></b></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.facility" /></b></div>
                            </div>
                            <div className="child-content">
                                <div><b>Blog</b></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support"><i className="fas fa-question-circle"></i><FormattedMessage id="homeheader.support" /> </div>
                            <div className="language-vi">VN</div>
                            <div className="language-en">EN</div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title1"><FormattedMessage id="banner.title1"></FormattedMessage></div>
                        <div className="title2"><b><FormattedMessage id="banner.title2"></FormattedMessage></b></div>
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Tìm dịch vụ, thợ rửa xe" />
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-car"></i></div>
                                <div className="text-child"><FormattedMessage id="banner.detail"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i class="fas fa-cart-plus"></i></div>
                                <div className="text-child"><FormattedMessage id="banner.product"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-cogs"></i></div>
                                <div className="text-child"><FormattedMessage id="banner.brake"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-wrench"></i></div>
                                <div className="text-child"><FormattedMessage id="banner.tires"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fab fa-searchengin"></i></div>
                                <div className="text-child"><FormattedMessage id="banner.engine"></FormattedMessage></div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
