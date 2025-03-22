import { useHistory } from 'react-router-dom';

// Styles
import styles from '@Sass/components/modals.module.scss';

export const ModalUrano = ({ setModal, message, title, buttonName }) => {
  const history = useHistory();

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
          <div className={styles.ButtonContent}>
            <button className={styles.buttonContinue} onClick={() => handleManageModal()}>
              {buttonName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
