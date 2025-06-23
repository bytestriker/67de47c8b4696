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

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    mode: 'onTouched'
  });

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

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    setValue: setValue1,
    formState: { errors: errorsbilling, touchedFields: touchedBillingFields },
  } = useForm();

  const handlePayment = async (user) => {
    if (!stripe || !elements || !user) {
      setAlert(true);
      setMessage('Por favor complete todos los campos del formulario');
      return;
    }
    setLoading(true);

    try {
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

      const response = await instanceWithRocket.post('payment-intent', paymentData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });

      const { client_secret: clientSecret } = response.data;
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret);

      if (confirmError) throw confirmError;
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

  return (
    <section className="planetWrap">
      <ButtonGoHome
        className="planetBackToTheHomepage"
        onClick={() => history.push('/')}
        text="Volver al Inicio"
      />
      <div className="planetContainer">
        <div className="checkOut">
          <h2>Pasarela de Pago</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <input
                id="cardName"
                type="text"
                placeholder="Titular de la Tarjeta *"
                className={`${touchedFields.cardName && !errors.cardName ? 'is-valid' : ''} ${
                  errors.cardName ? 'is-invalid' : ''
                }`}
                {...register('cardName', {
                  required: 'Ingrese el nombre del titular',
                  minLength: {
                    value: 3,
                    message: 'Ingresa un nombre válido'
                  }
                })}
              />
              {errors.cardName && <span className="text-danger">{errors.cardName.message}</span>}
            </fieldset>
            
            <div className="fieldsets">
              <fieldset>
                <input
                  id="email"
                  type="email"
                  placeholder="Correo electrónico *"
                  className={`${touchedFields.email && !errors.email ? 'is-valid' : ''} ${
                    errors.email ? 'is-invalid' : ''
                  }`}
                  {...register('email', {
                    required: 'Ingrese su correo electrónico',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Correo inválido',
                    },
                  })}
                />
                {errors.email && <span className="text-danger">{errors.email.message}</span>}
              </fieldset>
              
              <fieldset>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Teléfono *"
                  maxLength={10}
                  className={`${touchedFields.phone && !errors.phone ? 'is-valid' : ''} ${
                    errors.phone ? 'is-invalid' : ''
                  }`}
                  {...register('phone', {
                    required: 'Ingrese su número de teléfono',
                    minLength: {
                      value: 10,
                      message: 'Teléfono inválido'
                    }
                  })}
                />
                {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
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
            
            {/* Rest of the form fields with similar pattern */}
            
            {errors.root && (
              <span className="text-warning">
                <FaInfoCircle /> <span>{errors.root}</span>
              </span>
            )}
            <Button text="REALIZAR COMPRA" type="submit" size="lg" disabled={!stripe} isCentered/>
          </form>
        </div>
        
        {/* Billing form section */}
        <div className="checkOut">
          <h2>DATOS DE FACTURACIÓN</h2>
          {!isOpen ? (
            <span onClick={togglePersonales}>Ver más</span>
          ) : (
            <form className={style} onSubmit={handleSubmit1(onSubmitFactura)}>
              {/* Billing form fields with similar pattern */}
            </form>
          )}
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
            <td>{`$${tanquesData.price}.00`}</td>
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
      
      {modalsuccess && (
        <div className={styles.modal}>
          <div className={styles.ModalContent}>
            <div className={styles.closeNav}>
              <FaRegTimesCircle className={styles.iconClose} onClick={() => setModalSuccess(false)} />
            </div>
            <div id="conektaIframeContainer" className={styles.success}>Datos Guardados</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Checkout;