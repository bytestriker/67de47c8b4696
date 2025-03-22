import { useHistory, useLocation } from 'react-router-dom';

// IMAGES
import _arrowBack from '@Assets/images/icon_arrow-back.png';

import '@Components/UtilsComponents/Styles.scss';

export const LinkRouter = ({ rute, label, classItem }) => {
  const history = useHistory();
  const location = useLocation();

  const handleButton = (link) => {
    history.push({ pathname: link, from: location });
  };

  return (
    <button className={`buttonPlanet ${classItem}`} onClick={() => handleButton(rute)}>
      {label}
    </button>
  );
};

export const GoBack = () => {
  const history = useHistory();
  const location = useLocation();
  return (
    <div className="ArrowBack">
      <img
        src={_arrowBack}
        alt="arrowBack"
        title="regresar"
        onClick={() => history.push(location.from || '/')}
      />
    </div>
  );
};
