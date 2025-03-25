import { useRef, useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

import useAuth from '@Auth/userAuth';

// Store
import { lunaStore } from '@Store/luna';

// COMPONENTS
import { ScrollToTop } from '../UtilsComponents/ScrollTop';
import { Title2, TitlePre, ParagraphPlanet } from '@Components/Atomos/Titles';
import { SaberMas } from '@Components/Atomos/Buttons';
import Button from '@Components/Button';

// Styles
import style from '@Sass/pages/general.module.scss';
import lunaStyle from '@Sass/pages/luna.module.scss';
import login from '@Sass/pages/login.module.scss';

import video from '@Assets/images/video.svg';


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
  }, [texts]);

  const handleVideo = () => {
    if (texts?.video) {
      return (
        <video controls>
          <source src={texts?.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <>
      <ScrollToTop />
      <div className={lunaStyle.LaunchQuestion1}>
        <h2>Launch</h2>
        {
          texts?.slogan
          ? <p className="text-center" dangerouslySetInnerHTML={{ __html: texts?.slogan }}></p>
          : <p className="text-center">¡Nombra tu proyecto!</p>
        }
        <figure><img src={video} alt="video" /></figure>
        <div className={lunaStyle.questionContent}>
          {
            texts?.descripcion
            ? <p
              className="text-center"
              dangerouslySetInnerHTML={{ __html: texts?.descripcion }}></p>
            : <p>Antes de despegar, ponle nombre a tu proyecto. Podrás modificarlo a lo largo de tu viaje. Recuerda que cada vez que te venga la inspiración, este es el espacio correcto para hacer las modificaciones que necesites.</p>
          }
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
          <Button
            text="Siguiente"
            isSubmit={true}
            onClick={() => handleNextPage(2)}
            />
        </div>
      </div>
    </>
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
    <>
      <ScrollToTop />
      <p className="text-center" dangerouslySetInnerHTML={{ __html: texts2?.slogan }}></p>
      <div className={lunaStyle.LaunchQuestion}>
        <div className={lunaStyle.questionContent}>
          <h2>Launch</h2>
          <p>Déjanos saber la idea y motivación de tu proyecto.</p>
          <h3>¿Por qué quieres emprender?</h3>
          <p>Ahora ¿Por qué quieres construir esto que ya plasmaste? Escribe en este espacio</p>
          <SaberMas data={texts2} />
          {/*
            <Title2 text={texts2?.pregunta} />
            <ParagraphPlanet text={texts2?.descripcion} />
          */}
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
    </>
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
    <>
      <ScrollToTop />
      <p className={style.textCenter} dangerouslySetInnerHTML={{ __html: texts3?.slogan }}></p>
      
      <div className={lunaStyle.LaunchQuestion}>
        <div className={lunaStyle.questionContent}>
          {
            texts?.descripcion
            ? <p
              className="text-center"
              dangerouslySetInnerHTML={{ __html: texts?.descripcion }}></p>
            : <p>Antes de despegar, ponle nombre a tu proyecto. Podrás modificarlo a lo largo de tu viaje. Recuerda que cada vez que te venga la inspiración, este es el espacio correcto para hacer las modificaciones que necesites.</p>
          }
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
          <Button
            text="Siguiente"
            isSubmit={true}
            onClick={() => handleNextPage(2)}
            />
        </div>
        <Title2 text={texts3?.pregunta} />
        <ParagraphPlanet text={texts3?.descripcion} />
        <SaberMas data={texts3} />
        <label htmlFor="launchQ1" className={lunaStyle.labelPage}>
          2/3
        </label>
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

        <div className={style.contentButtons}>
          <div className={style.flexButtons}>
            <button className={lunaStyle.btnPlanet} onClick={() => setPageLuna(2)}>
              REGRESAR
            </button>
            <button
              className={
                getLuna().porque.length <= 12 ? lunaStyle.btnPlanetOff : lunaStyle.btnPlanet
              }
              type="button"
              disabled={getLuna().porque.length <= 12 ? 'disabled' : ''}
              onClick={() => handleNextPage(4)}
            >
              SIGUIENTE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ¿Como lo quieres hacer? HOW
export const QuestionsLaunch3 = ({ handleNextPage, setPageLuna, texts4, setTitlePage }) => {
  const { contextValue} = useAuth();

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
      <p className={style.textCenter} dangerouslySetInnerHTML={{ __html: texts4?.slogan }}></p>
      <div className={lunaStyle.LaunchQuestion}>
        <Title2 text={texts4?.pregunta} />
        <ParagraphPlanet text={texts4?.descripcion} />
        <SaberMas data={texts4} />
        <label htmlFor="launchQ1" className={lunaStyle.labelPage}>
          3/3
        </label>
        <textarea
          ref={Q3}
          className={lunaStyle.response}
          name="how"
          id="launchQ1"
          cols="30"
          rows="10"
          placeholder="Escribe tu primer punto"
          value={getLuna().como1}
          onChange={(e) => handleQuestion31(e)}
        ></textarea>
        <textarea
          ref={Q3}
          className={lunaStyle.response}
          name="how"
          id="launchQ1"
          cols="30"
          rows="10"
          placeholder="Eacribe tu segundo punto"
          value={getLuna().como2}
          onChange={(e) => handleQuestion32(e)}
        ></textarea>
        <textarea
          ref={Q3}
          className={lunaStyle.response}
          name="how"
          id="launchQ1"
          cols="30"
          rows="10"
          placeholder="Escribe tu tercer punto"
          value={getLuna().como3}
          onChange={(e) => handleQuestion33(e)}
        ></textarea>

        <div className={style.contentButtons}>
          <div className={style.flexButtons}>
            <button className={lunaStyle.btnPlanet} onClick={() => setPageLuna(3)}>
              REGRESAR
            </button>
            {/* <button
              className={getLuna().como.length <= 12 ? lunaStyle.btnPlanetOff : lunaStyle.btnPlanet}
              type={'button'}
              disabled={getLuna().como.length <= 12 ? 'disabled' : ''}
              onClick={() => handleNextPage(5)}
            > */}
            {/* <button
              className={lunaStyle.btnPlanet}
              type={'button'}
              onClick={() => handleNextPage(5)}
            >
              SIGUIENTE
            </button> */}

            {contextValue.isLogged() ? (
            <button type="button" className={lunaStyle.btnPlanet} onClick={() => handleNextPage(6)}>
              SIGUIENTE
            </button>
          ) : (
            <button type="button" className={lunaStyle.btnPlanet} onClick={() => handleNextPage(5)}>
              SIGUIENTE
            </button>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

// Video pre-registro
export const QuestionsLaunch5 = ({ handleNextPage, texts5, setTitlePage }) => {


  const { dataLuna, setStateLuna, getLuna } = lunaStore(
    (state) => ({
      dataLuna: state.dataLuna,
      setStateLuna: state.setLuna,
      getLuna: state.getLuna,
    }),
    shallow
  );

  // console.log(texts5);

  useEffect(() => {
    setTitlePage(texts5.titulo_de_la_vista);
  }, [texts5]);

  const handleVideo = () => {
    if (texts5?.video) {
      return (
        <video controls>
          <source
            src="https://wprocket.digitalferrer.com/wp-content/uploads/2023/04/ROCKETNOW-pre-registro.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <>
      <ScrollToTop />
      <div className={lunaStyle.LaunchQuestion1}>
        <p className={style.textCenter} dangerouslySetInnerHTML={{ __html: texts5?.slogan }}></p>
        <div className={lunaStyle.video}><img src={video} alt="video"  /></div>
        <p
          className={style.textCenter}
          dangerouslySetInnerHTML={{ __html: texts5?.descripcion }}
        ></p>

        <div className={`${lunaStyle.nameProjectContent}`}>

          <TitlePre text={texts5?.pregunta}  />

          <button type="button" className={lunaStyle.btnPlanet}>
              SIGUIENTE
            </button>
        </div>
      </div>
    </>
  );
};
