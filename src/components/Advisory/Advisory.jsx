import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';

// CONTEXT
import useAuth from '@Auth/userAuth';

// COMPONENTS
import { LinkRouter, GoBack } from '@Components/UtilsComponents/Button';
import ButtonGoHome from '@Components/ButtonGoHome';

// IMAGES
import _Astronaut from '@Assets/images/astronauta.png';

// STYLES
import './Advisory.scss';

export const Index = () => {
  const { advisory } = useAuth();
  return <>{advisory ? <ThanksAdvisory /> : <Advisory />}</>;
};

// Formulario
const Advisory = () => {
  const { setAdvisory } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data) {
      setAdvisory(true);
    }
  };

  return (
    <section className="planetWrap">
      <ButtonGoHome
        className="planetBackToTheHomepage"
        onClick={() => {
          history.push('/');
        }}
        text="Volver al Inicio"
      />
      <div className="planetContainer">
        <div className="planetContent">
          <h2>ASESORÍA PERSONALIZADA</h2>
          <p>Tenemos al experto que necesitas.</p>
          <form className="col-lg-8 col-md-8 col-sm-12 col-xs-12" onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <label htmlFor="theme">Tema</label>
              <input type={'theme'} name="theme" id="theme" className="advisory_input" placeholder=" " {...register('theme', { required: true })} />
              {errors.theme && (
                <span className="spanError">
                  <FaInfoCircle />
                  <span>Ingrese el tema</span>
                </span>
              )}
            </fieldset>
            <fieldset>
              <label htmlFor="launchQ1">Asesoría</label>
              <textarea name="advisory" id="advisory" cols="20" rows="10" placeholder=" " {...register('advisory', { required: true })}></textarea>
              {errors.advisory && (
                <span className="spanError">
                  <FaInfoCircle />
                  <span>Ingrese su descripción</span>
                </span>
              )}
            </fieldset>
            <Button text="ENVIAR" type="submit" />
          </form>
        </div>
      </div>
    </section>
  );
};

// Vista Gracias
const ThanksAdvisory = () => {
  return (
    <section className="Advisory">
      <div className="container">
        <div className="AdvisoryContent">
          <h2>GRACIAS</h2>
          <p>Nos pondremos en contacto contigo.</p>
          <img src={_Astronaut} />
          <LinkRouter label="NUESTROS PAQUETES" rute="/paquetes" />
          <Link to="/paquetes" className="ourPacks">
            NUESTROS PAQUETES
          </Link>
        </div>
      </div>
    </section>
  );
};
