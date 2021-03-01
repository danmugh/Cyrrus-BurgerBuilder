import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../../UI/Backdrop/Backdrop";
import Aux from '../../../hoc/Aux/Aux';


const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return(
        <Aux>
            <Backdrop
                show={props.open}
                removeBackdrop={props.closed}
            />
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <Logo height="10%"
                      marginBottom="32px"
                />
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>


                {/*style={{position: 'fixed'}}*/}
                <p className={classes.signature} >Made with <span>&#128153;</span> by Cyrrus-Labs</p>
            </div>

        </Aux>

    )
};

export default sideDrawer;