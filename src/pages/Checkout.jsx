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
import '@Sass/pages/checkout.scss';

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
      <div className="planetContainer">
        <div className="checkOut">
          <h2 className="text-center">Método de Pago</h2>
          <div className="fieldsets payment-methods">
            <fieldset className="method-paypal">
              <input {...register("paymentMethod")} type="radio" value="Paypal" />
              <svg width="148" height="148" viewBox="0 0 148 148" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M125.793 0.5L132.793 7.5H142.793L147.5 12.207V147.5H22.207L17.207 142.5H6.20703L0.5 136.793V0.5H125.793Z" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M93.0989 81.3528H84.6719C84.0965 81.3528 83.606 81.7728 83.5159 82.3439L80.1081 104.012C80.0405 104.44 80.3707 104.825 80.8007 104.825H85.1253C85.5267 104.825 85.8704 104.531 85.9332 104.131L86.9006 97.9888C86.9891 97.4167 87.4811 96.9967 88.0562 96.9967H90.7225C96.2741 96.9967 99.4762 94.3028 100.314 88.9654C100.692 86.63 100.329 84.7953 99.2384 83.5103C98.0419 82.0992 95.9191 81.3528 93.0989 81.3528ZM94.0712 89.267C93.6116 92.2989 91.3013 92.2989 89.0665 92.2989H87.7965L88.6896 86.6361C88.7424 86.294 89.0356 86.0418 89.3818 86.0418H89.9647C91.485 86.0418 92.9216 86.0418 93.6631 86.9117C94.1056 87.4305 94.2398 88.2016 94.0712 89.267Z" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M118.496 89.0054H114.464C114.117 89.0054 113.823 89.2575 113.771 89.5997L113.593 90.7314L113.309 90.3213C112.436 89.0498 110.489 88.6247 108.545 88.6247C104.086 88.6247 100.279 92.0116 99.5375 96.7624C99.1529 99.1322 99.6985 101.398 101.039 102.979C102.271 104.432 104.028 105.037 106.121 105.037C109.714 105.037 111.706 102.72 111.706 102.72L111.526 103.845C111.459 104.275 111.789 104.66 112.221 104.66H115.855C116.43 104.66 116.92 104.24 117.01 103.668L119.192 89.8184C119.259 89.392 118.929 89.0054 118.496 89.0054ZM112.872 96.8813C112.485 99.1927 110.653 100.745 108.319 100.745C107.15 100.745 106.211 100.368 105.61 99.6538C105.014 98.9446 104.789 97.9352 104.976 96.8106C105.343 94.5187 107.201 92.9159 109.499 92.9159C110.644 92.9159 111.576 93.2982 112.189 94.018C112.806 94.7458 113.05 95.7616 112.872 96.8813Z" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M122.917 81.9484L119.459 104.013C119.391 104.441 119.721 104.826 120.151 104.826H123.628C124.206 104.826 124.696 104.406 124.785 103.834L128.195 82.1671C128.263 81.7394 127.933 81.3528 127.503 81.3528H123.61C123.266 81.3538 122.97 81.6062 122.917 81.9484Z" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M86.4951 46.473C86.4609 46.6942 86.4214 46.9201 86.377 47.1525C84.8531 54.9999 79.6389 57.7108 72.9797 57.7108H69.5889C68.7744 57.7108 68.088 58.3036 67.9614 59.1092L65.7338 73.2802C65.6514 73.8094 66.0579 74.2858 66.5899 74.2858H72.6038C73.3157 74.2858 73.9207 73.767 74.033 73.0627L74.092 72.7565L75.2242 65.5505L75.2971 65.1552C75.4079 64.4484 76.0142 63.9294 76.7261 63.9294H77.6256C83.4519 63.9294 88.0131 61.5573 89.3464 54.6921C89.903 51.8242 89.6149 49.4297 88.1412 47.7456C87.6955 47.238 87.1422 46.8164 86.4951 46.473Z" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M33 81.3528H24.5739C23.9972 81.3528 23.5068 81.7728 23.4168 82.3439L20.0088 104.012C19.9412 104.44 20.2715 104.825 20.7039 104.825H24.7264C25.303 104.825 25.7934 104.405 25.8835 103.833L26.8026 97.9888C26.8912 97.4167 27.3827 96.9967 27.9583 96.9967H30.6256C36.1761 96.9967 39.3793 94.3028 40.2163 88.9654C40.5932 86.63 40.2321 84.7953 39.1415 83.5103C37.944 82.0992 35.8199 81.3528 33 81.3528ZM33.972 89.267C33.5111 92.2989 31.2011 92.2989 28.9675 92.2989H27.6957L28.5878 86.6361C28.6409 86.294 28.9364 86.0418 29.2816 86.0418H29.8645C31.3861 86.0418 32.8214 86.0418 33.5629 86.9117C34.0054 87.4305 34.1406 88.2016 33.972 89.267Z" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M58.4024 89.0054H54.3674C54.0237 89.0054 53.7264 89.2575 53.6736 89.5997L53.4949 90.7314L53.213 90.3213C52.3395 89.0498 50.3913 88.6247 48.4474 88.6247C43.9882 88.6247 40.18 92.0116 39.4383 96.7624C39.0527 99.1322 39.6008 101.398 40.9415 102.979C42.1712 104.432 43.9306 105.037 46.0237 105.037C49.6166 105.037 51.6084 102.72 51.6084 102.72L51.4288 103.845C51.3612 104.275 51.6914 104.66 52.1213 104.66H55.7558C56.3337 104.66 56.8216 104.24 56.913 103.668L59.0937 89.8184C59.1626 89.392 58.8334 89.0054 58.4024 89.0054ZM52.7776 96.8813C52.3885 99.1927 50.5592 100.745 48.2254 100.745C47.0539 100.745 46.1176 100.368 45.516 99.6538C44.9196 98.9446 44.6933 97.9352 44.8826 96.8106C45.2465 94.5187 47.1067 92.9159 49.4048 92.9159C50.5505 92.9159 51.4819 93.2982 52.0956 94.018C52.71 94.7458 52.9542 95.7616 52.7776 96.8813Z" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M79.5814 89.3517H75.5265C75.1396 89.3517 74.7763 89.5446 74.5571 89.8671L68.9645 98.1281L66.5939 90.1894C66.4449 89.6926 65.9879 89.3517 65.4704 89.3517H61.4861C61.0016 89.3517 60.6655 89.8263 60.8194 90.2836L65.2857 103.428L61.0868 109.372C60.7566 109.84 61.0891 110.484 61.6596 110.484H65.7095C66.094 110.484 66.4536 110.296 66.6717 109.98L80.1579 90.4576C80.4809 89.9906 80.1492 89.3517 79.5814 89.3517Z" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M69.9439 46.5127C70.0191 46.0272 70.3292 45.6306 70.7472 45.4305C70.938 45.3388 71.1485 45.2883 71.3718 45.2883H80.4299C81.5029 45.2883 82.5047 45.3589 83.419 45.507C83.6801 45.5489 83.9337 45.5973 84.1815 45.6517C84.428 45.707 84.6681 45.769 84.9011 45.8368C85.0167 45.8715 85.1312 45.9074 85.2435 45.9431C85.6931 46.0926 86.1111 46.2694 86.4967 46.4733C86.9501 43.5734 86.4928 41.5989 84.9294 39.811C83.2057 37.8424 80.0949 37 76.1139 37H64.5569C63.7439 37 63.0504 37.5929 62.9246 38.4L58.111 68.9991C58.0161 69.6044 58.4818 70.1507 59.0906 70.1507H66.2252L69.9439 46.5127Z" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M84.901 45.8358C84.6681 45.7676 84.428 45.706 84.1815 45.6502C83.9337 45.5959 83.68 45.5478 83.4187 45.5056C82.5047 45.3575 81.5029 45.2872 80.4299 45.2872H71.3718C71.1485 45.2872 70.9367 45.3377 70.7471 45.4291C70.3292 45.6305 70.0189 46.0272 69.9439 46.5127L68.0168 58.7527L67.9614 59.1094C68.0882 58.3038 68.7747 57.7108 69.5889 57.7108H72.9796C79.6389 57.7108 84.8531 54.9986 86.3772 47.1525C86.4226 46.9203 86.4609 46.6944 86.4951 46.4732C86.1095 46.268 85.6921 46.0926 85.2425 45.9431C85.1312 45.906 85.0166 45.8704 84.901 45.8358Z" />
              </svg>
            </fieldset>
            <fieldset className="method-cc">
              <input {...register("paymentMethod")} type="radio" value="Debit / Credit Card" />
              <svg width="148" height="148" viewBox="0 0 148 148" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M125.793 0.5L132.793 7.5H142.793L147.5 12.207V147.5H22.207L17.207 142.5H6.20703L0.5 136.793V0.5H125.793Z" stroke="#E0FF4E" />
                <g stroke-width="2" stroke-miterlimit="10">
                  <path d="M58.2348 85H41.3536C38.3955 85 36 82.6127 36 79.6684V37.3316C36 34.3873 38.3983 32 41.3536 32H107.482C110.44 32 112.835 34.3873 112.835 37.3316V79.6684C112.835 82.6127 110.437 85 107.482 85H58.2348Z" />
                  <path d="M86.221 55.8984H44.5119C42.3145 55.8984 40.5331 57.6798 40.5331 59.8773C40.5331 62.0747 42.3145 63.8561 44.5119 63.8561H86.221C88.4185 63.8561 90.1999 62.0747 90.1999 59.8773C90.1999 57.6798 88.4185 55.8984 86.221 55.8984Z" />
                  <path d="M104.332 71.9906H98.2949C96.0975 71.9906 94.3161 73.7719 94.3161 75.9694C94.3161 78.1668 96.0975 79.9482 98.2949 79.9482H104.332C106.529 79.9482 108.311 78.1668 108.311 75.9694C108.311 73.7719 106.529 71.9906 104.332 71.9906Z" />
                  <path d="M36 40.0694H112.838" />
                  <path d="M36 49.1159H112.838" />
                </g>
                <g stroke-width="2" stroke-miterlimit="10">
                  <path d="M58.2348 85H41.3536C38.3955 85 36 82.6127 36 79.6684V37.3316C36 34.3873 38.3983 32 41.3536 32H107.482C110.44 32 112.835 34.3873 112.835 37.3316V79.6684C112.835 82.6127 110.437 85 107.482 85H58.2348Z" />
                  <path d="M86.221 55.8984H44.5119C42.3145 55.8984 40.5331 57.6798 40.5331 59.8773C40.5331 62.0747 42.3145 63.8561 44.5119 63.8561H86.221C88.4185 63.8561 90.1999 62.0747 90.1999 59.8773C90.1999 57.6798 88.4185 55.8984 86.221 55.8984Z" />
                  <path d="M104.332 71.9906H98.2949C96.0975 71.9906 94.3161 73.7719 94.3161 75.9694C94.3161 78.1668 96.0975 79.9482 98.2949 79.9482H104.332C106.529 79.9482 108.311 78.1668 108.311 75.9694C108.311 73.7719 106.529 71.9906 104.332 71.9906Z" />
                  <path d="M36 40.0694H112.838" />
                  <path d="M36 49.1159H112.838" />
                </g>
              </svg>
              <span>Tarjeta de Crédito o Débito</span>
            </fieldset>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <input
                type="text"
                placeholder="Número de tarjeta *"
                id="cardNumber"
                {...register('cardNumber', { required: true })}
              />
              {errors.cardNumber && (
                <span className={styles.spanError}>
                  <FaInfoCircle /> <span>Ingrese los 16 dígitos de su tarjeta</span>
                </span>
              )}
            </fieldset>
            <fieldset>
              <input
                type="text"
                placeholder="Nombre del tarjetahabiente *"
                id="cardName"
                {...register('cardName', { required: true })}
              />
              {errors.cardName && (
                <span className={styles.spanError}>
                  <FaInfoCircle /> <span>Ingrese el nombre del titular</span>
                </span>
              )}
            </fieldset>
            <div className="fieldsets">
              <fieldset>
                <input
                  type="text"
                  placeholder="Mes / Año *"
                  id="cardValidity"
                  {...register('cardValidity', { required: true })}
                />
                {errors.cardValidity && (
                  <span className={styles.spanError}>
                    <FaInfoCircle /> <span>Ingrese el nombre del titular</span>
                  </span>
                )}
              </fieldset>
              <fieldset>
                <input
                  type="text"
                  placeholder="CVC *"
                  id="cardValidity"
                  {...register('cardValidity', { required: true })}
                />
                {errors.cardValidity && (
                  <span className={styles.spanError}>
                    <FaInfoCircle /> <span>Ingrese el nombre del titular</span>
                  </span>
                )}
              </fieldset>
            </div>
              <fieldset>
                <input
                  type="checkbox"
                {...register("checkbox")} />
                <label>Deseo facturar esta compra</label>
            </fieldset>
            <p>Sus datos personales se utilizarán para respaldar su experiencia en este sitio web, para administrar el acceso a su cuenta y para otros fines descritos en nuestra <a href="/privacidad">[ política de privacidad ].</a></p>
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
        <div className="checkOut">
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
