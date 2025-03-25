import { useEffect, useState } from 'react';

// COMPONETS
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { GoBack } from '@Components/UtilsComponents/Button';

import { Title, Paragraph } from '@Components/Atomos/Titles';

// Hook
import { useFetchLegales } from '@Hooks/useFetchLegales';
// Styles
import styles from '@Sass/pages/general.module.scss';

const Tycos = () => {
  const { isSuccess, legales } = useFetchLegales();
  const [data, setData] = useState({});

  useEffect(() => {
    if (legales) {
      setData(legales[1]);
    }
  }, [legales]);

  if (!isSuccess)
    return (
      <div className={styles.planetContainer}>
        <div className={styles.planetContent}></div>
      </div>
    );

  return (
    <section>
      <ScrollToTop />
      <div className={styles.planetContainer}>
        <GoBack />
        <div className={`${styles.planetContent2} ${styles.paddingBottom}`}>
          {data ? (
            <Title title={data?.title?.rendered} />
          ) : (
            <Title title="TERMINOS Y CONDICIONES" />
          )}
          {data ? <Paragraph text={data?.content?.rendered} /> : ''}
        </div>
      </div>
    </section>
  );
};

export default Tycos;
