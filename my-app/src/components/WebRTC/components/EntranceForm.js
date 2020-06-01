import React, { Component } from 'react';
import './EntranceForm.scss';

class EntranceForm extends Component {

    get computedStyles() {
        return {
            entranceFormStyle: this.props.hidden ? "entrance-form entrance-form-hidden" : "entrance-form",
            buttonStyle:       this.props.hidden ? "button-close" : "button-open"
        }
    }

    inputDataChanged(event) {
        let key   = event.target.id;
        let value = event.target.value;
        this.props.onDataChanged({ [key]: value });
    }

    render() {
        return (
            <div className={ this.computedStyles.entranceFormStyle } title="Enter room">
                <input  id='host'        placeholder="host"             value={ this.props.host }           onChange={ this.inputDataChanged.bind(this) }/>
                <input  id='token'       placeholder="token"            value={ this.props.token }          onChange={ this.inputDataChanged.bind(this) }/>
                <input  id='resourceId'  placeholder="resourceId"       value={ this.props.resourceId }     onChange={ this.inputDataChanged.bind(this) }/>
                <input  id='displayName' placeholder="displayName"      value={ this.props.displayName }    onChange={ this.inputDataChanged.bind(this) }/>
                
                <button className={ this.computedStyles.buttonStyle }   onClick={ () => this.props.onToggle() }/>
            </div>
        );
    }
}

export default EntranceForm;