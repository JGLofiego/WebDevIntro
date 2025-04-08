import { useEffect, useState } from "react";

export function MakeCards({ url }) {
  const [pokemon, setPokemon] = useState();
  useEffect(() => {
    getSinglePokemon(url).then((data) => {
      setPokemon(data);
    });
  }, [url]);

  const getSinglePokemon = async (url) => {
    const response = await fetch(`${url}`);
    const data = await response.json();
    return data;
  };
  return (
    pokemon && (
      <div className={"div-" + pokemon.types[0].type.name + " bg"} key={pokemon.id}>
        <div className="name-types">
          <h3 className="pokemon-name">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
          <div className="types-container">
            {pokemon.types.map((type) => (
              <h4 key={"type: " + type.type.name} className={"type " + type.type.name}>
                {type.type.name.toUpperCase()}
              </h4>
            ))}
          </div>
        </div>

        <img className="pokemon-img" src={pokemon.sprites.front_default} alt={"Sprite do(a)" + pokemon.name} />
      </div>
    )
  );
}
