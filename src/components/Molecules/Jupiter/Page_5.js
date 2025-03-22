import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { jupiterStore } from '@Store/jupiter';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { Title2, ParagraphPlanet } from '@Components/Atomos/Titles';
import { ValueSignificativos } from '@Components/Atomos/Inputs/jupiter';
import { SaberMas } from '@Components/Atomos/Buttons';

// Styles
import style from '@Sass/pages/general.module.scss';
import jupiter from '@Sass/pages/jupiter.module.scss';

/* Page 4 */
export const Significativos = ({ setPage, setTitle, texts, dataJupiter }) => {
  const { setStateSignificados } = jupiterStore(
    (state) => ({
      setStateSignificados: state.setStateSignificados,
    }),
    shallow
  );
  const significados =
    dataJupiter.significados.length > 0 ? dataJupiter.significados : ['', '', ''];

  const [buttonNext, setButtonNext] = useState(false);
  const [getValueSignificados, setValueSignificados] = useState(significados);

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  useEffect(() => {
    setStateSignificados(getValueSignificados);
  }, [getValueSignificados]);

  useEffect(() => {
    handleArray();
  }, [getValueSignificados]);

  const handleArray = () => {
    const isNotEmpty = getValueSignificados.filter((value) => value !== '');
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
      <form method="POST">
        <ValueSignificativos
          getValueSignificados={getValueSignificados}
          setValueSignificados={setValueSignificados}
          textDisabled={buttonNext}
        />
        <br></br>
        <div className={style.contentButtons}>
          <div className={style.flexButtons}>
            <button type="button" className={`${jupiter.btnPlanet}`} onClick={() => setPage(4)}>
              ANTERIOR
            </button>
            <button
              type="button"
              onClick={() => setPage(6)}
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
