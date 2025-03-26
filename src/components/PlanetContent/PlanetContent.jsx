// COMPONENTS
import {
  Luna,
  Mercurio,
  Venus,
  Tierra,
  Marte,
  Jupiter,
  Saturno,
  Urano,
  Neptuno,
} from '@Components/Planets';
import PlanetsItem from '@Components/Planets/PlanetsItems';

// Hook
import { ServiceWPHome } from '@Hooks/useFetchWP';

// IMAGES
import _Astro from '@Assets/images/astro.png';

// STYLES
import '@Components/PlanetContent/PlanetContent.scss';

const Planets = () => {

  const { lunaInfo } = ServiceWPHome();

  return (
    <section className="planets">
      <Luna lunaInfo={lunaInfo} />
      <PlanetsItem />
    </section>
  );
};

export default Planets;
