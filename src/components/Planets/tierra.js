import { useEffect, useState } from 'react';
// STYLES
import style from '@Components/Planets/planets.module.scss';
import lines from '@Components/Planets/lines.module.scss';

// IMAGES
import _tank from '@Assets/images/tanques.svg';
import _lock from '@Assets/images/lock.svg';
import _textura from '@Assets/images/textura.svg';
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
  const [title, setTitle] = useState('TIERRA');


  const { popup } = valPackage();

  useEffect(() => {
    if (tierraInfo.titulo) {
      setSkills(tierraInfo.skills);
      setDescription(tierraInfo.descripcion);
      setTitle(tierraInfo.titulo);
    }
  }, [tierraInfo]);

  return (
    <div>
      <div className={style.cardItem}>
        <div className={`${style.planetImage_content}  `}>
          
            <div>
            <img src={_lock} alt="lock" className={style.imgLock} />
            <img src={_textura} alt="lock" className={style.imgTextura} />
            <img src={_colonizar} alt="lock" className={style.imgColonizar} />
            </div>
          
          <img src={tierra} alt="planet" className={`${style.planetImage}  ${style.mercurio}`} />
          <img src={_tank} alt="tank" className={style.imgTank} />
          
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
