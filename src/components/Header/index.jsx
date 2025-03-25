import { useEffect, useState } from 'react';
import { Link as Href } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { FaBars } from 'react-icons/fa';

// context
import useAuth from '@Auth/userAuth';

// Store
import { lunaStore } from '@Store/luna';

// components
import Nav from '../Nav/Nav';
import NavTank from '../NavTank/NavTank';

// images
import _logo from '../../assets/images/icon_rocketnow.png';
import _astro from '../../assets/images/icon_astronaut.png';
import _earth from '../../assets/images/icon_earth.png';
import _tank from '../../assets/images/tanque.png';
import _menu from '../../assets/images/menu.png';

// styles
import styles from '@Sass/components/header.module.scss';

const Header = () => {
  const { contextValue} = useAuth();
  const { getLuna, dataLuna } = lunaStore(
    (state) => ({
      getLuna: state.getLuna,
      dataLuna: state.dataLuna,
    }),
    shallow
  );

  const [navState, setNavState] = useState(false);
  const [navTankState, setNavTankState] = useState(false);
  const [nameProject, setNameProject] = useState('');

  useEffect(() => {
    if (getLuna()) {
      const data = getLuna();
      setNameProject(data.nombre);
    }
  }, [dataLuna]);

  return (
    <header className={styles.Header}>
      <div className={styles.header_content}>
        <div className={styles.logo_content}>
          <Href to="/">
            <img src={_logo} alt="logo" className={styles.logo} />
          </Href>
        </div>
        <div className={styles.list_items}>
        {contextValue.isLogged() ? (
            <Href to="/perfil" className={styles.icon_item_profile} title="Mi Perfil">
              <img src={_astro} alt="astro" />
            </Href>
          ) : null}
          {contextValue.isLogged() ? (
            <div className={styles.icon_item}>{nameProject ? <h4>{nameProject}</h4> : null}</div>
          ) : null}

          {contextValue.isLogged() ? (
            <div className={styles.icon_item_world} title="Mis Tanques">
              <img src={_tank} alt="tank" id="iconTank" onClick={() => setNavTankState(true)} />
            </div>
          ) : null}

          <Href to="/social-hub" className={styles.icon_item_world} title="Social">
            <img src={_earth} alt="earth" />
          </Href>
          <div className={styles.icon_item}>
            <img src={_menu} alt="menu" onClick={() => setNavState(true)} />
          </div>
        </div>
      </div>
      <Nav navState={navState} setNavState={setNavState} />
      <NavTank navTankState={navTankState} setNavTankState={setNavTankState} />
    </header>
  );
};

export default Header;
