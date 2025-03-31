import { useHistory } from 'react-router-dom';

// Store
import { lunaStore } from '@Store/luna';

// IMAGES
import _Astronaut from '@Assets/images/astronauta.png';

// STYLES
import '@Components/Welcome/Welcome.scss';
import Button from '@Components/Button';

const Welcome = () => {
  // Store de luna
  const setPage = lunaStore((state) => state.setPage);
  const history = useHistory();
  const handleFinish = () => {
    setPage(1);
    history.push('/');
  };

  return (
    <section className="noticeWrap">
      <div className="noticeHeader">
        <h2>¡Bienvenido!</h2>
      </div>
      <div className="noticeContainer">
        <div className="noticeContent">
          <figure></figure>
          <p>Estamos listos para continuar la aventura.</p>
          <Button text="CONTINUAR" isCentered={true} onClick={() => handleFinish()} />
        </div>
      </div>
    </section>
  );
};

export default Welcome;
