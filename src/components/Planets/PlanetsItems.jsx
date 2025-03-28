// Components
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

// Hook
import { ServiceWPHome } from '@Hooks/useFetchWP';

const PlanetsItems = () => {
  const {
    lunaInfo,
    mercurioInfo,
    venusInfo,
    marteInfo,
    jupiterInfo,
    saturnoInfo,
    uranoInfo,
    neptunoInfo,
    tierraInfo,
  } = ServiceWPHome();
  return (
    <section>
      <div className="planetGrid">
        <Mercurio mercurioInfo={mercurioInfo} />
        <Venus venusInfo={venusInfo} />
        <Tierra tierraInfo={tierraInfo} />
        <Marte marteInfo={marteInfo} />
        <Jupiter jupiterInfo={jupiterInfo} />
        <Saturno saturnoInfo={saturnoInfo} />
        <Urano uranoInfo={uranoInfo} />
        <Neptuno neptunoInfo={neptunoInfo} />
      </div>
    </section>
  );
};

export default PlanetsItems;
