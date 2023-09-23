import React, { useEffect, useState } from 'react'
import "./PokedexList.css"
import axios from 'axios';

import Pokemon from '../Pokemon/Pokemon'

function PokedexList() {

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [pokedexUrl,setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon");

    const[nextUrl,setNextUrl] = useState('');
    const[prevUrl,setPrevUrl] = useState('');


    async function downloadPokemon() {
        setIsLoading(true);
        const response = await axios.get(pokedexUrl); // this downloads list of 20 pokemon

        const PokemonResults = response.data.results; // we get the array of pokemons from results
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
        // console.log(PokemonResults)

        // iterating over the array of pokemons, and using their url, to create an array of promises that will download those 20 pokemons
        const PokemonResultPromise = PokemonResults.map((pokemon) => axios.get(pokemon.url));
        // console.log(PokemonResultPromise)

        // passing that promise array to axios.all
        const PokemonData = await axios.all(PokemonResultPromise);
        // console.log(PokemonData)

        // now iterate on the data of each pokemon, and extract id, name, image, types
        const pokeListResults = PokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types
            }
        })
        console.log(pokeListResults)
        setPokemonList(pokeListResults)
        setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemon();
    }, [pokedexUrl])


    return (
        <>
            <div className='pokemon-list-wrapper'>
                <div className='pokemon-wrapper'>
                    {(isLoading) ? 'Loading...' :
                        pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)}
                </div>
                <div className='controls'>
                    <button disabled={prevUrl==null} onClick={()=> setPokedexUrl(prevUrl)}>Prev</button>
                    <button disabled={nextUrl==null} onClick={()=> setPokedexUrl(nextUrl)}>Next</button>
                </div>
            </div>
        </>
    )
}

export default PokedexList
