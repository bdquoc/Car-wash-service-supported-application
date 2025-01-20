import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import ManageEmployee from '../containers/System/Admin/ManageEmployee';
import ManageSpecialty from '../containers/Customer/Specialty/ManageSpecialty';
import ManageFacility from '../containers/System/Facility/ManageFacility';
import ManageDetailFacility from '../containers/System/Admin/ManageDetailFacility';
import ManageDetailSpecialty from '../containers/System/Admin/ManageDetailSpecialty';

class System extends Component {
    render() {

        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-employee" component={ManageEmployee} />
                            <Route path="/system/manage-specialty" component={ManageSpecialty} />
                            <Route path="/system/manage-facility" component={ManageFacility} />
                            <Route path="/system/manage-detail-facility" component={ManageDetailFacility} />
                            <Route path="/system/manage-detail-specialty" component={ManageDetailSpecialty} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(System);
