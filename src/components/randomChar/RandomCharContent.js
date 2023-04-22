import React from 'react';
import PropTypes from 'prop-types';

import { createUseStyles } from 'react-jss';

import styles from './randomChar.styles';

const useStyles = createUseStyles(styles);

const RandomCharContent = ({ data }) => {
    const classes = useStyles();
    const { name, description, thumbnail, homepage, wiki } = data;

    return (
        <div className={classes.block}>
            <img
                src={thumbnail}
                alt="Random character"
                className={classes.img}
                style={!thumbnail ? {objectFit: 'cover'} : {objectFit: 'contain'}}
            />
            <div className={classes.info}>
                <p className={classes.name}>{name}</p>
                <p className={classes.descr}>
                    {!description && 'There is no desription for the current character.'}
                    {description?.length > 211 ? description.slice(0, 212) + '...' : description}
                </p>
                <div className={classes.btns}>
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

RandomCharContent.propTypes = {
    data: PropTypes.object
};

RandomCharContent.defaultProps = {
    data: {}
};

export default RandomCharContent;