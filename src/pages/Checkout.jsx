import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { shallow } from 'zustand/shallow';

// Context
import useAuth from '@Auth/userAuth';

// store
import { storeBuyTank, globalStore, storeRemainingTank, storeModalTank } from '@Store/global';

// services
import { CreateCustomer } from '@Service/conekta.service';
import { BuyTanks } from '@Service/tanks.service';

import Button from '@Components/Button';

// Icons
import { FaRegTimesCircle, FaInfoCircle } from 'react-icons/fa';
import ButtonGoHome from '@Components/ButtonGoHome';

// styles
import '@Sass/pages/planet.scss';
import styles from '@Sass/pages/checkout.module.scss';

const Checkout = () => {
  const { setLoading } = useAuth();
  const { setTanquesRestante } = storeRemainingTank(
    (state) => ({
      setTanquesRestante: state.setTanquesRestante,
    }),
    shallow
  );
  const { tanquesData } = storeBuyTank(
    (state) => ({
      tanquesData: state.tanquesData,
    }),
    shallow
  );
  const { setAlert, setMessage } = globalStore(
    (state) => ({
      setAlert: state.setAlert,
      setMessage: state.setMessage,
    }),
    shallow
  );

  const { storeTankModal } = storeModalTank(
    (state) => ({
      storeTankModal: state.storeTankModal,
    }),
    shallow
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();
  const location = useLocation();

  const [modal, setModal] = useState(false);
  const [pay, setPay] = useState(false);
  const [user, setUser] = useState();

  const handleConektaSuccess = async (jwt, user) => {
    const customer = await CreateCustomer(jwt, user);
    if (customer.code === 0) {
      const buy = await BuyTanks({ customer: customer.data, token: jwt, user, pack: tanquesData });
      if (buy.code === 0) {
        setLoading(false);
        setTanquesRestante({
          remainingTanks: buy.data.tanques_restantes,
        });
        history.push({ pathname: '/gracias', from: location });
      } else if (buy.code < 0) {
        setLoading(false);
        setAlert(true);
        setMessage('Ocurrio un error al procesar el pago');
      }
    } else if (customer.code < 0) {
      setLoading(false);
      setAlert(true);
      setMessage('Ocurrio un error al procesar la tarjeta');
    }
  };

  const handleConektaError = (error) => {
    setAlert(true);
    setMessage('Error al generar cliente');
    console.log('Error al procesar el pago:', error);
    setLoading(false);
  };

  const handleScript = () => {
    setModal(true);
    setTimeout(() => {
      const config = {
        targetIFrame: '#conektaIframeContainer',
        publicKey: process.env.REACT_APP_CONEKTA_APIKEY_PUBLIC,
        locale: 'es',
      };
      const callbacks = {
        onCreateTokenSucceeded: function (token) {
          setModal(false);
          setLoading(true);
          handleConektaSuccess(token, user);
        },

        onCreateTokenError: function (error) {
          setModal(false);
          setLoading(true);
          handleConektaError(error);
        },
      };
      window.ConektaCheckoutComponents.Card(
        {
          config,
          callbacks,
          allowTokenization: true,
        },
        3000
      );
    });
  };

  const onSubmit = (data) => {
    setUser(data);
    setPay(true);
  };

  return (
    <section className="planetWrap">
      <ButtonGoHome
        className="planetBackToTheHomepage"
        onClick={() => {
          history.push('/');
        }}
        text="Volver al Inicio"
      />
      <div className="shoppingCart">
        <h2 className="text-center">DATOS</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            {/* <label htmlFor="name">Nombre<small>*</small></label> */}
            <input
              type="text"
              placeholder="Nombre de empresa / Persona física *"
              id="name"
              {...register('name', { required: true })}
            />
            {errors.name && (
              <span className={styles.spanError}>
                <FaInfoCircle /> <span>Ingrese su nombre</span>
              </span>
            )}
          </fieldset>
          <div className="fieldsets">
            <fieldset>
              {/* <label htmlFor="razonSocial">Razón social<small>*</small></label> */}
              <input
                type="text"
                placeholder="Razón social *"
                id="razonSocial"
                {...register('razonSocial', { required: true })}
              />
              {errors.razonSocial && (
                <span className={styles.spanError}>
                  <FaInfoCircle /> <span>Ingrese sus razón social</span>
                </span>
              )}
            </fieldset>
            <fieldset>
              {/* <label htmlFor="rfc">RFC<small>*</small></label> */}
              <input
                type="text"
                placeholder="Razón social *"
                id="rfc"
                {...register('rfc', { required: true })}
              />
              {errors.rfc && (
                <span className={styles.spanError}>
                  <FaInfoCircle /> <span>Ingrese sus razón social</span>
                </span>
              )}
            </fieldset>
          </div>
          <fieldset>
            {/* <label htmlFor="direccionFiscal">Dirección fiscal <small>*</small></label> */}
            <input
              type="text"
              placeholder="Dirección fiscal *"
              id="direccionFiscal"
              name="direccionFiscal"
              {...register('direccionFiscal', { required: true })}
            />
            {errors.direccionFiscal && (
              <span className={styles.spanError}>
                <FaInfoCircle /> <span>Ingrese su direccion fiscal</span>
              </span>
            )}
          </fieldset>
          <div className="fieldsets">
            <fieldset>
              {/* <label htmlFor="numExt">Número exterior <small>*</small></label> */}
              <input
                type="text"
                placeholder="Número exterior *"
                id="numExt"
                name="numExt"
                {...register('numExt', { required: true })}
              />
              {errors.numExt && (
                <span className={styles.spanError}>
                  <FaInfoCircle /> <span>Ingrese el número exterior</span>
                </span>
              )}
            </fieldset>
            <fieldset>
              {/* <label htmlFor="numInt">Número interior</label> */}
              <input
                type="text"
                placeholder="Número interior"
                id="numInt"
                {...register('numInt')}
              />
            </fieldset>
          </div>
          <fieldset>
            {/* <label htmlFor="location">Localidad / Ciudad <small>*</small></label> */}
            <input
              type="text"
              placeholder="Localidad / Ciudad *"
              id="location"
              {...register('location', { required: true })}
            />
            {errors.location && (
              <span className={styles.spanError}>
                <FaInfoCircle /> <span>Ingrese su localidad</span>
              </span>
            )}
          </fieldset>
          <div className="fieldsets">
            <fieldset>
              {/* <label htmlFor="estadoProvincia">Estado / Provincia <small>*</small></label> */}
              <input
                type="text"
                placeholder="Estado / Provincia *"
                id="estadoProvincia"
                {...register('estadoProvincia', { required: true })}
              />
              {errors.estadoProvincia && (
                <span className={styles.spanError}>
                  <FaInfoCircle /> <span>Ingresa tu estado o provincia</span>
                </span>
              )}
            </fieldset>
            <fieldset>
              {/* <label htmlFor="postalCode">Código postal <small>*</small></label> */}
              <input
                type="number"
                placeholder="Código postal *"
                id="postalCode"
                minLength="0"
                maxLength="5"
                {...register('postalCode', {
                  required: 'Ingrese su código postal',
                  pattern: {
                    value: /^[0-9]{5}$/,
                    message: 'El código postal debe tener 5 dígitos numéricos',
                  },
                })}
              />
              {errors.postalCode && (
                <span className={styles.spanError}>
                  <FaInfoCircle /> <span>{errors.postalcode.message}</span>
                </span>
              )}
            </fieldset>
          </div>
          <div className="fieldsets">
            <fieldset>
              {/* <label htmlFor="phone"> Teléfono<small>*</small></label> */}
              <input
                type="number"
                placeholder="Teléfono *"
                id="phone"
                minLength="0"
                maxLength="10"
                {...register('phone', {
                  required: 'Ingrese su número de teléfono',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'El número de teléfono debe tener 10 dígitos y solo números',
                  },
                })}
              />
              {errors.phone && (
                <span className={styles.spanError}>
                  <FaInfoCircle /> <span>{errors.phone.message}</span>
                </span>
              )}
            </fieldset>
            <fieldset>
              {/* <label htmlFor="email"> Correo electrónico<small>*</small></label> */}
              <input
                type="email"
                placeholder="Correo electrónico *"
                id="email"
                {...register('email', {
                  required: 'Ingrese su correo electrónico',
                  pattern: /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
                })}
              />
              {errors.email && (
                <span className={styles.spanError}>
                  <FaInfoCircle /> <span>Ingrese su email</span>
                </span>
              )}
            </fieldset>
          </div>
          <fieldset>
            {/* <label htmlFor="name">Nombre<small>*</small></label> */}
            <input
              type="text"
              placeholder="Uso de CFDI *"
              id="name"
              {...register('name', { required: true })}
            />
            {errors.name && (
              <span className={styles.spanError}>
                <FaInfoCircle /> <span>Ingrese su nombre</span>
              </span>
            )}
          </fieldset>
          <fieldset>
            <div className="inputFileAnchor">
              <span>Adjuntar constancia de situacion fiscal</span>
              <input
                type="file"
                id="constancia"
                {...register('constancia')}
              />
            </div>
          </fieldset>
          <Button text="REALIZAR COMPRA" type="submit" />
        </form>
        {pay ? (
          <div>
            <h2>Método de pago</h2>
            <div onClick={() => handleScript()}>
              <a>Pago con Tarjeta de Crédito o Debito</a>
            </div>
            <p>Sus datos personales se utilizarán para respaldar su experiencia en este sitio web, para administrar el acceso a su cuenta y para otros fines descritos en nuestra <a href="/privacidad">[política de privacidad].</a>
            </p>
          </div>
        ) : null}
      </div>
      {modal ? (
        <div className={styles.modal}>
          <div className={styles.ModalContent}>
            <div className={styles.closeNav}>
              <FaRegTimesCircle className={styles.iconClose} onClick={() => setModal(false)} />
            </div>
            <div id="conektaIframeContainer" className={styles.conekta}></div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Checkout;
