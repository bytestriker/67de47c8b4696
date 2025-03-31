import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// COMPONETS
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import ButtonGoHome from '@Components/ButtonGoHome';

// Hook
import { useFetchLegales } from '@Hooks/useFetchLegales';

// Styles
import '@Sass/pages/planet.scss';


const AboutUs = () => {
  const history = useHistory();
  const { isSuccess, legales } = useFetchLegales();
  const [data, setData] = useState({});

  useEffect(() => {
    if (legales) {
      setData(legales[3]);
    }
  }, [legales]);

  if (!isSuccess) return (<div className="planetContainer"><div className="planetContent"></div></div>);

  {/*
  <section>
    <ScrollToTop />
    <div className={styles.planetContainer}>
      <GoBack />
      <div className={`${styles.planetContent2} ${styles.paddingBottom}`}>
        {data ? <Title title={data?.title?.rendered} /> : <Title title="ACERCA DE NOSOTROS" />}
        {data ? <Paragraph text={data?.content?.rendered} /> : ''}
      </div>
    </div>
  </section> 
  */}

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
        <h2 dangerouslySetInnerHTML={{__html:data?.title?.rendered || "ACERCA DE NOSOTROS"}}></h2>
        <p dangerouslySetInnerHTML={{__html:data?.content?.rendered || ""}}></p>
      </div>
    </section>    
  );
};

export default AboutUs;
