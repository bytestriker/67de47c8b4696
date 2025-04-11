import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

// Store
import { globalStore } from '@Store/global';
import Button from '@Components/Button';

// Hooks
import { useEventsMarte } from '@Hooks/useEventsMarte';

// Styles
import styles from '@Sass/components/alerts.module.scss';

export const ModalSalirMarte = ({
  setPage,
  setModalSalir,
  title,
  message,
  data,
  page,
}) => {
  const { setMessage, setAlert } = globalStore(
    (state) => ({
      setMessage: state.setMessage,
      setAlert: state.setAlert,
    }),
    shallow
  );

  const { marteCreateProject, marteCreateProjectBussines } = useEventsMarte();
  const history = useHistory();
  const modalMarteRef = useRef(null);

  const pageValidations = {
    1: { fields: ['propuesta_valor'], message: 'Debes ingresar la propuesta de valor' },
    2: { fields: ['customer_segments'], message: 'Debes ingresar los segmentos de clientes' },
    3: { fields: ['key_activities'], message: 'Debes ingresar las actividades clave' },
    4: { fields: ['modelo_negocio'], message: 'Debes completar el modelo de negocio' },
  };

  const cleanData = (values) => {
    const cleaned = {
      ...values,
      value_proposition: values.value_proposition?.filter(Boolean) || [],
      key_activities: values.key_activities?.filter(Boolean) || [],
      revenue_streams: values.revenue_streams?.filter(Boolean) || [],
      customer_relationships: values.customer_relationships?.filter(Boolean) || [],
      channels: values.channels?.filter(Boolean) || [],
      key_partners: values.key_partners?.filter(Boolean) || [],
      cost_structure: values.cost_structure?.filter(Boolean) || [],
      customer_segments: values.customer_segments?.filter(Boolean) || [],
      key_resources: values.key_resources?.filter(Boolean) || [],
    };

    // Remove empty fields
    Object.keys(cleaned).forEach(key => {
      if (Array.isArray(cleaned[key]) && cleaned[key].length === 0) {
        delete cleaned[key];
      } else if (cleaned[key] === '') {
        delete cleaned[key];
      }
    });

    return cleaned;
  };

  const handleAlert = async (action, values, pageIn) => {
    const validation = pageValidations[pageIn];

    if (action === 'SAVE' || action === 'CONTINUE') {
      // Validate required fields
      if (
        validation &&
        validation.fields.some((field) =>
          Array.isArray(values[field])
            ? values[field].length === 0 || values[field].some((v) => !v?.trim())
            : !values[field]?.trim()
        )
      ) {
        setModalSalir(false);
        setMessage(validation.message);
        setAlert(true);
        return;
      }

      // Clean and save data based on page
      const cleanedData = cleanData(values);
      
      if (pageIn <= 3) await marteCreateProject(cleanedData);
      else if (pageIn === 4) await marteCreateProjectBussines(cleanedData.modelo_negocio);

      if (action === 'CONTINUE') {
        setPage(pageIn + 1);
        setModalSalir(false);
        return;
      } else {
        history.push("/");
        return;
      }
    }
  };

  return (
    <div className={styles.Modal}>
      <div className="container">
        <div className={styles.ModalContent} ref={modalMarteRef}>
          <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
          <p dangerouslySetInnerHTML={{ __html: message }}></p>
          <div className={`${styles.ButtonContent} buttons`}>
            <Button
              onClick={() => handleAlert('SAVE', data, page)}
              isAlt={true}
              text="GUARDAR"
            />
            <Button
              onClick={() => handleAlert('CONTINUE', data, page)}
              text="CONTINUAR"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalMarte = ({ setModal, setPage, message, title, buttonName, page }) => {
  const history = useHistory();

  const handleManageModal = () => {
    if (page && page !== 5) {
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
          <div className={`buttons`}>
            <Button onClick={() => handleManageModal()} text={buttonName} />
          </div>
        </div>
      </div>
    </div>
  );
};