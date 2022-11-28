import React from 'react';
import PropTypes from 'prop-types';

const CharInfoContent = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    const hasComics = comics.length !== 0;
    const availableComics = comics.slice(0, 10);

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="char__descr">
                {description}
            </div>

            <div className="char__comics">Comics:</div>

            <ul className="char__comics-list">
                {hasComics ? (
                    availableComics.map((item, index) => {
                        return (
                            <li className="char__comics-item" key={index}>
                                {item.name}
                            </li>
                        );
                    })
                )  : <p>There is no available comics.</p>}
            </ul>
        </>
    );
};

CharInfoContent.propTypes = {
    charId: PropTypes.object
};

CharInfoContent.defaultProps = {
    charId: {}
};

export default CharInfoContent;