import { invoquePokemon } from './pokemon.js'
import { pokemonAbility } from './ability.js'

window.addEventListener('DOMContentLoaded', () => {
  (function startAll() {
    invoquePokemon()
    pokemonAbility()
  })()
})
