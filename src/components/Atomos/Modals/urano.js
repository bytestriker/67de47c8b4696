import { useHistory } from 'react-router-dom';
import Button from '@Components/Button';

import { LocalStoragePlanets } from '@Helpers/constants';
// Styles
// import styles from '@Sass/components/modals.module.scss';
import styles from '@Sass/components/alerts.module.scss';

export const ModalUrano = ({ setModal, message, title, buttonName }) => {
  const history = useHistory();

  const nameProject = () => {
    const param = JSON.parse(localStorage.getItem(LocalStoragePlanets.LUNA)) || {};
    return <h4>{param?.nombre}</h4>;
  };

  const handleManageModal = () => {
    setModal(false);
    history.push('/');
  };
  return (
    <div className={styles.Modal}>
      <div className="container">
        <div className={styles.ModalContent}>
          <h3>{title}</h3>
          <p dangerouslySetInnerHTML={{ __html: message }}></p>
          {nameProject()}
          <div className={styles.ButtonContent}>
            <Button onClick={() => handleManageModal()} text={buttonName} />
          </div>
        </div>
      </div>
    </div>
  );
};
