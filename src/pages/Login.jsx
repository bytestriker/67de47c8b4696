import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// CONTEXT
import useAuth from '@Auth/userAuth';

// COMPONENTS
import { ErrorAlert } from '@Components/Atomos/Alerts';
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';

// SERVICE
import { login } from '@Service/entries';

// ICONS
import { FaFacebookF } from 'react-icons/fa';

// STYLES
import base from '@Sass/pages/general.module.scss';
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
    <section className={base.planetPageMain}>
      <ScrollToTop />
      <div className={base.planetPageContainer}>
        <form method="POST" className={base.pageContainer} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.loginContent}>
            <h2>INICIAR SESIÓN</h2>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label_account}>
                Dirección de correo electrónico *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={styles.account_input}
                placeholder="ejemplo@rocketnow.mx"
                {...register('email', {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
                })}
              />

              {errors.email && <ErrorAlert message="Ingrese su correo" />}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label_account}>
                Contraseña *
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className={styles.account_input}
                placeholder="* * * * * *"
                {...register('password', { required: true })}
              />
              {errors.password && <ErrorAlert message="Ingrese su password" />}
            </div>

            <div className={styles.contentinfo}>
              <div className={styles.messageInfo}>{message}</div>
            </div>

            <div className={styles.contentinfo}>
              <button className={styles.buttonRegister} type="submit">
                INICIAR SESIÓN
              </button>
              <button className={styles.buttonFacebook} type="button">
                <FaFacebookF className={styles.buttonFacebookIcon} /> CREAR CUENTA CON FACEBOOK
              </button>
              <Link className={styles.recoveryPassword} to="/repassword">
                OLVIDASTE TU CONTRASEÑA
              </Link>
              <br></br>
              <br></br>
              <p className={styles.haveAccount}>¿Aún no tienes cuenta?</p>
              <p className={styles.loginLink} onClick={() => handleLogin()}>
                Empieza aquí
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
