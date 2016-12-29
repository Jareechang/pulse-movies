import 'whatwg-fetch';

import sampleData from './sample';

const API_KEY = process.env.MOVIE_API_KEY;
const API_ROOT = 'https://api.themoviedb.org/3/movie';

const getUrlById = movieId => (
  `${API_ROOT}/${movieId}?api_key=${API_KEY}&language=en-US`
)

export function fetchMovieDetails(movieId) {
  const requestUrl = getUrlById(movieId);

  if (sampleData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(sampleData)
      }, 1500)
    })
  }

  fetch(requestUrl)
    .then(response => response.json())
    .then(json => {
      console.log(JSON.stringify(json));
    })
}

