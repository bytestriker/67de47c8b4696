import { useEffect, useState, useRef } from 'react';
import { shallow } from 'zustand/shallow';


import { FaChevronDown, FaChevronUp, FaPlusCircle, FaCaretDown, FaCaretUp } from 'react-icons/fa';

// Store
import { venusStore } from '@Store/venus';

// Hooks
import { useEventsVenus } from '@Hooks/useEventVenus';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { ParagraphPlanet } from '@Components/Atomos/Titles';
import { SaberMas } from '@Components/Atomos/Buttons';
import Button from '@Components/Button';

// Images
import cruce from '@Assets/images/cruce.png';

// Styles
import style from '@Sass/pages/venus.module.scss';
import { Form } from 'react-hook-form';

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
      setPage(5);
    }
  };

  return (
    <form method="POST" className="questionWrap">
      <ScrollToTop />
      {/* <h2 className="text-center">Cruce F.O.</h2> */}
      <h3 dangerouslySetInnerHTML={{ __html: texts.pregunta }}></h3>
      <p dangerouslySetInnerHTML={{ __html: texts.descripcion }}></p>
      <fieldset>
      {elementos.map((elemento, index) => (
        <div key={index} className="selectContainer">
          <div className="selectHeader" onClick={() => toggleSelectFortaleza(index)}>
            <span>{elemento.selectedFortaleza || 'Selecciona una fortaleza'}</span>
            { elemento.isOpenFortaleza ? <FaChevronUp /> : <FaChevronDown /> }
          </div>
          {elemento.isOpenFortaleza && (
            <div className="selectOptions">
            {fortaleza.map((option, optionIndex) => (
              <div key={optionIndex} onClick={() => handleFortalezaClick(index, option)}>
                {option}
              </div>
              ))}
            </div>
          )}
          <div className="selectHeader" onClick={() => toggleSelectOportunidad(index)}>
            <span>{elemento.selectedOportunidad || 'Selecciona una oportunidad'}</span>
            { elemento.isOpenFortaleza ? <FaChevronUp /> : <FaChevronDown /> }
          </div>
          {elemento.isOpenOportunidad && (
            <div className="selectOptions">
              {oportunidad.map((option, optionIndex) => (
                <div key={optionIndex} onClick={() => handleOportunidadClick(index, option)}>
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
          ))}
        <a className="buttonAdd" onClick={addElemento}>
          <span>Agregar más</span>
        </a>
      </fieldset>
      <fieldset>
        <textarea
          ref={inputConclusion}
          name="conclusion"
          id="conclusion"
          rows="8"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Cuéntanos a qué conclusiones llegaste"
          defaultValue={getDescription}
        ></textarea>
      </fieldset>
      <div className="buttons">
        <Button text="ANTERIOR" onClick={() => setPage(3)} shape="alt" />
        <Button
          text="SIGUIENTE"
          onClick={() => handleSubmit('save')}
          disabled={!buttonNext && 'disabled'}
          />
{/*         <Button
          text="SIGUIENTE"
          onClick={() => handleSubmit('next')}
          disabled={!buttonNext && 'disabled'}
          />
 */}      </div>
    </form>
  );
};
