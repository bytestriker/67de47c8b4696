import { useEffect, useState, useRef } from 'react';
import { scroller } from 'react-scroll';

// Images
import { BiCaretRightCircle } from 'react-icons/bi';

// Styles
import '@Components/Video/video.scss';

// Images
import _IconDown from '@Assets/images/ScrollDown.svg';
import playvideo from '@Assets/images/playvideo.svg';

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

  const handleLoadedMetadata = (event) => {
    event.target.volume = 0.4;
  };
  const handlePlayVideo = () => {
    setShowButton(false);
    if (window.innerWidth < 992) {
      videoRefMobile.current.play();
    } else {
      videoRefDesktop.current.play();
    }
  };
  const handlePauseVideo = () => {
    setShowButton(true);
    if (window.innerWidth < 992) {
      videoRefMobile.current.pause();
    } else {
      videoRefDesktop.current.pause();
    }
  };

  const scrollingToanimate = () => {
    scroller.scrollTo('bio', {
      duration: 800,
      delay: 100,
      smooth: 'easeIn',
    });
  };

  const previewVideo = (params) => {
    if (params.length > 0) {
      const url = params[0].url;
      const urlObject = new URL(url);
      const videoId = urlObject.searchParams.get('v');
      return (
        <div className="video-container">
      <div className="partial-border-pseudo">Haz de tu proyecto una realidad
        <p>Descubre cómo formar tu negocio desde cero con este interactivo sitio donde tendrás que conquistar el sistema solar.</p>
      </div>
      <div className="playvideo"><img src={playvideo} alt="playvideo" /><p className="texto">Reproducir video</p></div>
        </div>
      );
    }
    
  };

  return (
    <div className="video" id="bio">
      {previewVideo(sliderInfo)}
      <div className="videoIconLounch">
        <img src={_IconDown} alt="icondown" onClick={scrollingToanimate} />
      </div>
    </div>
  );
};

export default Index;
