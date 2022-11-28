import React, { useState, useEffect } from 'react';

import RandomCharContent from './RandomCharContent';
import Spinner from '../../resources/spinner/Spinner';
import ErrorMesage from '../../resources/errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const marvelService = new MarvelService();

    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const errorMessage = error ? <ErrorMesage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading) ? <RandomCharContent char={char} /> : null;

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        setLoading(true);

        marvelService
            .getCharacter(id)
            .then(response => {
                setChar(response);
                setLoading(false);
            })
            .catch((error) => setError(error));
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