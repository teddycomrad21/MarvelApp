import React, { useState, useEffect } from 'react';

import RandomCharContent from './RandomCharContent';
import { setContent } from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';

import { createUseStyles } from 'react-jss';

import styles from './randomChar.styles';
import mjolnir from '../../resources/img/mjolnir.png';

const useStyles = createUseStyles(styles);

const RandomChar = () => {
    const classes = useStyles();
    const { getCharacter, clearError, process, setProcess } = useMarvelService();
    const [char, setChar] = useState({});

    const updateChar = () => {
        clearError();
        
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        getCharacter(id)
            .then(response => {
                setChar(response);
            })
            .then(() => setProcess('confirmed'))
            .catch(error => console.log(error));
    };

    useEffect(() => {
        updateChar();
    }, []);

    return (
        <div className={classes.randomChar}>

            {setContent(process, RandomCharContent, char)}

            <div className={classes.static}>
                <p className={classes.title}>
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className={classes.title}>
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className={classes.decoration}/>
            </div>
        </div>
    );
};

export default RandomChar;