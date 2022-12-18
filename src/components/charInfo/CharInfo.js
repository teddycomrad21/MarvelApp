import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import CharInfoContent from './CharInfoContent';
import { setContent } from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';

const CharInfo = (props) => {
    const { getCharacter, clearError, process, setProcess } = useMarvelService();
    
    const [char, setChar] = useState(null);

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line
    }, [props.charId])

    const updateChar = () => {
        const { charId } = props;

        if (!charId) return;

        clearError();

        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    };

    return (
        <div className="char__info">
            {setContent(process, CharInfoContent, char)}
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