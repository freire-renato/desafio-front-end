import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@useblu/ocean-components";

import { ROUTES } from "../../../constants";
import pokeball from "../../assets/pokeball.png";
import { pokedexSelectors } from "../../../store/pokedex";

import { Nav, ImageLinkContainer } from "./styled-components";

const NavigationBar = () => {
  const totalPokemon = useSelector(pokedexSelectors.totalPokemonSaved);
  return (
    <Nav>
      <ImageLinkContainer>
        <Link to={ROUTES.HOME}>
          <img src={pokeball} alt="navigate to homepage" width={100} />
        </Link>
      </ImageLinkContainer>
      <div>
        <Link to={ROUTES.POKEDEX}>
          <Typography variant="paragraph" inverse>
            Pokedex - ({totalPokemon})
          </Typography>
        </Link>
      </div>
      <div>
        <Link to={ROUTES.SEARCH}>
          <Typography variant="paragraph" inverse>
            Search
          </Typography>
        </Link>
      </div>
    </Nav>
  );
};

export default NavigationBar;
