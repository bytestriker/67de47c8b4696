import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { saturnoStore } from '@Store/saturno';

// Hook
import { valPackage } from '@Hooks/useValidatePlanet';

// Styles
import style from '@Components/Planets/planets.module.scss';
import lines from '@Components/Planets/lines.module.scss';
import buttons from '@Sass/components/buttons.module.scss';

// Images
import tank from '@Assets/images/planet-tank.svg';
import lock from '@Assets/images/lock.svg';
import grid from '@Assets/images/planet-grid.png';
import _colonizar from '@Assets/images/colonizar.svg';
import _rayo from '@Assets/images/rayo.svg';
import empieza from '@Assets/images/planets/empieza.svg';
import saturno from '@Assets/images/planets/saturno.svg';

export const Saturno = ({ saturnoInfo }) => {
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
  const [title, setTitle] = useState('Saturno');
  const { getSaturno, dataSaturno } = saturnoStore(
    (state) => ({
      getSaturno: state.getSaturno,
      dataSaturno: state.dataSaturno,
    }),
    shallow
  );

  const { validateProject } = valPackage();

  useEffect(() => {
    if (saturnoInfo.titulo) {
      setSkills(saturnoInfo.skills);
      setDescription(saturnoInfo.descripcion);
      setTitle(saturnoInfo.titulo);
    }
  }, [saturnoInfo]);

  return (
    <div className={`${style.planetGridItem}`}>
      <div className={`${style.planetFigure}  `}>
        <img src={saturno} alt="planet" className={`${style.planetImage}  ${style.mercurio}`} />
        {
          getSaturno().lockedPlanet !== 'desbloqueado' && (
          <div className={`${style.lockedPlanet}`}>
            <img src={grid} alt="lock" />
            <img src={lock} alt="lock" />
          </div>
          )
        }
        <div className={style.tankCount}>
          <img src={tank} alt="tank" />
          <span>x3</span>
        </div>
      </div>

      <div className={style.planetInfo}>
        <h2>
          <span dangerouslySetInnerHTML={{ __html: title }}></span>
          <span className={style.planetUnderline}></span>
        </h2>
        <span className={style.planetUnderline}></span>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
      {getSaturno().id ? (
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
        <img src={empieza} alt="empieza" />
      )}
    </div>
  );
};
