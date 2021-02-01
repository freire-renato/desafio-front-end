import reducer from "./reducers";
import * as pokemonInfosSelectors from "./selectors";

export { default as pokemonInfosActions } from "./actions";
export { pokemonInfosSelectors };
export { default as pokemonInfosSagas } from "./sagas";

export type { PokemonInfosState } from "./types";
export default reducer;
