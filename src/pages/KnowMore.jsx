import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// COMPONENTS
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { LinkRouter, GoBack } from '@Components/UtilsComponents/Button';

import '@Sass/_knowMore.scss';

const KnowMore = () => {
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = useState();
  const [title, setTitle] = useState('Despega con nuestra guía');

  useEffect(() => {
    if (location.state) {
      if (location.state.data) {
        const data = location.state.data;
        setData(data);
      }
    }
  }, [location]);

  const handleVideo = () => {
    if (data?.link_video) {
      const url = data?.link_video;
      const urlObject = new URL(url);
      const videoId = urlObject.searchParams.get('v');
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&controls=1&mute=0`}
          frameBorder="0"
          allowFullScreen
          className="coverr"
        />
      );
    }
  };

  useEffect(() => {
    if (data) {
      setTitle(data.titulo_de_seccion_de_apoyo);
    }
  }, [data]);
  return (
    <section className="KnowMore">
      <ScrollToTop />
      <div className="container">
        <GoBack />
        <div className="video-knowmore">
          <h2>
          <span dangerouslySetInnerHTML={{ __html: title }}></span>
          <span className={style.planetUnderline}></span>
        </h2>
          <div className="videoYoutube">{handleVideo()}</div>
        </div>

        <div className="linksContent">
          <LinkRouter label="ASESORÍA" classItem="btnDiscovery" rute="asesoria" />
          <h3
            onClick={() => history.push({ pathname: '/paquetes', from: location })}
            className="ourPacks"
          >
            NUESTROS PAQUETES
          </h3>
        </div>
      </div>
    </section>
  );
};

export default KnowMore;
