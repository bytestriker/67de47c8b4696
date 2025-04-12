import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { FaPlusCircle } from 'react-icons/fa';
import { LocalStoragePlanets } from '@Helpers/constants';

// Store
import { globalStore } from '@Store/global';

// Hooks
import { useEventsVenus } from '@Hooks/useEventVenus';
import Button from '@Components/Button';

// Styles
import styles from '@Sass/components/alerts.module.scss';

export const ModalVenus = ({ setModal, setPage, message, title, buttonName, page }) => {
  const history = useHistory();

  const handleManageModal = () => {
    history.push('/');
    setModal(false);
  };

  const handleAddMoreBuyers = () => {
    setPage(10);
    setModal(false);
  }

  return (
    <div className={styles.Modal}>
      <div className="container">
        <div className={styles.ModalContent}>
          <h3 dangerouslySetInnerHTML={{ __html: title }}></h3>
          <p dangerouslySetInnerHTML={{ __html: message }}></p>
          <div className={`${styles.ButtonContent} buttons`}>
            <Button onClick={() => handleManageModal()} text={buttonName} />

          </div>
            <p onClick={()=>handleAddMoreBuyers()}><FaPlusCircle />&nbsp;<b>Agregar más Buyer Persona</b></p>
        </div>
      </div>
    </div>
  );
};

export const ModalSalirVenus = ({
  setModalSalir,
  title,
  message,
  data,
  proyectID,
  page,
  setPage,
}) => {
  const { setMessage, setAlert } = globalStore(
    (state) => ({
      setMessage: state.setMessage,
      setAlert: state.setAlert,
    }),
    shallow
  );

  const { 
    venusCreateProject, 
    venusCreateFoda1, 
    venusCreateFoda2, 
    venusCreateFoda4,
    venusCreateBuyerPersona 
  } = useEventsVenus();
  


  const history = useHistory();
  const modalVenusRef = useRef(null);

  const pageValidations = {
    0: { fields: ['painpoints'], message: 'Debes ingresar datos en la sección Pain Points & Pain Relievers' },
    1: { fields: ['painpoints'], message: 'Debes ingresar datos en la sección Pain Points & Pain Relievers' },
    2: { 
      fields: ['fortalezas', 'oportunidades'], 
      message: 'Debes ingresar fortalezas y oportunidades' 
    },
    3: { 
      fields: ['debilidades', 'amenazas'], 
      message: 'Debes ingresar debilidades y amenazas' 
    },
    4: { 
      fields: ['foda_1.fortalezas_oportunidades', 'foda_1.conclusion'], 
      message: 'Debes completar el análisis FODA 1' 
    },
    5: { 
      fields: ['foda_2.oportunidades_debilidades', 'foda_2.conclusion'], 
      message: 'Debes completar el análisis FODA 2' 
    },
    6: { 
      fields: ['foda_3.fortalezas_amenazas', 'foda_3.conclusion'], 
      message: 'Debes completar el análisis FODA 3' 
    },
    7: { 
      fields: ['foda_4.debilidades_amenazas', 'foda_4.conclusion'], 
      message: 'Debes completar el análisis FODA 4' 
    },
    8: { 
      fields: ['buyer'], 
      message: 'Debes completar todos los campos del buyer persona',
      customValidation: (data) => {
        return !Object.values(data.buyer).some(val => val === '');
      }
    },
  };

  const handleCreate = async (pageNum, data) => {
    switch(pageNum) {
      case 0:
      case 1:
      case 2:
      case 3:
        return await venusCreateProject(data);
      case 4:
        return await venusCreateFoda1(data.foda_1);
      case 5:
        return await venusCreateFoda2(data.foda_2);
      case 6:
        return await venusCreateFoda3(data.foda_3);
      case 7:
        return await venusCreateFoda4(data.foda_4);
      case 8:
        return await venusCreateBuyerPersona(data.buyer);
      default:
        return { code: -1 };
    }
  };

  const handleAlert = async (action, idProyect, params) => {
    const validation = pageValidations[page];
    
    if (action === 'SAVE') {
      // Custom validation for buyer persona
      if (validation?.customValidation && !validation.customValidation(params)) {
        setMessage(validation.message);
        setAlert(true);
        return;
      }
      
      // Standard field validation
      if (
        validation &&
        validation.fields.some(field => {
          if (field.includes('.')) {
            const [parent, child] = field.split('.');
            return !params[parent]?.[child]?.trim();
          }
          return Array.isArray(params[field])
            ? params[field].length === 0
            : !params[field]?.trim();
        })
      ) {
        setMessage(validation.message);
        setAlert(true);
        return;
      }

      const res = await handleCreate(page, params);
      if (res.code === 0) {
        history.push('/');
      }
    } else if (action === 'CONTINUE') {
      const res = await handleCreate(page, params);
      if (res.code === 0) {
        setModalSalir(false);
        setPage(page + 1)
      }
    }
  };

  return (
    <div className={styles.Modal}>
      <div className="container">
        <div className={styles.ModalContent} ref={modalVenusRef}>
          {page <= 3 && (<h2>Paso 2</h2>)}
          {page > 3 && (<h2>Paso 3</h2>)}
          <p dangerouslySetInnerHTML={{ __html: message }}></p>
          <div className={`${styles.ButtonContent} buttons`}>
            <Button isAlt={true}
              onClick={() => handleAlert('SAVE', proyectID, data)} 
              text="GUARDAR" 
            />
            <Button 
              onClick={() => handleAlert('CONTINUE', proyectID, data)} 
              text="CONTINUAR" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};