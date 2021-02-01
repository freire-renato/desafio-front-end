import { all } from "redux-saga/effects";

import { searchPokemonSagas } from "./search-pokemon";
import { pokemonInfosSagas } from "./pokemon-infos";

export default function* rootSaga() {
  yield all([searchPokemonSagas(), pokemonInfosSagas()]);
}
