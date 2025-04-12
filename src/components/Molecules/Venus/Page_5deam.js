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
 * Debilidades y amenazas
 * page 7
 */
export const VenusQ4Conclusion = ({
  dataVenus,
  setPage,
  setModal,
  setModalSalir,
  modalSalir,
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
  const [data, setData] = useState(dataVenus.foda_4.debilidades_amenazas || []);
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
      }
    }
  };

  const handleDebilidadChange = (index, e) => {
    const value = e.target.value;
    const updatedElementos = [...elementos];
    updatedElementos[index].selectedDebilidad = value;
    setElementos(updatedElementos);
    handleUpdateElementos(updatedElementos);
  };

  const handleAmenazaChange = (index, e) => {
    const value = e.target.value;
    const updatedElementos = [...elementos];
    updatedElementos[index].selectedAmenaza = value;
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
    <form method="POST" className="questionWrap">
      <ScrollToTop />
      <h3 className="text-center" dangerouslySetInnerHTML={{__html:texts.pregunta}}></h3>
      <p dangerouslySetInnerHTML={{__html: texts.descripcion}}></p>

      <fieldset>
        {elementos.map((elemento, index) => (
          <div key={index}>
            <div className="select">
              <select
                value={elemento.selectedDebilidad}
                onChange={(e) => handleDebilidadChange(index, e)}
              >
                <option value="" disabled>Selecciona una debilidad</option>
                {debilidad.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="select">
              <select
                value={elemento.selectedAmenaza}
                onChange={(e) => handleAmenazaChange(index, e)}
              >
                <option value="" disabled>Selecciona una amenaza</option>
                {amenaza.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
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
          className={style.conclusion}
          name="conclusion"
          id="conclusion"
          rows="8"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Cuéntanos a qué conclusiones llegaste"
          defaultValue={getDescription}
        ></textarea>
      </fieldset>
      <div className="buttons">
        <Button text="ANTERIOR" isAlt onClick={() => setPage(6)} />
        <Button
          text="SIGUIENTE"
          onClick={() => setModalSalir(!modalSalir)}
          disabled={!buttonNext && 'disabled'} />
      </div>
    </form>
  );
};