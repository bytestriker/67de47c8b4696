import { useEffect, useState } from 'react';
// STYLES
import lines from '@Components/Planets/lines.module.scss';

// IMAGES
import tank from '@Assets/images/planet-tank.svg';
import lock from '@Assets/images/lock.svg';
import grid from '@Assets/images/planet-grid.png';
import _colonizar from '@Assets/images/colonizar.svg';
import _rayo from '@Assets/images/rayo.svg';
import empieza from '@Assets/images/planets/empieza.svg';

import tierra from '@Assets/images/planets/tierra.svg';
import { valPackage } from '@Hooks/useValidatePlanet';

export const Tierra = ({ tierraInfo }) => {
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
  const [title, setTitle] = useState('Tierra');

  const { popup } = valPackage();

  useEffect(() => {
    if (tierraInfo.titulo) {
      setSkills(tierraInfo.skills);
      setDescription(tierraInfo.descripcion);
      setTitle(tierraInfo.titulo);
    }
  }, [tierraInfo]);

  return (
    <div className="planetGridItem">
      <div className="planetFigure">
        <div className="lockedPlanet">
          <img src={grid} alt="lock" />
          <img src={lock} alt="lock" />
        </div>

        <img src={tierra} alt="planet" className="planetImage" />

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
      <img src={empieza} alt="empieza" />
    </div>
  );
};
