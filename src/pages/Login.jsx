import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// CONTEXT
import useAuth from '@Auth/userAuth';

// COMPONENTS
import { ErrorAlert } from '@Components/Atomos/Alerts';
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import Button from '@Components/Button';
import ButtonClose from '@Components/ButtonClose';

// SERVICE
import { login } from '@Service/entries';

// ICONS
import { FaFacebookF } from 'react-icons/fa';

// STYLES
import '@Sass/pages/form.scss';

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
    console.log("access request data ", data)
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
    <section className="formWrap">
      <ScrollToTop />
      <div className="formContainer">
        <form method="POST" className="formContent" onSubmit={handleSubmit(onSubmit)}>
          <ButtonClose onClick={() => history.push({ pathname: '/', from: location })}/>
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
            <div className="contentinfo">
              <div className="messageInfo">{message}</div>
            </div>
          }
          <fieldset>
            <Button
              text="INICIAR SESIÓN"
              type="submit"
              isCentered={true}
            />
          </fieldset>
          <fieldset className="text-right">
            <Link to="/repassword">
              ¿Olvidaste tu contraseña?
            </Link>
          </fieldset>
          <fieldset className="text-center">
            <label>O inicia con:</label>
            <button className="buttonFacebook" type="button">
              <FaFacebookF className="buttonFacebookIcon" />
              <span>FACEBOOK</span>
            </button>
          </fieldset>
          <p className="haveAccount">¿Tienes una cuenta? <a className="loginLink" onClick={() => handleLogin()}>Ingresa aquí</a></p>
        </form>
      </div>
    </section>
  );
};

export default Login;