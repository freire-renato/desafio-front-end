import { createSelector } from "reselect";

import { PokemonInfosState } from "./types";

export const pokemonInfosSlice = (state): PokemonInfosState =>
  state.pokemonInfos;

export const isLoading = createSelector(
  pokemonInfosSlice,
  (state: PokemonInfosState) => state.loading
);

export const hasError = createSelector(
  pokemonInfosSlice,
  (state: PokemonInfosState) => Boolean(state.error)
);

export const pokemon = createSelector(
  pokemonInfosSlice,
  (state: PokemonInfosState) => state.pokemon
);
