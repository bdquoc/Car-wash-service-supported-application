import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Register.scss';
import { handleRegisterApi } from '../../services/userService.js';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeInput = (event, field) => {
        this.setState({
            [field]: event.target.value
        });
    }

    handleRegister = async () => {
        this.setState({
            errMessage: ''
        });
        const { email, password, confirmPassword, firstName, lastName, address, phoneNumber, gender, roleId } = this.state;
        if (password !== confirmPassword) {
            this.setState({
                errMessage: 'Passwords do not match'
            });
            return;
        }
        try {
            let data = await handleRegisterApi({
                email,
                password,
                firstName,
                lastName,
                address,
                phoneNumber,
                gender: gender === '1' ? true : false,
                roleId
            });
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                });
            }
            if (data && data.errCode === 0) {
                console.log('Register succeeds');
                this.props.navigate('/login');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                this.setState({
                    errMessage: error.response.data.message
                });
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        });
    }

    render() {
        return (
            <div className="register-background">
                <div className="register-container">
                    <div className="register-content row">
                        <div className="col-12 text-register">Register</div>
                        <div className="col-12 form-group register-input">
                            <label>Email:</label>
                            <input type="email" className="form-control" placeholder="Enter your email"
                                value={this.state.email}
                                onChange={(event) => this.handleOnChangeInput(event, 'email')} />
                        </div>
                        <div className="col-6 form-group register-input">
                            <label>Password:</label>
                            <div className="custom-input-password">
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                    className="form-control" placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangeInput(event, 'password')} />
                                <span onClick={this.handleShowHidePassword}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-6 form-group register-input">
                            <label>Confirm Password:</label>
                            <input type="password" className="form-control" placeholder="Confirm your password"
                                value={this.state.confirmPassword}
                                onChange={(event) => this.handleOnChangeInput(event, 'confirmPassword')} />
                        </div>
                        <div className="col-6 form-group register-input">
                            <label>First Name:</label>
                            <input type="text" className="form-control" placeholder="Enter your first name"
                                value={this.state.firstName}
                                onChange={(event) => this.handleOnChangeInput(event, 'firstName')} />
                        </div>
                        <div className="col-6 form-group register-input">
                            <label>Last Name:</label>
                            <input type="text" className="form-control" placeholder="Enter your last name"
                                value={this.state.lastName}
                                onChange={(event) => this.handleOnChangeInput(event, 'lastName')} />
                        </div>
                        <div className="col-12 form-group register-input">
                            <label>Address:</label>
                            <input type="text" className="form-control" placeholder="Enter your address"
                                value={this.state.address}
                                onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                        </div>
                        <div className="col-6 form-group register-input">
                            <label>Phone Number:</label>
                            <input type="text" className="form-control" placeholder="Enter your phone number"
                                value={this.state.phoneNumber}
                                onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} />
                        </div>
                        <div className="col-6 form-group register-input">
                            <label>Gender:</label>
                            <select className="form-control"
                                value={this.state.gender}
                                onChange={(event) => this.handleOnChangeInput(event, 'gender')}>
                                <option value="">Select Gender</option>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button className="btn-register" onClick={this.handleRegister}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path))
    };
};

export default connect(null, mapDispatchToProps)(Register);
