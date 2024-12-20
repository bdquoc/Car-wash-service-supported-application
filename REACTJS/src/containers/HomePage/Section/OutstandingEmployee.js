import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

class OutstandingEmployee extends Component {

    render() {
        return (
            <div className="section-share section-outstanding-employee">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Nhân viên nổi bật</span>
                        <button className="btn-section">xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>  
                            <div className="section-customize">
                                <div className="customize-border">
                                    <div className="outer-bg">
                                            <div className="bg-image section-outstanding-employee" />
                                    </div>
                                    <div className="position text-center">
                                        <div>Tên nhân viên 1</div>
                                        <div>Vị trí</div>
                                    </div>
                                </div>
                            </div>                      
                            <div className="section-customize">
                                <div className="customize-border">
                                    <div className="outer-bg">
                                            <div className="bg-image section-outstanding-employee" />
                                    </div>
                                    <div className="position text-center">
                                        <div>Tên nhân viên 2</div>
                                        <div>Vị trí</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="customize-border">
                                    <div className="outer-bg">
                                        <div className="bg-image section-outstanding-employee" />
                                    </div>
                                    <div className="position text-center">
                                        <div>Tên nhân viên 3</div>
                                        <div>Vị trí</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="customize-border">
                                    <div className="outer-bg">
                                        <div className="bg-image section-outstanding-employee" />
                                    </div>
                                    <div className="position text-center">
                                        <div>Tên nhân viên 4</div>
                                        <div>Vị trí</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="customize-border">
                                    <div className="outer-bg">
                                        <div className="bg-image section-outstanding-employee" />
                                    </div>
                                    <div className="position text-center">
                                        <div>Tên nhân viên 5</div>
                                        <div>Vị trí</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="customize-border">
                                    <div className="outer-bg">
                                        <div className="bg-image section-outstanding-employee" />
                                    </div>
                                    <div className="position text-center">
                                        <div>Tên nhân viên 6</div>
                                        <div>Vị trí</div>
                                    </div>
                                </div>
                            </div>
                        </Slider> 
                    </div>
                      
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingEmployee);
