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
import general from '@Sass/pages/general.module.scss';
import signup from '@Sass/pages/signup.module.scss';
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

  return (
    <section className={general.formAuthPageMain}>
      <ScrollToTop />
      <div className={general.formAuthContainer}>
        <form className={general.pageContainer} onSubmit={handleSubmit(onSubmit)}>
          <div className={general.formContent}>
            <ButtonClose onClick={() => history.push({ pathname: '/', from: location })}/>
            <h2>Crear cuenta</h2>
            <fieldset>
              <label htmlFor="nombre">Nombre de usuario *</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                className={signup.account_input}
                placeholder="Escribe tu nombre"
                {...register('nombre', { required: true })}
              />
              {errors.nombre && (
                <span className={signup.spanError}>
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
                className={signup.account_input}
                placeholder="ejemplo@rocketnow.mx"
                {...register('email', {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
                })}
              />

              {errors.email && (
                <span className={signup.spanError}>
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
                className={signup.account_input}
                placeholder="* * * * * *"
                {...register('password', { required: true })}
              />
              {errors.password && (
                <span className={signup.spanError}>
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
              <label className={signup.linkTerminos}>
                Al continuar aceptas los <strong className={signup.urlTerminos} onClick={() => history.push({ pathname: '/terminos', from: location })}>Términos y Condiciones</strong> del Aviso de Privacidad
              </label>
              <Button
                text="REGISTRARME"
                isSubmit={true}
                isCentered={true}
              />
            </fieldset>
            <button className={general.buttonFacebook} type="button">
              <FaFacebookF className={signup.buttonFacebookIcon} /> <span>FACEBOOK</span>
            </button>
            <p className={signup.haveAccount}>¿Tienes una cuenta?
              <Link to="/login" className={signup.loginLink}>Ingresa aquí</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
