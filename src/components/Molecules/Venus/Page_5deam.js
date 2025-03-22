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
 * Debilidades y amenazas
 * page 7
 */
export const VenusQ4Conclusion = ({
  dataVenus,
  setPage,
  setModal,
  setTitle,
  texts,
  setMessage,
}) => {
  const { venusGetProjectById, venusConclusionDEAM, venusCreateFoda4 } = useEventsVenus();
  const { setStateFoda4 } = venusStore(
    (state) => ({
      setStateFoda4: state.setStateFoda4,
    }),
    shallow
  );

  const inputConclusion = useRef(null);
  const [debilidad, setDebilidad] = useState([]);
  const [amenaza, setAmenaza] = useState([]);
  const [getDescription, setDescription] = useState(dataVenus.foda_4.conclusion || '');
  const [data, setData] = useState(dataVenus.foda_4.debilidades_amenazas|| []);
  const [estadoActual] = useState({
    debilidades_amenazas: [],
  });
  const [buttonNext, setButtonNext] = useState(false);
  const [elementos, setElementos] = useState([
    {
      isOpenDebilidad: false,
      selectedDebilidad: '',
      isOpenAmenaza: false,
      selectedAmenaza: '',
    },
  ]);

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  useEffect(() => {
    handleValidateProject();
  }, []);

  useEffect(() => {
    const { foda_4 } = dataVenus;
    if (
      foda_4?.conclusion.length >= 15 &&
      foda_4?.debilidades_amenazas.length > 0 &&
      foda_4?.debilidades_amenazas[0].debilidad !== '' &&
      foda_4?.debilidades_amenazas[0].amenaza !== ''
    ) {
      setButtonNext(true);
      return;
    } else {
      setButtonNext(false);
    }
  }, [dataVenus?.foda_4]);

  useEffect(() => {
    const foEstado = {
      debilidades_amenazas: data,
      conclusion: getDescription,
    };
    setStateFoda4(foEstado);
  }, [getDescription, data]);

  const handleValidateProject = async () => {
    const venus = await venusGetProjectById();
    if (venus.code === 0) {
      const foObjeto = {
        debilidad: venus.data.debilidades, 
        amenaza: venus.data.amenazas, 
      };
      const foEstado = {
        ...estadoActual,
        debilidades_amenazas: [...estadoActual.debilidades_amenazas, foObjeto],
      };
      setDebilidad(foEstado.debilidades_amenazas[0].debilidad);
      setAmenaza(foEstado.debilidades_amenazas[0].amenaza);
    }

    const foda = await venusConclusionDEAM();
    if (foda.code === 0) {
      const { debilidades_amenazas, conclusion } = foda.data;
      if (debilidades_amenazas.length > 0) {
        const foEstado = {
          debilidades_amenazas,
          conclusion,
        };
        setStateFoda4(foEstado);
        const array = debilidades_amenazas.map((elemento) => ({
          isOpenDebilidad: false,
          selectedDebilidad: elemento.debilidad,
          isOpenAmenaza: false,
          selectedAmenaza: elemento.amenaza,
        }));
        setElementos(array);
        setDescription(foda.data.conclusion);
        // setDescription(conclusion);
      }
    }
  };

  const toggleSelectDebilidad = (index) => {
    const updatedElementos = [...elementos];
    updatedElementos[index].isOpenDebilidad = !updatedElementos[index].isOpenDebilidad;
    setElementos(updatedElementos);
  };

  const handleDebilidadClick = (index, option) => {
    const updatedElementos = [...elementos];
    updatedElementos[index].selectedDebilidad = option;
    updatedElementos[index].isOpenDebilidad = false;
    setElementos(updatedElementos);
    handleUpdateElementos(updatedElementos);
  };

  const toggleSelectAmenaza = (index) => {
    const updatedElementos = [...elementos];
    updatedElementos[index].isOpenAmenaza = !updatedElementos[index].isOpenAmenaza;
    setElementos(updatedElementos);
  };

  const handleAmenazaClick = (index, option) => {
    const updatedElementos = [...elementos];
    updatedElementos[index].selectedAmenaza = option;
    updatedElementos[index].isOpenAmenaza = false;
    setElementos(updatedElementos);
    handleUpdateElementos(updatedElementos);
  };

  const handleUpdateElementos = (elements) => {
    const array = elements.map((elemento) => ({
      debilidad: elemento?.selectedDebilidad || '',
      amenaza: elemento?.selectedAmenaza || '',
    }));
    setData(array);
  };

  const addElemento = () => {
    setElementos([
      ...elementos,
      {
        isOpenDebilidad: false,
        selectedDebilidad: '',
        isOpenAmenaza: false,
        selectedAmenaza: '',
      },
    ]);
  };

  const handleSubmit = async (params) => {
    const array = elementos.map((elemento) => ({
      debilidad: elemento.selectedDebilidad,
      amenaza: elemento.selectedAmenaza,
    }));
    
    
    const objeto = {
      debilidades_amenazas: array,
      conclusion: getDescription,
    };
    console.log(objeto);
    const res = await venusCreateFoda4(objeto);
    if (res.code === 0) {
      if (params === 'save') {
        setMessage('Tus datos se han guardado correctamente.');
        setModal(true);
      } else if (params === 'next') {
        setPage(8);
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
          <label className={style.identify}>Debilidades y Amenazas</label>
          <img src={cruce} className={style.imgcruce} alt="cruce" />
        </span>
        <div>
          {elementos.map((elemento, index) => (
            <div key={index} className={style.selectContainer}>
              <div className={style.selectHeader} onClick={() => toggleSelectDebilidad(index)}>
                <span className={style.selectSpanText}>
                  {elemento.selectedDebilidad || 'Selecciona una debilidad'}
                </span>
                <span className={style.selectSpanArrow}>
                  {elemento.isOpenDebilidad ? <FaCaretUp /> : <FaCaretDown />}
                </span>
              </div>
              {elemento.isOpenDebilidad && (
                <div className={style.selectOptions}>
                  {debilidad.map((option, optionIndex) => (
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

              <div className={style.selectHeader} onClick={() => toggleSelectAmenaza(index)}>
                <span className={style.selectSpanText}>
                  {elemento.selectedAmenaza || 'Selecciona una amenaza'}
                </span>
                <span className={style.selectSpanArrow}>
                  {elemento.isOpenAmenaza ? <FaCaretUp /> : <FaCaretDown />}
                </span>
              </div>
              {elemento.isOpenAmenaza && (
                <div className={style.selectOptions}>
                  {amenaza.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={style.option}
                      onClick={() => handleAmenazaClick(index, option)}
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
          <button type="button" className={style.btnPlanet} onClick={() => setPage(6)}>
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
          BUYER PERSONA
        </button>
        <br></br>
      </form>
    </section>
  );
};
