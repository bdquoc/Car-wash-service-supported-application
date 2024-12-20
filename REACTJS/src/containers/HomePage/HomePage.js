import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import Service1 from './Section/CarWashFacility';
import OutstandingEmployee from './Section/OutstandingEmployee';
import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tips from './Section/Tips';

class HomePage extends Component {
    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <div>
                <HomeHeader />
                <Specialty settings={settings}/>
                <Service1 settings={settings}/>
                <OutstandingEmployee settings={settings} />
                <Tips settings={settings} />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
