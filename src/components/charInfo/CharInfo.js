import { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../../resources/spinner/Spinner';
import ErrorMesage from '../../resources/errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    const hasComics = comics.length !== 0;
    const availableComics = comics.slice(0, 10);

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="char__descr">
                {description}
            </div>

            <div className="char__comics">Comics:</div>

            <ul className="char__comics-list">
                {hasComics ? (
                    availableComics.map((item, index) => {
                        return (
                            <li className="char__comics-item" key={index}>
                                {item.name}
                            </li>
                        );
                    })
                )  : <p>There is no available comics.</p>}
            </ul>
        </>
    );
}

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }
 
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }

        // Uncomment below line to throw error
        // this.foo.bar = 1;
    }

    updateChar = () => {
        const { charId } = this.props;

        if (!charId) return;

        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        });
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    render() {
        const { char, loading, error } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton />;
        const errorMessage = error ? <ErrorMesage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(error || loading || !char) ? <View char={char} /> : null;

        return (
            <div className="char__info">
               {skeleton}
               {errorMessage}
               {spinner}
               {content}
            </div>
        );
    }
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

CharInfo.defaultProps = {
    charId: null
}

export default CharInfo;