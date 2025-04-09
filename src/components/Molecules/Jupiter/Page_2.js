import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { jupiterStore } from '@Store/jupiter';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { Title2, ParagraphPlanet } from '@Components/Atomos/Titles';
import { ValueCaracteristicas } from '@Components/Atomos/Inputs/jupiter';
import { SaberMas } from '@Components/Atomos/Buttons';
import Button from '@Components/Button';

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
    <form method="POST" className="questionWrap">
      <ScrollToTop />
      <h2 dangerouslySetInnerHTML={{__html:texts?.titulo_de_la_vista}}></h2>
      <p dangerouslySetInnerHTML={{ __html: texts.descripcion }}></p>
      <ValueCaracteristicas
        getValueCaracteristica={getValueCaracteristica}
        setValueCaracteristica={setValueCaracteristica}
        textDisabled={buttonNext}
      />
      <div className="buttons">
        <Button text="ANTERIOR" isAlt={true} onClick={() => setPage(1)} />
        <Button text="SIGUIENTE" onClick={() => setPage(3)} disabled={buttonNext ? '' : 'disabled'}/>
      </div>
    </form>
  );
};
