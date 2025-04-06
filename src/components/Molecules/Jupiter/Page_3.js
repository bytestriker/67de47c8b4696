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
import Button from '@Components/Button';

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
    <form method="POST" className="questionWrap">
      <ScrollToTop />
      <h2 dangerouslySetInnerHTML={{ __html: texts.pregunta }}></h2>
      <p dangerouslySetInnerHTML={{ __html: texts.descripcion }}></p>
      <ValueCalificativos
        getValueAdjetivos={getValueAdjetivos}
        setValueAdjetivos={setValueAdjetivos}
        textDisabled={buttonNext}
        />
      <div className="buttons">
        <Button text="ANTERIOR" isSubmit={true} onClick={() => setPage(2)} />
        <Button text="SIGUIENTE" isSubmit={true} onClick={() => setPage(4)} disabled={buttonNext ? '' : 'disabled'}/>
      </div>
    </form>
  );
};
