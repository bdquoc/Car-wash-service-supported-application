import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

class Service1 extends Component {

    render() {
        return (
            <div className="section-share section-service1">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Dịch vụ bảo dưỡng</span>
                        <button className="btn-section">xem thêm</button>
                    </div>

                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="specialty-customize">
                                <div className="bg-image section-service1" />
                                <div>Bảo dưỡng ô tô 1</div>
                            </div>
                            <div className="specialty-customize">
                                <div className="bg-image section-service1" />    
                                <div>Bảo dưỡng ô tô 2</div>
                            </div>
                            <div className="specialty-customize">
                                <div className="bg-image section-service1" />
                                <div>Bảo dưỡng ô tô 3</div>
                            </div>
                            <div className="specialty-customize">
                                <div className="bg-image section-service1" />
                                <div>Bảo dưỡng ô tô 4</div>
                            </div>
                            <div className="specialty-customize">
                                <div className="bg-image section-service1" />
                                <div>Bảo dưỡng ô tô 5</div>
                            </div>
                            <div className="specialty-customize">
                                <div className="bg-image section-service1" />
                                <div>Bảo dưỡng ô tô 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Service1);
