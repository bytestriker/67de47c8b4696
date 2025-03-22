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

import cruce from '@Assets/images/cruce.png';

// Styles
import style from '@Sass/pages/venus.module.scss';

/** VENUS CONCLUSIONES
 * Oportunidades y Debilidades
 * page 5
 */
export const VenusQ2Conclusion = ({
  dataVenus,
  setPage,
  setModal,
  setTitle,
  texts,
  setMessage,
}) => {
  const { venusGetProjectById, venusConclusionDA, venusCreateFoda2 } = useEventsVenus();
  const { setStateFoda2 } = venusStore(
    (state) => ({
      setStateFoda2: state.setStateFoda2,
    }),
    shallow
  );

  const inputConclusion = useRef(null);
  const [debilidades, setDebilidades] = useState([]);
  const [oportunidad, setOportunidad] = useState([]);
  const [getDescription, setDescription] = useState(dataVenus.foda_2.conclusion || '');
  const [data, setData] = useState(dataVenus.foda_2.oportunidades_debilidades || []);
  const [estadoActual] = useState({
    oportunidades_debilidades: [],
  });
  const [buttonNext, setButtonNext] = useState(false);
  const [elementos, setElementos] = useState([
    {
      isOpenDebilidades: false,
      selectedDebilidades: '',
      isOpenOportunidades: false,
      selectedOportunidades: '',
    },
  ]);

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  useEffect(() => {
    handleValidateProject();
  }, []);

  useEffect(() => {
    const { foda_2 } = dataVenus;
    if (
      foda_2?.conclusion.length >= 15 &&
      foda_2?.oportunidades_debilidades.length > 0 &&
      foda_2?.oportunidades_debilidades[0].debilidades !== '' &&
      foda_2?.oportunidades_debilidades[0].oportunidad !== ''
    ) {
      setButtonNext(true);
      return;
    } else {
      setButtonNext(false);
    }
  }, [dataVenus?.foda_2]);

  useEffect(() => {
    const foEstado = {
      oportunidades_debilidades: data,
      conclusion: getDescription,
    };
    setStateFoda2(foEstado);
  }, [getDescription, data]);

  const handleValidateProject = async () => {
    const venus = await venusGetProjectById();
    if (venus.code === 0) {
      const foObjeto = {
        debilidades: venus.data.debilidades,
        oportunidad: venus.data.oportunidades,
      };
      const foEstado = {
        ...estadoActual,
        oportunidades_debilidades: [...estadoActual.oportunidades_debilidades, foObjeto],
      };
      setDebilidades(foEstado.oportunidades_debilidades[0].debilidades);
      setOportunidad(foEstado.oportunidades_debilidades[0].oportunidad);
      // setElementos(foEstado.oportunidades_debilidades);
    }

    const foda = await venusConclusionDA();
    if (foda.code === 0) {
      const { oportunidades_debilidades, conclusion } = foda.data;
      if (oportunidades_debilidades.length > 0) {
        const foEstado = {
          oportunidades_debilidades,
          conclusion,
        };
        setStateFoda2(foEstado);
        const array = oportunidades_debilidades.map((elemento) => ({
          isOpenDebilidades: false,
          selectedDebilidades: elemento.debilidad,
          isOpenOportunidades: false,
          selectedOportunidades: elemento.oportunidad,
        }));
        setElementos(array);
        setDescription(foda.data.conclusion);
        // setDescription(conclusion);
      }
    }
  };

  const toggleSelectDebilidad = (index) => {
    const updatedElementos = [...elementos];
    updatedElementos[index].isOpenDebilidades = !updatedElementos[index].isOpenDebilidades;
    setElementos(updatedElementos);
  };

  const handleDebilidadClick = (index, option) => {
    const updatedElementos = [...elementos];
    updatedElementos[index].selectedDebilidades = option;
    updatedElementos[index].isOpenDebilidades = false;
    setElementos(updatedElementos);
    handleUpdateElementos(updatedElementos);
  };

  const toggleSelectOportunidad = (index) => {
    const updatedElementos = [...elementos];
    updatedElementos[index].isOpenOportunidades = !updatedElementos[index].isOpenOportunidades;
    setElementos(updatedElementos);
  };

  const handleOportunidadClick = (index, option) => {
    const updatedElementos = [...elementos];
    updatedElementos[index].selectedOportunidades = option;
    updatedElementos[index].isOpenOportunidades = false;
    setElementos(updatedElementos);
    handleUpdateElementos(updatedElementos);
  };

  const handleUpdateElementos = (elements) => {
    const array = elements.map((elemento) => ({
      debilidades: elemento?.selectedDebilidades || '',
      oportunidad: elemento?.selectedOportunidades || '',
    }));
    setData(array);
  };

  const addElemento = () => {
    setElementos([
      ...elementos,
      {
        isOpenDebilidades: false,
        selectedDebilidades: '',
        isOpenOportunidades: false,
        selectedOportunidades: '',
      },
    ]);
  };

  const handleSubmit = async (params) => {
    const array = elementos.map((elemento) => ({
      debilidad: elemento.selectedDebilidades,
      oportunidad: elemento.selectedOportunidades,
    }));
    const objeto = {
      oportunidades_debilidades: array,
      conclusion: getDescription,
    };
    const res = await venusCreateFoda2(objeto);
    if (res.code === 0) {
      if (params === 'save') {
        setMessage('Tus datos se han guardado correctamente.');
        setModal(true);
      } else if (params === 'next') {
        setPage(6);
      }
    }
  };

  return (
    <section className={style.venusQuestions}>
      <ScrollToTop />
      <div>
        {/* <h3 className={style.paintpoint}>Cruce</h3> */}
        <h3 className={style.paintpoint}>{texts.pregunta}</h3>
        <ParagraphPlanet text={texts.descripcion} />
        {/* <SaberMas data={texts} /> */}
      </div>
      <br></br>
      <form method="POST">
        <span>
          <label className={style.identify}>Oportunidades y Debilidades</label>
          <img src={cruce} className={style.imgcruce} alt="cruce" />
        </span>
        <div>
          {elementos.map((elemento, index) => (
            <div key={index} className={style.selectContainer}>
              <div className={style.selectHeader} onClick={() => toggleSelectOportunidad(index)}>
                <span className={style.selectSpanText}>
                  {elemento.selectedOportunidades || 'Selecciona una oportunidad'}
                </span>
                <span className={style.selectSpanArrow}>
                  {elemento.isOpenOportunidades ? <FaCaretUp /> : <FaCaretDown />}
                </span>
              </div>
              {elemento.isOpenOportunidades && (
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

              <div className={style.selectHeader} onClick={() => toggleSelectDebilidad(index)}>
                <span className={style.selectSpanText}>
                  {elemento.selectedDebilidades || 'Selecciona una debilidad'}
                </span>
                <span className={style.selectSpanArrow}>
                  {elemento.isOpenDebilidades ? <FaCaretUp /> : <FaCaretDown />}
                </span>
              </div>
              {elemento.isOpenDebilidades && (
                <div className={style.selectOptions}>
                  {debilidades.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={style.option}
                      onClick={() => handleDebilidadClick(index, option)}
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
          <button type="button" className={style.btnPlanet} onClick={() => setPage(4)}>
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
