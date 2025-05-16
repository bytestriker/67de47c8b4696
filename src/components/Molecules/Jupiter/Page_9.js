import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

// Context
import useAuth from '@Auth/userAuth';

// store
import { globalStore } from '@Store/global';
import { lunaStore } from '@Store/luna';

// services
import { uploadLogo } from '@Service/jupiter.service';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { Title2, ParagraphPlanet } from '@Components/Atomos/Titles';
import { WatchPlanetVideo } from '@Components/Atomos/Buttons';
import Carrusel from '@Components/Atomos/Slider';
import Button from '@Components/Button';

// Images
import upload from '@Assets/images/upload.png';

// Styles
import style from '@Sass/pages/general.module.scss';
import jupiter from '@Sass/pages/jupiter.module.scss';

/* Page 9 */
export const Logo = ({ setPage, setTitle, setModal, modal, texts, dataJupiter }) => {
  const { setLoading } = useAuth();
  const { getLuna } = lunaStore(
    (state) => ({
      getLuna: state.getLuna,
    }),
    shallow
  );
  const { setMessage, setAlert } = globalStore(
    (state) => ({
      setMessage: state.setMessage,
      setAlert: state.setAlert,
    }),
    shallow
  );
  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  const handleImageDoc = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const uploadImage = (selectedImage) => {
    if (selectedImage) {
      setLoading(true);
      uploadLogo(getLuna().id, selectedImage)
        .then(() => {
          setLoading(false);
          setMessage('Archivo cargado correctamente');
          setAlert(true);
        })
        .catch((error) => {
          console.error('Error al cargar la imagen:', error);
          setLoading(false);
          setMessage('Error al cargar la imagen');
          setAlert(true);
        });
    } else {
      console.error('No se ha seleccionado ninguna imagen.');
    }
  };

  const items = [
    <a
      href={texts.link_de_la_plataforma_recomendada_1}
      className="entriesBrands"
      key={1}
      target="_blank"
    >
      <img src={texts.imagen_de_la_plataforma_recomendada_1} alt="" />
      <span>{texts.descripcion_de_la_plataforma_recomendada_1}</span>
    </a>,

    <a
      href={texts.link_de_la_plataforma_recomendada_2}
      className="entriesBrands"
      key={2}
      target="_blank"
    >
      <img src={texts.imagen_de_la_plataforma_recomendada_2} alt="" />
      <span>{texts.descripcion_de_la_plataforma_recomendada_2}</span>
    </a>,

    <a
      href={texts.link_de_la_plataforma_recomendada_3}
      className="entriesBrands"
      key={3}
      target="_blank"
    >
      <img src={texts.imagen_de_la_plataforma_recomendada_3} alt="" />
      <span>{texts.descripcion_de_la_plataforma_recomendada_3}</span>
    </a>,
    <a
      href={texts.link_de_la_plataforma_recomendada_4}
      className="entriesBrands"
      key={4}
      target="_blank"
    >
      <img src={texts.imagen_de_la_plataforma_recomendada_4} alt="" />
      <span>{texts.descripcion_de_la_plataforma_recomendada_4}</span>
    </a>,
  ];

  return (
    <form className="questionWrap">
      <ScrollToTop />
      <h2 dangerouslySetInnerHTML={{ __html:texts?.titulo_de_la_vista }}></h2>
      <p dangerouslySetInnerHTML={{ __html: texts?.descripcion }}></p>
      {texts?.link_video && (
        <WatchPlanetVideo
          params={[
            {
              alt: 'play video',
              url: texts?.link_video,
            },
          ]}
        />
      )} 
      <div className="inputFileCustom">
        <input
          type="file"
          name="fileInput"
          id="fileInput"
          onChange={handleImageDoc}
        />
      </div>
      {/*  <div className={jupiter.checkText}>
        <input type="checkbox" name="checkInput" id="checkInput" className={jupiter.checkInput} />
        <p>Subir después</p>
      </div> */}
      <p dangerouslySetInnerHTML={{ __html: texts?.descripcion_general_de_las_plataformas_recomendadas }}></p>
      <Carrusel items={items} />
      <div className="buttons">
        {/*<button type="button" className={`${jupiter.btnPlanet}`} onClick={() => setPage(8)}>
            ANTERIOR
          </button>
          <button type="button" className={`${jupiter.btnPlanet}`} onClick={() => setModal(true)}>
            SIGUIENTE
          </button>*/}
        <Button text="ANTERIOR" onClick={() => setPage(8)} shape="alt"/>
        <Button text="SIGUIENTE" onClick={() => setModal(true)} />
      </div>
    </form>
  );
};
