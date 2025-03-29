import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Context
import useAuth from '@Auth/userAuth';

// Components
import { ErrorAlert } from '@Components/Atomos/Alerts';
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import Button from '@Components/Button';
import ButtonClose from '@Components/ButtonClose';

// Service
import { ConfirmEmail, restartPasword } from '@Service/entries';

// Styles
import '@Sass/pages/form.scss';

const RePassword = () => {
  const { setLoading } = useAuth();
  const history = useHistory();
  const [page, setPage] = useState(1);

  return (
    <section className="formWrap">
      <ScrollToTop />
      <div className="formContainer">
      {
        page === 1 &&
        <RestartEmail setPage={setPage} setLoading={setLoading} />
      }
      {
        page === 2 &&
        <EmailConfirm setPage={setPage} />
      }
      {
        page === 3 &&
        <RestartPasswordConfirm setPage={setPage} setLoading={setLoading} />
      }
      {
        page === 4 &&
        <RestartConfirm setPage={setPage} />
      }
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
  const history = useHistory();

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
    <form method="POST"  className="formContent" onSubmit={handleSubmit(onSubmit)}>
      <ButtonClose onClick={() => history.push({ pathname: '/', from: location })}/>
      <h2>Restablece tu contraseña</h2>
      <p>Ingresa tu correo electrónico para enviar
      un link de recuperación.</p>
      <fieldset>
        <label htmlFor="email">Dirección de correo electrónico*</label>
        <input
          type="email"
          name="email"
          id="email"
          className="account_input"
          placeholder="ejemplo@codeup.com"
          {...register('email', {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
          })}
        />
        <span>{message ? <ErrorAlert message={message} /> : null}</span>
          {errors.email && <ErrorAlert message="Ingrese su correo" />}
      </fieldset>
      <Button
        text="Enviar código"
        isCentered={true}
        type="submit"
        />
    </form>
  );
};

export const EmailConfirm = ({ setPage }) => {
  const history = useHistory();

  const handleSubmit = () => {
    setPage(1);
    history.push('/');
  };

  return (
    <form method="POST" className="formContent">
      <h2>¡Revisa tu correo!</h2>
      <fieldset>
        <label htmlFor="info">
          Hemos enviado un mensaje al correo electrónico que registraste para verificar tu cuenta.
        </label>
        <Button
          text="OKAY"
          onClick={() => handleSubmit()}
          isCentered={true}
          />
      </fieldset>
    </form>
  );
};

export const RestartPasswordConfirm = ({ setPage, setLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();

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
    <form method="POST" className="formContent" onSubmit={handleSubmit(onSubmit)}>
      <h2>Restablece tu contraseña</h2>
      <fieldset>
        <input
          type="text"
          name="password"
          id="password"
          placeholder="Nueva contraseña*"
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
      </fieldset>
      <fieldset>
        <input
          type="password"
          name="repassword"
          id="repassword"
          placeholder="Repite la contraseña*"
          required={true}
          {...register('repassword', {
            required: 'Ingrese nuevamente la contraseña',
            pattern: {
              value: /^\w{11,}$/,
              message: 'La contraseña debe ser mayor a 10 caracteres',
            },
          })}
          />
      </fieldset>
      {errors.repassword && <ErrorAlert message={errors.repassword.message} />}
      <Button
        text="Guardar contraseña"
        isCentered={true}
        type="submit"
      />
      <div className="contentinfo">
        <div className="messageInfo">{message}</div>
      </div>
    </form>
  );
};

export const RestartConfirm = () => {
  const history = useHistory();
  return (
    <form method="POST" className="formContent">
      <h2>Yaaay!</h2>
      <div className="formGroup">
        <label htmlFor="info" className="label_account">
          ¡Tu contraseña ha sido restablecida! Prueba iniciar sesión con tu nueva contraseña.
        </label>
        <Button
          text="Iniciar sesión"
          onClick={() => history.push('/login')}
          isCentered={true}
          />
      </div>
    </form>
  );
};

export default RePassword;
