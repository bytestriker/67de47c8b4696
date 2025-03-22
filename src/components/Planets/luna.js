import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
// Store
import { lunaStore } from '@Store/luna';
import { Title } from '@Components/Atomos/Titles';

// Styles
import style from '@Components/Planets/planets.module.scss';
import lines from '@Components/Planets/lines.module.scss';
import buttons from '@Sass/components/buttons.module.scss';

// Images
import luna from '@Assets/images/planets/Luna2.png';
import radar from '@Assets/images/planets/radar.png';
import bullets from '@Assets/images/planets/bullets.svg';
import vector from '@Assets/images/planets/vector.svg';
import punto from '@Assets/images/planets/Punto.svg';
import empieza from '@Assets/images/planets/empieza.svg';

export const Luna = ({ lunaInfo }) => {
  const [skills, setSkills] = useState([
    {
      skill: '',
    },
    {
      skill: '',
    },
    {
      skill: '',
    },
  ]);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('LUNA');

  const { getLuna, dataLuna } = lunaStore(
    (state) => ({
      getLuna: state.getLuna,
      dataLuna: state.dataLuna,
    }),
    shallow
  );
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (lunaInfo.titulo) {
      setSkills(lunaInfo.skills);
      setDescription(lunaInfo.descripcion);
      setTitle(lunaInfo.titulo);
    }
  }, [lunaInfo]);

  return (
    <div id="launch-moon">
        <div className={`${style.luna_content}`}>
          <img src={luna} alt="luna" className={`${style.luna_base}`} />
          <img src={radar} alt="radar" className={`${style.radar}`} />
          <img src={bullets} alt="bullets" className={`${style.bullets}`} />
          <img src={vector} alt="vector" className={`${style.vector}`} />
          <img src={punto} alt="punto" className={`${style.punto}`} />
          <div className={`${style.luna_textos}`}>{title}
            <p>{description}</p>
            <div className={style.planetButton_content}>
          {getLuna().id ? (
            <button
              className={`${
                dataLuna?.complete === 1
                  ? buttons.buttonPlanetCompleted
                  : dataLuna?.complete === 2
                  ? buttons.buttonPlanetIncomplete
                  : dataLuna?.complete === 0
                  ? buttons.buttonPlanet
                  : buttons.buttonPlanet
              }`}
              onClick={() => history.push({ pathname: '/launch', from: location })}
            >
              {dataLuna?.label}
            </button>
          ) : (
            <button
              className={style.moon_launchBtn}
              onClick={() => history.push({ pathname: '/launch', from: location })}
            >
              EMPIEZA AQUI
            </button>
          )}
        </div>
          </div>
        </div>
    </div>
  );
};
