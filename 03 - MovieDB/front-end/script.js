const movieList = document.querySelector('.movie-list')
var pageNumber = document.querySelector('.page-number')
var searchInput = document.querySelector('.search-input')
var currentPage = document.querySelector('.currentPage')
const nav = document.querySelector('.page-nav')
var page = 1


async function getMovies(pg) {
    const movies = await fetch(`http://localhost:3000/page${pg}`)
    const data = await movies.json()
    return data.results
}

async function makeHTML(pg) {
    var cont = 0
    const movies = await getMovies(pg)
    currentPage.innerHTML = `${pg}`
    movies.forEach((movie) => {
        movieList.innerHTML +=
            `
        <div class="movie-elements">
            <img class="film-poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}'s poster">
            <div class="movie-text">
                <div>
                    <h1 class="review">${movie.vote_average}</h1>
                </div>
                <div class="movie-info">
                    <h1 class="movie-title">${movie.title}</h1>
                    <h2>Original title: ${movie.original_title}</h2>
                    <p>Release date: ${movie.release_date}</p
                    <p>Language: ${movie.original_language}</p>
                    <p>Overview: ${movie.overview}</p>
                </div>
            </div>
        </div>
        `
        const review = document.getElementsByClassName('review')[cont].style
        if (movie.vote_average >= 7) {
            review.setProperty('background-color', 'darkgreen')
        } else if (movie.vote_average >= 5) {
            review.setProperty('background-color', 'orange')
        } else {
            review.setProperty('background-color', 'red')
        }
        cont++
    })
}

function disappear(element) {
    element.style.setProperty('display', 'none')
}

async function getSearch(search) {
    const movies = await fetch(`http://localhost:3000/search=${search}`)
    const data = await movies.json()
    return data.results
}

async function doSearch({ key }) {
    if (key === 'Enter') {
        var cont = 0
        search = searchInput.value
        const searchList = await getSearch(searchInput.value)
        disappear(nav)
        movieList.innerHTML = ""
        searchList.forEach((movie) => {
            movieList.innerHTML += `
            <div class="movie-elements">
                <img class="film-poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}'s poster">
                <div class="movie-text">
                    <div>
                        <h1 class="review">${movie.vote_average}</h1>
                    </div>
                    <div class="movie-info">
                        <h1 class="movie-title">${movie.title}</h1>
                        <h2>Original title: ${movie.original_title}</h2>
                        <p>Release date: ${movie.release_date}</p
                        <p>Language: ${movie.original_language}</p>
                        <p>Overview: ${movie.overview}</p>
                    </div>
                </div>
            </div>
        `
            const review = document.getElementsByClassName('review')[cont].style
            if (movie.vote_average >= 7) {
                review.setProperty('background-color', 'darkgreen')
            } else if (movie.vote_average >= 5) {
                review.setProperty('background-color', 'orange')
            } else {
                review.setProperty('background-color', 'red')
            }
            cont++
        })
    }
}

function nextPage() {
    if (page < 500) {
        movieList.innerHTML = ""
        page++
        makeHTML(page)
    }
}

function previousPage() {
    if (page > 1) {
        movieList.innerHTML = ""
        page--
        makeHTML(page)
    }
}

function getPage({ key }) {
    if (key === "Enter") {
        page = pageNumber.value
        movieList.innerHTML = ""
        makeHTML(page)
    }
}

makeHTML(page)