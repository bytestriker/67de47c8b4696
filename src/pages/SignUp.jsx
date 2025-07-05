import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// CONTEXT
import useAuth from '@Auth/userAuth';

// COMPONENTS
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import Button from '@Components/Button';
import ButtonClose from '@Components/ButtonClose';

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
  } = useForm();
  const history = useHistory();
  const location = useLocation();

  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
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
        <form className="formContent" onSubmit={handleSubmit(onSubmit)}>
          <ButtonClose onClick={() => history.push({ pathname: '/', from: location })}/>
          <h2>Crear cuenta</h2>
          <fieldset>
            <label htmlFor="nombre">Nombre de usuario *</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Escribe tu nombre"
              {...register('nombre', { required: true })}
            />
            {errors.nombre && (
              <span className="spanError">
                <FaInfoCircle /> <span>Ingrese su nombre</span>
              </span>
            )}
          </fieldset>
          <fieldset>
            <label htmlFor="email">Dirección de correo electrónico *</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="ejemplo@rocketnow.mx"
              {...register('email', {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
              })}
            />

            {errors.email && (
              <span className="spanError">
                <FaInfoCircle /> <span>Ingrese su correo</span>
              </span>
            )}
          </fieldset>
          <fieldset>
            <label htmlFor="passwordUser">Contraseña *</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="* * * * * *"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className="spanError">
                <FaInfoCircle /> <span>Ingrese su password</span>
              </span>
            )}
          </fieldset>
          {message ? (
            <fieldset>
              <span>
                <FaInfoCircle /> {message}
              </span>
            </fieldset>
          ) : (
            ''
          )}
          <fieldset>
            <label>
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
