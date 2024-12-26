import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailEmployee.scss';
import { getDetailInforEmployee } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import EmployeeSchedule from './EmployeeSchedule';


class DetailEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailEmployee: {},
            currentEmployeeId: -1,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentEmployeeId: id
            })
            let res = await getDetailInforEmployee(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailEmployee: res.data,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {

        let { language } = this.props;
        let { detailEmployee } = this.state;
        let nameVi = '', nameEn = '';
        if (detailEmployee && detailEmployee.positionData) {
            nameVi = `${detailEmployee.positionData.valueVi}, ${detailEmployee.lastName} ${detailEmployee.firstName}`;
            nameEn = `${detailEmployee.positionData.valueEn}, ${detailEmployee.firstName} ${detailEmployee.lastName}`;

        }
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className="employee-detail-container">
                    <div className="intro-employee">
                        <div
                            className="content-left"
                            style={{ backgroundImage: `url(${detailEmployee && detailEmployee.image ? detailEmployee.image : ''})` }}
                        >

                        </div>
                        <div className="content-right">
                            <div className="up">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className="down">
                                {detailEmployee && detailEmployee.Markdown
                                    && detailEmployee.Markdown.description
                                    &&
                                    <span>
                                        {detailEmployee.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="schedule-employee">
                        <div className="content-left">
                            <EmployeeSchedule
                                employeeIdFromParent={this.state.currentEmployeeId}
                            />
                        </div>
                        <div className="content-right">

                        </div>
                    </div>
                    <div className="detail-infor-employee">
                        {detailEmployee && detailEmployee.Markdown && detailEmployee.Markdown.contentHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: detailEmployee.Markdown.contentHTML }}>

                            </div>
                        }
                    </div>
                    <div className="comment-employee">

                    </div>
                </div>

            </>
        );

    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailEmployee);
