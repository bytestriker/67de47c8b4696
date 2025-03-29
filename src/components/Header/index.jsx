import { useEffect, useState } from 'react';
import { Link as Href, useLocation } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { FaBars } from 'react-icons/fa';

// context
import useAuth from '@Auth/userAuth';

// Store
import { lunaStore } from '@Store/luna';

// components
import Nav from '../Nav/Nav';
import NavTank from '../NavTank/NavTank';
import Button from '@Components/Button';

// images
import _logo from '../../assets/images/RocketNow.png';
import _astro from '../../assets/images/icon_astronaut.png';
import _earth from '../../assets/images/icon_earth.png';
import _tank from '../../assets/images/tanque.png';
import _menu from '../../assets/images/menu.png';

// styles
import '@Sass/components/header.scss';

const Header = () => {
  const location = useLocation();
  const currentPathName = location.pathname.split('/').pop();

  const formItems = ["login", "repassword", "signup"];

  console.log(formItems.includes(currentPathName));
  
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
    <header>
      <div className="header_content">
        <Href to="/" className="logo_content">
          <img src={_logo} alt="logo" className="logo" />
        </Href>
        <div className="list_items">
          {
            contextValue.isLogged()
            ? <Button
              text="Mi perfil"
              onClick={() => history.push({ pathname: '/launch', from: location })} />
            : null
          }
          {
            contextValue.isLogged() && nameProject
            ? <span>{nameProject}</span>
            : null
          }
          {
            contextValue.isLogged()
              ? <div className="iconTank" title="Mis Tanques" onClick={() => setNavTankState(true)}>
                <figure></figure>
                <span>x3</span>
            </div>
            : null}
          {
            !formItems.includes(currentPathName)
            ? <Href to="/social-hub" className="iconSpinningGlobe" title="Social"></Href>
            : null
          }
          {
            !formItems.includes(currentPathName)
            ? <div className="icon_item">
                <img src={_menu} alt="menu" onClick={() => setNavState(true)} />
              </div>
            : null
          }

        </div>
      </div>
      <Nav navState={navState} setNavState={setNavState} />
      <NavTank navTankState={navTankState} setNavTankState={setNavTankState} />
    </header>
  );
};

export default Header;
