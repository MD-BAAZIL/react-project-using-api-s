import React, { useState } from "react";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [joke, setJoke] = useState(null)

  const fetchPokemon = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
      if (!response.ok)
        throw new Error(`This ${pokemon} pokemon name not found brooooo... Try other name.`);
      const result = await response.json();
      setData(result);
      setError("");
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  const fetchJoke = async () => {
    try{
      const res = await fetch('https://official-joke-api.appspot.com/random_joke');
      const joke = await res.json();
      setJoke(joke);
      setError("");
      if(!res.ok){
        throw new Error("failed to load joke");
      }
    }
    catch (er) {
      setError(er.message);
      setJoke({});
    }
  }

  return (
    <div className="App">
      <h1>Pokemon Finder and generate random jokes Tool By MD BAAZIL</h1>
      <input
        type="text"
        value={pokemon}
        onChange={(e) => setPokemon(e.target.value)}
        placeholder="Search Pokemon name here"
      />
      <button onClick={fetchPokemon}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div>
          <h2>{data.name.toUpperCase()}</h2>
          <img src={data.sprites.front_default} alt={data.name} />
          <p>Height: {data.height}</p>
          <p>Weight: {data.weight}</p>
          <p>Types: {data.types.map((t) => t.type.name).join(", ")}</p>
        </div>
      )}
      <div>
        <button onClick={fetchJoke}>Click to generate random jokes</button>
        {joke && ( <div>
        <h3>joke type :<strong>{joke.type} </strong></h3>
        <h3>joke  setup :<strong>{joke.setup}</strong></h3>
        <h3>joke punch line : <strong>{joke.punchline}</strong></h3>
        </div> )
        }
      </div>
    </div>
    
  );
}

export default App;
