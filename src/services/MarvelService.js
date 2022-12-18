import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
    const { loading, request, error, clearError, process, setProcess } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=1408e9cec58e0e3697de40fa4fa88ace';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const response = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);

        return response.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const response = await request(`${_apiBase}characters/${id}?${_apiKey}`);

        return _transformCharacter(response.data.results[0]);
    };

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);

        return res.data.results.map(_transformComics);
    };

    const getComic = async (id) => {
        const response = await request(`${_apiBase}comics/${id}?${_apiKey}`);

        return _transformComics(response.data.results[0]);
    };

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            name: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        };
    };

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        };
    };

    return {
        loading,
        error,
        clearError,
        process,
        setProcess,
        getAllCharacters,
        getCharacter,
        getAllComics,
        getComic
    };
}

export default useMarvelService;