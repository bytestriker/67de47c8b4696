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
import { SaberMas } from '@Components/Atomos/Buttons';
import Carrusel from '@Components/Atomos/Slider';

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
      className={jupiter.entriesBrands}
      key={1}
      target="_blank"
    >
      <img src={texts.imagen_de_la_plataforma_recomendada_1} alt="" />
      <p>{texts.descripcion_de_la_plataforma_recomendada_1}</p>
    </a>,

    <a
      href={texts.link_de_la_plataforma_recomendada_2}
      className={jupiter.entriesBrands}
      key={2}
      target="_blank"
    >
      <img src={texts.imagen_de_la_plataforma_recomendada_2} alt="" />
      <p>{texts.descripcion_de_la_plataforma_recomendada_2}</p>
    </a>,

    <a
      href={texts.link_de_la_plataforma_recomendada_3}
      className={jupiter.entriesBrands}
      key={3}
      target="_blank"
    >
      <img src={texts.imagen_de_la_plataforma_recomendada_3} alt="" />
      <p>{texts.descripcion_de_la_plataforma_recomendada_3}</p>
    </a>,
    <a
      href={texts.link_de_la_plataforma_recomendada_4}
      className={jupiter.entriesBrands}
      key={4}
      target="_blank"
    >
      <img src={texts.imagen_de_la_plataforma_recomendada_4} alt="" />
      <p>{texts.descripcion_de_la_plataforma_recomendada_4}</p>
    </a>,
  ];

  const componentSlider = (
    <Carrusel
      items={items}
      controls={true}
      controlsClass={'white'}
      infinite={true}
      disableBullets={true}
      paddingLeft={0}
      paddingRight={70}
    />
  );

  return (
    <section className={jupiter.jupiterLogo}>
      <ScrollToTop />
      <div>
        <ParagraphPlanet text={texts.descripcion} />
      </div>
      <br></br>
      <form>
        <div className={jupiter.upload}>
          <img src={upload} alt="upload" />
          <input
            type="file"
            name="fileInput"
            id="fileInput"
            onChange={handleImageDoc}
            className={jupiter.fileInput}
          />
        </div>
        {/*  <div className={jupiter.checkText}>
          <input type="checkbox" name="checkInput" id="checkInput" className={jupiter.checkInput} />
          <p>Subir después</p>
        </div> */}
        <br></br>
        <ParagraphPlanet text={texts.descripcion_general_de_las_plataformas_recomendadas} />
        <div className={jupiter.carrusel}>{componentSlider}</div>
        <div className={style.contentButtons}>
          <div className={style.flexButtons}>
            <button type="button" className={`${jupiter.btnPlanet}`} onClick={() => setPage(8)}>
              ANTERIOR
            </button>
            <button type="button" className={`${jupiter.btnPlanet}`} onClick={() => setModal(true)}>
              SIGUIENTE
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
