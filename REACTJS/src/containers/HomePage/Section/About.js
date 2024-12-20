import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';



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

class About extends Component {
    
    render() {

        return (
            <div className="section-share section-about">
                <div className='section-about-header'>
                    Về tài liệu tham khảo
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="80%" height="400" 
                        src="https://www.youtube.com/embed/ONnlXF4mpIg?list=PLncHg6Kn2JT4C0enPGQPK7ZIlEoZ1ZvRy" title="#0 GIỚI THIỆU KHÓA HỌC REACT - DEMO SẢN PHẨM ĐẠT ĐƯỢC KHI KẾT THÚC KHÓA HỌC | React.JS Siêu Căn Bản" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            Tài liệu tham khảo kiến thức về React 
                        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
