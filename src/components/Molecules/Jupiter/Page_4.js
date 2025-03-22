/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { jupiterStore } from '@Store/jupiter';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { Title2, ParagraphPlanet } from '@Components/Atomos/Titles';
import { ValueNombre } from '@Components/Atomos/Inputs/jupiter';
import { SaberMas } from '@Components/Atomos/Buttons';

// Styles
import style from '@Sass/pages/general.module.scss';
import jupiter from '@Sass/pages/jupiter.module.scss';
/* Page 3 */
export const Nombre = ({ setPage, setTitle, texts, dataJupiter }) => {
  const { setStateObjetivos } = jupiterStore(
    (state) => ({
      setStateObjetivos: state.setStateObjetivos,
    }),
    shallow
  );
  const objetivos = dataJupiter.objetivos.length > 0 ? dataJupiter.objetivos : ['', '', ''];

  const [buttonNext, setButtonNext] = useState(false);
  const [getValueObjetivos, setValueObjetivos] = useState(objetivos);

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  useEffect(() => {
    setStateObjetivos(getValueObjetivos);
  }, [getValueObjetivos]);

  useEffect(() => {
    handleArray();
  }, [getValueObjetivos]);

  const handleArray = () => {
    const isNotEmpty = getValueObjetivos.filter((value) => value !== '');
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
        <ValueNombre
          getValueObjetivos={getValueObjetivos}
          setValueObjetivos={setValueObjetivos}
          textDisabled={buttonNext}
        />
        <br></br>
        <div className={style.contentButtons}>
          <div className={style.flexButtons}>
            <button type="button" className={`${jupiter.btnPlanet}`} onClick={() => setPage(3)}>
              ANTERIOR
            </button>
            <button
              type="button"
              onClick={() => setPage(5)}
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
