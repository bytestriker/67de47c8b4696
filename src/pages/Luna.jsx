import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

// Context
import useAuth from '@Auth/userAuth';

// Store
import { lunaStore } from '@Store/luna';

// Hooks
import { useEventsLuna } from '@Hooks/useEventsLuna';
import { LunaWPText } from '@Hooks/useFetchWP';
import { Title } from '@Components/Atomos/Titles';

import astronauta from '@Assets/images/astronauta.png';
import satelite from '@Assets/images/satelite.png';
import borde from '@Assets/images/borde_superior.svg';

// Components
import {
  QuestionsLaunch1,
  QuestionsLaunch2,
  QuestionsLaunch3,
  QuestionsLaunch5,
  NameProject,
} from '@Components/Launch/Questions';
import { ButtonClose } from '@Components/Atomos/Buttons';
import { ModalAlert } from '@Components/UtilsComponents/ModalAlert';

// Images
import _rocket from '@Assets/images/lauchLuna.png';

// Styles
import general from '@Sass/pages/general.module.scss';
import luna from '@Sass/pages/luna.module.scss';

const Luna = () => {
  const { contextValue, getPageLuna, setPageLuna } = useAuth();
  const { handleCreateproject, handleUpdateProject } = useEventsLuna();
  const { lunaQ1, lunaQ2, lunaQ3, lunaQ4, lunaQ5 } = LunaWPText();

  const [texts, setTexts] = useState({});
  const [texts2, setTexts2] = useState({});
  const [texts3, setTexts3] = useState({});
  const [texts4, setTexts4] = useState({});
  const [texts5, setTexts5] = useState({});
  const [titlePage, setTitlePage] = useState('LAUNCH');
  const { dataLuna, getLuna } = lunaStore(
    (state) => ({
      dataLuna: state.dataLuna,
      getLuna: state.getLuna,
    }),
    shallow
  );

  const history = useHistory();
  const [modalSalir, setModalSalir] = useState(false);

  useEffect(() => {
    handlePage();
  }, []);

  useEffect(() => {
    if (lunaQ1) {
      setTexts(lunaQ1);
    }
  }, [lunaQ1]);

  useEffect(() => {
    if (lunaQ2) {
      setTexts2(lunaQ2);
    }
  }, [lunaQ2]);

  useEffect(() => {
    if (lunaQ3) {
      setTexts3(lunaQ3);
    }
  }, [lunaQ3]);

  useEffect(() => {
    if (lunaQ4) {
      setTexts4(lunaQ4);
    }
  }, [lunaQ4]);

  useEffect(() => {
    if (lunaQ5) {
      setTexts5(lunaQ5);
    }
  }, [lunaQ5]);

  const handlePage = () => {
    if (getLuna()) {
      const luna = getLuna();
      if (luna.nombre === '') {
        setPageLuna(1);
      } else if (luna.que === '') {
        setPageLuna(2);
      } else if (luna.porque === '') {
        setPageLuna(3);
      } else if (luna.como1 === '' && luna.como2 === '' && luna.como3 === '') {
        setPageLuna(4);
      } else if (luna.pre === '') {
        setPageLuna(5);
      } else {
        setPageLuna(1);
      }
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleNextPage = async (page) => {
    if (contextValue.isLogged() && dataLuna.id) {
      await handleUpdateProject(dataLuna, page);
      return;
    }
    if (contextValue.isLogged()) {
      if (page === 6) {
        await handleCreateproject(dataLuna);
        return;
      } else {
        setPageLuna(page);
        return;
      }
    }

    if (page === 6) {
      setPageLuna(page);
      history.push('/signup');
    } else {
      setPageLuna(page);
    }
  };

  return (
    <section className={`${luna.Luna} ${general.planetWrap}`}>
      <img src={satelite} alt="Satelite" className={general.satelite} />
      <div className={general.planetContainer}>
        <div className={general.planetContent}>
          <div className={general.pageContainer}>
            <div className={luna.launch}>
              {getPageLuna === 1 ? (
                <NameProject
                  handleNextPage={handleNextPage}
                  setPageLuna={setPageLuna}
                  texts={texts}
                  setTitlePage={setTitlePage}
                />
              ) : null}
              {getPageLuna === 2 ? (
                <QuestionsLaunch1
                  handleNextPage={handleNextPage}
                  setPageLuna={setPageLuna}
                  texts2={texts2}
                  setTitlePage={setTitlePage}
                />
              ) : null}
              {getPageLuna === 3 ? (
                <QuestionsLaunch2
                  handleNextPage={handleNextPage}
                  setPageLuna={setPageLuna}
                  texts3={texts3}
                  setTitlePage={setTitlePage}
                />
              ) : null}
              {getPageLuna === 4 ? (
                <QuestionsLaunch3
                  handleNextPage={handleNextPage}
                  setPageLuna={setPageLuna}
                  texts4={texts4}
                  setTitlePage={setTitlePage}
                />
              ) : null}
              {getPageLuna === 5 ? (
                <QuestionsLaunch5
                  handleNextPage={handleNextPage}
                  setPageLuna={setPageLuna}
                  texts5={texts5}
                  setTitlePage={setTitlePage}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <img src={astronauta} alt="Space Man" className="space-man" />
    </section>
  );
};

export default Luna;
