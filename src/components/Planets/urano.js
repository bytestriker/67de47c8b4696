import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import buttons from '@Sass/components/buttons.module.scss';

// Store
import { uranoStore } from '@Store/urano';

// Hook
import { valPackage } from '@Hooks/useValidatePlanet';

// Images
import tank from '@Assets/images/planet-tank.svg';
import lock from '@Assets/images/lock.svg';
import grid from '@Assets/images/planet-grid.png';
import _colonizar from '@Assets/images/colonizar.svg';
import _rayo from '@Assets/images/rayo.svg';
import empieza from '@Assets/images/planets/empieza.svg';
import urano from '@Assets/images/planets/urano.png';
import Button from '@Components/Button';

export const Urano = ({ uranoInfo }) => {
  const history = useHistory();
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
    <div className="planetGridItem planetGridItemUrano">
      <div className="planetFigure">
        <img src={urano} alt="planet" className="planetImage urano" />
        {getUrano().lockedPlanet !== 'desbloqueado' && (
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
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
      {getUrano().id ? (
        <Button
        className={`buttonPrimary ${
          dataUrano.complete === 1
            ? 'buttonPlanetCompleted'
            : dataUrano.complete === 2
            ? 'buttonPlanetIncomplete'
            : dataUrano.complete === 0
            ? ''
            : ''
        }`}
        onClick={() => validateProject('urano', 3)}
          text={dataUrano.label}
        />
      ) : (
        <Button
        onClick={() => validateProject('urano', 3)}
        text="EMPIEZA AQUÍ"
        />
      )}
    </div>
  );
};
{/* <img src={empieza} alt="empieza" onClick={() => validateProject('urano', 3)}/> */}
