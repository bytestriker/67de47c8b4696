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
import Button from '@Components/Button';

import cruce from '@Assets/images/cruce.png';

// Styles
import style from '@Sass/pages/venus.module.scss';

/** VENUS CONCLUSIONES
 * Fortalezas y amenazas
 * page 6
 */
export const VenusQ3Conclusion = ({
  dataVenus,
  setPage,
  setModal,
  setTitle,
  texts,
  setMessage,
}) => {
  const { venusGetProjectById, venusConclusionFA, venusCreateFoda3 } = useEventsVenus();
  const { setStateFoda3 } = venusStore(
    (state) => ({
      setStateFoda3: state.setStateFoda3,
    }),
    shallow
  );

  const inputConclusion = useRef(null);
  const [fortaleza, setFortaleza] = useState([]);
  const [amenaza, setAmenaza] = useState([]);
  const [getDescription, setDescription] = useState(dataVenus.foda_3.conclusion || '');
  const [data, setData] = useState(dataVenus.foda_3.fortalezas_amenazas|| []);
  const [estadoActual] = useState({
    fortalezas_amenazas: [],
  });
  const [buttonNext, setButtonNext] = useState(false);
  const [elementos, setElementos] = useState([
    {
      isOpenFortaleza: false,
      selectedFortaleza: '',
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
    const { foda_3 } = dataVenus;
    if (
      foda_3?.conclusion.length >= 15 &&
      foda_3?.fortalezas_amenazas.length > 0 &&
      foda_3?.fortalezas_amenazas[0].fortaleza !== '' &&
      foda_3?.fortalezas_amenazas[0].amenaza !== ''
    ) {
      setButtonNext(true);
      return;
    } else {
      setButtonNext(false);
    }
  }, [dataVenus?.foda_3]);

  useEffect(() => {
    const foEstado = {
      fortalezas_amenazas: data,
      conclusion: getDescription,
    };
    setStateFoda3(foEstado);
  }, [getDescription, data]);

  const handleValidateProject = async () => {
    const venus = await venusGetProjectById();
    if (venus.code === 0) {
      const foObjeto = {
        fortaleza: venus.data.fortalezas, 
        amenaza: venus.data.amenazas, 
      };
      const foEstado = {
        ...estadoActual,
        fortalezas_amenazas: [...estadoActual.fortalezas_amenazas, foObjeto],
      };
      setFortaleza(foEstado.fortalezas_amenazas[0].fortaleza);
      setAmenaza(foEstado.fortalezas_amenazas[0].amenaza);
    }

    const foda = await venusConclusionFA();
    if (foda.code === 0) {
      const { fortalezas_amenazas, conclusion } = foda.data;
      if (fortalezas_amenazas.length > 0) {
        const foEstado = {
          fortalezas_amenazas,
          conclusion,
        };
        setStateFoda3(foEstado);
        const array = fortalezas_amenazas.map((elemento) => ({
          isOpenFortaleza: false,
          selectedFortaleza: elemento.fortaleza,
          isOpenAmenaza: false,
          selectedAmenaza: elemento.amenaza,
        }));
        setElementos(array);
        setDescription(foda.data.conclusion);
        // setDescription(conclusion);
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
      fortaleza: elemento?.selectedFortaleza || '',
      amenaza: elemento?.selectedAmenaza || '',
    }));
    setData(array);
  };

  const addElemento = () => {
    setElementos([
      ...elementos,
      {
        isOpenFortaleza: false,
        selectedFortaleza: '',
        isOpenAmenaza: false,
        selectedAmenaza: '',
      },
    ]);
  };

  const handleSubmit = async (params) => {
    const array = elementos.map((elemento) => ({
      fortaleza: elemento.selectedFortaleza,
      amenaza: elemento.selectedAmenaza,
    }));
    
    
    const objeto = {
      fortalezas_amenazas: array,
      conclusion: getDescription,
    };
    console.log(objeto);
    const res = await venusCreateFoda3(objeto);
    if (res.code === 0) {
      if (params === 'save') {
        setMessage('Tus datos se han guardado correctamente.');
        setModal(true);
      } else if (params === 'next') {
        setPage(7);
      }
    }
  };

  return (
    <form className="questionWrap">
      <ScrollToTop />
      <h3 className="text-center">{texts.pregunta}</h3>
      <ParagraphPlanet text={texts.descripcion} />
      <fieldset>
        {
          elementos.map((elemento, index) => (
          <div key={index}>
            <div className="select">
              <select name="" id="">
                <option disabled selected>{elemento.selectedFortaleza || 'Selecciona una fortaleza'}</option>
                {fortaleza.map((option, optionIndex) => (
                <option key={optionIndex} onClick={() => handleFortalezaClick(index, option)}>
                  {option}
                </option>
              ))}
              </select>
            </div>
            <div className="select">
              <select name="" id="">
                <option disabled selected>{elemento.selectedAmenaza || 'Selecciona una amenaza'}</option>
                {amenaza.map((option, optionIndex) => (
                <option key={optionIndex} onClick={() => handleAmenazaClick(index, option)}>
                  {option}
                </option>
              ))}
              </select>
            </div>
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
        <Button text="ANTERIOR" isAlt onClick={() => setPage(5)} />
        <Button
          text="GUARDAR"
          onClick={() => handleSubmit('save')}
          disabled={buttonNext ? '' : 'disabled'} />
        <Button
          text="SIGUIENTE"
          onClick={() => handleSubmit('next')}
          disabled={buttonNext ? '' : 'disabled'} />
      </div>
    </form>
  );
};
