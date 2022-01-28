/** @type {string} name of the div placeholder where pokemon informations
 * are loaded*/
const pokeDiv = document.getElementById('pokemon-info')
/** @type {html element} name of the button to listen to, to create new
 * ability on user's click*/
const pokeAbilityBtn = document.getElementById('ability')

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
 *function to create an ability on user's click
 *
 */
const pokemonAbility = () => {
  pokeAbilityBtn.addEventListener('click', fetchPokemonAbilities)
  pokeDiv.appendChild(pokeAbility)
}

export { pokemonAbility }
