import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { mercurioStore } from '@Store/mercurio';

// Hook
import { valPackage } from '@Hooks/useValidatePlanet';

// Images
import tank from '@Assets/images/planet-tank.svg';
import lock from '@Assets/images/lock.svg';
import grid from '@Assets/images/planet-grid.png';
import mercurio from '@Assets/images/planets/mercurio.png';
import _colonizar from '@Assets/images/colonizar.svg';
import _rayo from '@Assets/images/rayo.svg';
import empieza from '@Assets/images/planets/empieza.svg';

// Styles
import buttons from '@Sass/components/buttons.module.scss';
import lines from '@Components/Planets/lines.module.scss';

export const Mercurio = ({ mercurioInfo }) => {
  const [skills, setSkills] = useState([
    {
      skill: '',
    },
  ]);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('Mercurio');

  // Store de mercurio
  const { getMercurio, dataMercurio } = mercurioStore(
    (state) => ({
      getMercurio: state.getMercurio,
      dataMercurio: state.dataMercurio,
    }),
    shallow
  );

  const { validateProject } = valPackage();

  useEffect(() => {
    if (mercurioInfo.titulo) {
      setSkills(mercurioInfo.skills);
      setDescription(mercurioInfo.descripcion);
      setTitle(mercurioInfo.titulo);
    }
  }, [mercurioInfo]);

  return (
    <div className="planetGridItem">
      <div className="planetFigure">
        <img src={mercurio} alt="planet" className="planetImage" />
        {
          getMercurio().lockedPlanet !== 'desbloqueado' &&
          <div className="lockedPlanet">
            <img src={grid} alt="lock" />
            <img src={lock} alt="lock" />
          </div>
        }
        <div className="tankCount">
          <img src={tank} alt="tank" />
          <span>x3</span>
        </div>
      </div>
      <div className="planetInfo">
        <h2>
          <span dangerouslySetInnerHTML={{ __html: title }}></span>
          <span className="planetUnderline"></span>
        </h2>
        <span className="planetUnderline"></span>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
      {getMercurio().id ? (
        <button
          className={`${
            dataMercurio.complete === 1
              ? buttons.buttonPlanetCompleted
              : dataMercurio.complete === 2
              ? buttons.buttonPlanetIncomplete
              : dataMercurio.complete === 0
              ? buttons.buttonPlanet
              : buttons.buttonPlanet
          }`}
          onClick={() => validateProject('mercurio', 1)}
        >
          {dataMercurio.label}
        </button>
      ) : (
        <img src={empieza} alt="empieza"  />
      )}
    </div>
  );
};
