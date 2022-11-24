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
                <a href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className={classes.menu}>
                <ul>
                    <li><a href="#">Characters</a></li>
                    /
                    <li><a href="#">Comics</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;