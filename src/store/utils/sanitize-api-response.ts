import type {
  PokemonBasicInfo,
  PokemonStat,
  PokemonType,
} from "../search-pokemon";

function returnBasicInfoObject(items, prop): PokemonBasicInfo[] {
  if (!items) return [];
  return items.map((item) => ({
    name: item[prop]["name"],
    url: item[prop]["url"],
  }));
}

function returnPokemonStat(stats): PokemonStat[] {
  if (!stats) return [];
  return stats.map(({ base_stat, stat }) => ({
    baseStat: base_stat,
    name: stat.name,
  }));
}

export const sanitizePokemonAPI = (response): PokemonType => {
  return {
    name: response.name,
    id: response.id,
    image: response.sprites?.front_default,
    weight: response.weight,
    height: response.height,
    types: returnBasicInfoObject(response.types, "type"),
    abilities: returnBasicInfoObject(response.abilities, "ability"),
    stats: returnPokemonStat(response.stats),
    species: response.species,
  };
};
