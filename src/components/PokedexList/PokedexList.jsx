import React, { useEffect, useState } from 'react'
import "./PokedexList.css"
import axios from 'axios';

import Pokemon from '../Pokemon/Pokemon'

function PokedexList() {

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const Pokedex_Url = "https://pokeapi.co/api/v2/pokemon";


    async function downloadPokemon() {
        const response = await axios.get(Pokedex_Url); // this downloads list of 20 pokemon

        const PokemonResults = response.data.results; // we get the array of pokemons from results
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
    }, [])


    return (
        <>
            <div className='pokemon-list-wrapper'>
                Pokemon List
                {(isLoading) ? 'Loading...' :
                    pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)}
            </div>
        </>
    )
}

export default PokedexList
