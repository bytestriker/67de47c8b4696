import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { jupiterStore } from '@Store/jupiter';
import { lunaStore } from '@Store/luna';

// Hooks
import { useEventJupiter } from '@Hooks/useEventsJupiter';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { Title2, ParagraphPlanet } from '@Components/Atomos/Titles';
import { ValueIdeasNombre } from '@Components/Atomos/Inputs/jupiter';
import { SaberMas } from '@Components/Atomos/Buttons';

// Styles
import style from '@Sass/pages/general.module.scss';
import jupiter from '@Sass/pages/jupiter.module.scss';

/* Page 5 */
export const IdeasNombre = ({ setPage, setTitle, texts, dataJupiter }) => {
  const { setStateIdeasNombre } = jupiterStore(
    (state) => ({
      setStateIdeasNombre: state.setStateIdeasNombre,
    }),
    shallow
  );
  const { getLuna } = lunaStore(
    (state) => ({
      getLuna: state.getLuna,
    }),
    shallow
  );

  const { jupiterCreateProject } = useEventJupiter();
  const ideasNombre = dataJupiter.ideas_nombre.length > 0 ? dataJupiter.ideas_nombre : ['', '', ''];
  const [buttonNext, setButtonNext] = useState(false);
  const [getValueIdeasNombre, setValueIdeasNombre] = useState(ideasNombre);

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  useEffect(() => {
    setStateIdeasNombre(getValueIdeasNombre);
  }, [getValueIdeasNombre]);

  useEffect(() => {
    handleArray();
  }, [getValueIdeasNombre]);

  const handleArray = () => {
    const isNotEmpty = getValueIdeasNombre.filter((value) => value !== '');
    if (isNotEmpty.length >= 3) {
      setButtonNext(true);
    } else if (isNotEmpty.length < 3) {
      setButtonNext(false);
    }
  };

  const handleSubmit = async () => {
    const res = await jupiterCreateProject(getLuna().id, dataJupiter);
    if (res.code === 0) {
      setPage(7);
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
        <ValueIdeasNombre
          getValueIdeasNombre={getValueIdeasNombre}
          setValueIdeasNombre={setValueIdeasNombre}
          textDisabled={buttonNext}
        />
        <br></br>
        <div className={style.contentButtons}>
          <div className={style.flexButtons}>
            <button type="button" className={`${jupiter.btnPlanet}`} onClick={() => setPage(5)}>
              ANTERIOR
            </button>
            <button
              type="button"
              onClick={() =>  handleSubmit()}
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
