import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { marteStore } from '@Store/marte';

// Hook
import { valPackage } from '@Hooks/useValidatePlanet';

// Images
import tank from '@Assets/images/planet-tank.svg';
import lock from '@Assets/images/lock.svg';
import grid from '@Assets/images/planet-grid.png';
import _colonizar from '@Assets/images/colonizar.svg';
import _rayo from '@Assets/images/rayo.svg';
import empieza from '@Assets/images/planets/empieza.svg';
import marte from '@Assets/images/planets/marte.svg';

// Components
import Button from '@Components/Button';


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

  
  return (
    <div className="planetGridItem">
      <div className="planetFigure">
        <img src={marte} alt="planet" className="planetImage" />
        {getMarte().lockedPlanet !== 'desbloqueado' && (
          <div className="lockedPlanet">
            <img src={grid} alt="lock" />
            <img src={lock} alt="lock" />
          </div>
        )}
        <ul className="bulletList">
            <li>Colonizar</li>
            <li>Transporte</li>
          </ul>
        <div className="tankCount">
          <img src={tank} alt="tank" />
          <span>x5</span>
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

      {getMarte().id ? (
        <Button
        className={`buttonPrimary ${
          dataMarte.complete === 1
            ? 'buttonPlanetCompleted'
            : dataMarte.complete === 2
            ? 'buttonPlanetIncomplete'
            : dataMarte.complete === 0
            ? ''
            : ''
        }`}
        onClick={() => validateProject('marte', 5)}
          text={dataMarte.label}
        
        />
      ) : (
        <Button
        onClick={() => validateProject('marte', 5)}
        text="EMPIEZA AQUÍ"
        />
        
      )}
    </div>
  );
};

  {/* <img src={empieza} alt="empieza" onClick={() => validateProject('marte', 1)}/> */}