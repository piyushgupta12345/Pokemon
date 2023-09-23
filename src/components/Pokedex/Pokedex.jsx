import React from 'react'
import Search from '../Search/Search'
import PokedexList from '../PokedexList/PokedexList'


// import CSS
import './Pokedex.css'

function Pokedex() {
  return (
    <div className='pokedex-wrapper'>
      <h1 id='pokedex-heading'>Pokedex</h1>
      <Search/>
      <PokedexList/>
    </div>
  )
}

export default Pokedex
