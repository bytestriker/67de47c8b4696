import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// COMPONETS
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import ButtonGoHome from '@Components/ButtonGoHome';
import '@Sass/pages/planet.scss';
import Footer from '@Components/Footer';

// Hook
import { useFetchLegales } from '@Hooks/useFetchLegales';
// Styles
import styles from '@Sass/pages/general.module.scss';

const Tycos = () => {
  const history = useHistory();
  const { isSuccess, legales } = useFetchLegales();
  const [data, setData] = useState({});

  useEffect(() => {
    if (legales) {
      setData(legales[1]);
    }
  }, [legales]);

  if (!isSuccess) return (<div className={styles.planetContainer}><div className={styles.planetContent}></div></div>);

  return (
    <>
      <section className='planetWrap'>
        <ButtonGoHome
          className="planetBackToTheHomepage"
          onClick={() => {
            history.push('/');
          }}
          text="Volver al Inicio"
        />
        <div className="mainContainerInternals">
          <ScrollToTop />
          <h2 dangerouslySetInnerHTML={{__html:data?.title?.rendered || "AVISO DE PRIVACIDAD"}}></h2>
          <p dangerouslySetInnerHTML={{__html:data?.content?.rendered || ""}}></p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Tycos;
