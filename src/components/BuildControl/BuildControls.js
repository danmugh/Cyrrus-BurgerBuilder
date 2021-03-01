import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },

];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {/*<p>Current price: <strong>{props.price}</strong></p>*/}

        {controls.map(
            control => (
                <BuildControl
                    key={control.label}
                    added={() => props.ingredientAdded(control.type)}
                    removed={() => props.ingredientRemove(control.type)}
                    label={control.label}
                    disabledInfo={props.disabled[control.type]}
                />
            )
        )}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}
        >{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
);

export default buildControls;