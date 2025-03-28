import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
// Store
import { lunaStore } from '@Store/luna';
import { Title } from '@Components/Atomos/Titles';

// Styles
import lines from '@Components/Planets/lines.module.scss';
import buttons from '@Sass/components/buttons.module.scss';

// Images
import luna from '@Assets/images/moon.png';
import rocket from '@Assets/images/rocket.png';
import bulletLeft from '@Assets/images/bullet-left.svg';
import bulletTop from '@Assets/images/bullet-top.svg';
import radar from '@Assets/images/radar.svg';
import bullets from '@Assets/images/planets/bullets.svg';
import punto from '@Assets/images/planets/Punto.svg';
import empieza from '@Assets/images/planets/empieza.svg';
import Button from '@Components/Button';

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
  const [title, setTitle] = useState('Tu punto de partida, inspiración y creación.');
  const [description, setDescription] = useState('¡Aquí empieza tu proyecto y entrenamiento!');

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
    <div id="launch-moon" className="lunaWrapper">
      <div className="lunaFigure">
        <img src={luna} className="lunaImage" alt="luna" />
        <img src={rocket} className="rocketImage" alt="rocket" />
        <div className="radarWrapper">
          <img src={radar} className="radar" alt="Radar" />
          <img src={bulletTop} alt="Bullet SVG" className="bulletTop" />
          <img src={bulletLeft} alt="Bullet SVG" className="bulletLeft" />
        </div>
        <ul className="bulletList">
          <li>Colonizar</li>
          <li>Liftoff!</li>
          <li>Transporte</li>
        </ul>
      </div>
      {/*
      <img src={bullets} alt="bullets" className="bullets" />
      <img src={punto} alt="punto" className="punto" /> */}
      <div className="lunaContent">
        
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="planetButton_content">
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
            <Button
              text="EMPIEZA AQUI"
              onClick={() => history.push({ pathname: '/launch', from: location })} />
          )}
        </div>
      </div>
    </div>
  );
};
