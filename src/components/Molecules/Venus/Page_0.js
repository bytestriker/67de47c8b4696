import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { shallow } from 'zustand/shallow';

// Store
import { venusStore } from '@Store/venus';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { Title2, ParagraphPlanet } from '@Components/Atomos/Titles';
import Button from '@Components/Button';
import { WatchPlanetVideo } from '@Components/Atomos/Buttons';
import { PaintPoints } from '@Components/Atomos/Inputs/venus';
import videoPreview from '@Assets/images/preview-video-venus.png';


// Styles
import style from '@Sass/pages/general.module.scss';

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
  console.log(texts)


  return (
    <form className="questionWrap">
      <ScrollToTop />
      <h3 dangerouslySetInnerHTML={{ __html: texts.titulo_de_la_vista }} className="text-center"></h3>
      {texts?.link_video && (
        <WatchPlanetVideo
          params={[
            {
              playvideo: videoPreview,
              alt: 'play video',
              url: texts?.link_video,
            },
          ]}
        />
      )}
      <p dangerouslySetInnerHTML={{ __html: texts.descripcion }}></p>
      <p dangerouslySetInnerHTML={{ __html: texts.instruccion }}></p>
      <Button text="SIGUIENTE" onClick={() => setPage(1)} isCentered />
    </form>
  );
};
