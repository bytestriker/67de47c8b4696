import { useLocation } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

// store
import { storeModalTank, storeBuyTank } from '@Store/global';
import { lunaStore } from '@Store/luna';

// Hooks
import { useEventsTanks } from '@Hooks/useFetchTanques';

// COMPONENTS
import { LinkRouter } from '@Components/UtilsComponents/Button';
import { Title } from '@Components/Atomos/Titles';

// IMAGES
import cohete from '@Assets/images/cohete.png';

// Styles
import style from '@Sass/pages/general.module.scss';
import page from '@Components/ThankYouPage/thanks.module.scss';

const Thanks = () => {
  const { tanquesData } = storeBuyTank(
    (state) => ({
      tanquesData: state.tanquesData,
    }),
    shallow
  );
  const { storeTankModal } = storeModalTank(
    (state) => ({
      storeTankModal: state.storeTankModal,
    }),
    shallow
  );
  const { dataLuna } = lunaStore(
    (state) => ({
      dataLuna: state.dataLuna,
    }),
    shallow
  );
  const { exchangeTanks } = useEventsTanks();
  const location = useLocation();

  const handleChange = () => {
    exchangeTanks(storeTankModal.planet, dataLuna.id);
  };

  const handleRute = (params) => {
    const { from } = params;
    if (from?.pathname === '/checkout') {
      return (
        <>
          <p>
            Haz abonado <strong>{tanquesData.amountDefault}</strong> taques
          </p>
          <span className={page.links}>
            <button className="buttonPlanet" onClick={() => handleChange()}>
              CANJEAR
            </button>
          </span>
          <span className={page.links}>
            <LinkRouter rute="/" label="INICIO" classItem={page.linkInicio} />
          </span>
        </>
      );
    } else {
      return (
        <>
          <p>Descubre más sobre cómo despegar tu proyecto.</p>
          <LinkRouter rute="/" label="¡EMPIEZA AHORA!" />
        </>
      );
    }
  };

  return (
    <section className={page.ThankYou}>
      <div className={style.planetPageMain}>
        <div className={style.planetPageContainer}>
          <div className={page.ThankYouContent}>
            <img src={cohete} alt="cohete" />
            <Title title="¡GRACIAS!" />
            {handleRute(location)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Thanks;
