import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { shallow } from 'zustand/shallow';

// Store
import { venusStore } from '@Store/venus';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { Title2, ParagraphPlanet } from '@Components/Atomos/Titles';
import { SaberMas } from '@Components/Atomos/Buttons';
import { PaintPoints } from '@Components/Atomos/Inputs/venus';
import Button from '@Components/Button';

// Styles
import style from '@Sass/pages/venus.module.scss';

/** VENUS TARGET
 * page 1
 * */
export const VenusQ1Target = ({ setPage, setTitle, texts, dataVenus }) => {
  const { handleSubmit } = useForm();
  const { setPainPoints } = venusStore(
    (state) => ({
      setPainPoints: state.setPainPoints,
      getVenus: state.getVenus,
    }),
    shallow
  );

  // states inputs
  const painpoints =
    dataVenus.painpoints.length > 0
      ? dataVenus.painpoints
      : [{ pain_point: '', pain_reliever: '' }];
  const [dataPoints, setDataPoints] = useState(painpoints);
  const [button, setButton] = useState(false);

  const onSubmit = () => {
    setPainPoints(dataPoints);
    setPage(2);
  };

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  useEffect(() => {
    const allPropsNotEmpty = painpoints.some(
      (point) => point.pain_point !== '' && point.pain_reliever !== ''
    );
    if (allPropsNotEmpty) {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [painpoints]);

  return (
    <div className="questionWrap">
      <ScrollToTop />
      <h2 dangerouslySetInnerHTML={{__html:texts?.pregunta}}></h2>
      <p dangerouslySetInnerHTML={{ __html: texts?.descripcion }}></p>
      <SaberMas data={texts} />
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        {texts.instruccion}
        <PaintPoints
          dataPoints={dataPoints}
          setDataPoints={setDataPoints}
          setPainPoints={setPainPoints}
        />
        {/* <button
          className={!button ? style.btnPlanetOff : style.btnPlanet}
          disabled={!button ? 'disabled' : ''}
          type="submit"
        >
          SIGUIENTE
        </button> */}
        <div className="buttons">
          <Button text="ANTERIOR" onClick={() => setPage(0)} />
          <Button text="SIGUIENTE" disabled={!button ? 'disabled' : ''} type="submit" />
        </div>
      </form>
    </div>
  );
};
