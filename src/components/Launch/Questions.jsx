import { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

import useAuth from '@Auth/userAuth';

// Store
import { lunaStore } from '@Store/luna';

// COMPONENTS
import { ScrollToTop } from '../UtilsComponents/ScrollTop';

import { SaberMas, WatchLunaVideos } from '@Components/Atomos/Buttons';
import Button from '@Components/Button';

// Styles
import style from '@Sass/pages/general.module.scss';
import lunaStyle from '@Sass/pages/luna.module.scss';


import video from '@Assets/images/video.svg';
import boton_copiar from '@Assets/images/icons/boton_copiar.svg'
import successIcon from '@Assets/images/icons/success-icon.svg'




// Nombra tu proyecto
export const NameProject = ({ handleNextPage, texts, setTitlePage }) => {
  const { dataLuna, setStateLuna, getLuna } = lunaStore(
    (state) => ({
      dataLuna: state.dataLuna,
      setStateLuna: state.setLuna,
      getLuna: state.getLuna,
    }),
    shallow
  );

  const handleNameProject = (event) => {
    setStateLuna({ ...dataLuna, nombre: event.target.value });
  };

  const projectName = useRef(null);

  useEffect(() => {
    projectName.current.focus();
    setTitlePage(texts?.titulo_de_la_vista);
  }, []);

  useEffect(() => {
    setTitlePage(texts.titulo_de_la_vista);
    console.log("name project  ", texts)
  }, [texts]);


  return (
    <div className={lunaStyle.LaunchQuestion1}>
      <ScrollToTop />
      <h2 dangerouslySetInnerHTML={{__html:texts?.titulo_de_la_vista}}>{}</h2>
      <p className="text-center" dangerouslySetInnerHTML={{ __html: texts?.slogan }}></p>

      <figure className={lunaStyle.LaunchQuestionVideo}>
      {texts?.video && (
          <WatchLunaVideos
            params={[
              {
                playvideo: video, 
                alt:"play video",
                url: texts?.link_video,
                // You can add additional video params here if needed
              }
            ]} 
          />
        )}
      </figure>
      <div className={lunaStyle.LaunchQuestionVideo}>
        
      </div>
      <div className={lunaStyle.questionContent}>
        <p className="text-center" dangerouslySetInnerHTML={{ __html: texts?.descripcion }}></p>
        <h2>¿Cómo se va a llamar?</h2>
        <fieldset>
          <label htmlFor="email">Nombre de tu proyecto</label>
          <input
            ref={projectName}
            type="text"
            name="projectName"
            id="projectName"
            placeholder="NOMBRE"
            value={getLuna().nombre}
            onChange={(e) => handleNameProject(e)}
          />
        </fieldset>
        <Button text="Siguiente" isSubmit={true} onClick={() => handleNextPage(2)} />
      </div>
    </div>
  );
};

// ¿Qué quieres hacer? WHAT
export const QuestionsLaunch1 = ({ handleNextPage, setPageLuna, texts2, setTitlePage }) => {
  const { dataLuna, setStateLuna, getLuna } = lunaStore(
    (state) => ({
      dataLuna: state.dataLuna,
      setStateLuna: state.setLuna,
      getLuna: state.getLuna,
    }),
    shallow
  );

  const Q1 = useRef(null);
  useEffect(() => {
    Q1.current.focus();
  }, []);

  const handleQuestion1 = (event) => {
    setStateLuna({
      ...dataLuna,
      que: event.target.value,
    });
  };

  useEffect(() => {
    setTitlePage(texts2.titulo_de_la_vista);
  }, [texts2]);

  return (
    <div className={lunaStyle.LaunchQuestion}>
      <ScrollToTop />
      <div className={lunaStyle.questionContent}>
        <h2 dangerouslySetInnerHTML={{ __html: texts2?.titulo_de_la_vista }}></h2>
        <p className="text-center" dangerouslySetInnerHTML={{ __html: texts2?.slogan }}></p>
        <p dangerouslySetInnerHTML={{ __html: texts2?.descripcion }}></p>
        <SaberMas data={texts2} />
        <fieldset>
          <label htmlFor="launchQ1" className="text-right">1/3</label>
          <textarea
            ref={Q1}
            className={lunaStyle.response}
            name="what"
            id="launchQ1"
            cols="30"
            rows="10"
            placeholder="Escribe aquí tu idea"
            value={getLuna().que}
            onChange={(e) => handleQuestion1(e)}
          ></textarea>
        </fieldset>
        <div className={style.flexButtons}>
          <Button
            className={getLuna().que.length <= 12 ? lunaStyle.btnPlanetOff : lunaStyle.btnPlanet}
            text="REGRESAR"
            onClick={() => setPageLuna(1)}
            isAlt
          />
          <Button
            className={getLuna().que.length <= 12 ? lunaStyle.btnPlanetOff : lunaStyle.btnPlanet}
            text="SIGUIENTE"
            onClick={() => handleNextPage(3)}
          />
        </div>
      </div>
    </div>
  );
};

// ¿Por qué lo quieres hacer? WHY
export const QuestionsLaunch2 = ({ handleNextPage, setPageLuna, texts3, setTitlePage }) => {
  const { dataLuna, setStateLuna, getLuna } = lunaStore(
    (state) => ({
      dataLuna: state.dataLuna,
      setStateLuna: state.setLuna,
      getLuna: state.getLuna,
    }),
    shallow
  );

  const Q2 = useRef(null);
  useEffect(() => {
    Q2.current.focus();
  }, []);

  const handleQuestion2 = (event) => {
    setStateLuna({ ...dataLuna, porque: event.target.value });
  };

  useEffect(() => {
    setTitlePage(texts3.titulo_de_la_vista);
  }, [texts3]);

  return (
    <div className={lunaStyle.LaunchQuestion}>
      <ScrollToTop />
      <div className={lunaStyle.questionContent}>
        <h2 dangerouslySetInnerHTML={{ __html: texts3?.titulo_de_la_vista }}></h2>
        <p className="text-center" dangerouslySetInnerHTML={{ __html: texts3?.slogan }}></p>
        <p dangerouslySetInnerHTML={{ __html: texts3?.descripcion }}></p>
        <SaberMas data={texts3} />

        <fieldset>
          <label htmlFor="launchQ1" className="text-right">2/3</label>
          <textarea
            ref={Q2}
            className={lunaStyle.response}
            name="why"
            id="launchQ1"
            cols="30"
            rows="10"
            placeholder="Desarrolla tu idea"
            value={getLuna().porque}
            onChange={(e) => handleQuestion2(e)}
          ></textarea>
        </fieldset>

        <div className={style.contentButtons}>
          <div className={style.flexButtons}>
            <Button text="Regresar" isAlt isSubmit={false} onClick={() => setPageLuna(2)} />
            <Button
              text="Siguiente"
              isSubmit={false}
              disabled={getLuna().porque.length <= 12 ? 'disabled' : ''}
              onClick={() => handleNextPage(4)}
              className={
                getLuna().porque.length <= 12 ? lunaStyle.btnPlanetOff : lunaStyle.btnPlanet
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ¿Como lo quieres hacer? HOW
export const QuestionsLaunch3 = ({ handleNextPage, setPageLuna, texts4, setTitlePage }) => {
  const { contextValue } = useAuth();

  const { dataLuna, setStateLuna, getLuna } = lunaStore(
    (state) => ({
      dataLuna: state.dataLuna,
      setStateLuna: state.setLuna,
      getLuna: state.getLuna,
    }),
    shallow
  );

  const Q3 = useRef(null);
  useEffect(() => {
    Q3.current.focus();
  }, []);

  const handleQuestion31 = (event) => {
    setStateLuna({ ...dataLuna, como1: event.target.value });
  };
  const handleQuestion32 = (event) => {
    setStateLuna({ ...dataLuna, como2: event.target.value });
  };
  const handleQuestion33 = (event) => {
    setStateLuna({ ...dataLuna, como3: event.target.value });
  };

  useEffect(() => {
    setTitlePage(texts4.titulo_de_la_vista);
  }, [texts4]);

  return (
    <>
      <ScrollToTop />
      <div className={lunaStyle.LaunchQuestion}>
        <div className={lunaStyle.questionContent}>
          <h2 dangerouslySetInnerHTML={{ __html: texts4.titulo_de_la_vista }}></h2>
          <p className="text-center" dangerouslySetInnerHTML={{ __html: texts4?.slogan }}></p>
          <p dangerouslySetInnerHTML={{ __html: texts4?.descripcion }}></p>
          <SaberMas data={texts4} />
          <fieldset>
            <label htmlFor="launchQ1" className="text-right">3/3</label>
            <textarea
              ref={Q3}
              className="text-area-sm"
              name="how"
              id="launchQ1"
              cols="30"
              rows="10"
              placeholder="Escribe tu primer punto"
              value={getLuna().como1}
              onChange={(e) => handleQuestion31(e)}
            ></textarea>
          </fieldset>
          <fieldset>

            <textarea
              ref={Q3}
              className="text-area-sm"
              name="how"
              id="launchQ1"
              cols="30"
              rows="10"
              placeholder="Escribe tu segundo punto"
              value={getLuna().como2}
              onChange={(e) => handleQuestion32(e)}
            ></textarea>
          </fieldset>
          <fieldset>
            <textarea
              ref={Q3}
              className="text-area-sm"
              name="how"
              id="launchQ1"
              cols="30"
              rows="10"
              placeholder="Escribe tu tercer punto"
              value={getLuna().como3}
              onChange={(e) => handleQuestion33(e)}
            ></textarea>
          </fieldset>
          <div className={style.contentButtons}>
            <div className={style.flexButtons}>
              <Button text="Regresar" isAlt isSubmit={false} onClick={() => setPageLuna(3)} />
              {contextValue.isLogged() ? (
                <Button
                  text="Siguiente"
                  isAlt={false}
                  isSubmit={false}
                  onClick={() => handleNextPage(6)}
                />
              ) : (
                <Button
                  text="Siguiente"
                  isAlt={false}
                  isSubmit={false}
                  onClick={() => handleNextPage(5)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Video pre-registro
export const QuestionsLaunch5 = ({ handleNextPage, texts5, setTitlePage }) => {

  const history = useHistory();

  const { dataLuna, setStateLuna, getLuna } = lunaStore(
    (state) => ({
      dataLuna: state.dataLuna,
      setStateLuna: state.setLuna,
      getLuna: state.getLuna,
    }),
    shallow
  );

  useEffect(() => {
    setTitlePage(texts5.titulo_de_la_vista);
  }, [texts5]);


  const [copied, setCopied] = useState(false);

  const handleCopy = async (text) => { 
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true)
      setTimeout(() => { setCopied(false)}, 1500)
    } catch (error) {
      
    }
  }


  return (
    <>
      <div className={lunaStyle.LaunchQuestion1}>
        <ScrollToTop />
        <h2 dangerouslySetInnerHTML={{ __html: texts5.titulo_de_la_vista }}></h2>


        <div className={lunaStyle.questionContent}>

        <figure className={lunaStyle.LaunchQuestionVideo}>
          {texts5?.video && (
              <WatchLunaVideos
                params={[
                  {
                    playvideo: video, 
                    alt:"play video",
                    url: texts5?.link_video,
                    // You can add additional video params here if needed
                  }
                ]} 
              />
            )}
      </figure>
        {
          texts5?.slogan && <p className="text-center" dangerouslySetInnerHTML={{ __html: texts5?.slogan }}></p>
        }
          <p className="text-center" dangerouslySetInnerHTML={{ __html: texts5?.descripcion }}></p>
          <fieldset id="promo-code-section">
            <label htmlFor="promo_code">Código Promocional</label>
            <div
              id="promo-code"
              style={{
                margin: '0 auto', // Centers the container horizontally
                height: '50px',
                marginTop: '3px',
                display: 'flex',
                width: '75%',
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center', // Centers the child elements
              }}
            >
              <div
                style={{
                  display: 'flex', // Ensures content aligns inside the div
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '50px',
                  width: '75%',
                  border: '1px solid #E0FF4E',
                  textAlign: 'center',
                  fontSize: '2rem',
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: texts5?.pregunta }}></span>
              </div>
              <div
                style={{
                  display: 'flex', // Ensures content aligns inside the div
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '50px',
                  width: '25%',
                  border: '1px solid yellow',
                  fontSize: '1rem',
                  textAlign: 'center',
                  backgroundColor: '#E0FF4E',
                  color: '#000'
                }}
                onClick={()=>handleCopy('R0cketN0w')}
              >
              { 
              !copied ? 
                <img src={boton_copiar} alt="Botón Copiar"/>
              :
                <img src={successIcon} alt="Copiado"/>
              }
              </div>
            </div>
          </fieldset>

          <div className={`${lunaStyle.nameProjectContent}`}>
            <Button text="Siguiente" isAlt={false} onClick={()=>{history.push('/signup')}}/>
          </div>
        </div>
      </div>
    </>
  );
};
