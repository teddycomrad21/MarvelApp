import React, { useState, useEffect } from 'react';

import SingleComic from '../singleComic/SingleComic';
import Spinner from '../../resources/spinner/Spinner';
import ErrorMessage from '../../resources/errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {
    const { loading, error, getAllComics } = useMarvelService();

    const [comicsList, setComicsList] = useState([]);
    const [comicId, setComicId] = useState();
    const [showComic, setShowComic] = useState(false);
    const [offset, setOffset] = useState(0);
    const [newComicsLoading, setnewComicsLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    useEffect(() => {
        getAllComics(offset)
            .then(response => setComicsList(response));
    }, []);

    const toggleAndShowComic = (id) => {
        setComicId(id);
        setShowComic(showComic => !showComic)
    };

    const loadMoreComics = (offset) => {
        setnewComicsLoading(true);
        setOffset(offset = offset + 8);

        getAllComics(offset)
            .then(response => {
                if (response.length < 8) {
                    setComicsEnded(true);
                }

                setComicsList((prevState) => ([
                    ...prevState, ...response
                ]));
                setnewComicsLoading(false);
            });
    };

    const createComics = (comics, index) => {
        const { id, name, price, thumbnail } = comics;

        return (
            <li key={index} className="comics__item" onClick={() => toggleAndShowComic(id)}>
                <a href="#">
                    <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                    <div className="comics__item-name">{name}</div>
                    <div className="comics__item-price">{price}</div>
                </a>
            </li>
        );
    };

    return (
        <>
            {spinner}
            {errorMessage}

            {!showComic ? (
                <div className="comics__list">
                    <ul className="comics__grid">
                        
                        {comicsList.map((element, index) => {
                            return createComics(element, index);
                        })}

                    </ul>
                    {!comicsEnded && (
                        <button
                            className="button button__main button__long"
                            disabled={newComicsLoading}
                            onClick={() => loadMoreComics(offset)}
                        >
                            <div className="inner">load more</div>
                        </button>
                    )}
                </div>
            ) : <SingleComic toggleAndShowComic={toggleAndShowComic} comicId={comicId} />}
        </>
    );
};

export default ComicsList;