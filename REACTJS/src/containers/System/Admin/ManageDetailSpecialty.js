import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDetailSpecialty.scss';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { saveDetailSpecialtyService } from '../../../services/userService';

const mdParser = new MarkdownIt();

class ManageDetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            descriptionMarkdown: '',
            descriptionHTML: '',
            selectedSpecialty: '',
            name: '',
            image: '',
            listSpecialties: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllSpecialty();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allSpecialties !== this.props.allSpecialties) {
            console.log("All specialty: ", this.props.allSpecialties);
            let dataSelect = this.buildDataInputSelect(this.props.allSpecialties);
            this.setState({
                listSpecialties: dataSelect
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

    handleSaveSpecialty = () => {
        const { descriptionHTML, descriptionMarkdown, name, image, selectedSpecialty } = this.state;

        if (!selectedSpecialty || !selectedSpecialty.value) {
            console.error("Specialty is not selected");
            return;
        }

        if (!descriptionHTML || !descriptionMarkdown || !name) {
            console.error("Required fields are missing");
            return;
        }

        this.props.saveDetailSpecialty({
            id: selectedSpecialty.value,
            name,
            image,
            descriptionHTML: descriptionHTML,
            descriptionMarkdown: descriptionMarkdown,
        });
    };

    handleChangeSelect = (selectedSpecialty) => {
        this.setState({ selectedSpecialty });

        let specialty = this.props.allSpecialties.find(s => s.id === selectedSpecialty.value);

        if (specialty) {
            this.setState({
                descriptionMarkdown: specialty.descriptionMarkdown || '',
                descriptionHTML: specialty.descriptionHTML || '',
                name: specialty.name || '',
                image: specialty.image || '',
            });
        } else {
            this.setState({
                descriptionMarkdown: '',
                descriptionHTML: '',
                name: '',
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
            <div className='manage-specialty-container'>
                <div className='manage-specialty-title'>
                    <FormattedMessage id="admin.manage-specialty.title" />
                </div>

                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-specialty.select-specialty" /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelect}
                            options={this.state.listSpecialties}
                            placeholder={<FormattedMessage id="admin.manage-specialty.select-specialty" />}
                        />
                    </div>

                    <div className='content-right form-group'>
                        <label><FormattedMessage id="admin.manage-specialty.name" /></label>
                        <input
                            className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'name')}
                            value={this.state.name}
                        />
                    </div>
                </div>

                <div className='row'>

                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="admin.manage-specialty.image" /></label>
                        <input
                            className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'image')}
                            value={this.state.image}
                        />
                    </div>
                </div>

                <div className='manage-specialty-editor'>
                    <MdEditor
                        style={{ height: "300px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.descriptionMarkdown}
                    />
                </div>

                <button
                    onClick={this.handleSaveSpecialty}
                    className='save-specialty-button'>
                    <FormattedMessage id="admin.manage-specialty.save" />
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("Redux State allSpecialties: ", state.admin.allSpecialties);
    return {
        language: state.app.language,
        allSpecialties: state.admin.allSpecialties,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
        saveDetailSpecialty: (data) => dispatch(actions.saveDetailSpecialty(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDetailSpecialty);
