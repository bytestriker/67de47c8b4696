import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// store
import { jupiterStore } from '@Store/jupiter';
import { lunaStore } from '@Store/luna';

// Hooks
import { useEventJupiter } from '@Hooks/useEventsJupiter';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { ParagraphPlanet } from '@Components/Atomos/Titles';
import { TextAreaMarca } from '@Components/Atomos/Inputs/jupiter';
import { WatchPlanetVideo } from '@Components/Atomos/Buttons';
import Button from '@Components/Button';

// Styles
import style from '@Sass/pages/general.module.scss';
import jupiter from '@Sass/pages/jupiter.module.scss';

/* Page 8 */
export const Marca = ({ setPage, setTitle, texts, dataJupiter }) => {
  const { getLuna } = lunaStore(
    (state) => ({
      getLuna: state.getLuna,
    }),
    shallow
  );
  const { setStateAdjetivos } = jupiterStore(
    (state) => ({
      setStateAdjetivos: state.setStateAdjetivos,
    }),
    shallow
  );

  const { setStateDescripcionMarca } = jupiterStore(
    (state) => ({
      setStateDescripcionMarca: state.setStateDescripcionMarca,
    }),
    shallow
  );
  const { jupiterCrearMarca } = useEventJupiter();
  const DescripcionMarca = dataJupiter.descripcion_marca;
  const [buttonNext, setButtonNext] = useState(false);
  const [getDescripcionMarca, setDescripcionMarca] = useState(DescripcionMarca);

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);


  useEffect(() => {
    setStateDescripcionMarca(getDescripcionMarca);
  }, [getDescripcionMarca]);
  

  useEffect(() => {
    handleArray();
  }, [getDescripcionMarca]);

  const handleArray = () => {
    
    if (getDescripcionMarca !== "") {
      setButtonNext(true);
    } else {
      setButtonNext(false);
    }
  };

  const handleSubmmit = async () => {
    const res = await jupiterCrearMarca(getLuna().id, dataJupiter);
    if (res.code === 0) {
      setPage(9);
    }
  };
  console.log("jupiter page 8 texts ",texts)
  return (
    <form method="POST" className="questionWrap">
      <ScrollToTop />
      <h2 dangerouslySetInnerHTML={{__html:texts?.titulo_de_la_vista}}></h2>
      <p dangerouslySetInnerHTML={{ __html: texts?.descripcion }}></p>
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

      <TextAreaMarca
        getDescripcionMarca={getDescripcionMarca}
        setDescripcionMarca={setDescripcionMarca}
        textDisabled={buttonNext}
      />
      <div className="buttons">
        {/*<button type="button" className={`${jupiter.btnPlanet}`} onClick={() => setPage(7)}>
            ANTERIOR
          </button>
          <button
            type="button"
            onClick={() => handleSubmmit(9)}
            className={buttonNext ? jupiter.btnPlanet : jupiter.btnPlanetOff}
            disabled={buttonNext ? '' : 'disabled'}
          >
            SIGUIENTE
          </button>*/}
        <Button text="ANTERIOR" shape="alt" onClick={() => setPage(7)} />
        <Button text="SIGUIENTE" onClick={() => setPage(9)} disabled={!buttonNext && 'disabled'}/>

      </div>
    </form>
  );
};
