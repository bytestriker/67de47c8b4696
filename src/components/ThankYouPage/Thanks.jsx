import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

// store
import { storeModalTank, storeBuyTank } from '@Store/global';
import { lunaStore } from '@Store/luna';
import useAuth from '@Auth/userAuth';

// Hooks
import { useEventsTanks } from '@Hooks/useFetchTanques';

// COMPONENTS
import { LinkRouter } from '@Components/UtilsComponents/Button';
import Button from '@Components/Button';
import { Title } from '@Components/Atomos/Titles';

// IMAGES
import cohete from '@Assets/images/cohete.png';

// Styles
import style from '@Sass/pages/general.module.scss';
import styles from '@Sass/components/alerts.module.scss';
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
  const { contextValue, setLoading, reloadPacks, setPageLuna } = useAuth();
  const { exchangeTanks } = useEventsTanks();
  const { getTanks } = useEventsTanks();
  const location = useLocation();

  useEffect(() => {
    if (contextValue.isLogged())
      getTanks();
  }, [contextValue.isLogged(), reloadPacks]);

  const handleChange = () => {
    exchangeTanks(storeTankModal.planet, dataLuna.id);
  };

  const handleRouteFromParams = (params) => {
    const { from } = params;
    if (from?.pathname === '/checkout') {
      return (
        <>
          <p>
            Haz abonado <strong>{tanquesData.amountDefault}</strong> taques
          </p>
          <span className={page.links}>
            <Button text="CANJEAR" onClick={() => handleChange()} />
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
          <LinkRouter className="buttonPrimary" rute="/" label="¡EMPIEZA AHORA!" />
        </>
      );
    }
  };

  return (
/*     <section className={page.ThankYou}>
      <div className={style.planetContainer}>
        <div className={style.planetContent}>
          <div className={page.ThankYouContent}>
            <img src={cohete} alt="cohete" />
            <Title title="¡GRACIAS!" />
            {handleRouteFromParams(location)}
          </div>
        </div>
      </div>
    </section>
 */  
    <div className={styles.Modal}>
      <div className="container">
        <div className={styles.ModalContent}>
          <h3>¡GRACIAS!</h3>
          {handleRouteFromParams(location)}
          
          {/* <div className={styles.ButtonContent}>
            <Button onClick={() => handleManageModal()} text={'CERRAR'} />
          </div> */}
        </div>
      </div>
    </div>

  );
};

export default Thanks;
