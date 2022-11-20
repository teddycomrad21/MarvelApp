import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import MarvelService from '../../services/MarvelService';

import decoration from '../../resources/img/vision.png';

const App = () => {
    
    const marvelService = new MarvelService();

    marvelService.getAllCharacters().then(response => console.log(response));

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList/>
                    <CharInfo/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    );
}

export default App;