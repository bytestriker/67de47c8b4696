import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { shallow } from 'zustand/shallow';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaInfoCircle } from 'react-icons/fa';
import useAuth from '@Auth/userAuth';
import { storeBuyTank, globalStore, storeRemainingTank, storeModalTank } from '@Store/global';
import { BuyTanks } from '@Service/tanks.service';
import Button from '@Components/Button';
import ButtonGoHome from '@Components/ButtonGoHome';
import '@Sass/pages/planet.scss';
import '@Sass/pages/checkout.scss';
import { instanceWithRocket } from '@Config/axios';

import styles from '@Sass/pages/checkout.module.scss';

const Checkout = () => {
  const { setLoading, jwt } = useAuth();
  const { setTanquesRestante } = storeRemainingTank(
    (state) => ({ setTanquesRestante: state.setTanquesRestante }),
    shallow
  );
  const { tanquesData } = storeBuyTank((state) => ({ tanquesData: state.tanquesData }), shallow);
  const { setAlert, setMessage } = globalStore(
    (state) => ({ setAlert: state.setAlert, setMessage: state.setMessage }),
    shallow
  );
  const { storeTankModal } = storeModalTank(
    (state) => ({ storeTankModal: state.storeTankModal }),
    shallow
  );
  const [isOpen, setIsOpen] = useState(false);
  const [style, setStyle] = useState(styles.verdatos);

  // payment gateway form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();
  const location = useLocation();
  const [modalsuccess, setModalSuccess] = useState(false);
  const [user, setUser] = useState(null);
  const [pay, setPay] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const togglePersonales = () => {
    setIsOpen((isOpen) => !isOpen);
    if (isOpen === true) setStyle(styles.verdatos);
    else setStyle(styles.ocultardatos);
  };

  // invoicing form
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    setValue: setValue1,
    formState: { errors: errorsbilling },
  } = useForm();


  const handlePayment = async (user) => {
    if (!stripe || !elements || !user) {
      setAlert(true);
      setMessage('Por favor complete todos los campos del formulario');
      return;
    }
    setLoading(true);

    try {
      // Create payment method
      const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: {
            line1: user.direccionFiscal,
            city: user.location,
            state: user.estadoProvincia,
            postal_code: user.postalCode,
            country: 'MX',
          },
        },
      });

      if (paymentMethodError) throw paymentMethodError;

      // Prepare payment data
      const paymentData = {
        amount: Math.round(tanquesData.price * 100),
        currency: 'mxn',
        package: tanquesData.packageType,
        payment_method_id: paymentMethod.id,
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: {
            street: user.direccionFiscal,
            numExt: user.numExt,
            numInt: user.numInt || '',
            location: user.location,
            estadoProvincia: user.estadoProvincia,
            postalCode: user.postalCode,
          },
        },
      };

      // Create payment intent
      const response = await instanceWithRocket.post('payment-intent', paymentData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });

      const { client_secret: clientSecret } = response.data;

      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret);

      if (confirmError) throw confirmError;
      console.log("from handle payment it has the status ", paymentIntent.status)
      return paymentIntent;
    } catch (error) {
      console.error('Payment error:', error);
      let errorMessage = 'Error al procesar el pago';

      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setLoading(false);
      setAlert(true);
      setMessage(errorMessage);
      throw error;
    }
  };

  const handleSuccessfulPayment = async (paymentIntent) => {
    try {
      console.log("handleSuccessfulPayment ", paymentIntent);
      if (paymentIntent.status !== 'succeeded') {
        throw new Error('El pago no fue exitoso');
      }
      setLoading(false);

      history.push({
        pathname: '/gracias',
        state: {
          from: location,
          paymentId: paymentIntent.id,
          tanksAdded: tanquesData.amount,
        },
      });
    } catch (error) {
      setLoading(false);
      setAlert(true);
      setMessage(error.message || 'Ocurrió un error al procesar el pago');
      throw error;
    }
  };

  const onSubmit = async (data) => {
    try {
      const userData = {
        name: data.cardName,
        email: data.email,
        phone: data.phone,
        direccionFiscal: data.direccionFiscal,
        numExt: data.numExt,
        numInt: data.numInt || '',
        location: data.location,
        estadoProvincia: data.estadoProvincia,
        postalCode: data.postalCode,
      };

      setUser(userData);
      setPay(true);

      const paymentIntent = await handlePayment(userData);
      await handleSuccessfulPayment(paymentIntent);
    } catch (error) {
      console.error('Payment error:', error);
      setLoading(false);
      setAlert(true);
      setMessage(error.message || 'Error al procesar el pago');
    }
  };


  const onSubmitFactura = async data => {

    const send = JSON.stringify(data);

    try {
      const response = await instanceWithRocket.post(
        `checkout/billing_data`,
        send,
        headersJson
      );
      const { data } = response.data;
      setModalSuccess(true);
      return { data: data, completed: data.completed, code: 0 };
    } catch (error) {
      const { response } = error;
      return { messageError: response.data.error, status: response.status, code: -1 };
    }
   
  };

  console.log("tanquesData ", tanquesData)

  return (
    <section className="planetWrap">
      <ButtonGoHome
        className="planetBackToTheHomepage"
        onClick={() => history.push('/')}
        text="Volver al Inicio"
      />
      <div className="planetContainer">
        {/* Stripe Check Out form  */}
        <div className="checkOut">
          <h2>Pasarela de Pago</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <input
                type="text"
                placeholder="Titular de la Tarjeta *"
                id="cardName"
                {...register('cardName', { required: true })}
              />
              {errors.cardName && (
                <span className="text-danger">
                  <FaInfoCircle /> <span>Ingrese el nombre del titular</span>
                </span>
              )}
            </fieldset>
            <div className="fieldsets">
              <fieldset>
              <input
                type="email"
                placeholder="Correo electrónico *"
                id="email"
                {...register('email', { required: true })}
              />
              {errors.email && (
                <span className="text-danger">
                  <FaInfoCircle /> <span>Ingrese su correo electrónico</span>
                </span>
              )}
            </fieldset>
            <fieldset>
              <input
                type="tel"
                placeholder="Teléfono *"
                id="phone"
                {...register('phone', { required: true })}
              />
              {errors.phone && (
                <span className="text-danger">
                  <FaInfoCircle /> <span>Ingrese su número de teléfono</span>
                </span>
              )}
            </fieldset>
            </div>
            <fieldset>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#fff',
                      '::placeholder': { color: '#aab7c4' },
                    },
                    invalid: { color: '#9e2146' },
                  },
                }}
              />
            </fieldset>
            <fieldset>
              <input
                type="text"
                placeholder="Dirección *"
                id="direccionFiscal"
                name="direccionFiscal"
                {...register('direccionFiscal', { required: true })}
              />
              {errors.direccionFiscal && (
                <span className="text-danger">
                  <FaInfoCircle /> <span>Ingrese su direccion fiscal</span>
                </span>
              )}
            </fieldset>
            <div className="fieldsets">
              <fieldset>
                <input
                  type="text"
                  placeholder="Número exterior *"
                  id="numExt"
                  name="numExt"
                  {...register('numExt', { required: true })}
                />
                {errors.numExt && (
                  <span className="text-danger">
                    <FaInfoCircle /> <span>Ingrese el número exterior</span>
                  </span>
                )}
              </fieldset>
              <fieldset>
                <input
                  type="text"
                  placeholder="Número interior"
                  id="numInt"
                  {...register('numInt')}
                />
              </fieldset>
            </div>
            <fieldset>
              <input
                type="text"
                placeholder="Localidad / Ciudad *"
                id="location"
                {...register('location', { required: true })}
              />
              {errors.location && (
                <span className="text-danger">
                  <FaInfoCircle /> <span>Ingrese su localidad</span>
                </span>
              )}
            </fieldset>
            <div className="fieldsets">
              <fieldset>
                <input
                  type="text"
                  placeholder="Estado / Provincia *"
                  id="estadoProvincia"
                  {...register('estadoProvincia', { required: true })}
                />
                {errors.estadoProvincia && (
                  <span className="text-danger">
                    <FaInfoCircle /> <span>Ingresa tu estado o provincia</span>
                  </span>
                )}
              </fieldset>
              <fieldset>
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
                  <span className="text-danger">
                    <FaInfoCircle /> <span>{errors.postalcode}</span>
                  </span>
                )}
              </fieldset>
            </div>
            {errors.root && (
              <span className="text-warning">
                <FaInfoCircle /> <span>{errors.root}</span>
              </span>
            )}
            <Button text="REALIZAR COMPRA" type="submit" size="lg" disabled={!stripe} />
          </form>
        </div>
        {/* Invoicing data */}
        <div className="checkOut">
          <h2>DATOS DE FACTURACIÓN</h2>
          {
            !isOpen
            ? <span onClick={() => togglePersonales()} >Ver más</span>
            : <form className={styles.form} onSubmit={handleSubmit1(onSubmitFactura)}>
                <fieldset>
                  <label htmlFor="company" className={styles.formLabel}>
                    Nombre de Empresa o Persona Física<small>*</small>
                  </label>
                  <input
                    type="text"
                    placeholder="Empresa"
                    id="company"
                    className={styles.inputText}
                    {...register1('company', { required: true })}
                  />
                  {errorsbilling.company && (
                    <span className={styles.spanError}>
                      <FaInfoCircle /> <span>Ingrese su nombre o la empresa</span>
                    </span>
                  )}
                </fieldset>
              <div className="fielsdests">
                <fieldset>
                  <label htmlFor="businessname" className={styles.formLabel}>
                    Razón Social<small>*</small>
                  </label>
                  <input
                    type="text"
                    placeholder="Razón Social"
                    id="businessname"
                    className={styles.inputText}
                    {...register1('businessname', { required: true })}
                  />
                  {errorsbilling.businessname && (
                    <span className={styles.spanError}>
                      <FaInfoCircle /> <span>Ingrese su Razón Social</span>
                    </span>
                  )}
                </fieldset>
                <fieldset>
                  <label htmlFor="rfc" className={styles.formLabel}>
                    RFC<small>*</small>
                  </label>
                  <input
                    type="text"
                    placeholder="RFC"
                    id="rfc"
                    className={styles.inputText}
                    {...register1('rfc', { required: true })}
                  />
                  {errorsbilling.rfc && (
                    <span className={styles.spanError}>
                      <FaInfoCircle /> <span>Ingrese su RFC</span>
                    </span>
                  )}
                </fieldset>
              </div>


                <fieldset>
                  <label htmlFor="address" className={styles.formLabel}>
                    Dirección Fiscal<small>*</small>
                  </label>
                  <input
                    type="text"
                    placeholder="Dirección Fiscal"
                    id="address"
                    name="address"
                    className={styles.inputText}
                    {...register1('address', { required: true })}
                  />
                  {errorsbilling.address && (
                    <span className={styles.spanError}>
                      <FaInfoCircle /> <span>Ingrese su dirección fiscal</span>
                    </span>
                  )}
                </fieldset>
              <div className="fieldsets">
                <fieldset>
                    <label htmlFor="numExt" className={styles.formLabel}>
                      Número exterior<small>*</small>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      id="numExt"
                      className={styles.inputText}
                      {...register1('numExt', { required: true })}
                    />
                    {errorsbilling.numExt && (
                      <span className={styles.spanError}>
                        <FaInfoCircle /> <span>Ingrese su número exterior</span>
                      </span>
                    )}
                  </fieldset>
          <fieldset>
                    <label htmlFor="numInt" className={styles.formLabel}>
                      Número interior<small></small>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      id="numInt"
                      className={styles.inputText}
                      {...register1('numInt', { required: false })}
                    />
                </fieldset>
              </div>
              <div className="fieldsets">    
                <fieldset>
                  <label htmlFor="location" className={styles.formLabel}>
                    Localidad / Ciudad<small>*</small>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    id="location"
                    className={styles.inputText}
                    {...register1('location', { required: true })}
                  />
                  {errorsbilling.location && (
                    <span className={styles.spanError}>
                      <FaInfoCircle /> <span>Ingrese su localidad</span>
                    </span>
                  )}
                </fieldset>
                <fieldset>
                  <label htmlFor="postalCode" className={styles.formLabel}>
                    Código postal<small>*</small>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    id="postalCode"
                    minLength="0"
                    maxLength="5"
                    className={styles.inputText}
                    {...register1('postalCode', {
                      required: 'Ingrese su código postal',
                      pattern: {
                        value: /^[0-9]{5}$/,
                        message: 'El código postal debe tener 5 dígitos numéricos',
                      },
                    })}
                  />
                  {errorsbilling.postalCode && (
                    <span className={styles.spanError}>
                      <FaInfoCircle /> <span>{errorsbilling.postalCode.message}</span>
                    </span>
                  )}
              </fieldset>
              </div>
              <div className="fieldsets">
                <fieldset>
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
                      {...register1('phone', {
                        required: 'Ingrese su número de teléfono',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'El número de teléfono debe tener 10 dígitos y solo números',
                        },
                      })}
                    />
                    {errorsbilling.phone && (
                      <span className={styles.spanError}>
                        <FaInfoCircle /> <span>{errors.phone.message}</span>
                      </span>
                    )}
                  </fieldset>
                  <fieldset>
                    <label htmlFor="email" className={styles.formLabel}>
                      Correo electrónico<small>*</small>
                    </label>
                    <input
                      type="email"
                      placeholder=""
                      id="email"
                      className={styles.inputText}
                      {...register1('email', {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
                      })}
                    />
                    {errorsbilling.email && (
                      <span className={styles.spanError}>
                        <FaInfoCircle /> <span>Ingrese su email</span>
                      </span>
                    )}
                </fieldset>
                </div>

              <Button text="GUARDAR"></Button>
            </form>
          }
        </div>
      </div>
      <div className="checkoutCart">
        <table className="checkoutCartTable">
          <tr>
            <th>TU PEDIDO</th>
            <th>SUBTOTAL</th>
          </tr>
          <tr>
            <td>{`${tanquesData.name} ${tanquesData.amount} tanques`}</td>
            <td>{`$${tanquesData.price}.00`}{}</td>
          </tr>
          <tr>
            <td>Subtotal</td>
            <td>{tanquesData.price}</td>
          </tr>
          <tr>
            <th>TOTAL</th>
            <td>{tanquesData.price}.00</td>
          </tr>
        </table>
      </div>
      {modalsuccess ? (
        <div className={styles.modal}>
          <div className={styles.ModalContent}>
            <div className={styles.closeNav}>
              <FaRegTimesCircle className={styles.iconClose} onClick={() => setModalSuccess(false)} />
            </div>
            <div id="conektaIframeContainer" className={styles.success}>Datos Guardados</div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Checkout;
