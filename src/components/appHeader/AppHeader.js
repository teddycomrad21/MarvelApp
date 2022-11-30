import { Link, NavLink } from 'react-router-dom';

import { createUseStyles } from 'react-jss';
import './appHeader.scss';

const useStyles = createUseStyles({
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,

        '& span': {
            color: '#9F0013'
        }
    },
    menu: {
        '& ul': {
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            fintSize: 24,

            '& li': {
                margin: [0, 8],

                '&:hover': {
                    color: '#9F0013'
                }
            }
        }
    }
});

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