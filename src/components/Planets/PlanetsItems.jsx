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

// Styles
import style from '@Components/Planets/planets.module.scss';

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
      <div className={style.PlanetsItem}>
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
