const apiKey = '1b1b60c0';

/**
 * Fetches movie details from OMDB API by IMDb ID.
 * @param {string} imdbID - IMDb ID of the movie.
 * @returns {Promise<object|null>} - Movie details if found, otherwise null.
 */
async function getMovieDetailsById(imdbID) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
    const data = await response.json();
    return data.Response === 'True' ? data : null;
}

/**
 * Displays movie details on the webpage.
 * @param {object} movie - Movie details object.
 */
function displayMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById('movieDetails');
    movieDetailsContainer.innerHTML = `
    <div class="card mb-2" style="background-color: #ffffff; border: 1px solid #dee2e6; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
        <div class="card-body" style="padding: 20px;">
            <h5 class="card-title" style="font-size: 24px; font-weight: bold; color: #343a40;">${movie.Title}</h5>
            <img src="${movie.Poster}" class="card-img-top mx-auto d-block" alt="${movie.Title}" style="border-top-left-radius: 5px; border-top-right-radius: 5px; width: 200px;">
            <p style="font-size: 16px; color: #6c757d; margin-bottom: 10px;">${movie.Plot}</p>
            <p style="font-size: 16px; color: #6c757d; margin-bottom: 10px;"><strong>Year:</strong> ${movie.Year}</p>
            <p style="font-size: 16px; color: #6c757d; margin-bottom: 10px;"><strong>Director:</strong> ${movie.Director}</p>
            <p style="font-size: 16px; color: #6c757d; margin-bottom: 10px;"><strong>Genre:</strong> ${movie.Genre}</p>
            <p style="font-size: 16px; color: #6c757d; margin-bottom: 10px;"><strong>Runtime:</strong> ${movie.Runtime}</p>
            <p style="font-size: 16px; color: #6c757d; margin-bottom: 10px;"><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
            <!-- Add other movie details here -->
        </div>
    </div>
`;
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const imdbID = urlParams.get('id');

    if (imdbID) {
        getMovieDetailsById(imdbID)
            .then(movie => {
                if (movie) {
                    displayMovieDetails(movie);
                } else {
                    const movieDetailsContainer = document.getElementById('movieDetails');
                    movieDetailsContainer.innerHTML = '<p>Movie details not found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                const movieDetailsContainer = document.getElementById('movieDetails');
                movieDetailsContainer.innerHTML = '<p>Error fetching movie details.</p>';
            });
    }
});
