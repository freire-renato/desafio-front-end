import { PokemonInfosState } from "./types";
import { ActionReturn } from "../utils/action-creator";

import { POKEMON_INFOS } from "./actions";

const initialState: PokemonInfosState = {
  loading: false,
  error: null,
  pokemon: null,
};

function pokemonInfosReducer(state = initialState, action: ActionReturn<any>) {
  const { type, payload } = action;
  switch (type) {
    case POKEMON_INFOS.REQUEST:
      return { ...state, loading: true, error: null, pokemon: null };

    case POKEMON_INFOS.RESOLVE:
      return { ...state, loading: false, error: null, pokemon: payload };

    case POKEMON_INFOS.FAIL:
      return { ...state, loading: false, error: payload, pokemon: null };

    case POKEMON_INFOS.CLEAR:
      return { ...state, loading: false, error: null, pokemon: null };

    default:
      return state;
  }
}

export default pokemonInfosReducer;
