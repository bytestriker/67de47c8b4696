import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// CONTEXT
import useAuth from '@Auth/userAuth';

// COMPONENTS
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';

// Hooks
import { useEventsRegister } from '@Hooks/useEventsRegister';

/// ICONS
import { FaFacebookF, FaInfoCircle } from 'react-icons/fa';

// STYLES
import styles from '@Sass/pages/general.module.scss';
import singup from '@Sass/pages/singup.module.scss';
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
    <section className={styles.planetPageMain}>
      <div className={styles.planetPageContainer}>
        <ScrollToTop />
        <div className={styles.pageContainer}>
          <form className={singup.createAccount} onSubmit={handleSubmit(onSubmit)}>
            <h2>CREAR CUENTA</h2>

            <div className={singup.formGroup}>
              <label htmlFor="nombre" className={singup.label_account}>
                Nombre de usuario *
              </label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                className={singup.account_input}
                placeholder="Escribe tu nombre"
                {...register('nombre', { required: true })}
              />
              {errors.nombre && (
                <span className={singup.spanError}>
                  <FaInfoCircle /> <span>Ingrese su nombre</span>
                </span>
              )}
            </div>

            <div className={singup.formGroup}>
              <label htmlFor="email" className={singup.label_account}>
                Dirección de correo electrónico *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={singup.account_input}
                placeholder="ejemplo@rocketnow.mx"
                {...register('email', {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
                })}
              />

              {errors.email && (
                <span className={singup.spanError}>
                  <FaInfoCircle /> <span>Ingrese su correo</span>
                </span>
              )}
            </div>

            <div className={singup.formGroup}>
              <label htmlFor="passwordUser" className={singup.label_account}>
                Contraseña *
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className={singup.account_input}
                placeholder="* * * * * *"
                {...register('password', { required: true })}
              />
              {errors.password && (
                <span className={singup.spanError}>
                  <FaInfoCircle /> <span>Ingrese su password</span>
                </span>
              )}
            </div>
            <div className={singup.formGroup}>
              <span className={singup.spanError}>
                {message ? (
                  <>
                    <span>
                      <FaInfoCircle /> {message}
                    </span>
                  </>
                ) : (
                  ''
                )}
              </span>
            </div>
            <p className={singup.linkTerminos}>
              Al continuar aceptas los
              <b
                className={singup.urlTerminos}
                onClick={() => history.push({ pathname: '/terminos', from: location })}
              >
                Términos y Condiciones
              </b>
              del Aviso de Privacidad
            </p>
            <button className={singup.buttonRegister} type="submit">
              REGÍSTRATE
            </button>
            <button className={singup.buttonFacebook} type={'button'}>
              <FaFacebookF className={singup.buttonFacebookIcon} /> CREAR CUENTA CON FACEBOOK
            </button>
            <p className={singup.haveAccount}>¿Tienes una cuenta?</p>
            <Link to="/login" className={singup.loginLink}>
              Ingresa aquí
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
