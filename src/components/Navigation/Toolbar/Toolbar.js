import React from 'react';
import classes from './Toolbar.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = ( props ) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.slideDrawerDisplay}/>

        {/*<div className={classes.DesktopOnly}>*/}
        {/*    <Logo height="80%"*/}
        {/*          marginBottom="0px"*/}

        {/*    />*/}
        {/*</div>*/}

        <Logo height="80%"
            marginBottom="0px"
        />

        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;