import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { marteStore } from '@Store/marte';

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
import marte from '@Assets/images/planets/marte.svg';

export const Marte = ({ marteInfo }) => {
  const [skills, setSkills] = useState([
    {
      skill: '',
    },
    {
      skill: '',
    },
  ]);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('Marte');

  // Store de marte
  const { getMarte, dataMarte } = marteStore(
    (state) => ({
      getMarte: state.getMarte,
      dataMarte: state.dataMarte,
    }),
    shallow
  );

  const { validateProject } = valPackage();

  useEffect(() => {
    if (marteInfo.titulo) {
      setSkills(marteInfo.skills);
      setDescription(marteInfo.descripcion);
      setTitle(marteInfo.titulo);
    }
  }, [marteInfo]);
/* 
  useEffect(() => {
    console.log(dataMarte);
  }, [dataMarte]); */

  return (
    <>
      <div>
      <div className={style.cardItem}>
        <div className={`${style.planetFigure}`}>
          <img src={marte} alt="planet" className={`${style.planetImage}  ${style.mercurio}`} />
          {
            getMarte().lockedPlanet !== 'desbloqueado' &&
            <div className={`${style.planetLocked}`}>
              <img src={grid} alt="lock" />
              <img src={lock} alt="lock" />
            </div>
          }
          

<div className={style.tankCount}>
          <img src={tank} alt="tank" />
          <span>x3</span>
        </div>
          
        </div>
        
          
        <div className={style.planetInfo}>
        <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
          <img src={_rayo} alt="lock" className={style.imgRayo} />
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
          
        </div>

        <div className={style.planetButton_content}>
          {getMarte().id ? (
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
      </div>
    </div>
    </>
  );
};
