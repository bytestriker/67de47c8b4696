import { useHistory } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

// store
import { storeRemainingTank } from '@Store/global';

// Components
import { LinkRouter } from '@Components/UtilsComponents/Button';

// Icons
import { FaRegTimesCircle } from 'react-icons/fa';

// Images
import _Astronaut from '@Assets/images/astronauta.png';

// Styles
import styles from '@Sass/components/navtank.module.scss';
import { useEffect, useState } from 'react';

const NavTank = ({ setNavTankState, navTankState }) => {
  const { remainingTankData } = storeRemainingTank(
    (state) => ({
      remainingTankData: state.remainingTankData,
    }),
    shallow
  );
  const history = useHistory();
  const [valueTank, setValueTank] = useState(0);
  useEffect(() => {
    setValueTank(remainingTankData.remainingTanks);
  }, [remainingTankData]);

  const handleLink = () => {
    history.push('/paquetes');
    setNavTankState(false);
  };

  return (
    <nav className={navTankState ? styles.NavTank : styles.NavTank_colapse} id="navTanks">
      <div className={styles.closeNav}>
        <FaRegTimesCircle className={styles.iconClose} onClick={() => setNavTankState(false)} />
      </div>
      <div className={styles.NavTankContent}>
        <h2>TE QUEDAN <span>{valueTank} TANQUES</span></h2>
        <img src={_Astronaut} alt="astronaut" className={styles.NavTank_Img} />
        <button onClick={() => handleLink()} className="buttonPlanet">RECARGAR</button>
      </div>
    </nav>
  );
};

export default NavTank;