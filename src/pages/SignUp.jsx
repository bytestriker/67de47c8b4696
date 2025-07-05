import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// CONTEXT
import useAuth from '@Auth/userAuth';

// COMPONENTS
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import Button from '@Components/Button';
import ButtonClose from '@Components/ButtonClose';
import { PasswordInput } from '@Components/Atomos/Inputs';

// Hooks
import { useEventsRegister } from '@Hooks/useEventsRegister';

/// ICONS
import { FaFacebookF, FaInfoCircle } from 'react-icons/fa';

// STYLES
import { useState } from 'react';

const Register = () => {
  const { setLoading } = useAuth();
  const { handleRegister } = useEventsRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      nombre: '',
      email: '',
      password: ''
    }
  });
  const history = useHistory();
  const location = useLocation();

  const [message, setMessage] = useState('');

  // Watch form values for debugging
  const watchedFields = watch();
  console.log('Form values:', watchedFields);

  const onSubmit = async (data) => {
    console.log('Submitting form with data:', data);
    setLoading(true);
    handleRegister(data).then((res) => {
      setMessage(res);
    });
  };

  const handleFacebookLogin = async () => {
    try {
      setLoading(true);
      const response = await new Promise((resolve, reject) => {
        window.FB.login((response) => {
          if (response.authResponse) {
            resolve(response);
          } else {
            reject('User cancelled login or did not fully authorize.');
          }
        }, { 
          scope: 'public_profile',
          auth_type: 'rerequest',
          return_scopes: true
        });
      });

      // Get user data from Facebook
      const userDataResponse = await new Promise((resolve) => {
        window.FB.api('/me', { fields: 'name,email' }, (userData) => {
          resolve(userData);
        });
      });

      // Here you would typically send this data to your backend
      const facebookData = {
        nombre: userDataResponse.name,
        email: userDataResponse.email || '', // Handle case where email might be undefined
        facebookId: response.authResponse.userID,
        accessToken: response.authResponse.accessToken
      };

      // Call your backend registration endpoint with Facebook data
      handleRegister(facebookData).then((res) => {
        setMessage(res);
      });

    } catch (error) {
      setMessage(error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="formWrap">
      <ScrollToTop />
      <div className="formContainer">
        <form className="formContent" onSubmit={handleSubmit(onSubmit)} noValidate>
          <ButtonClose onClick={() => history.push({ pathname: '/', from: location })}/>
          <h2>Crear cuenta</h2>
          <fieldset>
            <label htmlFor="nombre">Nombre de usuario *</label>
            <input
              type="text"
              id="nombre"
              placeholder="Escribe tu nombre"
              {...register('nombre', { 
                required: 'Ingrese su nombre',
                minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres' }
              })}
            />
            {errors.nombre && (
              <span className="spanError">
                <FaInfoCircle /> <span>{errors.nombre.message}</span>
              </span>
            )}
          </fieldset>
          <fieldset>
            <label htmlFor="email">Dirección de correo electrónico *</label>
            <input
              type="email"
              id="email"
              placeholder="ejemplo@rocketnow.mx"
              {...register('email', {
                required: 'Ingrese su correo',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
                  message: 'Ingrese un correo válido'
                }
              })}
            />
            {errors.email && (
              <span className="spanError">
                <FaInfoCircle /> <span>{errors.email.message}</span>
              </span>
            )}
          </fieldset>
          <fieldset>
            <PasswordInput
              label="Contraseña"
              id="password"
              placeholder="* * * * * *"
              {...register('password', {
                required: 'Ingrese su contraseña',
                pattern: {
                  value: /^\w{11,}$/,
                  message: 'La contraseña debe ser mayor a 10 caracteres'
                }
              })}
            />
            {errors.password && (
              <span className="spanError">
                <FaInfoCircle /> <span>{errors.password.message}</span>
              </span>
            )}
          </fieldset>
          {message && (
            <fieldset>
              <span className="message-alert">
                <FaInfoCircle /> {message}
              </span>
            </fieldset>
          )}
          <fieldset>
            <label className="sm">
              Al continuar aceptas los <a onClick={() => window.open('/terminos', '_blank')}>Términos y Condiciones</a> del Aviso de Privacidad
            </label>
            <Button
              text="REGISTRARME"
              type="submit"
              isCentered={true}
            />
          </fieldset>
          <button className="buttonFacebook" type="button" onClick={handleFacebookLogin}>
            <FaFacebookF />
            <span>FACEBOOK</span>
          </button>
          <p>¿Tienes una cuenta? <Link to="/login">Ingresa aquí</Link></p>
        </form>
      </div>
    </section>
  );
};

export default Register;
