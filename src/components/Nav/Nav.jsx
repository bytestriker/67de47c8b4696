import { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Context

import useAuth from '@Auth/userAuth';

// Services
import { getProjects } from '@Service/entries';

// Hook
import { useEventsLuna } from '@Hooks/useEventsLuna';
import { useGetProjects } from '@Hooks/useGetProjects';
import { useEventsTanks } from '@Hooks/useFetchTanques';

// Components
import {
  FaRegTimesCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaFolderPlus,
  FaFolderOpen,
} from 'react-icons/fa';

// Styles
import style from '@Components/Nav/navigation.module.scss';

const Nav = ({ setNavState, navState }) => {
  const { contextValue, setLoading, reloadPacks, setPageLuna } = useAuth();
  const { handleNewProject } = useEventsLuna();
  const { ProcessProjects } = useGetProjects();
  const { getTanks } = useEventsTanks();
  const history = useHistory();
  const [data, setData] = useState();
  const reference = useRef();
  const menuRef = useRef();

  useEffect(() => {
    if (contextValue.isLogged()) {
      handleProjects();
      getTanks();
    }
  }, [contextValue.isLogged(), reloadPacks]);

  // cierre de sesión
  const handleLogOut = () => {
    setLoading(true);
    contextValue.logout();
    setNavState(false);
    setPageLuna(1);
    history.push('/');
    setTimeout(() => {
      setLoading(false);
      location.reload();
    }, 2000);
  };

  // carga el proceso de los proyectos por planeta
  const handleURL = async (item) => {
    if (item.id) {
      ProcessProjects(item.id);
      history.push('/');
    } else {
      setLoading(false);
    }
  };

  // carga el estado de lso proyectos en vacios y envia a proyectos luna
  const newProject = () => {
    setNavState(false);
    handleNewProject();
    setTimeout(() => {
      history.push('/launch');
    }, 1000);
  };

  // carga los proyectos del usuario y envia el id para procesar los planetas
  const handleProjects = async () => {
    const res = await getProjects();
    if (res.status !== 200) {
      setData('');
      return false;
    }
    const listProject = res.data;
    const { data } = listProject;
    if (data.length === 1) {
      ProcessProjects(data[0].id);
      setData(data);
    } else {
      setData(data);
    }
  };

  // evento del menú para cerrar sin hacer click en el close
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setNavState(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenu = () => {
    if (contextValue.isLogged()) {
      return (
        <nav>
          <a className={style.link_proyects} onClick={() => newProject()}>
            <span>Crear nuevo</span>
          </a>
          {
            data && data.length > 0
            ? <a className={style.link_proyects}>
              <nav>
              {
                data.map((item) => (
                  <a key={item.id}
                    id={item.id}
                    ref={reference}
                    className={`content_li ${style.linkProject}`}
                    onClick={() => handleURL(item)}>
                    {item.nombre}
                  </a>
                ))
              }
              </nav>
            </a>
              : null
          }
          <a className={style.link_proyects} onClick={() => handleLogOut()}>
            <span>Cerrar sesión</span>
          </a>
        </nav>
      );
    } else {
      return (
        <Link
          className={style.link_proyects}
          to="/login"
          onClick={() => setNavState(false)}
          style={{ textDecoration: 'none' }}
        >
          <span>Iniciar sesión</span>
        </Link>
      );
    }
  };
  return (
    <div
      className={navState ? style.navigation : style.navigation_colapse}
      id="navigation"
      data-nav="navigation"
      ref={menuRef}
    >
      <a className={style.closeNav}>
        <FaRegTimesCircle className={style.iconClose} onClick={() => setNavState(false)} />
      </a>
      {handleMenu()}
    </div>
  );
};

export default Nav;
