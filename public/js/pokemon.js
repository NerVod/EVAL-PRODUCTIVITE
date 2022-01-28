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

export { invoquePokemon }
