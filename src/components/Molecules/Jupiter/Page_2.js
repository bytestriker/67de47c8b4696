import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { jupiterStore } from '@Store/jupiter';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { Title2, ParagraphPlanet } from '@Components/Atomos/Titles';
import { ValueCaracteristicas } from '@Components/Atomos/Inputs/jupiter';
import { SaberMas } from '@Components/Atomos/Buttons';

// Styles
import style from '@Sass/pages/general.module.scss';
import jupiter from '@Sass/pages/jupiter.module.scss';

/* Page 1 */
export const Caracteristicas = ({ setPage, setTitle, texts, dataJupiter }) => {
  const { setStateCaracteristicas } = jupiterStore(
    (state) => ({
      setStateCaracteristicas: state.setStateCaracteristicas,
    }),
    shallow
  );

  const caracteristicas =
    dataJupiter.caracteristicas.length > 0 ? dataJupiter.caracteristicas : ['', '', ''];

  const [buttonNext, setButtonNext] = useState(false);
  const [getValueCaracteristica, setValueCaracteristica] = useState(caracteristicas);

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  useEffect(() => {
    setStateCaracteristicas(getValueCaracteristica);
  }, [getValueCaracteristica]);

  useEffect(() => {
    handleArray();
  }, [getValueCaracteristica]);

  const handleArray = () => {
    const isNotEmpty = getValueCaracteristica.filter((value) => value !== '');
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
        <ParagraphPlanet text={texts.descripcion} />
      </div>
      <br></br>
      <form method="POST">
        <ValueCaracteristicas
          getValueCaracteristica={getValueCaracteristica}
          setValueCaracteristica={setValueCaracteristica}
          textDisabled={buttonNext}
        />
        <br></br>
        <div className={style.contentButtons}>
          <div className={style.flexButtons}>
            <button type="button" className={`${jupiter.btnPlanet}`} onClick={() => setPage(1)}>
              ANTERIOR
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
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
