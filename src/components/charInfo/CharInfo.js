import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import CharInfoContent from './CharInfoContent';
import Spinner from '../../resources/spinner/Spinner';
import ErrorMesage from '../../resources/errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';

const CharInfo = ({ charId }) => {
    const marvelService = new MarvelService();
    
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMesage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading || !char) ? <CharInfoContent char={char} /> : null;

    const updateChar = () => {
        if (!charId) return;

        setLoading(true);

        marvelService
            .getCharacter(charId)
            .then((response => {
                setChar(response);
                setLoading(false);
            }))
            .catch(error => setError(error));
    }

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line
    }, [charId]);

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
};

CharInfo.propTypes = {
    charId: PropTypes.number
};

CharInfo.defaultProps = {
    charId: null
};

export default CharInfo;