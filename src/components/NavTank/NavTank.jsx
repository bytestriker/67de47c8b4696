import { useHistory } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

// store
import { storeRemainingTank } from '@Store/global';

// Components
import Button from '@Components/Button';

// Images

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
    <nav className={navTankState ? "navigation" : "navigationCollapse"} id="navTanks">
      <a className="closeNav" onClick={() => setNavTankState(false)}></a>
      <div className={styles.NavTankContent}>
        <figure className="tankFigure"></figure>
        <div className="tankWrap">
          <h2>Te quedan <strong>12 tanques</strong></h2>
          <Button text="RECARGAR" isCentered={true} onClick={() => handleLink()} />

        </div>
      </div>
    </nav>
  );
};

export default NavTank;