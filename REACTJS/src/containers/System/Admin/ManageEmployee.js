import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageEmployee.scss';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforEmployee } from '../../../services/userService';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedEmployee: '',
            description: '',
            listEmployees: [],
            hasOldData: false,
        }
    }

    componentDidMount() {
        this.props.fetchAllEmployees();
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allEmployees !== this.props.allEmployees) {
            let dataSelect = this.buildDataInputSelect(this.props.allEmployees);
            this.setState({
                listEmployees: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allEmployees);
            this.setState({
                listEmployees: dataSelect
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    }

    handleSaveContentMarkdown = () => {
        const { contentHTML, contentMarkdown, description, selectedEmployee } = this.state;

        if (!selectedEmployee || !selectedEmployee.value) {
            console.error("Employee is not selected");
            return;
        }

        if (!contentHTML || !contentMarkdown) {
            console.error("Content is missing");
            return;
        }
        console.log("Payload:", {
            contentHTML,
            contentMarkdown,
            description,
            employeeId: selectedEmployee ? selectedEmployee.value : null,
        });

        let { hasOldData } = this.state;
        this.props.saveDetailEmployee({
            contentHTML,
            contentMarkdown,
            description,
            id: selectedEmployee.value,
            actions: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        });
    }

    handleChangeSelect =async (selectedEmployee) => {
        this.setState({ selectedEmployee });

        let res =  await getDetailInforEmployee(selectedEmployee.value);
        if( res && res.errCode ===0 && res.data && res.data.Markdown){
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
            })
        }
        console.log('check res: ', res)
    };

    handleOnChangeDesc = (event) => {
        this.setState({ description: event.target.value });
    }


    render() {
        let { hasOldData} = this.props;
        return (
            <div className='manage-employee-container'>
                <div className='manage-employee-title'>
                    Tạo thêm thông tin employee
                </div>

                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label>Chọn nhân viên</label>
                        <Select
                            value={this.state.selectedEmployee}
                            onChange={this.handleChangeSelect}
                            options={this.state.listEmployees}
                        />
                    </div>

                    <div className='content-right form-group'>
                        <label>Thông tin giới thiệu</label>
                        <textarea
                            className='form-control' rows="4"
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}>
                            Thêm thông tin
                        </textarea>
                    </div>
                </div>

                <div className='manage-employee-editor'>
                    <MdEditor
                        style={{ height: "500px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>

                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className= {hasOldData === true ? 'save-content-employee' : 'create-content-employee' } >
                    {hasOldData === true ? 
                        <span>Lưu thông tin</span> : <span>Tạo thông tin</span>
                    }
                </button>
            </div>
        );


    }


}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allEmployees: state.admin.allEmployees
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllEmployees: () => dispatch(actions.fetchAllEmployees()),
        saveDetailEmployee: (data) => dispatch(actions.saveDetailEmployee(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageEmployee);