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

// Styles
import style from '@Sass/pages/venus.module.scss';

/** VENUS TARGET
 * page 1
 * */
export const VenusQ0Target = ({ setPage, setTitle, texts, dataVenus }) => {
  const { handleSubmit } = useForm();
  // const { setPainPoints } = venusStore(
  //   (state) => ({
  //     setPainPoints: state.setPainPoints,
  //     getVenus: state.getVenus,
  //   }),
  //   shallow
  // );

  // states inputs
  // const painpoints =
  //   dataVenus.painpoints.length > 0
  //     ? dataVenus.painpoints
  //     : [{ pain_point: '', pain_reliever: '' }];
  // const [dataPoints, setDataPoints] = useState(painpoints);
  // const [button, setButton] = useState(false);

  // const onSubmit = () => {
  //   setPainPoints(dataPoints);
  //   setPage(1);
  // };

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  // useEffect(() => {
  //   const allPropsNotEmpty = painpoints.some(
  //     (point) => point.pain_point !== '' && point.pain_reliever !== ''
  //   );
  //   if (allPropsNotEmpty) {
  //     setButton(true);
  //   } else {
  //     setButton(false);
  //   }
  // }, [painpoints]);


  return (
    <section className={style.venusQuestions}>
      <ScrollToTop />
      <div>
        <Title2 text={texts?.pregunta} />
        <ParagraphPlanet text={texts.descripcion} />
        <SaberMas data={texts} />
      </div>

      {/* <form method="POST" onSubmit={handleSubmit(onSubmit)}> */}
      <form method="POST" >
        <p className={style.identify}>{texts.instruccion}</p>

        {/* <PaintPoints
          dataPoints={dataPoints}
          setDataPoints={setDataPoints}
          setPainPoints={setPainPoints}
        /> */}
        <br></br>
        {/* <button
          className={ style.btnPlanet}
          // className={!button ? style.btnPlanetOff : style.btnPlanet}
          type="submit"
        >
          SIGUIENTE
        </button> */}

        <button type="button" className={style.btnPlanet} onClick={() => setPage(1)}>
        SIGUIENTE
          </button>
        <br></br>
      </form>
    </section>
  );
};
