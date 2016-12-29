import React from 'react';

const IMG_ROOT_URL = 'https://image.tmdb.org/t/p/w500';

const GenreBlock = ({ name }) => (
  <p style={{ 'display': 'inline-block', 'paddingLeft': '10px' }}>
    {name}
  </p>
)

const MovieDetails = (props) => {

  const {
    poster_path : imagePath,
    release_date: releaseDate,
    vote_average: voteAverage,
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
      <div className='container'>
        <div className='col-md-6'>
          <img src={imageUrl} />
        </div>
        <div className='col-md-6'>
          <p> Title: {title} </p>
          <p> Released : {releaseDate} </p>
          <p> {overview} </p>
          <p> rating: {voteAverage}</p>
          <div>
            {
              props.genres &&
              props.genres.map(genre => <GenreBlock key={genre.id} {...genre} />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails;
