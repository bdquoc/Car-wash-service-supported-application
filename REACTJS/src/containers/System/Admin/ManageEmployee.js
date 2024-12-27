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
import { getDetailInforEmployee, saveDetailEmployee } from '../../../services/userService';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Markdown
            contentMarkdown: '',
            contentHTML: '',
            selectedEmployee: '',
            description: '',
            listEmployees: [],
            hasOldData: false,

            //Employee-Infor
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameFacility: '',
            addressFacility: '',
            note: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllEmployees();
        this.props.getAllRequiredEmployeeInfor();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}` ;
                    let labelEn = `${item.firstName} ${item.lastName}` ;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            }

            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} VNĐ` ;
                    let labelEn = `${item.valueEn} VNĐ` ;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }

            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}` ;
                    let labelEn = `${item.valueEn}` ;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allEmployees !== this.props.allEmployees) {
            let dataSelect = this.buildDataInputSelect(this.props.allEmployees, 'USERS');
            this.setState({
                listEmployees: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allEmployees, 'USERS');
            let { resPayment, resPrice, resProvince } = this.props.allRequiredEmployeeInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            
            this.setState({
                listEmployees: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }

        if (prevProps.allRequiredEmployeeInfor !== this.props.allRequiredEmployeeInfor) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredEmployeeInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');

            
            console.log('data new: ', dataSelectPayment, dataSelectPrice, dataSelectProvince)
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
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
        // console.log("Payload:", {
        //     contentHTML,
        //     contentMarkdown,
        //     description,
        //     employeeId: selectedEmployee ? selectedEmployee.value : null,
        // });

        let { hasOldData } = this.state;
        this.props.saveDetailEmployee({
            contentHTML,
            contentMarkdown,
            description,
            id: selectedEmployee.value,
            action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            addressFacility: this.state.addressFacility,
            nameFacility: this.state.nameFacility,
            note: this.state.note,
        });
    }

    handleChangeSelect = async (selectedEmployee) => {
        this.setState({ selectedEmployee });

        let res = await getDetailInforEmployee(selectedEmployee.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
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
        // console.log('check res: ', res)
    };

    handleChangeSelectEmployeeInfor =async (selectedEmployee, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedEmployee;
        this.setState(
            ...stateCopy
        );
    }

    handleOnChangeText = (event, id) => {
       let stateCopy = { ...this.state };
       stateCopy[id] = event.target.value;
       this.setState({
            ...stateCopy
       })
    }


    render() {

        let { hasOldData } = this.props;
        
        return (
            <div className='manage-employee-container'>
                <div className='manage-employee-title'>
                    <FormattedMessage id="admin.manage-employee.title" />
                </div>

                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-employee.select-employee" /></label>
                        <Select
                            value={this.state.selectedEmployee}
                            onChange={this.handleChangeSelect}
                            options={this.state.listEmployees}
                            placeholder={<FormattedMessage id="admin.manage-employee.select-employee" />}
                        />
                    </div>

                    <div className='content-right form-group'>
                        <label><FormattedMessage id="admin.manage-employee.intro" /></label>
                        <textarea
                            className='form-control' 
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}>
                        </textarea>
                    </div>
                </div>
                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-employee.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectEmployeeInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-employee.price" />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-employee.payment" /> </label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectEmployeeInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-employee.payment" />}
                            name="selectedPayment"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-employee.province" /> </label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectEmployeeInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-employee.province" />}  
                            name="selectedProvince"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-employee.nameFacility" /></label>
                        <input className="form-control" 
                            onChange={(event) => this.handleOnChangeText(event, 'nameFacility')}
                            value={this.state.nameFacility}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-employee.addressFacility" /></label>
                        <input className="form-control" 
                            onChange={(event) => this.handleOnChangeText(event, 'addressFacility')}
                            value={this.state.addressFacility}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-employee.note" /></label>
                        <input className="form-control" 
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
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
                    className={hasOldData === true ? 'save-content-employee' : 'create-content-employee'} >
                    {hasOldData === true ?
                        <span><FormattedMessage id="admin.manage-employee.save" /></span>
                        :
                        <span><FormattedMessage id="admin.manage-employee.add" /></span>
                    }
                </button>
            </div>
        );


    }


}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allEmployees: state.admin.allEmployees,
        allRequiredEmployeeInfor: state.admin.allRequiredEmployeeInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllEmployees: () => dispatch(actions.fetchAllEmployees()),
        getAllRequiredEmployeeInfor: () => dispatch(actions.getRequiredEmployeeInfor()),
        saveDetailEmployee: (data) => dispatch(actions.saveDetailEmployee(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageEmployee);