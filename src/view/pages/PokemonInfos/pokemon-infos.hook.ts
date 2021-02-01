import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  pokemonInfosActions,
  pokemonInfosSelectors,
} from "../../../store/pokemon-infos";

import request from "../../../services/requests";

//type EvolutionChain<T> = T | Array<EvolutionChain<T>>;

type EvolutionChain = {
  species: string;
  evolvesTo: EvolutionChain[];
};

interface usePokemonInfosHookType {
  isLoading: boolean;
  hasError: boolean;
  pokemon: any;
  loadingTypes: boolean;
  hasErrorTypes: boolean;
  pokemonByType: { pokemon: { name: string; url: string } }[];
  abilityShortEffect: string | null;
  evolutionChain: EvolutionChain[] | null;
  handleTryAgainButton: () => void;
  requestPokemonsByType: (url: string) => void;
  handleAbilityClick: (url: string) => void;
}

const usePokemonInfosHook = (name?: string): usePokemonInfosHookType => {
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [hasErrorTypes, setHasErroTypes] = useState(false);
  const [pokemonByType, setPokemonByType] = useState([]);

  const [loadingAbility, setLoadingAbility] = useState(false);
  const [hasErrorAbility, setHasErroAbility] = useState(false);
  const [abilityShortEffect, setAbilityShortEffect] = useState(null);

  const [loadingEvolution, setLoadingEvolution] = useState(false);
  const [hasErrorEvolution, setHasErroEvolution] = useState(false);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain[] | null>(
    null
  );

  const dispatch = useDispatch();

  const pokemon = useSelector(pokemonInfosSelectors.pokemon);
  const isLoading = useSelector(pokemonInfosSelectors.isLoading);
  const hasError = useSelector(pokemonInfosSelectors.hasError);

  useEffect(() => {
    requestPokemonInformation();
  }, []);

  useEffect(() => {
    requestEvolution();
  }, [pokemon]);

  function requestPokemonInformation() {
    dispatch(pokemonInfosActions.pokemonInfosRequest(name));
  }

  function handleTryAgainButton() {
    requestPokemonInformation();
  }

  async function requestPokemonsByType(url) {
    setLoadingTypes(true);
    setHasErroTypes(false);

    try {
      const r = await request(url);
      setLoadingTypes(false);
      setHasErroTypes(false);
      const { pokemon } = r;
      setPokemonByType(pokemon);
    } catch (e) {
      setLoadingTypes(false);
      setHasErroTypes(true);
    }
  }

  async function handleAbilityClick(url) {
    setLoadingAbility(true);
    setHasErroAbility(false);
    try {
      const r = await request(url);
      setLoadingAbility(false);
      setHasErroAbility(false);
      const { effect_entries } = r;
      const a = effect_entries.find((e) => {
        return e.language.name === "en";
      });
      setAbilityShortEffect(a.short_effect);
    } catch (e) {
      setLoadingAbility(false);
      setHasErroTypes(true);
    }
  }

  function returnEvolution(chain): EvolutionChain[] {
    return [
      {
        species: chain.species?.name,
        evolvesTo:
          chain.evolves_to?.length > 0
            ? chain.evolves_to.map((a) => returnEvolution(a))
            : null,
      },
    ];
  }

  async function requestEvolution() {
    if (!pokemon) return;
    const r = await request(pokemon.species.url);
    const { evolution_chain } = r;
    const { chain } = await request(evolution_chain.url);

    const eevee = returnEvolution(chain);

    setEvolutionChain(eevee);
  }

  return {
    isLoading,
    hasError,
    pokemon,
    loadingTypes,
    hasErrorTypes,
    pokemonByType,
    abilityShortEffect,
    evolutionChain,
    handleTryAgainButton,
    requestPokemonsByType,
    handleAbilityClick,
  };
};

export default usePokemonInfosHook;
