import React, { useState, useEffect } from 'react';

import RandomCharContent from './RandomCharContent';
import Spinner from '../../resources/spinner/Spinner';
import ErrorMesage from '../../resources/errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const { loading, error, getCharacter, clearError } = useMarvelService();

    const [char, setChar] = useState({});

    const errorMessage = error ? <ErrorMesage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading) ? <RandomCharContent char={char} /> : null;

    const updateChar = () => {
        clearError();
        
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        getCharacter(id)
            .then(response => {
                setChar(response);
            });
    };

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="randomchar">

            {errorMessage}
            {spinner}
            {content}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    );
};

export default RandomChar;