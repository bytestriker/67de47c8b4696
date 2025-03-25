import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// CONTEXT
import useAuth from '@Auth/userAuth';

// COMPONENTS
import { ErrorAlert } from '@Components/Atomos/Alerts';
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import Button from '@Components/Button';

// SERVICE
import { login } from '@Service/entries';

// ICONS
import { FaFacebookF } from 'react-icons/fa';

// STYLES
import general from '@Sass/pages/general.module.scss';
import styles from '@Sass/pages/login.module.scss';

const Login = () => {
  const { setLoading, contextValue, setPageLuna } = useAuth();
  const history = useHistory();
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    await login(data).then((response) => {
      if (response?.response?.status === 401) {
        setMessage(response.response.data.error);
        setLoading(false);
        return;
      }
      const token = response.data;
      contextValue.login(token.token);
      setTimeout(() => {
        setLoading(false);
        history.push('/');
      }, 2000);
    });
  };

  const handleLogin = () => {
    setPageLuna(1);
    history.push('/launch');
  };

  return (
    <section className={general.formAuthPageMain}>
      <ScrollToTop />
      <div className={general.formAuthContainer}>
        <form method="POST" className={general.pageContainer} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.loginContent}>
            <h2>Iniciar sesión</h2>
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
              {errors.email && <ErrorAlert message="Ingrese su correo" />}
            </fieldset>
            <fieldset>
              <label htmlFor="password">Contraseña *</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="* * * * * *"
                {...register('password', { required: true })}
              />
            </fieldset>
            {errors.password && <ErrorAlert message="Ingrese su password" />}
            {
              message &&
              <div className={styles.contentinfo}>
                <div className={styles.messageInfo}>{message}</div>
              </div>
            }

            <div className={styles.contentinfo}>
              <Button
                text="INICIAR SESIÓN"
                isSubmit={true}
                onClick={() => history.push({ pathname: '/launch', from: location })}
              />
              <Link className={styles.recoveryPassword} to="/repassword">
                ¿Olvidaste tu contraseña?
              </Link>
              <div className={styles.formGroup}>
                <label>O inicia con:</label>
                <button className={styles.buttonFacebook} type="button">
                  <FaFacebookF className={styles.buttonFacebookIcon} />FACEBOOK
                </button>
              </div>
              <p className={styles.haveAccount}>¿Tienes una cuenta? <a className={styles.loginLink} onClick={() => handleLogin()}>Ingresa aquí</a></p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
