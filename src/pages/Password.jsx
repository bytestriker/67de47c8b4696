import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Context
import useAuth from '@Auth/userAuth';

// Components
import { ErrorAlert } from '@Components/Atomos/Alerts';
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';

// Service
import { ConfirmEmail, restartPasword } from '@Service/entries';

// Styles
import base from '@Sass/pages/general.module.scss';
import styles from '@Sass/pages/repassword.module.scss';

// Images
import _rocket from '@Assets/images/rocket_2.svg';

const RePassword = () => {
  const { setLoading } = useAuth();
  const history = useHistory();
  const [page, setPage] = useState(1);

  return (
    <section className={base.planetPageMain}>
      <img src={_rocket} alt="rocketluna" className={`${styles.rocketLuna}`} />
      <ScrollToTop />
      <div className={base.planetPageContainer}>
        <div className={base.pageContainer}>
          {page === 1 ? <RestartEmail setPage={setPage} setLoading={setLoading} /> : <></>}
          {page === 2 ? <EmailConfirm setPage={setPage} /> : <></>}
          {page === 3 ? (
            <RestartPasswordConfirm setPage={setPage} setLoading={setLoading} />
          ) : (
            <></>
          )}
          {page === 4 ? <RestartConfirm setPage={setPage} /> : <></>}
          <div className={styles.contentInfo}>
            <p className={styles.haveAccount}>¿Tienes una cuenta?</p>
            <p className={styles.loginLink} onClick={() => history.push('/login')}>
              Ingresa aquí.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const RestartEmail = ({ setPage, setLoading }) => {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.email) {
      setLoading(true);
      await ConfirmEmail(data.email)
        .then((response) => {
          if (response.code === 0) {
            const params = JSON.stringify({
              token: response.data.token,
              email: data.email,
            });
            localStorage.setItem('session', params);
            setPage(3);
            setLoading(false);
          } else if (response.code < 0) {
            setMessage('Ocurrio un error en el proceso');
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  };

  return (
    <div className={styles.passwordContent}>
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <h2>Restablece tu contraseña</h2>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label_account}>
            Ingresa tu correo electrónico para enviar un link de recuperación.
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={styles.account_input}
            placeholder="CORREO ELECTRÓNICO"
            {...register('email', {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
            })}
          />
          <span>{message ? <ErrorAlert message={message} /> : null}</span>
          {errors.email && <ErrorAlert message="Ingrese su correo" />}
          <button className={styles.buttonRegister} type="submit">
            OKAY
          </button>
        </div>
      </form>
    </div>
  );
};

export const EmailConfirm = ({ setPage }) => {
  const history = useHistory();

  const handleSubmit = () => {
    setPage(1);
    history.push('/');
  };

  return (
    <div className={styles.passwordContent}>
      <form method="POST">
        <h2>¡Revisa tu correo!</h2>
        <div className={styles.formGroup}>
          <label htmlFor="info" className={styles.label_account}>
            Hemos enviado un mensaje al correo electrónico que registraste para verificar tu cuenta.
          </label>
          <button className={styles.buttonRegister} onClick={() => handleSubmit()}>
            OKAY
          </button>
        </div>
      </form>
    </div>
  );
};

export const RestartPasswordConfirm = ({ setPage, setLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState('');
  const onSubmit = async (data) => {
    if (data.password === data.repassword) {
      setLoading(true);
      const tokens = JSON.parse(localStorage.getItem('session'));
      const json = JSON.stringify({
        token: tokens.token,
        email: tokens.email,
        password: data.password,
        password_confirmation: data.repassword,
      });
      await restartPasword(json)
        .then((response) => {
          if (response.code === 0) {
            localStorage.removeItem('session');
            setPage(4);
            setLoading(false);
          } else if (response.code < 0) {
            setMessage('Ocurrio un error en el proceso');
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    } else {
      setMessage('Las contraseñas no coinciden');
    }
  };

  return (
    <div className={styles.passwordContent}>
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <h2>Restablece tu contraseña</h2>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="password"
            id="password"
            className={styles.account_input}
            placeholder="NUEVA CONTRASEÑA"
            required={true}
            {...register('password', {
              required: 'Ingrese nuevamente la contraseña',
              pattern: {
                value: /^\w{11,}$/,
                message: 'La contraseña debe ser mayor a 10 caracteres',
              },
            })}
          />
          {errors.password && <ErrorAlert message={errors.password.message} />}
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            name="repassword"
            id="repassword"
            className={styles.account_input}
            placeholder="CONFIRMA LA CONTRASEÑA"
            required={true}
            {...register('repassword', {
              required: 'Ingrese nuevamente la contraseña',
              pattern: {
                value: /^\w{11,}$/,
                message: 'La contraseña debe ser mayor a 10 caracteres',
              },
            })}
          />
          {errors.repassword && <ErrorAlert message={errors.repassword.message} />}
          <button className={styles.buttonRegister} type="submit">
            OKAY
          </button>
          <div className={styles.contentinfo}>
            <div className={styles.messageInfo}>{message}</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export const RestartConfirm = () => {
  const history = useHistory();
  return (
    <div className={styles.passwordContent}>
      <form method="POST">
        <h2>Yaaay!</h2>
        <div className={styles.formGroup}>
          <label htmlFor="info" className={styles.label_account}>
            ¡Tu contraseña ha sido restablecida! Prueba iniciar sesión con tu nueva contraseña.
          </label>

          <button className={styles.buttonRegister} onClick={() => history.push('/login')}>
            INICIAR SESIÓN
          </button>
        </div>
      </form>
    </div>
  );
};

export default RePassword;
