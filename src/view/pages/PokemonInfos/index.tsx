import { useLocation } from "react-router-dom";
import { Typography, Grid, Button } from "@useblu/ocean-components";

import { getLastSegment } from "../../helpers/url";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";
import PokemonDetails from "../../components/PokemonDetails";

import { Container, Content } from "./styled-components";
import usePokemonInfosHook from "./pokemon-infos.hook";

const PokemonInfosPage = () => {
  const { pathname } = useLocation();

  const name = getLastSegment(pathname);
  const {
    pokemon,
    isLoading,
    hasError,
    loadingTypes,
    hasErrorTypes,
    pokemonByType,
    abilityShortEffect,
    evolutionChain,
    handleTryAgainButton,
    requestPokemonsByType,
    handleAbilityClick,
  } = usePokemonInfosHook(name);

  function printEvolutionNode(node) {
    return node.map(({ species, evolvesTo }) => (
      <div style={{ marginLeft: "10px" }}>
        <p>{species}</p>
        {evolvesTo && evolvesTo.map((a) => printEvolutionNode(a))}
      </div>
    ));
  }

  return (
    <Container>
      <Grid.Row>
        <Typography variant="heading1">Pokémon informations</Typography>
      </Grid.Row>

      <Content>
        {isLoading && <Loader message={`Loading information about ${name}`} />}
        {hasError && (
          <ErrorMessage
            message={`Cannot find informations about ${name}`}
            buttonText="Try again"
            buttonAction={handleTryAgainButton}
          />
        )}
        {loadingTypes && <h1>loadingTypes</h1>}
        {hasErrorTypes && <h1>hasErrorTypes</h1>}
        {pokemonByType.map(({ pokemon }) => {
          return (
            <li>
              <ul key={pokemon.name}>{pokemon.name}</ul>
            </li>
          );
        })}
        <hr></hr>{" "}
        {pokemon && (
          <PokemonDetails
            pokemon={pokemon}
            handleAbilityClick={handleAbilityClick}
            abilityShortEffect={abilityShortEffect}
            requestPokemonsByType={requestPokemonsByType}
          />
        )}
        {evolutionChain && printEvolutionNode(evolutionChain)}
      </Content>
    </Container>
  );
};

export default PokemonInfosPage;
