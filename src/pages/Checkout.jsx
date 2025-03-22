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

// Icons
import { FaRegTimesCircle, FaInfoCircle } from 'react-icons/fa';

// styles
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
    <section>
      <div className={styles.Checkout}>
        <div className={styles.container}>
          <h2 className={styles.titlePage}>Checkout</h2>
          <div className={styles.formContent}>
            <div className={styles.form1}>
              <h2>DETALLES DE FACTURACIÓN</h2>

              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formControl}>
                  <span className={styles.formInputs}>
                    <label htmlFor="name" className={styles.formLabel}>
                      Nombre<small>*</small>
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre"
                      id="name"
                      className={styles.inputText}
                      {...register('name', { required: true })}
                    />
                    {errors.name && (
                      <span className={styles.spanError}>
                        <FaInfoCircle /> <span>Ingrese su nombre</span>
                      </span>
                    )}
                  </span>

                  <span className={styles.formInputs}>
                    <label htmlFor="lastName" className={styles.formLabel}>
                      Apellidos<small>*</small>
                    </label>
                    <input
                      type="text"
                      placeholder="Apellidos"
                      id="lastName"
                      className={styles.inputText}
                      {...register('lastName', { required: true })}
                    />
                    {errors.lastName && (
                      <span className={styles.spanError}>
                        <FaInfoCircle /> <span>Ingrese sus apellidos</span>
                      </span>
                    )}
                  </span>

                  <span className={styles.formInputs}>
                    <label className={styles.formLabel}>
                      País/Región <small>*</small>
                    </label>
                    <p className={styles.texts}>
                      <strong>México</strong>
                    </p>
                  </span>
                </div>

                <div className={styles.formControlPlus}>
                  <span className={styles.formInputs}>
                    <label htmlFor="street" className={styles.formLabel}>
                      Calle<small>*</small>
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre de la calle"
                      id="street"
                      name="street"
                      className={styles.inputText}
                      {...register('street', { required: true })}
                    />
                    {errors.street && (
                      <span className={styles.spanError}>
                        <FaInfoCircle /> <span>Ingrese su calle</span>
                      </span>
                    )}
                  </span>
                </div>

                <div className={styles.formControl}>
                  <span className={styles.formInputs}>
                    <label htmlFor="numExt" className={styles.formLabel}>
                      Número exterior<small>*</small>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      id="numExt"
                      className={styles.inputText}
                      {...register('numExt', { required: true })}
                    />
                    {errors.numExt && (
                      <span className={styles.spanError}>
                        <FaInfoCircle /> <span>Ingrese su número exterior</span>
                      </span>
                    )}
                  </span>

                  <span className={styles.formInputs}>
                    <label htmlFor="numInt" className={styles.formLabel}>
                      Número interior<small>*</small>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      id="numInt"
                      className={styles.inputText}
                      {...register('numInt', { required: false })}
                    />
                  </span>
                </div>

                <div className={styles.formControl}>
                  <span className={styles.formInputs}>
                    <label htmlFor="location" className={styles.formLabel}>
                      Localidad / Ciudad<small>*</small>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      id="location"
                      className={styles.inputText}
                      {...register('location', { required: true })}
                    />
                    {errors.location && (
                      <span className={styles.spanError}>
                        <FaInfoCircle /> <span>Ingrese su localidad</span>
                      </span>
                    )}
                  </span>

                  <span className={styles.formInputs}>
                    <label htmlFor="postalCode" className={styles.formLabel}>
                      Código postal<small>*</small>
                    </label>
                    <input
                      type="number"
                      placeholder=""
                      id="postalCode"
                      minLength="0"
                      maxLength="5"
                      className={styles.inputText}
                      {...register('postalcode', {
                        required: 'Ingrese su código postal',
                        pattern: {
                          value: /^[0-9]{5}$/,
                          message: 'El código postal debe tener 5 dígitos numéricos',
                        },
                      })}
                    />
                    {errors.postalcode && (
                      <span className={styles.spanError}>
                        <FaInfoCircle /> <span>{errors.postalcode.message}</span>
                      </span>
                    )}
                  </span>
                </div>

                <div className={styles.formControl}>
                  <span className={styles.formInputs}>
                    <label htmlFor="phone" className={styles.formLabel}>
                      Teléfono<small>*</small>
                    </label>
                    <input
                      type="number"
                      placeholder=""
                      id="phone"
                      minLength="0"
                      maxLength="10"
                      className={styles.inputText}
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
                  </span>

                  <span className={styles.formInputs}>
                    <label htmlFor="email" className={styles.formLabel}>
                      Correo electrónico<small>*</small>
                    </label>
                    <input
                      type="email"
                      placeholder=""
                      id="email"
                      className={styles.inputText}
                      {...register('email', {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
                      })}
                    />
                    {errors.email && (
                      <span className={styles.spanError}>
                        <FaInfoCircle /> <span>Ingrese su email</span>
                      </span>
                    )}
                  </span>
                </div>
                <button className={styles.compra} type="submit">
                  REALIZAR COMPRA
                </button>
              </form>

              {pay ? (
                <div>
                  <h2>Método de pago</h2>
                  <div className={styles.metodoPago} onClick={() => handleScript()}>
                    <a>Pago con Tarjeta de Crédito o Debito</a>
                  </div>
                  <p className={styles.informacion}>
                    Sus datos personales se utilizarán para respaldar su experiencia en este sitio
                    web, para administrar el acceso a su cuenta y para otros fines descritos en
                    nuestra
                    <a href="/privacidad">[política de privacidad].</a>
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div>
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
      </div>
    </section>
  );
};

export default Checkout;
