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
              Al continuar aceptas los <strong onClick={() => history.push({ pathname: '/terminos', from: location })}>Términos y Condiciones</strong> del Aviso de Privacidad
            </label>
            <Button
              text="REGISTRARME"
              type="submit"
              isCentered={true}
            />
          </fieldset>
          <button className="buttonFacebook" type="button">
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
