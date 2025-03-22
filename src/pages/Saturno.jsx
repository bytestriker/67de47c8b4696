import { useState, useEffect } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { saturnoStore } from '@Store/saturno';
import { lunaStore } from '@Store/luna';

// Hook
import { useEventSaturno } from '@Hooks/useEventSaturno';
import { SaturnoWPText } from '@Hooks/useFetchWP';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { ModalSalirSaturno, ModalSaturno } from '@Components/Atomos/Modals';
import { Title2, ParagraphPlanet } from '@Components/Atomos/Titles';
import { ButtonClose, SaberMas } from '@Components/Atomos/Buttons';
import {
  ValueAwareness,
  ValueConsideration,
  ValuePurchase,
  ValueRetention,
} from '@Components/Atomos/Inputs/saturno';

// Styles
import style from '@Sass/pages/general.module.scss';
import saturno from '@Sass/pages/saturno.module.scss';

// Images
import megaphone from '@Assets/images/megaphone.png';
import idea from '@Assets/images/idea.png';
import buy from '@Assets/images/buy.png';
import magnet from '@Assets/images/magnet.png';

const Saturno = () => {
  const { dataSaturno } = saturnoStore(
    (state) => ({
      dataSaturno: state.dataSaturno,
    }),
    shallow
  );
  const { getLuna } = lunaStore(
    (state) => ({
      getLuna: state.getLuna,
    }),
    shallow
  );
  const { saturnoGetProjectById } = useEventSaturno();
  const { saturnoQ1, saturnoQ2, saturnoQ3, saturnoQ4 } = SaturnoWPText();

  // states
  const [texts, setTexts] = useState({});
  const [texts2, setTexts2] = useState({});
  const [texts3, setTexts3] = useState({});
  const [texts4, setTexts4] = useState({});
  const [page, setPage] = useState(1);
  const [modalSalir, setModalSalir] = useState(false);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    handleProject();
  }, []);

  const handleProject = async () => {
    const response = await saturnoGetProjectById();
    if (response.code === 0) {
      const { awarenesses, considerations, purchases, retentions } = response.data;
      if (awarenesses.length === 0) {
        setPage(1);
        return;
      }
      if (considerations.length === 0) {
        setPage(3);
        return;
      }
      if (purchases.length === 0) {
        setPage(4);
        return;
      }
      if (retentions.length === 0) {
        setPage(5);
        return;
      }
    } else if (response.code < 0) {
      setPage(1);
    }
  };

  useEffect(() => {
    if (saturnoQ1) {
      setTexts(saturnoQ1);
    }
  }, [saturnoQ1]);

  useEffect(() => {
    if (saturnoQ2) {
      setTexts2(saturnoQ2);
    }
  }, [saturnoQ2]);

  useEffect(() => {
    if (saturnoQ3) {
      setTexts3(saturnoQ3);
    }
  }, [saturnoQ3]);

  useEffect(() => {
    if (saturnoQ4) {
      setTexts4(saturnoQ4);
    }
  }, [saturnoQ4]);

  return (
    <section className={style.planetPageMain}>
      {modalSalir ? (
        <ModalSalirSaturno
          title="Estás a punto de salir"
          message="¿Deseas guardar tu información?"
          setModalSalir={setModalSalir}
          data={dataSaturno}
          proyect={getLuna().id}
          page={page}
        />
      ) : null}

      {modal ? (
        <ModalSaturno
          title="¡FELICIDADES!"
          message={`Haz completado <strong> Saturno</strong> de tu proyecto <strong>${
            getLuna().nombre
          }</strong>`}
          buttonName="INICIO"
          setPage={setPage}
          setModal={setModal}
          page={5}
        />
      ) : null}

      <div>
        <ButtonClose setModalSalir={setModalSalir} titlePage={title} />
        <div className={saturno.Saturno}>
          <div className={style.pageContainer}>
            {page === 1 ? (
              <Awareness
                setPage={setPage}
                dataSaturno={dataSaturno}
                texts={texts}
                setTitle={setTitle}
              />
            ) : null}
            {page === 2 ? (
              <Awarenesss
              setPage={setPage}
              dataSaturno={dataSaturno}
              texts={texts}
              setTitle={setTitle}
            />
          ) : null}
            {page === 3 ? (
              <Consideration
                setPage={setPage}
                dataSaturno={dataSaturno}
                texts={texts2}
                setTitle={setTitle}
              />
            ) : null}
            {page === 4 ? (
              <Purchase
                setPage={setPage}
                dataSaturno={dataSaturno}
                texts={texts3}
                setTitle={setTitle}
              />
            ) : null}
            {page === 5 ? (
              <Retention
                setPage={setPage}
                setModal={setModal}
                dataSaturno={dataSaturno}
                texts={texts4}
                setTitle={setTitle}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

/** Page 1 */
export const Awareness = ({ setPage, dataSaturno, texts, setTitle }) => {
  const { setStateAwarenesses } = saturnoStore(
    (state) => ({
      setStateAwarenesses: state.setStateAwarenesses,
    }),
    shallow
  );

  const awarenes = dataSaturno.awarenesses.length > 0 ? dataSaturno.awarenesses : ['', '', '', ''];
  const [getValueAwareness, setValueAwareness] = useState(awarenes);

  const [buttonNext, setButtonNext] = useState(false);

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts.titulo_de_la_vista]);

  useEffect(() => {
    setStateAwarenesses(getValueAwareness);
  }, [getValueAwareness]);

  useEffect(() => {
    handleArray();
  }, [getValueAwareness]);

  const handleArray = () => {
    const isNotEmpty = getValueAwareness.filter((value) => value !== '');
    if (isNotEmpty.length >= 4) {
      setButtonNext(true);
    } else if (isNotEmpty.length < 4) {
      setButtonNext(false);
    }
  };

  return (
    <section>
      <ScrollToTop />
      <div>
        <Title2 text={texts.pregunta} />
        <ParagraphPlanet text={texts.descripcion} />
        <SaberMas data={texts} />
      </div>
      <br></br>
      <div className={style.contentButtons}>
          <div className={style.flexButtons}>
            <button
              type="button"
              onClick={() => setPage(2)}
              className={saturno.btnPlanet}
            >
              SIGUIENTE
            </button>
          </div>
        </div>
    </section>
  );
};

/** Page 2 */
export const Awarenesss = ({ setPage, dataSaturno, texts, setTitle }) => {
  const { setStateAwarenesses } = saturnoStore(
    (state) => ({
      setStateAwarenesses: state.setStateAwarenesses,
    }),
    shallow
  );

  const awarenes = dataSaturno.awarenesses.length > 0 ? dataSaturno.awarenesses : ['', '', '', ''];
  const [getValueAwareness, setValueAwareness] = useState(awarenes);

  const [buttonNext, setButtonNext] = useState(false);

  useEffect(() => {
    setTitle(texts.subtitulo);
  }, [texts.subtitulo]);

  useEffect(() => {
    setStateAwarenesses(getValueAwareness);
  }, [getValueAwareness]);

  useEffect(() => {
    handleArray();
  }, [getValueAwareness]);

  const handleArray = () => {
    const isNotEmpty = getValueAwareness.filter((value) => value !== '');
    if (isNotEmpty.length >= 4) {
      setButtonNext(true);
    } else if (isNotEmpty.length < 4) {
      setButtonNext(false);
    }
  };

  return (
    <section>
      <ScrollToTop />
      <div className={saturno.card}>
        <img src={texts?.icono ? texts.icono : megaphone} alt="megaphone" />
        <p>{texts.descripcion_1}</p>
      </div>
      <form method="POST">
        <br></br>
        <ValueAwareness
          dataSaturno={dataSaturno}
          getValueAwareness={getValueAwareness}
          setValueAwareness={setValueAwareness}
          textDisabled={buttonNext}
        />
        <br></br>
        <div className={style.contentButtons}>
          <div className={style.flexButtons}>
            <button type="button" className={`${saturno.btnPlanet}`} onClick={() => setPage(1)}>
              ANTERIOR
            </button>
            <button
              type="button"
              className={buttonNext ? saturno.btnPlanet : saturno.btnPlanetOff}
              disabled={buttonNext ? '' : 'disabled'}
              onClick={() => setPage(3)}
            >
              SIGUIENTE
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};


/** Page 3 */
export const Consideration = ({ setPage, dataSaturno, texts, setTitle }) => {
  const consideration =
    dataSaturno.considerations.length > 0 ? dataSaturno.considerations : ['', '', '', ''];
  const [getValueConsideration, setValueConsideration] = useState(consideration);
  const [buttonNext, setButtonNext] = useState(false);
  const { setStateConsiderations } = saturnoStore(
    (state) => ({
      setStateConsiderations: state.setStateConsiderations,
    }),
    shallow
  );

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts.titulo_de_la_vista]);

  useEffect(() => {
    setStateConsiderations(getValueConsideration);
  }, [getValueConsideration]);

  useEffect(() => {
    handleArray();
  }, [getValueConsideration]);

  const handleArray = () => {
    const isNotEmpty = getValueConsideration.filter((value) => value !== '');
    if (isNotEmpty.length >= 4) {
      setButtonNext(true);
    } else if (isNotEmpty.length < 4) {
      setButtonNext(false);
    }
  };

  return (
    <section>
      <ScrollToTop />
      <div className={saturno.card}>
        <img src={texts?.icono ? texts?.icono : idea} alt="idea" />
        <p>{texts.descripcion_1}</p>
      </div>
      <form method="POST">
        <br></br>
        <ValueConsideration
          dataSaturno={dataSaturno}
          getValueConsideration={getValueConsideration}
          setValueConsideration={setValueConsideration}
          textDisabled={buttonNext}
        />
        <br></br>
        <div className={style.contentButtons}>
          <div className={style.flexButtons}>
            <button type="button" className={`${saturno.btnPlanet}`} onClick={() => setPage(2)}>
              ANTERIOR
            </button>
            <button
              type="button"
              className={buttonNext ? saturno.btnPlanet : saturno.btnPlanetOff}
              disabled={buttonNext ? '' : 'disabled'}
              onClick={() => setPage(4)}
            >
              SIGUIENTE
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

/** Page 4 */
export const Purchase = ({ setPage, dataSaturno, texts, setTitle }) => {
  const purchases = dataSaturno.purchases.length > 0 ? dataSaturno.purchases : ['', '', '', ''];
  const [getValuePurchase, setValuePurchase] = useState(purchases);
  const [buttonNext, setButtonNext] = useState(false);
  const { setStatePurchasess } = saturnoStore(
    (state) => ({
      setStatePurchasess: state.setStatePurchasess,
    }),
    shallow
  );

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts.titulo_de_la_vista]);

  useEffect(() => {
    setStatePurchasess(getValuePurchase);
  }, [getValuePurchase]);

  useEffect(() => {
    handleArray();
  }, [getValuePurchase]);

  const handleArray = () => {
    const isNotEmpty = getValuePurchase.filter((value) => value !== '');
    if (isNotEmpty.length >= 4) {
      setButtonNext(true);
    } else if (isNotEmpty.length < 4) {
      setButtonNext(false);
    }
  };

  return (
    <section>
      <ScrollToTop />
      <div className={saturno.card}>
        <img src={texts?.icono ? texts?.icono : buy} alt="buy" />
        <p>{texts.descripcion_1}</p>
      </div>
      <form method="POST">
        <br></br>
        <ValuePurchase
          dataSaturno={dataSaturno}
          getValuePurchase={getValuePurchase}
          setValuePurchase={setValuePurchase}
          textDisabled={buttonNext}
        />
        <br></br>
        <div className={style.contentButtons}>
          <div className={style.flexButtons}>
            <button type="button" className={`${saturno.btnPlanet}`} onClick={() => setPage(3)}>
              ANTERIOR
            </button>
            <button
              type="button"
              className={buttonNext ? saturno.btnPlanet : saturno.btnPlanetOff}
              disabled={buttonNext ? '' : 'disabled'}
              onClick={() => setPage(5)}
            >
              SIGUIENTE
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

/** Page 5 */
export const Retention = ({ setPage, setModal, dataSaturno, texts, setTitle }) => {
  const { saturnoCreateProject } = useEventSaturno();
  const retentions = dataSaturno.retentions.length > 0 ? dataSaturno.retentions : ['', '', '', ''];
  const [getValueRetention, setValueRetention] = useState(retentions);
  const [buttonNext, setButtonNext] = useState(false);

  const { setStateRetentions } = saturnoStore(
    (state) => ({
      setStateRetentions: state.setStateRetentions,
    }),
    shallow
  );

  const { getLuna } = lunaStore(
    (state) => ({
      getLuna: state.getLuna,
    }),
    shallow
  );

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts.titulo_de_la_vista]);

  useEffect(() => {
    setStateRetentions(getValueRetention);
  }, [getValueRetention]);

  useEffect(() => {
    handleArray();
  }, [getValueRetention]);

  const handleArray = () => {
    const isNotEmpty = getValueRetention.filter((value) => value !== '');
    if (isNotEmpty.length >= 4) {
      setButtonNext(true);
    } else if (isNotEmpty.length < 4) {
      setButtonNext(false);
    }
  };

  const handleSubmit = async () => {
    const id = getLuna().id;
    const object = {
      awarenesses: dataSaturno.awarenesses,
      considerations: dataSaturno.considerations,
      purchases: dataSaturno.purchases,
      retentions: dataSaturno.retentions,
    };
    const response = await saturnoCreateProject(id, object);
    if (response.status === 'OK') {
      setModal(true);
    }
  };

  return (
    <section>
      <ScrollToTop />
      <div className={saturno.card}>
        <img src={texts?.icono ? texts?.icono : magnet} alt="magnet" />
        <p>{texts.descripcion_1}</p>
      </div>
      <form method="POST">
        <br></br>
        <ValueRetention
          dataSaturno={dataSaturno}
          getValueRetention={getValueRetention}
          setValueRetention={setValueRetention}
          textDisabled={buttonNext}
        />
        <br></br>
        <div className={style.contentButtons}>
          <div className={style.flexButtons}>
            <button type="button" className={`${saturno.btnPlanet}`} onClick={() => setPage(4)}>
              ANTERIOR
            </button>
            <button
              type="button"
              className={buttonNext ? saturno.btnPlanet : saturno.btnPlanetOff}
              disabled={buttonNext ? '' : 'disabled'}
              onClick={() => handleSubmit()}
            >
              SIGUIENTE
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Saturno;
