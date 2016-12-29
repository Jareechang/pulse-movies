import React from 'react';

import movieDetailStyles from './styles/movieDetail.css';

const IMG_ROOT_URL = 'https://image.tmdb.org/t/p/w500';

const GenreBlock = ({ name }) => (
  <p style={{ 'display': 'inline-block', 'paddingLeft': '10px' }}>
    {name}
  </p>
)

const Button = (props) => (
  <button onClick={props.clickAction} className={`btn btn-secondary ${props.styles}`}>
    Back
  </button>
);

const TextSection = ({ text, display }) => (
  <div className={movieDetailStyles.section}>
    <p className={movieDetailStyles.title}>
      {display}
    </p>
    <p>{text} </p>
  </div>
)

const MovieDetails = (props) => {

  const {
    poster_path : imagePath,
    release_date: releaseDate,
    vote_average: rating,
    title,
    overview
  } = props;

  const imageUrl = `${IMG_ROOT_URL}/${imagePath || ''}`;

  if (!props.id) {
    return (
      <div className='text-center'>
        <img src={require('../images/loading.gif')} />
      </div>
    );
  }

  return (
    <div className='row'>
      <div className={`container ${movieDetailStyles.container}`}>
        <div className='col-md-6'>
          <img src={imageUrl} />
        </div>
        <div className='col-md-6'>
          <div className={movieDetailStyles.inner}>
            <TextSection display={'Title'} text={title} />
            <TextSection display={'Release date'} text={releaseDate} />
            <TextSection display={'Overview'} text={overview} />
            <TextSection display={'Rating'} text={overview} />
            <div>
              {
                props.genres &&
                props.genres.map(genre => <GenreBlock key={genre.id} {...genre} />)
              }
            </div>
            <Button clickAction={props.back} styles={movieDetailStyles.button}>
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails;
