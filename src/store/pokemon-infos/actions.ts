import { createAction } from "../utils/action-creator";

export enum POKEMON_INFOS {
  REQUEST = "pokemonInfos/INFOS_REQUEST",
  RESOLVE = "pokemonInfos/INFOS_RESOLVE",
  FAIL = "pokemonInfos/INFOS_FAIL",
  CLEAR = "pokemonInfos/INFOS_CLEAR",
}

export const pokemonInfosRequest = createAction<string>(POKEMON_INFOS.REQUEST);

export const pokemonInfosResolve = createAction(POKEMON_INFOS.RESOLVE);

export const pokemonInfosFail = createAction<string>(POKEMON_INFOS.FAIL);

export const pokemonInfosClear = createAction(POKEMON_INFOS.CLEAR);

const action = {
  pokemonInfosRequest,
  pokemonInfosResolve,
  pokemonInfosFail,
};

export default action;
