/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

// Hooks
import { useEventsMarte } from '@Hooks/useEventsMarte';

// Constants
import { statusPlanet } from '@Helpers/constants';

// Styles
import styles from '@Sass/components/modals.module.scss';

export const ModalSalirMarte = ({ title, message, setModalSalir, data, page }) => {
  const { marteCreateProject, marteCreateProjectBussines } = useEventsMarte();
  const history = useHistory();
  const modalMarteRef = useRef(null);

  const handleAlert = async (action, values, page) => {
    if (action === 'OK') {
      if (page !== 4) {
        const deleteVoid = {
          ...values,
          value_proposition: values.value_proposition.filter(Boolean),
          key_activities: values.key_activities.filter(Boolean),
          revenue_streams: values.revenue_streams.filter(Boolean),
          customer_relationships: values.customer_relationships.filter(Boolean),
          channels: values.channels.filter(Boolean),
          key_partners: values.key_partners.filter(Boolean),
          cost_structure: values.cost_structure.filter(Boolean),
          customer_segments: values.customer_segments.filter(Boolean),
          key_resources: values.key_resources.filter(Boolean),
        };
        const objetoSinCamposVacios = {
          ...deleteVoid,
        };
    
        if (deleteVoid.propuesta_valor === '') {
          delete objetoSinCamposVacios.propuesta_valor;
        }
        if (deleteVoid.value_proposition.length === 0) {
          delete objetoSinCamposVacios.value_proposition;
        }
        if (deleteVoid.key_activities.length === 0) {
          delete objetoSinCamposVacios.key_activities;
        }
        if (deleteVoid.revenue_streams.length === 0) {
          delete objetoSinCamposVacios.revenue_streams;
        }
        if (deleteVoid.customer_relationships.length === 0) {
          delete objetoSinCamposVacios.customer_relationships;
        }
        if (deleteVoid.channels.length === 0) {
          delete objetoSinCamposVacios.channels;
        }
        if (deleteVoid.key_partners.length === 0) {
          delete objetoSinCamposVacios.key_partners;
        }
        if (deleteVoid.cost_structure.length === 0) {
          delete objetoSinCamposVacios.cost_structure;
        }
        if (deleteVoid.customer_segments.length === 0) {
          delete objetoSinCamposVacios.customer_segments;
        }
        if (deleteVoid.key_resources.length === 0) {
          delete objetoSinCamposVacios.key_resources;
        }
        await marteCreateProject(objetoSinCamposVacios);
        setModalSalir(false);
        history.push('/');
      } else {
        await marteCreateProjectBussines(values.modelo_negocio);
        console.log('OK');
        setModalSalir(false);
        history.push('/');
      }
    } else if (action === 'CANCELAR') {
      setModalSalir(false);
      history.push('/');
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalMarteRef.current && !modalMarteRef.current.contains(event.target)) {
        setModalSalir(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.Modal}>
      <div className="container">
        <div className={styles.ModalContent} ref={modalMarteRef}>
          <p>{title}</p>
          <strong>{message}</strong>
          <div className={styles.ButtonContent}>
            <button className="btnModal-cancel" onClick={() => handleAlert('CANCELAR', data, page)}>
              No
            </button>
            <button className="btnModal-ok" onClick={() => handleAlert('OK', data, page)}>
              Si
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalMarte = (props) => {
  const { setModal, setPage, message, title, buttonName, page } = props;
  const history = useHistory();

  const handleManageModal = () => {
    if (page) {
      if (page !== 5) {
        setPage(page);
        setModal(false);
        return;
      }
    }
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
