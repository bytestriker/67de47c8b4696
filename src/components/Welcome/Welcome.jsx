import { useHistory } from 'react-router-dom';

// Store
import { lunaStore } from '@Store/luna';

// IMAGES
import _Astronaut from '@Assets/images/astronauta.png';

// STYLES
import '@Components/Welcome/Welcome.scss';

const Welcome = () => {
  // Store de luna
  const setPage = lunaStore((state) => state.setPage);
  const history = useHistory();
  const handleFinish = () => {
    setPage(1);
    history.push('/');
  };

  return (
    <div className="container">
      <div className="LaunchQuestion">
        <div className="welcome">
          <h2>BIENVENIDO</h2>
          <h4>Estamos listos para continuar la aventura</h4>
          <button className="btnPlanet" onClick={() => handleFinish()}>
            CONTINUAR
          </button>
          <img src={_Astronaut} alt="astronuat" className="astronautImg astronautEffect" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
