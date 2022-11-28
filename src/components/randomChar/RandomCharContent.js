import React from 'react';
import PropTypes from 'prop-types';

const RandomCharContent = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;

    return (
        <div className="randomchar__block">
            <img
                src={thumbnail}
                alt="Random character"
                className="randomchar__img"
                style={!thumbnail ? {objectFit: 'cover'} : {objectFit: 'contain'}}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {!description && 'There is no desription for the current character.'}
                    {description.length > 211 ? description.slice(0, 212) + '...' : description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

RandomCharContent.propTypes = {
    charId: PropTypes.object
};

RandomCharContent.defaultProps = {
    charId: {}
};

export default RandomCharContent;