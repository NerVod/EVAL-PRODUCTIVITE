window.addEventListener('DOMContentLoaded', () => {
  /** @type {html element} variable to store the name of the HTML element
   * where pokemon name is loaded*/
  const pokeP = document.getElementById('pokeInfo')
  /** @type {string} name of the div placeholder where pokemon informations
   * are loaded*/
  const pokeDiv = document.getElementById('pokemon-info')
  /** @type {html element} name of the button to listen to, to create new
   * ability on user's click*/
  const pokeAbilityBtn = document.getElementById('ability')

  /**
   *Async function to find pokemon in pokeapi and insert text with the name 
   of a pokemon in HTML page if a pokemon is found
   *
   @param {number} pokedexNum get random number to get random pokemon in api
   @param {string} foundPokemon name of the pokemon
   @param {string} jsonPokemon  will be used to store pokemon informations to 
   create an object pokemon
   @param {object} pokeInfo  object of the random selected pokemon
   *
   */
  const fetchPokemon = async () => {
    /** @type {number} */
    const pokedexNum = Math.floor(Math.random() * 897)
    /** @type {string} */
    let foundPokemon = ''
    /** @type {string}*/
    let jsonPokemon = ''
    /** @type {object} */
    const pokeInfo = {}

    try {
      foundPokemon = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokedexNum}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
      )
    } catch (error) {
      console.error(error.message)
    }

    if (foundPokemon) {
      try {
        jsonPokemon = await foundPokemon.json()
        pokeInfo.name = `${String(jsonPokemon.species.name)
          .slice(0, 1)
          .toUpperCase()}${String(jsonPokemon.species.name)
          .slice(1, jsonPokemon.species.name.length)
          .toLowerCase()}`
      } catch (error) {
        console.error(error.message)
      }
    } else {
      jsonPokemon = 'No Pokémon found...'
    }

    if (pokeP.innerText !== '') {
      pokeP.innerText = ''
    }
    pokeP.innerText = `Your Pokémon is ${pokeInfo.name}.`
    pokeAbilityBtn.removeAttribute('disabled')
  }

  /**
   * Asyn function to find pokemon abilities and insert it as text in HTML if
   * an ability is found
   *
   * @param {number} pokedexNum get random number to get random pokemon ability
   * in api
   * @param {string} foundAbilities name of the ability for the pokemon
   * @param {string} pokeAbility id of HTML element where ability is loaded
   * @param {string} jsonAbilities  will be used to store ability informations
   * @param {string} abilityToDisplay  string of the ability to display in HTML
   *
   *
   */
  const fetchPokemonAbilities = async () => {
    /** @type {number} */
    const pokedexNum = Math.floor(Math.random() * 266)
    /** @type {string} */
    let foundAbilities = ''
    /** @type {string} */
    const pokeAbility = document.getElementById('pokeAbility')
    /** @type {string} */
    let jsonAbilities = {}
    /** @type {string} */
    let abilityToDisplay = ''

    try {
      foundAbilities = await fetch(
        `https://pokeapi.co/api/v2/ability/${pokedexNum}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
      )
    } catch (error) {
      console.error(error.message)
    }

    if (foundAbilities) {
      try {
        jsonAbilities = await foundAbilities.json()
        if ('' !== jsonAbilities.name && undefined !== jsonAbilities.name) {
          abilityToDisplay = `${String(jsonAbilities.name)
            .slice(0, 1)
            .toUpperCase()}${String(jsonAbilities.name)
            .slice(1, jsonAbilities.name.length)
            .toLowerCase()}`
        } else {
          abilityToDisplay = 'Tackle'
        }
      } catch (error) {
        console.error(error.message)
      }
    } else {
      jsonAbilities = 'No ability found...'
    }

    if (pokeAbility.innerText !== '') {
      pokeAbility.innerText = ''
    }

    pokeAbility.innerText = `It now knows the move ${abilityToDisplay}!`
  }

  /**
   *function to create a pokemon on user's click
   *
   * @param {string} pokeBtn string of the button name to listen to for user's
   * click
   */
  const invoquePokemon = () => {
    /** @type {string} */
    const pokeBtn = document.getElementById('pokemon')
    pokeBtn.addEventListener('click', fetchPokemon)
    pokeDiv.appendChild(pokeP)
  }

  /**
   *function to create an ability on user's click
   *
   */
  const pokemonAbility = () => {
    pokeAbilityBtn.addEventListener('click', fetchPokemonAbilities)
    pokeDiv.appendChild(pokeAbility)
  };
  /**
   *function to start functions to create pokemon and abilities on user's click
   *
   */
  (function startAll() {
    invoquePokemon()
    pokemonAbility()
  })()
})
