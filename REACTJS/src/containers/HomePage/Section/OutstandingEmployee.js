import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

class OutstandingEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrEmployees: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topEmployeesRedux !== this.props.topEmployeesRedux) {
            this.setState({
                arrEmployees: this.props.topEmployeesRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctor();
    }

    render() {
        let arrEmployees = this.state.arrEmployees;
        let { language } = this.props;
        arrEmployees = arrEmployees.concat(arrEmployees).concat(arrEmployees);

        return (
            <div className="section-share section-outstanding-employee">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Nhân viên nổi bật</span>
                        <button className="btn-section">xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {arrEmployees && arrEmployees.length > 0
                                && arrEmployees.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi} ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`;
                                    return (
                                        <div className="section-customize" key={index}>
                                            <div className="customize-border">
                                                <div className="outer-bg">
                                                    <div className="bg-image section-outstanding-employee"
                                                        style={{ backgroundImage: `url(${imageBase64})` }}

                                                    />
                                                </div>
                                                <div className="position text-center">
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>Nhân vien</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topEmployeesRedux: state.admin.topEmployees
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopEmployees())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingEmployee);
