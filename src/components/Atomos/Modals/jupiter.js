import { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

// Store
import { globalStore } from '@Store/global';
import Button from '@Components/Button';


// Hooks
import { useEventJupiter } from '@Hooks/useEventsJupiter';

// Styles
// import styles from '@Sass/components/modals.module.scss';
import styles from '@Sass/components/alerts.module.scss';

export const ModalSalirJupiter = ({
  setPage,
  setModalSalir,
  title,
  message,
  dataJupiter,
  proyectID,
  page,
}) => {
  const { setMessage, setAlert } = globalStore(
    (state) => ({
      setMessage: state.setMessage,
      setAlert: state.setAlert,
    }),
    shallow
  );

  const { jupiterCreateProject, jupiterCreateNombres, jupiterCrearMarca } = useEventJupiter();
  const history = useHistory();
  const modalJupiterRef = useRef(null);


  const pageValidations = {
    1: { fields: ['caracteristicas'], message: 'Debes ingresar las características' },
    2: { fields: ['adjetivos_calificativos'], message: 'Debes ingresar los adjetivos' },
    3: { fields: ['objetivos'], message: 'Debes ingresar los objetivos' },
    4: { fields: ['significados'], message: 'Debes  los significados' },
    5: { fields: ['ideas_nombre'], message: 'Debes ingresar los nombres' },
    6: {
      fields: ['opcion_1', 'opcion_2', 'opcion_3'],
      message: '¡Debes seleccionar tus opciones! (Nombres)',
    },
    7: {
      fields: ['opcion_1', 'opcion_2', 'opcion_3'],
      message: '¡Debes seleccionar tus opciones!',
    },
    8: { fields: ['adjetivos'], message: 'Debes ingresar datos en esta sección' },
  }; 
  const handleAlert = async (action, id, params, pageIn) => {
    const validation = pageValidations[pageIn];
    console.log({action, id, params, pageIn})

    if (action === 'SAVE' || action === 'CONTINUE') {
      // Validate required fields
      if (
        validation &&
        validation.fields.some((field) =>
          Array.isArray(params[field])
            ? params[field].length === 0 || params[field].some((v) => !v?.trim())
            : !params[field]?.trim()
        )
      ) {
        setModalSalir(false);
        setMessage(validation.message);
        setAlert(true);
        return;
      }

      // Save data based on page
      if (pageIn <= 5) await jupiterCreateProject(id, params);
      else if (pageIn <= 7) await jupiterCreateNombres(id, params);
      else if (pageIn === 8) await jupiterCrearMarca(id, params);

      if (action.toLowerCase() === 'continue') {
        alert("aquí está tocando esta línea")
        setPage(pageIn + 1);
        setModalSalir(false);
        return
      } else {
        alert("Me regresó como si hubiera oprimido OK");
        history.push("/")
        return
      }
    }
  };

  return (
    <div className={styles.Modal}>
      <div className="container">
        <div className={styles.ModalContent} ref={modalJupiterRef}>
          <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
          <p dangerouslySetInnerHTML={{ __html: message }}></p>
          <div className={`${styles.ButtonContent} buttons`}>
            <Button
              onClick={() => handleAlert('SAVE', proyectID, dataJupiter, page)}
              isAlt={true}
              text="GUARDAR"
            />
            <Button
              onClick={() => handleAlert('CONTINUE', proyectID, dataJupiter, page)}
              text="CONTINUAR"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalJupiter = ({ setModal, setPage, message, title, buttonName, page }) => {
  const history = useHistory();

  const handleManageModal = () => {
    if (page && page !== 9) {
      setPage(page);
      setModal(false);
      return;
    }
    setModal(false);
    history.push('/');
  };
  return (
    <div className={styles.Modal}>
      <div className="container">
        <div className={styles.ModalContent}>
          <h3 dangerouslySetInnerHTML={{__html: title}}></h3>
          <p dangerouslySetInnerHTML={{ __html: message }}></p>
          <p dangerouslySetInnerHTML={{ __html: message.message }}></p>
          <div className={`buttons`}>
            <Button onClick={() => handleManageModal()}
             text={buttonName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
