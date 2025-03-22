/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { jupiterStore } from '@Store/jupiter';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { Title2, ParagraphPlanet } from '@Components/Atomos/Titles';
import { ValueCalificativos } from '@Components/Atomos/Inputs/jupiter';
import { SaberMas } from '@Components/Atomos/Buttons';

// Styles
import style from '@Sass/pages/general.module.scss';
import jupiter from '@Sass/pages/jupiter.module.scss';

/* Page 2 */
export const Calificativos = ({ setPage, setTitle, texts, dataJupiter }) => {
  const { setStateAdjetivosCa } = jupiterStore(
    (state) => ({
      setStateAdjetivosCa: state.setStateAdjetivosCa,
    }),
    shallow
  );
  const adjetivos_calificativos =
    dataJupiter.adjetivos_calificativos.length > 0
      ? dataJupiter.adjetivos_calificativos
      : ['', '', ''];

  const [buttonNext, setButtonNext] = useState(false);
  const [getValueAdjetivos, setValueAdjetivos] = useState(adjetivos_calificativos);

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  useEffect(() => {
    setStateAdjetivosCa(getValueAdjetivos);
  }, [getValueAdjetivos]);

  useEffect(() => {
    handleArray();
  }, [getValueAdjetivos]);

  const handleArray = () => {
    const isNotEmpty = getValueAdjetivos.filter((value) => value !== '');
    if (isNotEmpty.length >= 3) {
      setButtonNext(true);
    } else if (isNotEmpty.length < 3) {
      setButtonNext(false);
    }
  };

  return (
    <section className={style.marteQuestions}>
      <ScrollToTop />
      <div>
        <Title2 text={texts.pregunta} />
        <ParagraphPlanet text={texts.descripcion} />
      </div>
      <br></br>
      <form method="POST">
        <ValueCalificativos
          getValueAdjetivos={getValueAdjetivos}
          setValueAdjetivos={setValueAdjetivos}
          textDisabled={buttonNext}
        />
        <br></br>

        <div className={style.contentButtons}>
          <div className={style.flexButtons}>
            <button type="button" className={`${jupiter.btnPlanet}`} onClick={() => setPage(2)}>
              ANTERIOR
            </button>
            <button
              type="button"
              onClick={() => setPage(4)}
              className={buttonNext ? jupiter.btnPlanet : jupiter.btnPlanetOff}
              disabled={buttonNext ? '' : 'disabled'}
            >
              SIGUIENTE
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
