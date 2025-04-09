import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { jupiterStore } from '@Store/jupiter';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { ValueCaracteristicas } from '@Components/Atomos/Inputs/jupiter';
import { WatchPlanetVideo } from '@Components/Atomos/Buttons';
import Button from '@Components/Button';
import previewVideoJupiter from '@Assets/images/preview-video-jupiter.png';

// Styles
import style from '@Sass/pages/general.module.scss';
import jupiter from '@Sass/pages/jupiter.module.scss';

/* Page 1 */
export const Intro = ({ setPage, setTitle, texts, dataJupiter }) => {
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
  console.log("jupiter page 1 texts ", texts)

  return (
    <div className="questionWrap">
      <ScrollToTop />
      <h2 dangerouslySetInnerHTML={{__html:texts?.titulo_de_la_vista}}></h2>
      <p dangerouslySetInnerHTML={{ __html: texts?.descripcion }}></p>
      {texts?.link_video && (
        <WatchPlanetVideo
          params={[
            {
              playvideo: previewVideoJupiter,
              alt: 'play video',
              url: texts?.link_video,
            },
          ]}
        />
      )} 
      <Button
        text="SIGUIENTE"
        isCentered={true}
        onClick={() => setPage(2)}
      />
    </div>
  );
};
