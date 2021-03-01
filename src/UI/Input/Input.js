import React from 'react';
import classes from './Input.css';
import option from "eslint-plugin-jsx-a11y/lib/util/implicitRoles/option";


const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched ) {
        inputClasses.push(classes.Invalid)
    }

    switch ( props.elementType ) {
        case ( 'input' ) :
            inputElement = <input
                onChange={props.changed}
                className={inputClasses.join(' ')}
                { ...props.elementConfiguration }
                value={ props.value } />
            break;
        case ( 'textarea' ) :
            inputElement = <textarea
                onChange={props.changed}
                className={inputClasses.join(' ')}
                { ...props.elementConfiguration }
                value={ props.value } />
            break;
        case ( 'select' ) :
            inputElement = (
                <select
                    onChange={props.changed}
                    className={inputClasses.join(' ')}
                    value={ props.value } >
                    {props.elementConfiguration.options.map(option => (
                        <option key={option.value} value={option.value}>
                            { option.displayValue }
                        </option>
                    ))}
                </select> )
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                { ...props.elementConfiguration }
                value={ props.value } />
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError} >Please enter a valid { props.valueType }</p>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{ props.label }</label>
            { inputElement }
            { validationError }
        </div>
    )
}

export default input;