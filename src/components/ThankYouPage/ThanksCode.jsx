import { useLocation } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

// store
import { storeModalTank, storeBuyTank } from '@Store/global';
import { lunaStore } from '@Store/luna';

// storeRemainingTank
// import { storeRemainingTank } from '@Store/global';
// import { useHistory } from 'react-router-dom';
// import { useEffect, useState } from 'react';

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

const ThanksCode = () => {
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

  // console.log( 'storeTankModal.tanques:',storeTankModal.tanques);
  // let { storeTankModalnew } = storeTankModal;
  // console.log('storeTankModalnew:', storeTankModalnew);
  // storeTankModalnew.tanques=storeTankModal.tanques+20;

  // const { storeTankModalnew2 } = storeModalTank(
  //   (state) => ({
  //     storeTankModal: state.storeTankModalnew,
  //   }),
  //   shallow
  // );

  // console.log( storeTankModal.tanques);
  // storeTankModal.tanques=storeTankModal.tanques+20;
  // console.log( storeTankModal);


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


  // const { remainingTankData } = storeRemainingTank(
  //   (state) => ({
  //     remainingTankData: state.remainingTankData,
  //   }),
  //   shallow
  // );
  // const history = useHistory();
  // const [valueTank, setValueTank] = useState(0);
  // useEffect(() => {
  //   setValueTank(remainingTankData.remainingTanks);
  // }, [remainingTankData]);

  // const handleLink = () => {
  //   history.push('/paquetes');
  //   setNavTankState(false);
  // };

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
          <p>Tu <strong>Código de Descuento</strong> se aplicó exitosamente</p>
          <LinkRouter rute="/" label="INICIO"/>
        </>
      );
    }
  };

  return (
    <section className={page.ThankYou}>
          <div className={page.ThankYouContent}>
            <img src={cohete} alt="cohete" />
            <Title title="¡GRACIAS!" />
            {handleRute(location)}
          </div>
    </section>
  );
};

export default ThanksCode;
