import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=1408e9cec58e0e3697de40fa4fa88ace';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const respose = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);

        return respose.data.results.map(_transformCharacter)
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

        return _transformCharacter(res.data.results[0]);
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
        getAllCharacters,
        getCharacter
    };
}

export default useMarvelService;