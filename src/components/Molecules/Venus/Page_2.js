import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { venusStore } from '@Store/venus';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { ParagraphPlanet } from '@Components/Atomos/Titles';
import { SaberMas } from '@Components/Atomos/Buttons';
import { ValueFortalezas, ValueOportunidades } from '@Components/Atomos/Inputs/venus';

// Styles
import style from '@Sass/pages/venus.module.scss';

/**
 * VENUS FODA 1
 * Debilidades
 * Amenazas
 * page 2
 */
export const VenusQ1Foda = ({ setPage, setTitle, texts }) => {
  const { dataVenus, setFortaleza, setOportunidades } = venusStore(
    (state) => ({
      dataVenus: state.dataVenus,
      setFortaleza: state.setFortaleza,
      setOportunidades: state.setOportunidades,
    }),
    shallow
  );
  const fortaleza = dataVenus.fortalezas.length > 0 ? dataVenus.fortalezas : ['', '', ''];
  const oportunidad = dataVenus.oportunidades.length > 0 ? dataVenus.oportunidades : ['', '', ''];
  const [valueFortaleza, setValueFortaleza] = useState(fortaleza);
  const [valueOportunidad, setValueOportunidad] = useState(oportunidad);
  const [buttonNext, setButtonNext] = useState(false);

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  useEffect(() => {
    const fortalezasNotEmpty = fortaleza.some((value) => value !== '');
    const oportunidadsNotEmpty = oportunidad.some((value) => value !== '');
    if (fortalezasNotEmpty && oportunidadsNotEmpty) {
      setButtonNext(true);
    } else {
      setButtonNext(false);
    }
  }, [fortaleza, oportunidad]);

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
          <h5 className={style.fortalezas}>Fortalezas</h5>
          <p className={style.questions}>{texts.instruccion_de_fortalezas}</p>
          <div className={style.inputContainer}>
            <ValueFortalezas
              valueFortaleza={valueFortaleza}
              setValueFortaleza={setValueFortaleza}
              setFortaleza={setFortaleza}
            />
          </div>
        </div>

        <div>
          <h5 className={style.fortalezas}>Oportunidades</h5>
          <p className={style.questions}>{texts.instruccion_de_oportunidades}</p>
          <div className={style.inputContainer}>
            <ValueOportunidades
              valueOportunidad={valueOportunidad}
              setValueOportunidad={setValueOportunidad}
              setOportunidades={setOportunidades}
            />
          </div>
        </div>

        <div className={style.buttonsContent}>
          <button type="button" className={style.btnPlanet} onClick={() => setPage(1)}>
            ANTERIOR
          </button>
          <button
            type="button"
            className={buttonNext ? style.btnPlanet : style.btnPlanetOff}
            disabled={buttonNext ? '' : 'disabled'}
            onClick={() => setPage(3)}
          >
            SIGUIENTE
          </button>
        </div>
      </form>
    </section>
  );
};
