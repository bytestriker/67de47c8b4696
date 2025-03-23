import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

// Store
import { uranoStore } from '@Store/urano';

// Hook
import { valPackage } from '@Hooks/useValidatePlanet';

// Styles
import style from '@Components/Planets/planets.module.scss';
import buttons from '@Sass/components/buttons.module.scss';
import lines from '@Components/Planets/lines.module.scss';

// Images
import tank from '@Assets/images/planet-tank.svg';
import lock from '@Assets/images/lock.svg';
import grid from '@Assets/images/planet-grid.png';
import _colonizar from '@Assets/images/colonizar.svg';
import _rayo from '@Assets/images/rayo.svg';
import empieza from '@Assets/images/planets/empieza.svg';
import urano from '@Assets/images/planets/urano.png';

export const Urano = ({ uranoInfo }) => {
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
  const [title, setTitle] = useState('Urano');

  // Store de Urano
  const { getUrano, dataUrano } = uranoStore(
      (state) => ({
        getUrano: state.getUrano,
        dataUrano: state.dataUrano,
      }),
      shallow
    );

  const { validateProject } = valPackage();

  useEffect(() => {
    if (uranoInfo.titulo) {
      setSkills(uranoInfo.skills);
      setDescription(uranoInfo.descripcion);
      setTitle(uranoInfo.titulo);
    }
  }, [uranoInfo]);

  return (
    <div>
    <div className={style.cardItem}>
      <div className={`${style.planetFigure}  `}>
        <img src={urano} alt="planet" className={`${style.planetImage} ${style.urano}`} />
        {
          getUrano().lockedPlanet !== 'desbloqueado' &&
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
        
         
        
          <img src={empieza} alt="empieza"  />
        
      </div>
    </div>
  </div>
  );
};
