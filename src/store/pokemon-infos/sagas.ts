import { put, call, takeLatest } from "redux-saga/effects";

import request from "../../services/requests";

import actions, { POKEMON_INFOS } from "./actions";

export function* handlePokemonInfosRequest(action) {
  try {
    const pokemon = action.payload.toLowerCase();

    const response = yield call(
      request,
      `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
    );
    const pokemonInfos = {
      name: response.name,
      id: response.id,
      image: response.sprites?.front_default,
      weight: response.weight,
      height: response.height,
      types: response.types,
      abilities: response.abilities,
      stats: response.stats,
      species: response.species,
    };

    yield put(actions.pokemonInfosResolve(pokemonInfos));
  } catch (e) {
    yield put(actions.pokemonInfosFail(e.message));
  }
}

export default function* sagas() {
  yield takeLatest(POKEMON_INFOS.REQUEST, handlePokemonInfosRequest);
}
