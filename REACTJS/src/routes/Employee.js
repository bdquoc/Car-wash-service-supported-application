import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageSchedule from '../containers/System/Employee/ManageSchedule';
import Header from '../containers/Header/Header';

class Employee extends Component {
    render() {

        const {  isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {this.props.isLoggedIn && <Header />}
                <div className="Employee-container">
                    <div className="Employee-list">
                        <Switch>
                            <Route path="/employee/manage-schedule" component={ManageSchedule} />
                            
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );

    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
