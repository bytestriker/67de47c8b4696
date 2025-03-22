import { useEffect, useState, useRef } from 'react';
import { shallow } from 'zustand/shallow';

import { FaPlusCircle, FaCaretDown, FaCaretUp } from 'react-icons/fa';

// Store
import { venusStore } from '@Store/venus';

// Hooks
import { useEventsVenus } from '@Hooks/useEventVenus';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { ParagraphPlanet } from '@Components/Atomos/Titles';
import { SaberMas } from '@Components/Atomos/Buttons';

// Images
import cruce from '@Assets/images/cruce.png';

// Styles
import style from '@Sass/pages/venus.module.scss';

/** VENUS CONCLUSIONES
 * Fortalezas y oportunidades
 * page 4
 */
export const VenusQ1Conclusion = ({
  dataVenus,
  setPage,
  setModal,
  setTitle,
  texts,
  setMessage,
}) => {
  const { venusGetProjectById, venusConclusionFO, venusCreateFoda1 } = useEventsVenus();
  const { setStateFoda } = venusStore(
    (state) => ({
      setStateFoda: state.setStateFoda,
    }),
    shallow
  );
  const inputConclusion = useRef(null);
  const [fortaleza, setFortaleza] = useState([]);
  const [oportunidad, setOportunidad] = useState([]);
  const [getDescription, setDescription] = useState(dataVenus.foda_1.conclusion || '');
  const [data, setData] = useState(dataVenus.foda_1.fortalezas_oportunidades || []);
  const [estadoActual] = useState({
    fortalezas_oportunidades: [],
  });
  const [buttonNext, setButtonNext] = useState(false);
  const [elementos, setElementos] = useState([
    {
      isOpenFortaleza: false,
      selectedFortaleza: '',
      isOpenOportunidad: false,
      selectedOportunidad: '',
    },
  ]);

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  useEffect(() => {
    handleValidateProject();
  }, []);

  useEffect(() => {
    const { foda_1 } = dataVenus;
    if (
      foda_1.conclusion.length >= 15 &&
      foda_1.fortalezas_oportunidades.length > 0 &&
      foda_1.fortalezas_oportunidades[0].fortaleza !== '' &&
      foda_1.fortalezas_oportunidades[0].oportunidad !== ''
    ) {
      setButtonNext(true);
      return;
    } else {
      setButtonNext(false);
    }
  }, [dataVenus?.foda_1]);

  useEffect(() => {
    const foEstado = {
      fortalezas_oportunidades: data,
      conclusion: getDescription,
    };
    setStateFoda(foEstado);
  }, [getDescription, data]);

  const handleValidateProject = async () => {
    const venus = await venusGetProjectById();
    if (venus.code === 0) {
      const foObjeto = {
        fortaleza: venus.data.fortalezas,
        oportunidad: venus.data.oportunidades,
      };
      const foEstado = {
        ...estadoActual,
        fortalezas_oportunidades: [...estadoActual.fortalezas_oportunidades, foObjeto],
      };
      setFortaleza(foEstado.fortalezas_oportunidades[0].fortaleza);
      setOportunidad(foEstado.fortalezas_oportunidades[0].oportunidad);
      setElementos(foEstado.fortalezas_oportunidades);
    }

    const foda = await venusConclusionFO();
    if (foda.code === 0) {
      const { fortalezas_oportunidades, conclusion } = foda.data;
      if (fortalezas_oportunidades.length > 0) {
        const foEstado = {
          fortalezas_oportunidades,
          conclusion,
        };
        setStateFoda(foEstado);
        const array = fortalezas_oportunidades.map((elemento) => ({
          isOpenFortaleza: false,
          selectedFortaleza: elemento.fortaleza,
          isOpenOportunidad: false,
          selectedOportunidad: elemento.oportunidad,
        }));
        setElementos(array);
        setDescription(conclusion);
      }
    }
  };

  const toggleSelectFortaleza = (index) => {
    const updatedElementos = [...elementos];
    updatedElementos[index].isOpenFortaleza = !updatedElementos[index].isOpenFortaleza;
    setElementos(updatedElementos);
  };

  const handleFortalezaClick = (index, option) => {
    const updatedElementos = [...elementos];
    updatedElementos[index].selectedFortaleza = option;
    updatedElementos[index].isOpenFortaleza = false;
    setElementos(updatedElementos);
    handleUpdateElementos(updatedElementos);
  };

  const toggleSelectOportunidad = (index) => {
    const updatedElementos = [...elementos];
    updatedElementos[index].isOpenOportunidad = !updatedElementos[index].isOpenOportunidad;
    setElementos(updatedElementos);
  };

  const handleOportunidadClick = (index, option) => {
    const updatedElementos = [...elementos];
    updatedElementos[index].selectedOportunidad = option;
    updatedElementos[index].isOpenOportunidad = false;
    setElementos(updatedElementos);
    handleUpdateElementos(updatedElementos);
  };

  const handleUpdateElementos = (elements) => {
    const array = elements.map((elemento) => ({
      fortaleza: elemento?.selectedFortaleza || '',
      oportunidad: elemento?.selectedOportunidad || '',
    }));
    setData(array);
  };

  const addElemento = () => {
    setElementos([
      ...elementos,
      {
        isOpenFortaleza: false,
        selectedFortaleza: '',
        isOpenOportunidad: false,
        selectedOportunidad: '',
      },
    ]);
  };

  const handleSubmit = async (params) => {
    const array = elementos.map((elemento) => ({
      fortaleza: elemento.selectedFortaleza,
      oportunidad: elemento.selectedOportunidad,
    }));
    const objeto = {
      fortalezas_oportunidades: array,
      conclusion: getDescription,
    };
    const res = await venusCreateFoda1(objeto);
    if (res.code === 0) {
      if (params === 'save') {
        setMessage('Tus datos se han guardado correctamente.');
        setModal(true);
      } else if (params === 'next') {
        setPage(5);
      }
    } 
  };

  return (
    <section className={style.venusQuestions}>
      <ScrollToTop />

      <div>
        <h3 className={style.paintpoint}>{texts.pregunta}</h3>
        <ParagraphPlanet text={texts.descripcion} />
        {/* <SaberMas data={texts} /> */}
      </div>
      <br></br>
      <form method="POST">
        <span>
          <label className={style.identify}>Fortalezas y Oportunidades</label>
          <img src={cruce} className={style.imgcruce} alt="cruce" />
        </span>
        <div>
          {elementos.map((elemento, index) => (
            <div key={index} className={style.selectContainer}>
              <div className={style.selectHeader} onClick={() => toggleSelectFortaleza(index)}>
                <span className={style.selectSpanText}>
                  {elemento.selectedFortaleza || 'Selecciona una fortaleza'}
                </span>
                <span className={style.selectSpanArrow}>
                  {elemento.isOpenFortaleza ? <FaCaretUp /> : <FaCaretDown />}
                </span>
              </div>
              {elemento.isOpenFortaleza && (
                <div className={style.selectOptions}>
                  {fortaleza.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={style.option}
                      onClick={() => handleFortalezaClick(index, option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
              <div className={style.selectHeader} onClick={() => toggleSelectOportunidad(index)}>
                <span className={style.selectSpanText}>
                  {elemento.selectedOportunidad || 'Selecciona una oportunidad'}
                </span>
                <span className={style.selectSpanArrow}>
                  {elemento.isOpenOportunidad ? <FaCaretUp /> : <FaCaretDown />}
                </span>
              </div>
              {elemento.isOpenOportunidad && (
                <div className={style.selectOptions}>
                  {oportunidad.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={style.option}
                      onClick={() => handleOportunidadClick(index, option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <span className={style.add} onClick={addElemento}>
            <FaPlusCircle className={style.icon} /> <b>Agregar más</b>
          </span>
        </div>
        <br></br>
        <textarea
          ref={inputConclusion}
          className={style.conclusion}
          name="conclusion"
          id="conclusion"
          rows="8"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Cuéntanos a qué conclusiones llegaste"
          defaultValue={getDescription}
        ></textarea>

        <div className={style.buttonsContent}>
          <button type="button" className={style.btnPlanet} onClick={() => setPage(3)}>
            ANTERIOR
          </button>
          <button
            type="button"
            className={buttonNext ? style.btnPlanet : style.btnPlanetOff}
            disabled={buttonNext ? '' : 'disabled'}
            onClick={() => handleSubmit('save')}
          >
            GUARDAR
          </button>
        </div>
        <button
          type="button"
          className={buttonNext ? style.btnStepDos : style.btnStepDosOff}
          disabled={buttonNext ? '' : 'disabled'}
          onClick={() => handleSubmit('next')}
        >
          SIGUIENTE
        </button>
        <br></br>
      </form>
    </section>
  );
};
