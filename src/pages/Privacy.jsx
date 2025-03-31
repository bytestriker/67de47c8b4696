import { useEffect, useState } from 'react';

// COMPONETS
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import ButtonGoHome from '@Components/ButtonGoHome';

import { useHistory } from 'react-router-dom';
import { Title, Paragraph } from '@Components/Atomos/Titles';

// Hook
import { useFetchLegales } from '@Hooks/useFetchLegales';

// Styles
import '@Sass/pages/planet.scss';

const Privacy = () => {
  const history = useHistory();
  const { isSuccess, legales } = useFetchLegales();
  const [data, setData] = useState({});

  useEffect(() => {
    if (legales) {
      setData(legales[2]);
    }
  }, [legales]);

  if (!isSuccess)
    return (
      <div className="planetContainer">
        <div className="planetContent"></div>
      </div>
    );

  return (
    <section className='planetWrap'>
      <ButtonGoHome
        className="planetBackToTheHomepage"
        onClick={() => {
          history.push('/');
        }}
        text="Volver al Inicio"
      />
      <div className="mainContainer">
        <ScrollToTop />
        <h2 dangerouslySetInnerHTML={{__html:data?.title?.rendered || "AVISO DE PRIVACIDAD"}}></h2>
        <p dangerouslySetInnerHTML={{__html:data?.content?.rendered || ""}}></p>
      </div>
    </section>
  );
};

export default Privacy;
