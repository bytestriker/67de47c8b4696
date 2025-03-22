import { useState, useRef, useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

// Store
import { marteStore } from '@Store/marte';
import { lunaStore } from '@Store/luna';

// Hooks
import { useEventsMarte } from '@Hooks/useEventsMarte';
import { MarteWPText } from '@Hooks/useFetchWP';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { ParagraphPlanet } from '@Components/Atomos/Titles';
import { ModalMarte, ModalSalirMarte } from '@Components/Atomos/Modals';
import { ToolTip } from '@Components/Atomos/Tooltips';
import { SaberMas, ButtonClose } from '@Components/Atomos/Buttons';
import {
  ValueProposition,
  KeyActivities,
  RevenueStreams,
  CustomerRelationships,
  Channels,
  KeyPartners,
  CostStructure,
  CustomerSegments,
  KeyResources,
} from '@Components/Atomos/Inputs/marte';

// Images
import galaxia from '@Assets/images/galaxia.png';

// Styles
import style from '@Sass/pages/marte.module.scss';
import base from '@Sass/pages/general.module.scss';

const Marte = () => {
  const { marteGetProjectById, getModelBussines } = useEventsMarte();
  const { marteQ1, marteQ2, marteQ3 } = MarteWPText();
  const [page, setPage] = useState(1);
  const [modalSalir, setModalSalir] = useState(false);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(false);
  const [texts, setTexts] = useState({});
  const [texts2, setTexts2] = useState({});
  const [texts3, setTexts3] = useState({});

  // Stores
  const { dataMarte, setMarte, getMarte, setStateBussines } = marteStore(
    (state) => ({
      dataMarte: state.dataMarte,
      setMarte: state.setMarte,
      getMarte: state.getMarte,
      setStateBussines: state.setStateBussines,
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
    handleProject();
  }, []);

  const handleProject = async () => {
    const response = await marteGetProjectById();
    if (response.code === 0) {
      const {
        value_proposition,
        key_activities,
        revenue_streams,
        customer_relationships,
        channels,
        key_partners,
        cost_structure,
        customer_segments,
        key_resources,
      } = response.data;

      if (
        value_proposition.length === 0 ||
        key_activities.length === 0 ||
        revenue_streams.length === 0 ||
        customer_relationships.length === 0 ||
        channels.length === 0
      ) {
        setPage(1);
        return;
      }
      if (
        key_partners.length === 0 ||
        cost_structure.length === 0 ||
        customer_segments.length === 0 ||
        key_resources.length === 0
      ) {
        setPage(3);
        return;
      }
      const bussines = await getModelBussines(getLuna().id);
      if (bussines.code === 0) {
        const { value_proposition, revenue_streams, modelo_negocio } = bussines.data;
        if (value_proposition === '' || revenue_streams === '' || modelo_negocio === '') {
          setPage(4);
          return;
        }
      }
    } else if (response.code < 0) {
      setPage(1);
      return;
    }
  };

  useEffect(() => {
    if (marteQ1) {
      setTexts(marteQ1);
    }
  }, [marteQ1]);

  useEffect(() => {
    if (marteQ2) {
      setTexts2(marteQ2);
    }
  }, [marteQ2]);

  useEffect(() => {
    if (marteQ3) {
      setTexts3(marteQ3);
    }
  }, [marteQ3]);

  return (
    <section className={base.planetPageMain}>
      {modalSalir ? (
        <ModalSalirMarte
          title="Estás a punto de salir"
          message="¿Deseas guardar tu información?"
          setModalSalir={setModalSalir}
          data={dataMarte}
          page={page}
        />
      ) : null}
      <ScrollToTop />

      <div>
        <ButtonClose setModalSalir={setModalSalir} titlePage={title} />
        <div className={style.Marte}>
          <div className={base.pageContainer}>
            {page === 1 ? (
              <MarteQ1Valor
                setPage={setPage}
                getMarte={getMarte}
                setMarte={setMarte}
                dataMarte={dataMarte}
                setTitle={setTitle}
                texts={texts}
              />
            ) : (
              <></>
            )}
            {page === 2 ? (
              <MarteQ1Canvas
                setPage={setPage}
                setModal={setModal}
                modal={modal}
                setTitle={setTitle}
                texts={texts2}
              />
            ) : (
              <></>
            )}
            {page === 3 ? (
              <MarteQ2Canvas
                setPage={setPage}
                setModal={setModal}
                modal={modal}
                setTitle={setTitle}
                texts={texts2}
              />
            ) : (
              <></>
            )}
            {page === 4 ? (
              <MarteNegocios
                setPage={setPage}
                setModal={setModal}
                modal={modal}
                dataMarte={dataMarte}
                getMarte={getMarte}
                setTitle={setTitle}
                setStateBussines={setStateBussines}
                getLuna={getLuna}
                texts={texts3}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/** MARTE VALOR
 * page 1
 */
export const MarteQ1Valor = ({ setPage, setMarte, dataMarte, getMarte, setTitle, texts }) => {
  const projectValor = useRef(null);

  

  const handleSubmit = () => {
    setPage(2);
  };

  useEffect(() => {
  
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  return (
    <div className={style.marteQuestions}>
      <ScrollToTop />
      <div>
        <h3 className={style.valor}>{texts.pregunta}</h3>
        <ParagraphPlanet text={texts.descripcion} />
        <SaberMas data={texts} />
      </div>
      <form method="POST">
        <button
          type="button"
          className={style.btnPlanet}
          onClick={() => handleSubmit()}
        >
          SIGUIENTE
        </button>
      </form>
    </div>
  );
};

/** MARTE CANVAS
 * page 2
 */
export const MarteQ1Canvas = ({ setPage, setTitle, texts }) => {
  const [getValueProposition, setValueProposition] = useState(['', '', '']);
  const [getKeyActivities, setKeyActivities] = useState(['', '', '']);
  const [getRevenueStreams, setRevenueStreams] = useState(['', '', '']);
  const [getCustomerRelationships, setCustomerRelationships] = useState(['', '', '']);
  const [getChannels, setChannels] = useState(['', '', '']);
  const [buttonNext, setButtonNext] = useState(false);

  // Stores
  const {
    dataMarte,
    setStateValueProposition,
    setStateKeyActivities,
    setStateRevenueStreams,
    setStateCustomerRelationships,
    setStateChannels,
  } = marteStore(
    (state) => ({
      dataMarte: state.dataMarte,
      setStateValueProposition: state.setStateValueProposition,
      setStateKeyActivities: state.setStateKeyActivities,
      setStateRevenueStreams: state.setStateRevenueStreams,
      setStateCustomerRelationships: state.setStateCustomerRelationships,
      setStateChannels: state.setStateChannels,
    }),
    shallow
  );

  const handleSubmit = async () => {
    setPage(3);
  };

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  useEffect(() => {
    setStateValueProposition(getValueProposition);
  }, [getValueProposition]);

  useEffect(() => {
    setStateKeyActivities(getKeyActivities);
  }, [getKeyActivities]);

  useEffect(() => {
    setStateRevenueStreams(getRevenueStreams);
  }, [getRevenueStreams]);

  useEffect(() => {
    setStateCustomerRelationships(getCustomerRelationships);
  }, [getCustomerRelationships]);

  useEffect(() => {
    setStateChannels(getChannels);
  }, [getChannels]);

  useEffect(() => {
    handleButton();
  }, [dataMarte]);

  const handleButton = () => {
    // Verifica si todos los arrays tienen al menos un campo no vacío
    const allHaveAtLeastOne =
      getValueProposition.some((value) => value !== '') &&
      getKeyActivities.some((value) => value !== '') &&
      getRevenueStreams.some((value) => value !== '') &&
      getCustomerRelationships.some((value) => value !== '') &&
      getChannels.some((value) => value !== '');
    setButtonNext(allHaveAtLeastOne);
  };

  return (
    <div className={`${style.MarteHeight}`}>
      <div className={style.marteQuestions}>
        <ScrollToTop />

        <div>
          <h3 className={style.valor}>{texts.pregunta}</h3>
          <ParagraphPlanet text={texts.descripcion} />
          {// <SaberMas data={texts} /> 
          }
        </div>

        <form method="POST">
          <div className={style.inputContainer}>
            <ToolTip text="Propuesta de Valor" tool={texts.instruccion_1} />
            <ValueProposition
              dataMarte={dataMarte}
              getValueProposition={getValueProposition}
              setValueProposition={setValueProposition}
            />
          </div>

          <div className={style.inputContainer}>
            <ToolTip text="Actividades Clave" tool={texts.instruccion_2} />
            <KeyActivities
              dataMarte={dataMarte}
              getKeyActivities={getKeyActivities}
              setKeyActivities={setKeyActivities}
            />
          </div>

          <div className={style.inputContainer}>
            <ToolTip text="Fuentes de Ingreso" tool={texts.instruccion_3} />
            <RevenueStreams
              dataMarte={dataMarte}
              getRevenueStreams={getRevenueStreams}
              setRevenueStreams={setRevenueStreams}
            />
          </div>

          <div className={style.inputContainer}>
            <ToolTip text="Relaciones con Clientes" tool={texts.instruccion_4} />
            <CustomerRelationships
              dataMarte={dataMarte}
              getCustomerRelationships={getCustomerRelationships}
              setCustomerRelationships={setCustomerRelationships}
            />
          </div>

          <div className={style.inputContainer}>
            <ToolTip text="Canales" tool={texts.instruccion_5} />
            <Channels dataMarte={dataMarte} getChannels={getChannels} setChannels={setChannels} />
          </div>
          <br></br>

          <div className={style.contentButtons}>
            <button type="button" className={style.btnPlanet} onClick={() => setPage(1)}>
              ANTERIOR
            </button>
            <button
              type="button"
              className={buttonNext ? style.btnPlanet : style.btnPlanetOff}
              disabled={buttonNext ? '' : 'disabled'}
              onClick={() => handleSubmit()}
            >
              SIGUIENTE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/** MARTE Q2 CANVAS
 * page 3
 */
export const MarteQ2Canvas = ({ setPage, setModal, modal, setTitle, texts }) => {
  const { marteCreateProject } = useEventsMarte();
  const [getKeyPartners, setKeyPartners] = useState(['', '', '']);
  const [getCostStructure, setCostStructure] = useState(['', '', '']);
  const [getCustomerSegments, setCustomerSegments] = useState(['', '', '']);
  const [getKeyResources, setKeyResources] = useState(['', '', '']);
  const [buttonNext, setButtonNext] = useState(false);

  // Stores
  const {
    dataMarte,
    getMarte,
    setStateKeyPartners,
    setStateCostStructure,
    setStateCustomerSegments,
    setStateKeyResources,
  } = marteStore(
    (state) => ({
      dataMarte: state.dataMarte,
      getMarte: state.getMarte,
      setStateKeyPartners: state.setStateKeyPartners,
      setStateCostStructure: state.setStateCostStructure,
      setStateCustomerSegments: state.setStateCustomerSegments,
      setStateKeyResources: state.setStateKeyResources,
    }),
    shallow
  );

  const handleSubmit = async (param) => {
    const values = getMarte();
    const deleteVoid = {
      ...values,
      value_proposition: values.value_proposition.filter(Boolean),
      key_activities: values.key_activities.filter(Boolean),
      revenue_streams: values.revenue_streams.filter(Boolean),
      customer_relationships: values.customer_relationships.filter(Boolean),
      channels: values.channels.filter(Boolean),
      key_partners: values.key_partners.filter(Boolean),
      cost_structure: values.cost_structure.filter(Boolean),
      customer_segments: values.customer_segments.filter(Boolean),
      key_resources: values.key_resources.filter(Boolean),
    };
    const objetoSinCamposVacios = {
      ...deleteVoid,
    };

    if (deleteVoid.propuesta_valor === '') {
      delete objetoSinCamposVacios.propuesta_valor;
    }
    if (deleteVoid.value_proposition.length === 0) {
      delete objetoSinCamposVacios.value_proposition;
    }
    if (deleteVoid.key_activities.length === 0) {
      delete objetoSinCamposVacios.key_activities;
    }
    if (deleteVoid.revenue_streams.length === 0) {
      delete objetoSinCamposVacios.revenue_streams;
    }
    if (deleteVoid.customer_relationships.length === 0) {
      delete objetoSinCamposVacios.customer_relationships;
    }
    if (deleteVoid.channels.length === 0) {
      delete objetoSinCamposVacios.channels;
    }
    if (deleteVoid.key_partners.length === 0) {
      delete objetoSinCamposVacios.key_partners;
    }
    if (deleteVoid.cost_structure.length === 0) {
      delete objetoSinCamposVacios.cost_structure;
    }
    if (deleteVoid.customer_segments.length === 0) {
      delete objetoSinCamposVacios.customer_segments;
    }
    if (deleteVoid.key_resources.length === 0) {
      delete objetoSinCamposVacios.key_resources;
    }
    if (param === 'SAVE') {
      const response = await marteCreateProject(objetoSinCamposVacios);
      if (response.status === 'OK') {
        setModal(true);
        return;
      }
    } else if (param === 'NEXTPAGE') {
      const response = await marteCreateProject(objetoSinCamposVacios);
      if (response.status === 'OK') {
        setPage(4);
      }
    }
  };

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  useEffect(() => {
    setStateKeyPartners(getKeyPartners);
  }, [getKeyPartners]);

  useEffect(() => {
    setStateCostStructure(getCostStructure);
  }, [getCostStructure]);

  useEffect(() => {
    setStateCustomerSegments(getCustomerSegments);
  }, [getCustomerSegments]);

  useEffect(() => {
    setStateKeyResources(getKeyResources);
  }, [getKeyResources]);

  useEffect(() => {
    handleButton();
  }, [dataMarte]);

  const handleButton = () => {
    // Verifica si todos los arrays tienen al menos un campo no vacío
    const allHaveAtLeastOne =
      getKeyPartners.some((value) => value !== '') &&
      getCostStructure.some((value) => value !== '') &&
      getCustomerSegments.some((value) => value !== '') &&
      getKeyResources.some((value) => value !== '');
    setButtonNext(allHaveAtLeastOne);
  };

  return (
    <div className={style.marteQuestions}>
      {modal ? (
        <ModalMarte
          title=""
          message="Tus datos se han guardado correctamente."
          buttonName="Okay"
          setPage={setPage}
          setModal={setModal}
          page={3}
        />
      ) : null}
      <ScrollToTop />
      <br></br>
      <br></br>
      <form method="POST">
        <div className={style.inputContainer}>
          <ToolTip text="Alianzas Clave" tool={texts.instruccion_6} />
          <KeyPartners
            dataMarte={dataMarte}
            getKeyPartners={getKeyPartners}
            setKeyPartners={setKeyPartners}
          />
        </div>

        <div className={style.inputContainer}>
          <ToolTip text="Estructura de Costos" tool={texts.instruccion_7} />
          <CostStructure
            dataMarte={dataMarte}
            getCostStructure={getCostStructure}
            setCostStructure={setCostStructure}
          />
        </div>

        <div className={style.inputContainer}>
          <ToolTip text="Segmentos de Clientes" tool={texts.instruccion_8} />
          <CustomerSegments
            dataMarte={dataMarte}
            getCustomerSegments={getCustomerSegments}
            setCustomerSegments={setCustomerSegments}
          />
        </div>

        <div className={style.inputContainer}>
          <ToolTip text="Recursos Clave" tool={texts.instruccion_9} />
          <KeyResources
            dataMarte={dataMarte}
            getKeyResources={getKeyResources}
            setKeyResources={setKeyResources}
          />
        </div>

        <br></br>
        <div className={style.contentButtons}>
          <button type="button" className={style.btnPlanet} onClick={() => setPage(2)}>
            ANTERIOR
          </button>
          <button
            type="button"
            className={buttonNext ? style.btnPlanet : style.btnPlanetOff}
            disabled={buttonNext ? '' : 'disabled'}
            onClick={() => handleSubmit('SAVE')}
          >
            GUARDAR
          </button>
        </div>
        <button
          type="button"
          className={buttonNext ? style.btnStepDos : style.btnStepDosOff}
          disabled={buttonNext ? '' : 'disabled'}
          onClick={() => handleSubmit('NEXTPAGE')}
        >
          PASO 2
        </button>
      </form>
    </div>
  );
};

/** MARTE NEGOCIOS
 * page 4
 */
export const MarteNegocios = ({
  dataMarte,
  setPage,
  setModal,
  modal,
  getMarte,
  setTitle,
  setStateBussines,
  getLuna,
  texts,
}) => {
  const { marteCreateProjectBussines, getModelBussines } = useEventsMarte();
  const [getBussinesDesc, setBussinesDesc] = useState('');
  const [isOpenProposition, setIsOpenProposition] = useState(false);
  const [isOpenRevenue, setIsOpenRevenue] = useState(false);
  const [selectedPropsition, setSelectedPropsition] = useState('');
  const [selectedRevenue, setSelectedRevenue] = useState('');
  const inputBussines = useRef(null);

  useEffect(() => {
    handleValidateProject();
  }, []);

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  // validamos si existe un proyecto y actualizamos estado
  const handleValidateProject = async () => {
    const lunaProject = getLuna();
    const response = await getModelBussines(lunaProject.id);
    if (response.code === 0) {
      const marsService = response.data;
      setStateBussines({
        value_proposition: marsService.value_proposition,
        revenue_streams: marsService.revenue_streams,
        modelo_negocio: marsService.modelo_negocio,
      });
      setSelectedPropsition(marsService.value_proposition);
      setSelectedRevenue(marsService.revenue_streams);
      setBussinesDesc(marsService.modelo_negocio);
    } else if (response.code < 0) {
      setStateBussines({
        value_proposition: '',
        revenue_streams: '',
        modelo_negocio: '',
      });
    }
  };

  const handleSubmit = async () => {
    const object = {
      value_proposition: selectedPropsition,
      revenue_streams: selectedRevenue,
      modelo_negocio: getBussinesDesc,
    };
    setStateBussines(JSON.stringify(object));
    const response = await marteCreateProjectBussines(object);
    if (response.status === 'OK') {
      setModal(true);
    }
  };

  const handlePropositionClick = (option) => {
    setSelectedPropsition(option);
    setIsOpenProposition(false);
  };

  const handleRevenueClick = (option) => {
    setSelectedRevenue(option);
    setIsOpenRevenue(false);
  };

  const toggleSelectProposition = () => {
    setIsOpenProposition(!isOpenProposition);
  };

  const toggleSelectRevenue = () => {
    setIsOpenRevenue(!isOpenRevenue);
  };

  useEffect(() => {
    setStateBussines(
      JSON.stringify({
        value_proposition: selectedPropsition,
        revenue_streams: selectedRevenue,
        modelo_negocio: getBussinesDesc,
      })
    );
  }, [selectedPropsition, selectedRevenue, getBussinesDesc]);

  return (
    <div className={style.marteQuestions}>
      <ScrollToTop />
      {modal ? (
        <ModalMarte
          title="¡FELICIDADES!"
          message={`Haz completado <strong>Marte</strong> de tu proyecto <strong>${
            getLuna().nombre
          }</strong>`}
          buttonName="INICIO"
          setPage={setPage}
          setModal={setModal}
          page={5}
        />
      ) : null}
      <ParagraphPlanet text={texts.descripcion} />
      <br></br>
      <br></br>
      <div className={style.infoGalaxiaCruce}>
      <h5>
          Cruce entre
      </h5>
      </div>
      <div className={style.infoGalaxia}>
        <h5>
          Propuesta de <br></br>Valor
        </h5>
        <img src={galaxia} alt="galaxia" />
        <h5>
          Fuentes de <br></br>Ingreso
        </h5>
      </div>
      <form method="POST">
        <div className={style.selectContainer}>
          {//<ToolTip text="Propuesta de Valor" tool={texts.instruccion_1} />
          }
          <h4>Propuesta de Valor</h4>
          <div>
            <div className={style.selectHeader} onClick={toggleSelectProposition}>
              <span className={style.selectSpanText}>
                {selectedPropsition || 'Selecciona una opción'}
              </span>
              <span className={style.selectSpanArrow}>
                {isOpenProposition ? <FaCaretUp /> : <FaCaretDown />}
              </span>
            </div>
            {isOpenProposition && (
              <div className={style.selectOptions}>
                {dataMarte?.value_proposition.map((option, index) => (
                  <div
                    key={index}
                    className={style.option}
                    onClick={() => handlePropositionClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={style.selectContainer}>
          {//<ToolTip text="Fuentes de Ingreso" tool={texts.instruccion_2} />
          }
          <h4>Fuentes de Ingreso</h4>
          <div>
            <div className={style.selectHeader} onClick={toggleSelectRevenue}>
              <span className={style.selectSpanText}>
                {selectedRevenue || 'Selecciona una opción'}
              </span>
              <span className={style.selectSpanArrow}>
                {isOpenRevenue ? <FaCaretUp /> : <FaCaretDown />}
              </span>
            </div>
            {isOpenRevenue && (
              <div className={style.selectOptions}>
                {dataMarte?.revenue_streams.map((option, index) => (
                  <div
                    key={index}
                    className={style.option}
                    onClick={() => handleRevenueClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {//<SaberMas data={texts} />
        }
        <textarea
          ref={inputBussines}
          className={style.response}
          name="negocio"
          id="negocio"
          rows="10"
          onChange={(e) => setBussinesDesc(e.target.value)}
          placeholder="Escribe aquí tu modelo de negocio"
          defaultValue={getBussinesDesc}
        ></textarea>
        <div className={style.contentButtons}>
          <button type="button" className={style.btnPlanet} onClick={() => setPage(3)}>
            ANTERIOR
          </button>
          <button
            type="button"
            className={getBussinesDesc.length <= 12 ? style.btnPlanetOff : style.btnPlanet}
            disabled={getBussinesDesc.length <= 12 ? 'disabled' : ''}
            onClick={() => handleSubmit()}
          >
            SIGUIENTE
          </button>
        </div>
      </form>
    </div>
  );
};

export default Marte;
