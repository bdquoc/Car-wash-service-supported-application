import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDetailFacility.scss';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { saveDetailEmployeeService } from '../../../services/userService';

const mdParser = new MarkdownIt();

class ManageDetailFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            descriptionMarkdown: '',
            descriptionHTML: '',
            selectedFacility: '',
            name: '',
            address: '',
            image: '',
            listFacilities: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllFacility();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allFacilities !== this.props.allFacilities) {
            console.log("All facilities: ", this.props.allFacilities);
            let dataSelect = this.buildDataInputSelect(this.props.allFacilities);
            this.setState({
                listFacilities: dataSelect
            });
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item) => {
                let object = {
                    label: item.name,
                    value: item.id,
                };
                result.push(object);
            });
        }
        console.log("Data for Select: ", result);
        return result;
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        });
    };

    handleSaveFacility = () => {
        const { descriptionHTML, descriptionMarkdown, name, address, image, selectedFacility } = this.state;

        if (!selectedFacility || !selectedFacility.value) {
            console.error("Facility is not selected");
            return;
        }

        if (!descriptionHTML || !descriptionMarkdown || !name || !address) {
            console.error("Required fields are missing");
            return;
        }

        this.props.saveDetailFacility({
            id: selectedFacility.value,
            name,
            address,
            image,
            descriptionHTML: descriptionHTML,
            descriptionMarkdown: descriptionMarkdown,
        });
    };

    handleChangeSelect = (selectedFacility) => {
        this.setState({ selectedFacility });

        let facility = this.props.allFacilities.find(f => f.id === selectedFacility.value);

        if (facility) {
            this.setState({
                descriptionMarkdown: facility.descriptionMarkdown || '',
                descriptionHTML: facility.descriptionHTML || '',
                name: facility.name || '',
                address: facility.address || '',
                image: facility.image || '',
            });
        } else {
            this.setState({
                descriptionMarkdown: '',
                descriptionHTML: '',
                name: '',
                address: '',
                image: '',
            });
        }
    };

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState(stateCopy);
    };

    render() {
        console.log('check state: ', this.state)
        return (
            <div className='manage-facility-container'>
                <div className='manage-facility-title'>
                    <FormattedMessage id="admin.manage-facility.title" />
                </div>

                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-facility.select-facility" /></label>
                        <Select
                            value={this.state.selectedFacility}
                            onChange={this.handleChangeSelect}
                            options={this.state.listFacilities}
                            placeholder={<FormattedMessage id="admin.manage-facility.select-facility" />}
                        />
                    </div>

                    <div className='content-right form-group'>
                        <label><FormattedMessage id="admin.manage-facility.name" /></label>
                        <input
                            className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'name')}
                            value={this.state.name}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="admin.manage-facility.address" /></label>
                        <input
                            className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'address')}
                            value={this.state.address}
                        />
                    </div>

                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="admin.manage-facility.image" /></label>
                        <input
                            className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'image')}
                            value={this.state.image}
                        />
                    </div>
                </div>

                <div className='manage-facility-editor'>
                    <MdEditor
                        style={{ height: "300px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.descriptionMarkdown}
                    />
                </div>

                <button
                    onClick={this.handleSaveFacility}
                    className='save-facility-button'>
                    <FormattedMessage id="admin.manage-facility.save" />
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("Redux State allFacilities: ", state.admin.allFacilities);
    return {
        language: state.app.language,
        allFacilities: state.admin.allFacilities,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllFacility: () => dispatch(actions.fetchAllFacility()),
        saveDetailFacility: (data) => dispatch(actions.saveDetailFacility(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDetailFacility);
