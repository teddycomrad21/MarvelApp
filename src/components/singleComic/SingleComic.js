import React, { useState, useEffect } from 'react';

import Spinner from '../../resources/spinner/Spinner';
import ErrorMessage from '../../resources/errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './singleComic.scss';

const SingleComic = ({ toggleAndShowComic, comicId }) => {
    const { loading, error, getComic } = useMarvelService();

    const [comic, setComic] = useState({});

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    const { name, description, pageCount, price, language, thumbnail } = comic;

    useEffect(() => {
        getComic(comicId)
            .then(response => setComic(response));
    }, []);
    

    return (
        <div className={`single-comic ${loading ? 'loading' : null}`}>
            
            {spinner}
            {errorMessage}

            {!spinner && !errorMessage && (
                <>
                    <img src={thumbnail} alt="x-men" className="single-comic__img"/>

                    <div className="single-comic__info">
                        <h2 className="single-comic__name">{name}</h2>
                        <p className="single-comic__descr">{description}</p>
                        <p className="single-comic__descr">{pageCount}</p>
                        <p className="single-comic__descr">Language: {language}</p>
                        <div className="single-comic__price">{price}</div>
                    </div>

                    <a href="#" className="single-comic__back" onClick={toggleAndShowComic}>Back to all</a>
                </>
            )}
        </div>
    );
};

export default SingleComic;