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

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
           contentMarkdown: '',
           contentHTML: '',
           selectedEmployee: '',
           description: '',
        }
    }

    componentDidMount() {
       
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    handleEditorChange = ({ html, text }) =>{
        this.state = {
            contentMarkdown: text,
            contentHTML: html,
         }
    }

    handleSaveContentMarkdown = () => {
        console.log('check state: ', this.state)
    }

    handleChange = (selectedEmployee) => {
        this.setState({ selectedEmployee });
    };

    handleOnChangeDesc = (event) => {
        this.setState({ description: event.target.value });
    }


    render() {
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
                            onChange={this.handleChange}
                            options={options}
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
                        onChange={ this.handleEditorChange}
                    />
                </div>

                <button 
                onClick={() => this.handleSaveContentMarkdown()}
                className='save-content-employee'>
                    Lưu thông tin
                </button>
            </div>
        );


    }


}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageEmployee);