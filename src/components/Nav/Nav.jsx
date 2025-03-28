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
        <>
          <div className={style.link_proyects} onClick={() => newProject()}>
            <h3>
              <FaFolderPlus className={style.iconSing} /> CREAR NUEVO
            </h3>
          </div>
          <div className={style.link_proyects}>
            {data && data.length > 0 ? (
              <h3>
                <FaFolderOpen className={style.iconSing} /> VER PROYECTOS
              </h3>
            ) : null}
            <ul className="content">
              {data && data.length > 0
                ? data.map((item) => (
                    <li key={item.id} className={`content_li ${style.linkProject}`}>
                      <h4 onClick={() => handleURL(item)} id={item.id} ref={reference}>
                        {item.nombre}
                      </h4>
                    </li>
                  ))
                : null}
            </ul>
          </div>
          <div className={style.link_proyects} onClick={() => handleLogOut()}>
            <h3>
              <FaSignOutAlt className={style.iconSing} /> CERRAR SESIÓN
            </h3>
          </div>
        </>
      );
    } else {
      return (
        <Link
          className={style.link_proyects}
          to="/login"
          onClick={() => setNavState(false)}
          style={{ textDecoration: 'none' }}
        >
          <h3>
            <FaSignInAlt className={style.iconSing} /> INICIAR SESIÓN
          </h3>
        </Link>
      );
    }
  };
  return (
    <nav
      className={navState ? style.navigation : style.navigation_colapse}
      id="navigation"
      data-nav="navigation"
      ref={menuRef}
    >
      <div className={style.closeNav}>
        <FaRegTimesCircle className={style.iconClose} onClick={() => setNavState(false)} />
      </div>
      <div className={style.navigation_content}>{handleMenu()}</div>
    </nav>
  );
};

export default Nav;
