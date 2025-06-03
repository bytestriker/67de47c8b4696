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
import classnames from 'classnames';

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

  // invoicing form
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
          {/* Stripe Check Out form  */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <input
                id="cardName"
                type="text"
                placeholder="Titular de la Tarjeta *"
                className={classnames({
                  'is-valid': touchedFields.cardName && !errors.cardName,
                  'is-invalid': errors.cardName,
                })}
                {...register('cardName', {
                  required: 'Ingrese el nombre del titular',
                  minLength: {
                    value: 3,
                    message: 'Ingresa un nombre válido'
                  }
                })}
              />
              {
                errors.cardName &&
                <span className="text-danger">{errors.cardName.message}</span>
              }
            </fieldset>
            <div className="fieldsets">
              <fieldset>
              <input
                id="email"
                type="email"
                placeholder="Correo electrónico *"
                className={classnames({
                  'is-valid': touchedFields.email && !errors.email,
                  'is-invalid': errors.email,
                })}
                {...register('email', {
                  required: 'Ingrese su correo electrónico',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Correo inválido',
                  },
                })}
              />
              {
                errors.email &&
                <span className="text-danger">{errors.email.message}</span>
              }
            </fieldset>
            <fieldset>
              <input
                id="phone"
                type="tel"
                placeholder="Teléfono *"
                maxLength={10}
                className={classnames({
                  'is-valid': touchedFields.phone && !errors.phone,
                  'is-invalid': errors.phone,
                })}
                {...register('phone', {
                  required: 'Ingrese su número de teléfono',
                  minLength: {
                    value: 10,
                    message: 'Teléfono inválido'
                  }
                })}
              />
              {
                errors.phone &&
                <span className="text-danger">{errors.phone.message}</span>
              }
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
                id="direccionFiscal"
                type="text"
                placeholder="Dirección *"
                className={classnames({
                  'is-valid': touchedFields.direccionFiscal && !errors.direccionFiscal,
                  'is-invalid': errors.direccionFiscal,
                })}
                {...register('direccionFiscal', {
                  required: 'Ingrese su direccion fiscal'
                })}
              />
              {
                errors.direccionFiscal &&
                <span className="text-danger">{errors.direccionFiscal.message}</span>
              }
            </fieldset>
            <div className="fieldsets">
              <fieldset>
                <input
                  id="numExt"
                  type="text"
                  placeholder="Número exterior *"
                  className={classnames({
                    'is-valid': touchedFields.numExt && !errors.numExt,
                    'is-invalid': errors.numExt,
                  })}
                  {...register('numExt', { required: 'Ingrese el número exterior' })}
                />
                {
                  errors.numExt && <span className="text-danger">{errors.numExt.message}</span>
                }
              </fieldset>
              <fieldset>
                <input
                  id="numInt"
                  type="text"
                  placeholder="Número interior"
                  {...register('numInt')}
                />
              </fieldset>
            </div>
            <fieldset>
              <input
                id="location"
                type="text"
                placeholder="Localidad / Ciudad *"
                className={classnames({
                  'is-valid': touchedFields.numExt && !errors.numExt,
                  'is-invalid': errors.numExt,
                })}
                {...register('location', { required: true })}
              />
              {
                errors.location && <span className="text-danger">Ingrese su localidad</span>
              }
            </fieldset>
            <div className="fieldsets">
              <fieldset>
                <input
                  id="estadoProvincia"
                  type="text"
                  placeholder="Estado / Provincia *"
                  className={classnames({
                    'is-valid': touchedFields.estadoProvincia && !errors.estadoProvincia,
                    'is-invalid': errors.estadoProvincia,
                  })}
                  {...register('estadoProvincia', { required: true })}
                />
                {
                  errors.estadoProvincia &&
                  <span className="text-danger">Ingresa tu estado o provincia</span>
                }
              </fieldset>
              <fieldset>
                <input
                  id="postalCode"
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  placeholder="Código postal *"
                  className={classnames({
                    'is-valid': touchedFields.estadoProvincia && !errors.estadoProvincia,
                    'is-invalid': errors.estadoProvincia,
                  })}
                  {...register('postalCode', {
                    required: 'Ingrese su código postal',
                    pattern: {
                      value: /^[0-9]{5}$/,
                      message: 'El código postal debe tener 5 dígitos numéricos',
                    },
                  })}
                />

                {
                  errors.postalCode && (
                  <span className="text-danger">{errors.postalCode.message}</span>
                )}
              </fieldset>
            </div>
            {errors.root && (
              <span className="text-warning">
                <FaInfoCircle /> <span>{errors.root}</span>
              </span>
            )}
            <Button text="REALIZAR COMPRA" type="submit" size="lg" disabled={!stripe} isCentered/>
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
                <input
                  id="company"
                  type="text"
                  placeholder="Nombre de Empresa o Persona Física *"
                  className={classnames({
                    'is-valid': touchedBillingFields.company && !errorsbilling.company,
                    'is-invalid': errorsbilling.company,
                  })}
                  {...register1('company', { required: true })}
                />
                {
                  errorsbilling.company && <span className="text-danger">Ingrese su nombre o la empresa</span>
                }
              </fieldset>
              <div className="fielsdests">
                <fieldset>
                  <input
                    id="businessname"
                    type="text"
                    placeholder="Razón Social"
                    className={classnames({
                      'is-valid': touchedBillingFields.businessname && !errorsbilling.businessname,
                      'is-invalid': errorsbilling.businessname,
                    })}
                    {...register1('businessname', { required: true })}
                  />
                  {
                    errorsbilling.businessname && <span className="text-danger">Ingrese su Razón Social</span>
                  }
                </fieldset>
                <fieldset>
                  <input
                    id="rfc"
                    type="text"
                    placeholder="RFC *"
                    className={classnames({
                      'is-valid': touchedBillingFields.rfc && !errorsbilling.rfc,
                      'is-invalid': errorsbilling.rfc,
                    })}
                    {...register1('rfc', { required: true })}
                  />
                  {
                    errorsbilling.rfc &&
                    <span className="text-danger">Ingrese su RFC</span>
                  }
                </fieldset>
              </div>
              <fieldset>
                <input
                  id="address"
                  type="text"
                  placeholder="Dirección Fiscal"
                  className={classnames({
                    'is-valid': touchedBillingFields.address && !errorsbilling.address,
                    'is-invalid': errorsbilling.address,
                  })}
                  {...register1('address', { required: true })}
                />
                {
                  errorsbilling.address && <span className="text-danger">Ingrese su dirección fiscal</span>
                }
              </fieldset>
              <div className="fieldsets">
                <fieldset>
                  <input
                    id="numExt"
                    type="text"
                    placeholder="Número exterior *"
                    className={classnames({
                      'is-valid': touchedBillingFields.numExt && !errorsbilling.numExt,
                      'is-invalid': errorsbilling.numExt,
                    })}
                    {...register1('numExt', { required: true })}
                  />
                  {
                    errorsbilling.numExt && <span className="text-danger">Ingrese su número</span>
                  }
                </fieldset>
                <fieldset>
                  <input
                    id="numInt"
                    type="text"
                    placeholder="Número interior"
                    className={classnames({
                      'is-valid': touchedBillingFields.numInt && !errorsbilling.numInt,
                      'is-invalid': errorsbilling.numInt,
                    })}
                    {...register1('numInt')}
                  />
                </fieldset>
              </div>
              <div className="fieldsets">    
                <fieldset>
                  <input
                    id="location"
                    type="text"
                    placeholder="Localidad / Ciudad"
                    className={classnames({
                      'is-valid': touchedBillingFields.location && !errorsbilling.location,
                      'is-invalid': errorsbilling.location,
                    })}
                    {...register1('location', { required: true })}
                  />
                  {
                    errorsbilling.location && <span className="text-danger">Ingrese su localidad</span>
                  }
                </fieldset>
                <fieldset>
                  <input
                    id="postalCode"
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    placeholder="Código postal *"
                    className={classnames({
                      'is-valid': touchedBillingFields.postalCode && !errorsbilling.postalCode,
                      'is-invalid': errorsbilling.postalCode,
                    })}
                    {...register('postalCode', {
                      required: 'Ingrese su código postal',
                      pattern: {
                        value: /^[0-9]{5}$/,
                        message: 'El código postal debe tener 5 dígitos numéricos',
                      },
                    })}
                  />
                  {
                    errorsbilling.postalCode && <span className="text-danger">{errorsbilling.postalCode.message}</span>
                  }
                </fieldset>
              </div>
              <div className="fieldsets">
                <fieldset>
                  <input
                    id="email"
                    type="email"
                    placeholder="Correo electrónico *"
                    className={classnames({
                      'is-valid': touchedBillingFields.email && !errorsbilling.email,
                      'is-invalid': errorsbilling.email,
                    })}
                    {...register('email', {
                      required: 'Ingrese su correo electrónico',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Correo inválido',
                      },
                    })}
                  />
                  {
                    errorsbilling.email && <span className="text-danger">Ingrese su email</span>
                  }
                </fieldset>
                <fieldset>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Teléfono *"
                    maxLength={10}
                    className={classnames({
                      'is-valid': touchedBillingFields.phone && !errorsbilling.phone,
                      'is-invalid': errorsbilling.phone,
                    })}
                    {...register('phone', {
                      required: 'Ingrese su número de teléfono',
                      minLength: {
                        value: 10,
                        message: 'Teléfono inválido'
                      }
                    })}
                  />
                  {
                    errorsbilling.phone && <span className="text-danger">{errors.phone.message}</span>
                  }
                </fieldset>
              </div>
              <Button text="GUARDAR" isCentered></Button>
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
