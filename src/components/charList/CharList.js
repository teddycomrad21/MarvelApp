import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../../resources/spinner/Spinner';

const CharList = ({ onCharSelected, charId }) => {
    const marvelService = new MarvelService();

    const [characterBundle, setCharacterBundle] = useState([]);
    const [offset, setOffset] = useState(210);
    const [characterEnded, setCharacterEnded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newCharsLoading, setNewCharsLoading] = useState(false);
    
    const spinner = loading ? <Spinner /> : null;

    useEffect(() => {
        marvelService.getAllCharacters()
        .then(response => {
            setCharacterBundle(response)
            setLoading(false)
        })
        .catch(error => console.log(error));
        // eslint-disable-next-line
    }, []);

    const loadMoreCharacters = (offset) => {
        setNewCharsLoading(true);
        setOffset(offset = offset + 9);

        marvelService.getAllCharacters(offset)
        .then(response => {
            if (response.length < 9) {
                setCharacterEnded(true);
            }

            setCharacterBundle((prevState) => ([
                ...prevState, ...response
            ]));
            setLoading(false);
            setNewCharsLoading(false);
        })
        .catch(error => console.log(error));
    };

    const createCharacter = (char) => {
        const {name, thumbnail, id} = char;

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
            <ul className="char__grid" style={loading ? {display: 'block'} : {display: 'grid'}}>

                {spinner}

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