/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { jupiterStore } from '@Store/jupiter';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { Title2, ParagraphPlanet } from '@Components/Atomos/Titles';
import { ValueNombre } from '@Components/Atomos/Inputs/jupiter';
import { WatchPlanetVideo } from '@Components/Atomos/Buttons';
import Button from '@Components/Button';

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
  console.log("molecules juipiter page 4 texts ", texts)
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

      <ValueNombre
        getValueObjetivos={getValueObjetivos}
        setValueObjetivos={setValueObjetivos}
        textDisabled={buttonNext}
      />
      <div className="buttons">
        <Button text="ANTERIOR" shape="alt" isSubmit={true} onClick={() => setPage(3)} />
        <Button text="SIGUIENTE" isSubmit={true} onClick={() => setPage(5)} disabled={buttonNext ? '' : 'disabled'}/>
      </div>
    </form>
  );
};
