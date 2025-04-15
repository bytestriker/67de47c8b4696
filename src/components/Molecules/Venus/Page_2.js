import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { venusStore } from '@Store/venus';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { ParagraphPlanet } from '@Components/Atomos/Titles';
import { SaberMas } from '@Components/Atomos/Buttons';
import { ValueFortalezas, ValueOportunidades } from '@Components/Atomos/Inputs/venus';
import Button from '@Components/Button';

// Styles
import style from '@Sass/pages/venus.module.scss';

/**
 * VENUS FODA 1
 * Debilidades
 * Amenazas
 * page 2
 */
export const VenusQ1Foda = ({ setPage, setTitle, texts }) => {
  const { dataVenus, setFortaleza, setOportunidades } = venusStore(
    (state) => ({
      dataVenus: state.dataVenus,
      setFortaleza: state.setFortaleza,
      setOportunidades: state.setOportunidades,
    }),
    shallow
  );
  const fortaleza = dataVenus.fortalezas.length > 0 ? dataVenus.fortalezas : ['', '', ''];
  const oportunidad = dataVenus.oportunidades.length > 0 ? dataVenus.oportunidades : ['', '', ''];
  const [valueFortaleza, setValueFortaleza] = useState(fortaleza);
  const [valueOportunidad, setValueOportunidad] = useState(oportunidad);
  const [buttonNext, setButtonNext] = useState(false);

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  useEffect(() => {
    const fortalezasNotEmpty = fortaleza.some((value) => value !== '');
    const oportunidadsNotEmpty = oportunidad.some((value) => value !== '');
    if (fortalezasNotEmpty && oportunidadsNotEmpty) {
      setButtonNext(true);
    } else {
      setButtonNext(false);
    }
  }, [fortaleza, oportunidad]);

  return (
    <form method="POST" className="questionWrap">
      <ScrollToTop />
      <h2 dangerouslySetInnerHTML={{__html:texts?.titulo_de_la_vista}}></h2>
      <p dangerouslySetInnerHTML={{ __html: texts?.descripcion }}></p>
      <SaberMas data={texts} />
      <h3 className={style.fortalezas}>Fortalezas</h3>
      <p className={style.questions}>{texts.instruccion_de_fortalezas}</p>
      <ValueFortalezas
        valueFortaleza={valueFortaleza}
        setValueFortaleza={setValueFortaleza}
        setFortaleza={setFortaleza}
      />
      <h3 className={style.fortalezas}>Oportunidades</h3>
      <p className={style.questions}>{texts.instruccion_de_oportunidades}</p>
      <ValueOportunidades
        valueOportunidad={valueOportunidad}
        setValueOportunidad={setValueOportunidad}
        setOportunidades={setOportunidades}
      />
      <div className="buttons">
        <Button text="ANTERIOR" onClick={() => setPage(1)} shape="alt" />
        <Button text="SIGUIENTE" onClick={() => setPage(3)} disabled={!buttonNext && 'disabled'}/>
      </div>
    </form>
  );
};
