import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../../resources/spinner/Spinner';
import ErrorMessage from '../../resources/errorMessage/ErrorMessage';

const CharList = ({ onCharSelected, charId }) => {
    const { loading, error, getAllCharacters } = useMarvelService();

    const [characterBundle, setCharacterBundle] = useState([]);
    const [offset, setOffset] = useState(210);
    const [characterEnded, setCharacterEnded] = useState(false);
    const [newCharsLoading, setNewCharsLoading] = useState(false);
    
    const spinner = loading && !newCharsLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    useEffect(() => {
        onRequest(true);
        // eslint-disable-next-line
    }, []);

    const onRequest = (initial) => {
        initial ? setNewCharsLoading(false) : setNewCharsLoading(true);

        getAllCharacters()
            .then(response => {
                setCharacterBundle(response)
            });
    };

    const loadMoreCharacters = (offset) => {
        setNewCharsLoading(true);
        setOffset(offset = offset + 9);

        getAllCharacters(offset)
            .then(response => {
                if (response.length < 9) {
                    setCharacterEnded(true);
                }

                setCharacterBundle((prevState) => ([
                    ...prevState, ...response
                ]));
                setNewCharsLoading(false);
            });
    };

    const createCharacter = (char) => {
        const { name, thumbnail, id } = char;

        return (
            <li
                className={`${"char__item"} ${charId === id ? "active" : ''}`}
                key={id}
                onClick={() => onCharSelected(id)}
            >
                <img src={thumbnail} alt={name}/>
                <div className="char__name">{name}</div>
            </li>
        );
    };

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            <ul className="char__grid">

                {characterBundle?.map(char => createCharacter(char))}

            </ul>
            {!characterEnded && (
                <button
                    onClick={() => loadMoreCharacters(offset)}
                    disabled={newCharsLoading}
                    className="button button__main button__long"
                >
                    <div className="inner">load more</div>
                </button>
            )}
        </div>
    );
};

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
    charId: PropTypes.number
};

CharList.defaultProps = {
    charId: null
};

export default CharList;