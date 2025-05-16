import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { jupiterStore } from '@Store/jupiter';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { Title2, ParagraphPlanet } from '@Components/Atomos/Titles';
import { ValueSignificativos } from '@Components/Atomos/Inputs/jupiter';
import { WatchPlanetVideo } from '@Components/Atomos/Buttons';
import Button from '@Components/Button';

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
  console.log("jupiter page 5 texts ", texts)

  return (
    <form method="POST" className="questionWrap">
      <ScrollToTop />
      <h2 dangerouslySetInnerHTML={{__html:texts?.titulo_de_la_vista}}></h2>
      <p dangerouslySetInnerHTML={{ __html: texts.descripcion }}></p>

      {texts?.link_video && (
        <WatchPlanetVideo
          params={[
            {
              alt: 'play video',
              url: texts?.link_video,
            },
          ]}
        />
      )} 

      <ValueSignificativos
        getValueSignificados={getValueSignificados}
        setValueSignificados={setValueSignificados}
        textDisabled={buttonNext}
      />
      <div className="buttons">
        <Button text="ANTERIOR" shape="alt" isSubmit={true} onClick={() => setPage(4)} />
        <Button text="SIGUIENTE" isSubmit={true} onClick={() => setPage(6)} disabled={buttonNext ? '' : 'disabled'}/>
      </div>
    </form>
  );
};
