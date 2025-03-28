import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useForm } from 'react-hook-form';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { QuestionH4, ParagraphPlanet } from '@Components/Atomos/Titles';
import { ButtonClose, SaberMas } from '@Components/Atomos/Buttons';
import { ModalSuccesProject } from '@Components/Atomos/Alerts';
import { ModalMercurio } from '@Components/Atomos/Modals';

// Store
import { mercurioStore } from '@Store/mercurio';
import { lunaStore } from '@Store/luna';

// Hooks
import { useEventsMercurio } from '@Hooks/useEventsMercurio';
import { MercurioWPText } from '@Hooks/useFetchWP';

// Images
import Mercurio from '@Assets/images/mercurio.png';

// Styles
import general from '@Sass/pages/general.module.scss';
import style from '@Sass/pages/mercurio.module.scss';

const MercurioMain = () => {
  const { mercurioGetProjectById } = useEventsMercurio();
  const { mercurioQ1, mercurioQ2, mercurioQ3 } = MercurioWPText();
  const [page, setPage] = useState(1);
  const [alert, setAlert] = useState(false);
  const [modalSalir, setModalSalir] = useState(false);

  const [texts, setTexts] = useState({});
  const [texts2, setTexts2] = useState({});
  const [texts3, setTexts3] = useState({});
  const [titlePage, setTitlePage] = useState('LA MISIÓN');

  // Stores
  const { dataMercurio, getMercurio, setStateMercurio } = mercurioStore(
    (state) => ({
      dataMercurio: state.dataMercurio,
      getMercurio: state.getMercurio,
      setStateMercurio: state.setMercurio,
    }),
    shallow
  );

  const { getLuna } = lunaStore(
    (state) => ({
      getLuna: state.getLuna,
    }),
    shallow
  );

  // Manejo del proyecto mercurio
  useEffect(() => {
    handleValidateProject();
  }, []);

  useEffect(() => {
    if (mercurioQ1) {
      setTexts(mercurioQ1);
    }
  }, [mercurioQ1]);

  useEffect(() => {
    if (mercurioQ2) {
      setTexts2(mercurioQ2);
    }
  }, [mercurioQ2]);

  useEffect(() => {
    if (mercurioQ3) {
      setTexts3(mercurioQ3);
    }
  }, [mercurioQ3]);

  // validamos si existe un proyecto y actualizamos estado
  const handleValidateProject = async () => {
    const lunaProject = getLuna();
    await mercurioGetProjectById(lunaProject?.id);
    if (getMercurio()) {
      const mercurio = getMercurio();
      // if (mercurio.que_resuelve === '') {
      //   setPage(1);
      // } else if (mercurio.a_quien_resuelve === '') {
      //   setPage(2);
      // } else if (mercurio.a_quien_resuelve_new === '') {
      //   setPage(3);
      // }
      if (mercurio.que_resuelve === '') {
        setPage(1);
      } else if (mercurio.a_quien_resuelve === '') {
        setPage(2);
      } else if (mercurio.a_quien_resuelve_new === '') {
        setPage(3);
      }
    }
  };

  return (
    <section className={general.planetWrap}>
      {modalSalir ? (
        <ModalMercurio
          title="Estás a punto de salir"
          message="¿Deseas guardar tu información?"
          setModalSalir={setModalSalir}
          data={dataMercurio}
        />
      ) : null}

      {alert ? <ModalSuccesProject setAlert={setAlert} /> : null}

      <ScrollToTop />

      <div className={general.planetContainer}>
        <div className={general.planetContent}>
          <div className={general.pageContainer}>
            <ButtonClose setModalSalir={setModalSalir} titlePage={titlePage} />
            <div className={style.Mercurio}>
              {page === 1 ? (
                <MercurioQ1
                  setPage={setPage}
                  setStateMercurio={setStateMercurio}
                  dataMercurio={dataMercurio}
                  setTitlePage={setTitlePage}
                  texts={texts}
                />
              ) : null}
              {page === 2 ? (
                <MercurioQ2
                  setAlert={setAlert}
                  setPage={setPage}
                  setStateMercurio={setStateMercurio}
                  dataMercurio={dataMercurio}
                  setTitlePage={setTitlePage}
                  texts={texts2}
                />
              ) : null}
              {page === 3 ? (
                <MercurioQ3
                  setAlert={setAlert}
                  setPage={setPage}
                  setStateMercurio={setStateMercurio}
                  dataMercurio={dataMercurio}
                  setTitlePage={setTitlePage}
                  texts={texts3}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const MercurioQ1 = ({ setStateMercurio, dataMercurio, setPage, setTitlePage, texts }) => {
  const { register } = useForm();

  const handleQ1Mercurio = (event) => {
    setStateMercurio({ ...dataMercurio, que_resuelve: event.target.value });
  };

  useEffect(() => {
    setTitlePage(texts.titulo_de_la_vista);
  }, [texts]);

  return (
    <div>
      <div className={style.MercurioInfo}>
        <QuestionH4 questiontext={texts.pregunta} />
        <ParagraphPlanet text={texts.descripcion} />
        {/* <SaberMas data={texts} /> */}
      </div>
      <br></br>
      <form className={style.MercurioQS} method="POST">
        <div className={style.labelContent}>
          <label htmlFor="launchQ1" className={style.labelPage}>
            1/3
          </label>
        </div>
        {/* <textarea
          className={style.inputProjectName}
          name="mercurioQ1"
          id="mercurioQ1"
          placeholder="Escribe aquí tu idea"
          {...register('mercurioQ1', { required: true, minLength: 16 })}
          cols="30"
          rows="10"
          value={dataMercurio.que_resuelve}
          onChange={(e) => handleQ1Mercurio(e)}
        ></textarea> */}
        <div className={style.buttonsContent}>
          {/* <button
            className={
              dataMercurio.que_resuelve.length <= 12 ? style.btnPlanetOff : style.btnPlanet
            }
            type="button"
            disabled={dataMercurio.que_resuelve.length <= 12 ? 'disabled' : ''}
            onClick={() => setPage(2)}
          >
            SIGUIENTE
          </button> */}
          <button className={style.btnPlanet} type="button" onClick={() => setPage(2)}>
            SIGUIENTE
          </button>
        </div>
      </form>
    </div>
  );
};

export const MercurioQ2 = ({
  setPage,
  setAlert,
  setStateMercurio,
  dataMercurio,
  setTitlePage,
  texts,
}) => {
  const { mercurioCreateProject } = useEventsMercurio();
  // Stores
  const { getMercurio } = mercurioStore(
    (state) => ({
      dataMercurio: state.dataMercurio,
      getMercurio: state.getMercurio,
      setStateMercurio: state.setMercurio,
    }),
    shallow
  );
  const { register } = useForm();

  const handleQ2Mercurio = (event) => {
    setStateMercurio({ ...dataMercurio, a_quien_resuelve: event.target.value });
  };

  // creamos proyecto si se completan las preguntas
  const saveProject = async () => {
    const response = await mercurioCreateProject(getMercurio());
    if (response.status === 'OK') {
      setAlert(true);
    }
  };

  useEffect(() => {
    setTitlePage(texts.titulo_de_la_vista);
  }, [texts]);

  return (
    <div>
      <div className={style.MercurioInfo}>
        <QuestionH4 questiontext={texts.pregunta} />
        <ParagraphPlanet text={texts.descripcion} />
        <SaberMas data={texts} />
      </div>
      <br></br>
      <form className={style.MercurioQS} method="POST">
        <div className={style.labelContent}>
          <label htmlFor="launchQ2" className={style.labelPage}>
            2/3
          </label>
        </div>
        <textarea
          className={style.inputProjectName}
          name="mercurioQ2"
          id="mercurioQ2"
          placeholder="Escribe aquí tu idea"
          {...register('mercurioQ2', { required: true, minLength: 16 })}
          cols="30"
          rows="10"
          value={dataMercurio.a_quien_resuelve}
          onChange={(e) => handleQ2Mercurio(e)}
        ></textarea>
        <div className={style.buttonsContent}>
          <button type="button" className={style.btnPlanet} onClick={() => setPage(1)}>
            ANTERIOR
          </button>
          <button
            className={
              dataMercurio.a_quien_resuelve.length <= 12 ? style.btnPlanetOff : style.btnPlanet
            }
            type="button"
            disabled={dataMercurio.a_quien_resuelve.length <= 12 ? 'disabled' : ''}
            onClick={() => setPage(3)}
          >
            SIGUIENTE
          </button>
          {/* <button
            className={
              dataMercurio.a_quien_resuelve.length <= 12 ? style.btnPlanetOff : style.btnPlanet
            }
            type="button"
            disabled={dataMercurio.a_quien_resuelve.length <= 12 ? 'disabled' : ''}
            onClick={() => saveProject()}
          >
            GUARDAR
          </button> */}
        </div>
      </form>
    </div>
  );
};

export const MercurioQ3 = ({
  setPage,
  setAlert,
  setStateMercurio,
  dataMercurio,
  setTitlePage,
  texts,
}) => {
  const { mercurioCreateProject } = useEventsMercurio();
  // Stores
  const { getMercurio } = mercurioStore(
    (state) => ({
      dataMercurio: state.dataMercurio,
      getMercurio: state.getMercurio,
      setStateMercurio: state.setMercurio,
    }),
    shallow
  );
  const { register } = useForm();

  const handleQ3Mercurio = (event) => {
    setStateMercurio({ ...dataMercurio, a_quien_resuelve_new: event.target.value });
  };

  // creamos proyecto si se completan las preguntas
  const saveProject = async () => {
    const response = await mercurioCreateProject(getMercurio());
    if (response.status === 'OK') {
      setAlert(true);
    }
  };

  useEffect(() => {
    setTitlePage(texts.titulo_de_la_vista);
  }, [texts]);

  return (
    <div>
      <div className={style.MercurioInfo}>
        <QuestionH4 questiontext={texts.pregunta} />
        <ParagraphPlanet text={texts.descripcion} />
        <SaberMas data={texts} />
      </div>
      <br></br>
      <form className={style.MercurioQS} method="POST">
        <div className={style.labelContent}>
          <label htmlFor="launchQ3" className={style.labelPage}>
            3/3
          </label>
        </div>
        <textarea
          className={style.inputProjectName}
          name="mercurioQ3"
          id="mercurioQ3"
          placeholder="Escribe aquí tu idea"
          {...register('mercurioQ3', { required: true, minLength: 16 })}
          cols="30"
          rows="10"
          value={dataMercurio.a_quien_resuelve_new}
          onChange={(e) => handleQ3Mercurio(e)}
        ></textarea>
        <div className={style.buttonsContent}>
          <button type="button" className={style.btnPlanet} onClick={() => setPage(2)}>
            ANTERIOR
          </button>
          <button
            className={
              dataMercurio.a_quien_resuelve_new.length <= 12 ? style.btnPlanetOff : style.btnPlanet
            }
            type="button"
            disabled={dataMercurio.a_quien_resuelve_new.length <= 12 ? 'disabled' : ''}
            onClick={() => saveProject()}
          >
            GUARDAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default MercurioMain;
