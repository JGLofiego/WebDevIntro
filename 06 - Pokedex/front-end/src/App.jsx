import react from "react";
import { useState, useEffect } from "react";
import { MakeCards } from "./Components/MakeCards";
import logo from "./logo.svg";
import searchBtn from "./searchBtn.svg";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pg, setPg] = useState(1);
  const [url, setUrl] = useState(`?offset=0&limit=${pg * 18}`);
  const [visible, setVisible] = useState("seeMore-btn");

  const getPokemons = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${url}`);
    const data = await response.json();
    var arrUrl = [];
    if (data.results == undefined) {
      return [`https://pokeapi.co/api/v2/pokemon/${url}`];
    }
    data.results.forEach((pokemon) => {
      arrUrl.push(pokemon.url);
    });
    return arrUrl;
  };

  if (url == "") {
    setUrl("?offset=0&limit=18");
    setVisible("seeMore-btn");
  }

  const changeUrl = (value) => {
    setUrl(value);
  };

  useEffect(() => {
    console.log(pg);
    getPokemons().then((data) => {
      setPokemons(data);
    });
  }, [url, pg]);

  return (
    <div className="main">
      <header>
        <button
          onClick={(e) => {
            changeUrl("?offset=0&limit=18");
            setVisible("seeMore-btn");
          }}
        >
          <img src={logo} className="logo" alt="logo da Pokedex" />
        </button>
        <div className="input-container">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                changeUrl(document.getElementsByClassName("search-bar")[0].value.toLowerCase());
                setVisible("none");
              }
            }}
            type="text"
            className="search-bar"
            placeholder="Pesquisar Pokémon"
          />
          <button
            onClick={(e) => {
              changeUrl(document.getElementsByClassName("search-bar")[0].value.toLowerCase());
              setVisible("none");
            }}
            className="search-btn"
          >
            <img src={searchBtn} alt="Ícone de pesquisar" />
          </button>
        </div>
      </header>
      <main>
        <h1>Pokédex</h1>
        <div className="pokemon-list">
          {pokemons.map((pokemon, index) => (
            <MakeCards key={index} url={pokemon} />
          ))}
        </div>
        <button
          onClick={(e) => {
            setPg((pg) => setPg(pg + 1));
            setUrl(`?offset=0&limit=${pg * 18}`);
          }}
          className={visible}
        >
          Veja mais
        </button>
      </main>
      <footer>Com 💛 Info Jr UFBA 2022</footer>
    </div>
  );
}

export default App;
