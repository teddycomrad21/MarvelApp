class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=1408e9cec58e0e3697de40fa4fa88ace';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacters = async () => {
        const respose = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);

        return respose.data.results.map(this._transfromCharacter)
    };

    getCharacter = async (id) => {
        const response = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);

        return this._transfromCharacter(response.data.results[0]);
    };

    _transfromCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        };
    }
}

export default MarvelService;