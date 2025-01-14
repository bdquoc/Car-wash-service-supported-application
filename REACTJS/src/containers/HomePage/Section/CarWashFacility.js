import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CarWashFacility.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { getAllFacility } from "../../../services/userService";
import { withRouter } from 'react-router';

class CarWashFacility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataFacilities: []
        }
    }

    async componentDidMount() {
        let res = await getAllFacility();
        if (res && res.errCode === 0) {
            this.setState({
                dataFacilities: res.data ? res.data : []
            })
        }
    }

    handleViewDetailFacility = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-facility/${item.id}`)
        }
    }

    render() {
        let { dataFacilities } = this.state;

        return (
            <div className="section-share section-car-wash-facilities">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            Cơ sở nổi bật
                        </span>
                        <button className="btn-section">
                            <FormattedMessage id="homepage.more-infor" />
                        </button>
                    </div>

                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataFacilities && dataFacilities.length > 0 &&
                                dataFacilities.map((item, index) => {
                                    return (
                                        <div
                                            className="section-customize facility-child"
                                            key={index}
                                            onClick={() => this.handleViewDetailFacility(item)}
                                        >
                                            <div
                                                className="bg-image section-car-wash-facilities"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className="facility-name">{item.name}</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CarWashFacility));
