import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { createUseStyles } from 'react-jss';

import styles from './appHeader.styles';

const useStyles = createUseStyles(styles);

const AppHeader = () => {
    const classes = useStyles();

    return (
        <header className={classes.header}>
            <h1 className={classes.title}>
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className={classes.menu}>
                <ul>
                    <li>
                        <NavLink
                            end
                            to="/"
                            style={({ isActive }) => ({color: isActive ? '#9f0013' : 'inherit'})}
                        >
                            Characters
                        </NavLink></li>
                    /
                    <li>
                        <NavLink
                            end
                            to="/comics"
                            style={({ isActive }) => ({color: isActive ? '#9f0013' : 'inherit'})}
                        >
                            Comics
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;