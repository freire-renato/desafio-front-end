import { Typography, Grid } from "@useblu/ocean-components";

const returnStats = (
  stats
): { hp: string; attack: string; defense: string; speed: string } => {
  return stats.reduce((acc, stat) => {
    const name = stat.stat.name;
    const value = stat.base_stat;

    return { ...acc, [name]: value };
  }, {});
};

const returnTypes = (types) => {
  return types.map(({ type }) => ({
    name: type.name,
    url: type.url,
  }));
};

const returnAbilities = (abilities) => {
  return abilities.map(({ ability }) => ({
    name: ability.name,
    url: ability.url,
  }));
};

const PokemonDetails = ({
  pokemon,
  handleAbilityClick,
  abilityShortEffect,
  requestPokemonsByType,
}) => {
  const stats = returnStats(pokemon.stats);
  const types = returnTypes(pokemon.types);
  const abilities = returnAbilities(pokemon.abilities);
  return (
    <Grid.Container>
      <Grid.Row>
        <Grid.Col>
          <img src={pokemon.image} alt={pokemon.name} width={200} />
        </Grid.Col>
      </Grid.Row>

      <Grid.Row>
        <Grid.Col>
          <Typography variant="description">ID:</Typography>
          <Typography variant="lead">{pokemon.id}</Typography>
        </Grid.Col>

        <Grid.Col>
          <Typography variant="description">Name:</Typography>
          <Typography variant="lead">{pokemon.name}</Typography>
        </Grid.Col>

        <Grid.Col>
          <Typography variant="description">Weight:</Typography>
          <Typography variant="lead">{pokemon.weight}</Typography>
        </Grid.Col>

        <Grid.Col>
          <Typography variant="description">Height:</Typography>
          <Typography variant="lead">{pokemon.height}</Typography>
        </Grid.Col>
      </Grid.Row>

      <Grid.Row>
        <Grid.Col>
          <Typography variant="description">HP</Typography>
          <Typography variant="lead">{stats.hp}</Typography>
        </Grid.Col>

        <Grid.Col>
          <Typography variant="description">Attack</Typography>
          <Typography variant="lead">{stats.attack}</Typography>
        </Grid.Col>

        <Grid.Col>
          <Typography variant="description">Defense</Typography>
          <Typography variant="lead">{stats.defense}</Typography>
        </Grid.Col>

        <Grid.Col>
          <Typography variant="description">Speed</Typography>
          <Typography variant="lead">{stats.speed}</Typography>
        </Grid.Col>
      </Grid.Row>

      <Grid.Row>
        <Grid.Col>
          <Typography variant="description">Types</Typography>
          <Grid.Row>
            {types.map(({ name, url }) => (
              <Typography
                variant="lead"
                onClick={() => requestPokemonsByType(url)}
              >
                {name} ||{" "}
              </Typography>
            ))}
          </Grid.Row>
        </Grid.Col>
      </Grid.Row>

      <Grid.Row>
        <Grid.Col>
          <Typography variant="description">Abilities</Typography>
          <Grid.Row>
            {abilities.map(({ name, url }) => (
              <Typography
                variant="lead"
                onClick={() => {
                  handleAbilityClick(url);
                }}
              >
                {name} ||
              </Typography>
            ))}
            <Grid.Col>
              {abilityShortEffect && <p>{abilityShortEffect}</p>}
            </Grid.Col>
          </Grid.Row>
        </Grid.Col>
      </Grid.Row>
    </Grid.Container>
  );
};

export default PokemonDetails;
