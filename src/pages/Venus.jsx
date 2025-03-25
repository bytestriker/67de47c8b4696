import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { venusStore } from '@Store/venus';
import { lunaStore } from '@Store/luna';

// Hooks
import { useEventsVenus } from '@Hooks/useEventVenus';
import { VenusWPText } from '@Hooks/useFetchWP';

// Components
import {
  Buyer,
  BuyerInfo,
  BuyerAdd,
  VenusQ1Conclusion,
  VenusQ1Foda,
  VenusQ1Target,
  VenusQ2Conclusion,
  VenusQ2Foda,
  VenusQ0Target,
  VenusQ3Conclusion,
  VenusQ4Conclusion,
} from '@Components/Molecules/Venus';
import { ModalVenus, ModalSalirVenus } from '@Components/Atomos/Modals';
import { ButtonClose } from '@Components/Atomos/Buttons';

// Styles
import style from '@Sass/pages/venus.module.scss';
import base from '@Sass/pages/general.module.scss';

const Venus = () => {
  // Stores
  const { dataVenus } = venusStore(
    (state) => ({
      dataVenus: state.dataVenus,
    }),
    shallow
  );
  const { getLuna } = lunaStore(
    (state) => ({
      getLuna: state.getLuna,
    }),
    shallow
  );

  const { venusGetProjectById, venusConclusionFO, venusConclusionDA, venusConclusionFA, venusConclusionDEAM, venusGetBuyerPersona } =
    useEventsVenus();
  const { venusQ0, venusQ1, venusQ2, venusQ3, venusQ3od, venusQ3fa, venusQ3deam, venusQ4 } = VenusWPText();
  const [page, setPage] = useState(0);
  const [modal, setModal] = useState(false);
  const [texts0, setTexts0] = useState({});
  const [texts, setTexts] = useState({});
  const [texts2, setTexts2] = useState({});
  const [texts3, setTexts3] = useState({});
  const [texts3od, setTexts3od] = useState({});
  const [texts3fa, setTexts3fa] = useState({});
  const [texts3deam, setTexts3deam] = useState({});
  const [texts4, setTexts4] = useState({});
  const [modalSalir, setModalSalir] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [buyerall, setBuyerall] = useState([]);
  const [buyer, setBuyer] = useState({
    id: 0,
    nombre: '',
    num_buyer: 0,
    frase: '',
    edad: '',
    ubicacion: '',
    profesion: '',
    background: '',
    goals: '',
    motivations: '',
    frustrations: '',
});

  useEffect(() => {
    if (venusQ0) {
      setTexts0(venusQ0);
    }
  }, [venusQ0]);

  useEffect(() => {
    if (venusQ1) {
      setTexts(venusQ1);
    }
  }, [venusQ1]);

  useEffect(() => {
    if (venusQ2) {
      setTexts2(venusQ2);
    }
  }, [venusQ2]);

  //Cruce Fo-Op 
  useEffect(() => {
    if (venusQ3) {
      setTexts3(venusQ3);
    }
  }, [venusQ3]);

  //Cruce Op-De  (alias da)
  useEffect(() => {
    if (venusQ3od) {
      setTexts3od(venusQ3od);
    }
  }, [venusQ3od]);

  //Cruce Fo-Am  
  useEffect(() => {
    if (venusQ3fa) {
      setTexts3fa(venusQ3fa);
    }
  }, [venusQ3fa]);

  //Cruce De-Am  
  useEffect(() => {
    if (venusQ3deam) {
      setTexts3deam(venusQ3deam);
    }
  }, [venusQ3deam]);

  useEffect(() => {
    if (venusQ4) {
      setTexts4(venusQ4);
    }
  }, [venusQ4]);

  // Manejo del proyecto mercurio
  useEffect(() => {
    handleProjectById();
  }, []);

  useEffect(() => {
    handleGetBuyerPersona();
  }, []);

  const handleGetBuyerPersona = async () => {
    const buyer_result = await venusGetBuyerPersona();
    if (buyer_result.code === 0) {
      setBuyerall(buyer_result.data);
      setBuyer(buyer_result.data[0]);
    }
  }

  // validamos si existe un proyecto y actualizamos estado
  const handleProjectById = async () => {
    const res = await venusGetProjectById();
    if (res.code === 0) {
      const { painpoints, fortalezas, oportunidades, debilidades, amenazas } = res.data;
      // if (painpoints.length === 0) {
      //   setPage(3);
      //   return;
      // }
      // if (fortalezas.length === 0 || oportunidades.length === 0) {
      //   setPage(4);
      //   return;
      // }
      // if (debilidades.length === 0 || amenazas.length === 0) {
      //   setPage(5);
      //   return;
      // }
      if (painpoints.length === 0) {
        setPage(0);
        return;
      }
      if (fortalezas.length === 0 || oportunidades.length === 0) {
        setPage(2);
        return;
      }
      if (debilidades.length === 0 || amenazas.length === 0) {
        setPage(3);
        return;
      }
      const fo = await venusConclusionFO();
      if (fo.code === 0) {
        const { fortalezas_oportunidades, conclusion } = fo.data;
        if (fortalezas_oportunidades.length === 0 || conclusion === '') {
          setPage(4);
          return;
        }
      }
      const da = await venusConclusionDA();
      if (da.code === 0) {
        const { oportunidades_debilidades, conclusion } = da.data;
        if (oportunidades_debilidades.length === 0 || conclusion === '') {
          setPage(5);
          return;
        }
      }
      const fa = await venusConclusionFA();
      if (fa.code === 0) {
        const { fortalezas_amenazas, conclusion } = fa.data;
        if (fortalezas_amenazas.length === 0 || conclusion === '') {
          setPage(6);
          return;
        }
      }
      const deam = await venusConclusionDEAM();
      if (deam.code === 0) {
        const { debilidades_amenazas, conclusion } = deam.data;
        if (debilidades_amenazas.length === 0 || conclusion === '') {
          setPage(7);
          return;
        }
      }
      const buyerres = await venusGetBuyerPersona();
      if (buyerres.code === 0) {
        const propiedades = Object.values(buyerres.data);
        const algunaPropiedadVacia = propiedades.some((valor) => valor === '');
        if (algunaPropiedadVacia) {
          setPage(8);
          return;
        }
      }
    }
  };
  return (
    <section className={base.planetContainer}>
      {modalSalir ? (
        <ModalSalirVenus
          title="Estás a punto de salir"
          message="¿Deseas guardar tu información?"
          setModalSalir={setModalSalir}
          data={dataVenus}
          proyect={getLuna().id}
          page={page}
        />
      ) : null}

      {modal ? (
        <ModalVenus
          title=""
          message={message}
          buttonName="Okay"
          setPage={setPage}
          setModal={setModal}
          page={page}
        />
      ) : null}

      <div>
        <ButtonClose setModalSalir={setModalSalir} titlePage={title} />
        <div className={style.Venus}>
          <div className={base.pageContainer}>
            <div className={style.venusContainer}>
              {page === 0 ? (
                <VenusQ0Target
                  setPage={setPage}
                  setTitle={setTitle}
                  texts={texts0}
                  dataVenus={dataVenus}
                />
              ) : null}
              {page === 1 ? (
                <VenusQ1Target
                  setPage={setPage}
                  setTitle={setTitle}
                  texts={texts}
                  dataVenus={dataVenus}
                />
              ) : null}
              {page === 2 ? (
                <VenusQ1Foda setPage={setPage} setTitle={setTitle} texts={texts2} />
              ) : null}
              {page === 3 ? (
                <VenusQ2Foda
                  setPage={setPage}
                  setModal={setModal}
                  setTitle={setTitle}
                  texts={texts2}
                  setMessage={setMessage}
                />
              ) : null}
              {page === 4 ? (
                <VenusQ1Conclusion
                  dataVenus={dataVenus}
                  setPage={setPage}
                  setModal={setModal}
                  setTitle={setTitle}
                  texts={texts3}
                  setMessage={setMessage}
                />
              ) : null}
              {page === 5 ? (
                <VenusQ2Conclusion
                  dataVenus={dataVenus}
                  setPage={setPage}
                  setModal={setModal}
                  setTitle={setTitle}
                  texts={texts3od}
                  setMessage={setMessage}
                />
              ) : null}
              {page === 6 ? (
                <VenusQ3Conclusion
                  dataVenus={dataVenus}
                  setPage={setPage}
                  setModal={setModal}
                  setTitle={setTitle}
                  texts={texts3fa}
                  setMessage={setMessage}
                />
              ) : null}
              {page === 7 ? (
                <VenusQ4Conclusion
                  dataVenus={dataVenus}
                  setPage={setPage}
                  setModal={setModal}
                  setTitle={setTitle}
                  texts={texts3deam}
                  setMessage={setMessage}
                />
              ) : null}
              {page === 8 ? (
              <BuyerInfo 
                setPage={setPage}
                setModal={setModal} 
                setTitle={setTitle}
                texts={texts4}
                buyerall={buyerall}
                setBuyer={setBuyer}
                setMessage={setMessage}
               />
               ) : null}
              {page === 9 ? (
                <Buyer
                  setPage={setPage}
                  setModal={setModal}
                  setTitle={setTitle}
                  texts={texts4} 
                  buyer={buyer}
                  setBuyer={setBuyer}
                  setMessage={setMessage}
                />
              ) : null}
              {page === 10 ? (
                <BuyerAdd
                  setPage={setPage}
                  setModal={setModal}
                  setTitle={setTitle}
                  texts={texts4}
                  buyer={buyer}
                  setBuyer={setBuyer}
                  setMessage={setMessage}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Venus;
