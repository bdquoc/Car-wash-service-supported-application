import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/image.png';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from '../../store/actions/appActions';

class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)

    }
    render() {
        let language = this.props.language;
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
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
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
                                <div className="icon-child"><i className="fas fa-cart-plus"></i></div>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
