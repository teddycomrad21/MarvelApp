import React, { useState, useEffect } from 'react';

import { setSpinnerAndError } from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';

import './singleComic.scss';

const SingleComic = ({ toggleAndShowComic, comicId }) => {
    const { loading, error, getComic, process, setProcess } = useMarvelService();

    const [comic, setComic] = useState({});

    const { name, description, pageCount, price, language, thumbnail } = comic;

    useEffect(() => {
        getComic(comicId)
            .then(response => setComic(response))
            .then(() => setProcess('confirmed'));
    }, []);
    

    return (
        <div className={`single-comic ${loading ? 'loading' : null}`}>
            
            {setSpinnerAndError(process)}

            {!loading && !error && (
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