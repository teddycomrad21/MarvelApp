import React, { useState, useEffect } from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../../resources/spinner/Spinner';

const marvelService = new MarvelService();

const CharList = ({ onCharSelected }) => {
    const [characterBundle, setCharacterBundle] = useState();
    const [loading, setLoading] = useState(true);
    const spinner = loading ? <Spinner /> : null;

    const createCharacter = (char) => {
        const {name, thumbnail, id} = char;

        return (
            <li
                className="char__item"
                key={id}
                onClick={() => onCharSelected(id)}
            >
                <img src={thumbnail} alt="abyss"/>
                <div className="char__name">{name}</div>
            </li>
        );
    };

    useEffect(() => {
        marvelService.getAllCharacters()
        .then(response => {
            setCharacterBundle(response)
            setLoading(false)
        })
        .catch(error => console.log(error));
    }, []);

    return (
        <div className="char__list">
            <ul className="char__grid" style={loading ? {display: 'block'} : {display: 'grid'}}>

                {spinner}

                {characterBundle?.map(char => createCharacter(char))}

            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    );
}

export default CharList;