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
                    Về thông tin/tips bảo dưỡng xe
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="80%" height="400"
                            src="https://www.youtube.com/embed/4ZWm3ZNX6XA" title="Hướng dẫn tự kiểm tra &amp; bảo dưỡng nhỏ xe ô tô cũ tại nhà, ai cũng làm được" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            Video hướng dẫn cách bảo dưỡng xe ô tô của bạn tại nhà
                        </p>
                        <p>
                            Một số tips bảo dưỡng xe ô tô cần thiết mà bạn cần biết 
                            <a target='_blank' href="https://toyotasure.vn/quy-trinh-bao-duong-xe-o-to-dung-cach-an-toan/"> Tại Đây 
                            </a>
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
