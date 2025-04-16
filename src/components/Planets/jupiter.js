import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { jupiterStore } from '@Store/jupiter';

// Hook
import { valPackage } from '@Hooks/useValidatePlanet';

// STYLES
import buttons from '@Sass/components/buttons.module.scss';
import lines from '@Components/Planets/lines.module.scss';

// IMAGES
import tank from '@Assets/images/planet-tank.svg';
import lock from '@Assets/images/lock.svg';
import grid from '@Assets/images/planet-grid.png';
import _colonizar from '@Assets/images/colonizar.svg';
import _rayo from '@Assets/images/rayo.svg';
import empieza from '@Assets/images/planets/empieza.svg';
import jupiter from '@Assets/images/planets/jupiter.svg';
import Button from '@Components/Button';

export const Jupiter = ({ jupiterInfo }) => {
  const [skills, setSkills] = useState([
    {
      skill: '',
    },
    {
      skill: '',
    },
  ]);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('Jupiter');

  // Store de mercurio
  const { getJupiter, dataJupiter } = jupiterStore(
    (state) => ({
      getJupiter: state.getJupiter,
      dataJupiter: state.dataJupiter,
    }),
    shallow
  );

  const { validateProject } = valPackage();

  useEffect(() => {
    if (jupiterInfo.titulo) {
      setSkills(jupiterInfo.skills);
      setDescription(jupiterInfo.descripcion);
      setTitle(jupiterInfo.titulo);
    }
  }, [jupiterInfo]);

  return (
    <div className="planetGridItem">
      <div className="planetFigure">
        <img src={jupiter} alt="planet" className="planetImage" />
        {getJupiter().lockedPlanet !== 'desbloqueado' && (
          <div className="lockedPlanet">
            <img src={grid} alt="lock" />
            <img src={lock} alt="lock" />
          </div>
        )}
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

      {getJupiter().id ? (
        <Button
        className={`buttonPrimary ${
          dataJupiter.complete === 1
            ? 'buttonPlanetCompleted'
            : dataJupiter.complete === 2
            ? 'buttonPlanetIncomplete'
            : dataJupiter.complete === 0
            ? ''
            : ''
        }`}
        onClick={() => validateProject('jupiter', 3)}
          text={dataJupiter.label}        
        />
      ) : (
        <Button
        onClick={() => validateProject('jupiter', 3)}
        text="EMPIEZA AQUÍ"
        />
      )}
    </div>
  );
};

{/* <img src={empieza} alt="empieza" onClick={() => validateProject('jupiter', 1)}/> */}