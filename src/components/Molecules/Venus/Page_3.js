import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { venusStore } from '@Store/venus';

// Hooks
import { useEventsVenus } from '@Hooks/useEventVenus';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { ParagraphPlanet } from '@Components/Atomos/Titles';
import { SaberMas } from '@Components/Atomos/Buttons';
import { ValueAmenazas, ValueDebilidades } from '@Components/Atomos/Inputs/venus';

// Styles
import style from '@Sass/pages/venus.module.scss';

/** VENUS FODA 2
 * Debilidades
 * Amenazas
 * page 3
 */
export const VenusQ2Foda = ({ setPage, setModal, setTitle, texts, setMessage }) => {
  const { dataVenus, setDebilidades, setAmenazas } = venusStore(
    (state) => ({
      dataVenus: state.dataVenus,
      setDebilidades: state.setDebilidades,
      setAmenazas: state.setAmenazas,
    }),
    shallow
  );
  const { venusCreateProject } = useEventsVenus();

  const debilidad = dataVenus.debilidades.length > 0 ? dataVenus.debilidades : ['', '', ''];
  const amenaza = dataVenus.amenazas.length > 0 ? dataVenus.amenazas : ['', '', ''];

  const [valueDebilidad, setValueDebilidad] = useState(debilidad);
  const [valueAmenaza, setValueAmenaza] = useState(amenaza);
  const [buttonNext, setButtonNext] = useState(false);

  const handleSubmit = async (params) => {
    const painpoint = dataVenus.painpoints;
    const filterPainPoint = painpoint.filter(
      (point) => point.pain_point !== '' || point.pain_reliever !== ''
    );

    const data = {
      painpoints: filterPainPoint,
      fortalezas: dataVenus.fortalezas,
      oportunidades: dataVenus.oportunidades,
      debilidades: dataVenus.debilidades,
      amenazas: dataVenus.amenazas,
    };

    const res = await venusCreateProject(data);
    if (res.code === 0) {
      if (params === 'save') {
        setMessage('Tus datos se han guardado correctamente.');
        setModal(true);
      } else if (params === 'next') {
        setPage(4);
      }
    }
  };

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  useEffect(() => {
    const debilidadNotEmpty = debilidad.some((value) => value !== '');
    const amenzaNotEmpty = amenaza.some((value) => value !== '');
    if (debilidadNotEmpty && amenzaNotEmpty) {
      setButtonNext(true);
    } else {
      setButtonNext(false);
    }
  }, [debilidad, amenaza]);

  return (
    <section className={style.venusQuestions}>
      <ScrollToTop />
      <div>
        <h3 className={style.paintpoint}>{texts.pregunta}</h3>
        <ParagraphPlanet text={texts.descripcion} />
        <SaberMas data={texts} />
      </div>

      <form method="POST">
        <div>
          <h5 className={style.fortalezas}>Debilidades</h5>
          <p className={style.questions}>{texts.instruccion_de_debilidades}</p>
          <div className={style.inputContainer}>
            <ValueDebilidades
              valueDebilidad={valueDebilidad}
              setValueDebilidad={setValueDebilidad}
              setDebilidades={setDebilidades}
            />
          </div>
        </div>

        <div>
          <h5 className={style.fortalezas}>Amenazas</h5>
          <p className={style.questions}>{texts.instruccion_de_amenazas}</p>
          <div className={style.inputContainer}>
            <ValueAmenazas
              valueAmenaza={valueAmenaza}
              setValueAmenaza={setValueAmenaza}
              setAmenazas={setAmenazas}
            />
          </div>
        </div>

        <div className={style.buttonsContent}>
          <button type="button" className={style.btnPlanet} onClick={() => setPage(2)}>
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
          PASO 2
        </button>
      </form>
    </section>
  );
};
