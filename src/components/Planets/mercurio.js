import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { mercurioStore } from '@Store/mercurio';

// Hook
import { valPackage } from '@Hooks/useValidatePlanet';

// Images
import _tank from '@Assets/images/tanques.svg';
import _lock from '@Assets/images/lock.svg';
import mercurio from '@Assets/images/planets/mercurio.svg';
import _textura from '@Assets/images/textura.svg';
import _colonizar from '@Assets/images/colonizar.svg';
import _rayo from '@Assets/images/rayo.svg';
import empieza from '@Assets/images/planets/empieza.svg';

// Styles
import style from '@Components/Planets/planets.module.scss';
import buttons from '@Sass/components/buttons.module.scss';
import lines from '@Components/Planets/lines.module.scss';

export const Mercurio = ({ mercurioInfo }) => {
  const [skills, setSkills] = useState([
    {
      skill: '',
    },
  ]);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('MERCURIO');

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
    <div>
      <div className={style.cardItem}>
        <div className={`${style.planetImage_content}  `}>
          {getMercurio().lockedPlanet === 'desbloqueado' ? (
            <></>
          ) : (
            <div>
            <img src={_lock} alt="lock" className={style.imgLock} />
            <img src={_textura} alt="lock" className={style.imgTextura} />
            <img src={_colonizar} alt="lock" className={style.imgColonizar} />
            </div>
          )}
          <img src={mercurio} alt="planet" className={`${style.planetImage}  ${style.mercurio}`} />
          <img src={_tank} alt="tank" className={style.imgTank} />
          
        </div>
        
          
        <div className={style.planetInfo}>
        <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
          <img src={_rayo} alt="lock" className={style.imgRayo} />
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
          
        </div>

        <div className={style.planetButton_content}>
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
      </div>
    </div>
  );
};
