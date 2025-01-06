import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import './ForgotPassword.scss';
import { handleForgotPasswordApi } from '../../services/userService.js';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errMessage: '',
            successMessage: '',
        };
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    };

    handleForgotPassword = async () => {
        this.setState({
            errMessage: '',
            successMessage: '',
        });

        try {
            let data = await handleForgotPasswordApi(this.state.email);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                });
            }
            if (data && data.errCode === 0) {
                this.setState({
                    successMessage: 'A reset link has been sent to your email.'
                });
            }
        } catch (error) {
            if (error.response && error.response.data) {
                this.setState({
                    errMessage: error.response.data.message
                });
            }
        }
    };

    render() {
        return (
            <div className="forgot-password-background">
                <div className="forgot-password-container">
                    <div className="forgot-password-content row">
                        <div className="col-12 text-forgot-password">Reset Your Password</div>
                        <div className="col-12 form-group forgot-password-input">
                            <label>Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={this.state.email}
                                onChange={(event) => this.handleOnChangeEmail(event)}
                            />
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12' style={{ color: 'green' }}>
                            {this.state.successMessage}
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-submit"
                                onClick={() => this.handleForgotPassword()}>
                                Submit
                            </button>
                        </div>
                        <div className="col-12 back-to-login">
                            <span
                                onClick={() => this.props.navigate('/login')}>
                                Back to Login
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(null, mapDispatchToProps)(ForgotPassword);
