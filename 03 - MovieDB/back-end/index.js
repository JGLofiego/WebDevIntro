const express = require('express');
const cors = require('cors');
const app = express();
var PORT = 3000
const fetch = require('cross-fetch');

app.use(cors())

app.get('/', (req, res) => {
    res.end()
})

app.get('/page:pg', async(req, res) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${req.params.pg}`
    )
    const data = await response.json()
    res.json(data)
})

app.get('/search=:search', async(req, res) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${req.params.search}`
    )
    const data = await response.json()
    res.json(data)
})

app.listen(3000, () => {
    console.log(`listening on port ${PORT}`);
});