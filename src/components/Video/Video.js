import { useEffect, useState, useRef } from 'react';
import { scroller } from 'react-scroll';

// Images
import astronauta from '@Assets/images/astronauta.png';
import rocket from '@Assets/images/rocket-tail.png';
import _IconDown from '@Assets/images/ScrollDown.svg';

import { WatchHomeVideo } from '@Components/Atomos/Buttons';

// Styles
import '@Components/Video/video.scss';

// Hooks
import { HomeSlider } from '@Hooks/useFetchWP';

const Index = () => {
  const { sliderInfo } = HomeSlider();

  const [showButton, setShowButton] = useState(true);
  const videoRefMobile = useRef(null);
  const videoRefDesktop = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992 && videoRefMobile.current && !videoRefMobile.current.paused) {
        videoRefMobile.current.pause();
        setShowButton(true);
      } else if (
        window.innerWidth < 992 &&
        videoRefDesktop.current &&
        !videoRefDesktop.current.paused
      ) {
        videoRefDesktop.current.pause();
        setShowButton(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  
  const scrollingToanimate = () => {
    scroller.scrollTo('bio', {
      duration: 800,
      delay: 100,
      smooth: 'easeIn',
    });
  };

  const previewVideo = (params) => {

    return (
      <div className="video-container">
        <img src={rocket} className="rocketImage" alt="rocket" />
        <div className="video-launcher">
          <h1 className="fw-extralight">Haz de tu proyecto una realidad</h1>
          <p>
            Descubre cómo formar tu negocio desde cero con este interactivo sitio donde tendrás que
            conquistar el sistema solar.
          </p>
        </div>
          <WatchHomeVideo params={params}/>
      </div>
    );

  };

  return (
    <div className="video" id="bio">
      {previewVideo(sliderInfo)}

      <div className="buttonReady2Launch">
        <img src={_IconDown} alt="icondown" onClick={scrollingToanimate} />
      </div>
      <img src={astronauta} alt="Space Man" className="space-man" />
    </div>
  );
};

export default Index;
