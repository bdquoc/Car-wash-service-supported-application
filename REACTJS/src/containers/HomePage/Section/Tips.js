import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

class Tips extends Component {
    
    render() {

        return (
            <div className="section-share section-tips">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Tips</span>
                        <button className="btn-section">xem thêm</button>
                    </div>

                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="bg-image section-tips" />
                                <div>Rửa xe ô tô 1</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-tips" />    
                                <div>Rửa xe ô tô 2</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-tips" />
                                <div>Rửa xe ô tô 3</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-tips" />
                                <div>Rửa xe ô tô 4</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-tips" />
                                <div>Rửa xe ô tô 5</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-tips" />
                                <div>Rửa xe ô tô 6</div>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tips);
