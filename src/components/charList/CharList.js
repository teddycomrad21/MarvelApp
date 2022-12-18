import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { setSpinnerAndError } from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = ({ onCharSelected, charId }) => {
    const { getAllCharacters, process, setProcess } = useMarvelService();

    const [characterBundle, setCharacterBundle] = useState([]);
    const [offset, setOffset] = useState(210);
    const [characterEnded, setCharacterEnded] = useState(false);
    const [newCharsLoading, setNewCharsLoading] = useState(false);

    useEffect(() => {
        onRequest(true);
        // eslint-disable-next-line
    }, []);

    const onRequest = (initial) => {
        initial ? setNewCharsLoading(false) : setNewCharsLoading(true);

        getAllCharacters()
            .then(response => {
                setCharacterBundle(response)
            })
            .then(() => setProcess('confirmed'));
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
            })
            .then(() => setProcess('confirmed'));
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

            {setSpinnerAndError(process)}

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