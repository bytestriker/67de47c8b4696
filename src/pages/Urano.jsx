import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { FaSearch } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

// Context
import useAuth from '@Auth/userAuth';

// Hooks
import { UranoWPText } from '@Hooks/useFetchWP';
import { useEventsUrano } from '@Hooks/useEventsUrano';

// Store
import { lunaStore } from '@Store/luna';
import { uranoStore } from '@Store/urano';
import { globalStore } from '@Store/global';

// Services
import { serviceUploadDoc, serviceUploadPl, servicesaveprototipo } from '@Service/urano.service';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { ModalMain, ModalUrano } from '@Components/Atomos/Modals';
import { Title2, ParagraphPlanet, Title } from '@Components/Atomos/Titles';
import { ButtonGoBack, SaberMas } from '@Components/Atomos/Buttons';
import { MarketingCard } from '@Components/Atomos/Cards';
import Carrusel from '@Components/Atomos/Slider';

// Images
import upload from '@Assets/images/upload.png';
import download from '@Assets/images/icons/arrow-circle-up.svg';

// Styles
import style from '@Sass/pages/general.module.scss';
import urano from '@Sass/pages/urano.module.scss';

const Urano = () => {
  const { uranoGetProjectById } = useEventsUrano();
  const { uranoQ1, uranoQ2, uranoQ3, uranoQ2Categorias } = UranoWPText();
  const { getLuna } = lunaStore(
    (state) => ({
      getLuna: state.getLuna,
    }),
    shallow
  );
  
  const [page, setPage] = useState(1);
  const [modalSalir, setModalSalir] = useState(false);
  const [title, setTitle] = useState();
  const [modal, setModal] = useState(false);
  const [texts, setTexts] = useState({});
  const [texts2, setTexts2] = useState({});
  const [texts3, setTexts3] = useState({});
  const [categoriasQ2, setCategoriasQ2] = useState([]);
  const [params, setParams] = useState({});

  useEffect(() => {
    if (uranoQ1) {
      setTexts(uranoQ1);
    }
  }, [uranoQ1]);

  useEffect(() => {
    if (uranoQ2) {
      setTexts2(uranoQ2);
    }
  }, [uranoQ2]);

  useEffect(() => {
    if (uranoQ3) {
      setTexts3(uranoQ3);
    }
  }, [uranoQ3]);

  useEffect(() => {
    if (uranoQ2Categorias) {
      setCategoriasQ2(uranoQ2Categorias);
    }
  }, [uranoQ2Categorias]);

  

  return (
    <section className={style.planetPageMain}>
      {modalSalir ? <ModalMain setModalSalir={setModalSalir} /> : null}

      {modal ? (
        <ModalUrano
          title="¡FELICIDADES!"
          message={`Haz completado <strong>
           Urano</strong> de tu proyecto
         <strong>${getLuna().nombre}</strong>`}
          buttonName="CONTINUAR"
          setPage={setPage}
          setModal={setModal}
          page={4}
        />
      ) : null}

      <div className={style.planetPageContainerUrano}>
        {page === 3 ? (
          <ButtonGoBack titlePage={title} setPage={setPage} page={2} />
        ) : (
          <Title title={title} />
        )}
        <div className={style.pageContainer}>
          <div className={urano.Urano}>
            {page === 1 ? <Logo setPage={setPage} setTitle={setTitle} texts={texts} /> : null}
            {page === 2 ? <Pretotipo setPage={setPage} setTitle={setTitle} texts={texts} /> : null}
            {page === 3 ? (
              <Prototipo
                setPage={setPage}
                setTitle={setTitle}
                texts={texts2}
                categorias={categoriasQ2}
                setParams={setParams}
              />
            ) : null}
            {page === 4 ? (
              <PL setPage={setPage} setTitle={setTitle} setModal={setModal} texts={texts3} />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

/** Page 1 */
export const Logo = ({ setPage, setTitle, texts }) => {
  const { setLoading } = useAuth();
  const { getLuna } = lunaStore(
    (state) => ({
      getLuna: state.getLuna,
    }),
    shallow
  );
  
  const { uranoGetProjectById } = useEventsUrano();
  const [getPrototipo, setPrototipo] = useState({});
  const { register } = useForm();
  useEffect(() => {
    
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  useEffect(() => {

    handleProjectById();
  }, []);

  // validamos si existe un proyecto y actualizamos estado
  const handleProjectById = async () => {
    const res = await uranoGetProjectById();
    if (res.code === 0) {
      setPrototipo(res.data.prototipo);
    }
  };

  const items = [
    <a
      href={texts.link_de_la_plataforma_recomendada_1}
      className={urano.entriesBrands}
      key={0}
      target="_blank"
    >
      <img src={texts.imagen_de_la_plataforma_recomendada_1} alt="" />
      <p>{texts.descripcion_de_la_plataforma_recomendada_1}</p>
    </a>,
    <a
      href={texts.link_de_la_plataforma_recomendada_2}
      className={urano.entriesBrands}
      key={1}
      target="_blank"
    >
      <img src={texts.imagen_de_la_plataforma_recomendada_2} alt="" />
      <p>{texts.descripcion_de_la_plataforma_recomendada_2}</p>
    </a>,
    <a
      href={texts.link_de_la_plataforma_recomendada_3}
      className={urano.entriesBrands}
      key={2}
      target="_blank"
    >
      <img src={texts.imagen_de_la_plataforma_recomendada_3} alt="" />
      <p>{texts.descripcion_de_la_plataforma_recomendada_3}</p>
    </a>,
    <a
      href={texts.link_de_la_plataforma_recomendada_4}
      className={urano.entriesBrands}
      key={3}
      target="_blank"
    >
      <img src={texts.imagen_de_la_plataforma_recomendada_4} alt="" />
      <p>{texts.descripcion_de_la_plataforma_recomendada_4}</p>
    </a>,
  ];

  const handlePrototipo = () => {
    
      saveprototipo(getPrototipo);
    
  };

  const saveprototipo = (getPrototipo) => {
    if (getPrototipo) {
      setLoading(false);
      servicesaveprototipo(getLuna().id, getPrototipo)
        .then(() => {
          setLoading(false);
          setPage(2);
          
        })
        .catch((error) => {
          console.error('Error al hacer submit:', error);
          setLoading(false);
          
        });
    } else {
      console.error('No hay valor de prototipo.');
    }
  };

  return (
    <section className={urano.jupiterLogo}>
      <ScrollToTop />
      <div>
        <Title2 text={texts.pregunta} />
        <ParagraphPlanet text={texts.descripcion} />
        <SaberMas data={texts} />
      </div>
      <textarea
          className={urano.inputProjectName}
          name="uranoQ1"
          id="uranoQ1"
          placeholder="Escribe aquí las diferentes ideas que tengas, para hacer un prototipo de tu proyecto."
          {...register('uranoQ1', { required: true, minLength: 16 })}
          cols="30"
          rows="10"
          value={getPrototipo}
          onChange={(e) => setPrototipo(e.target.value)}
        ></textarea>
      <br></br>
      <div className={style.contentButtons}>
          <div className={style.flexButtons}>
            <button type="button" 
            className={getPrototipo.length <= 10 ? urano.btnPlanetOff : urano.btnPlanet}
            disabled={getPrototipo.length <= 10 ? 'disabled' : ''}
            onClick={handlePrototipo}
            >
              SIGUIENTE
            </button>
          </div>
        </div>
    </section>
  );
};

/** Page 2 */
export const Pretotipo = ({ setPage, setTitle, texts }) => {
  const { setLoading } = useAuth();
  const { getLuna } = lunaStore(
    (state) => ({
      getLuna: state.getLuna,
    }),
    shallow
  );
  const { setAlert, setMessage } = globalStore(
    (state) => ({
      setAlert: state.setAlert,
      setMessage: state.setMessage,
    }),
    shallow
  );
  
  useEffect(() => {
    setTitle(texts.subtitulo_1);
  }, [texts]);

  const items = [
    <a
      href={texts.link_de_la_plataforma_recomendada_1}
      className={urano.entriesBrands}
      key={0}
      target="_blank"
    >
      <img src={texts.imagen_de_la_plataforma_recomendada_1} alt="" />
      <p>{texts.descripcion_de_la_plataforma_recomendada_1}</p>
    </a>,
    <a
      href={texts.link_de_la_plataforma_recomendada_2}
      className={urano.entriesBrands}
      key={1}
      target="_blank"
    >
      <img src={texts.imagen_de_la_plataforma_recomendada_2} alt="" />
      <p>{texts.descripcion_de_la_plataforma_recomendada_2}</p>
    </a>,
    <a
      href={texts.link_de_la_plataforma_recomendada_3}
      className={urano.entriesBrands}
      key={2}
      target="_blank"
    >
      <img src={texts.imagen_de_la_plataforma_recomendada_3} alt="" />
      <p>{texts.descripcion_de_la_plataforma_recomendada_3}</p>
    </a>,
    <a
      href={texts.link_de_la_plataforma_recomendada_4}
      className={urano.entriesBrands}
      key={3}
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

  const handleImageDoc = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const uploadImage = (selectedImage) => {
    if (selectedImage) {
      setLoading(true);
      serviceUploadDoc(getLuna().id, selectedImage)
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


  return (
    <section className={urano.jupiterLogo}>
      <form>
        
        {/*        <div className={urano.checkText}>
          <input type="checkbox" name="checkInput" id="checkInput" className={urano.checkInput} />
          <p>Subir después</p>
        </div>
        <br></br> */}
        <ParagraphPlanet text={texts.descripcion_general_de_las_plataformas_recomendadas} />
        <div className={urano.upload}>
          <img src={upload} alt="upload" />
          <input
            type="file"
            name="fileInput"
            id="fileInput"
            onChange={handleImageDoc}
            className={urano.fileInput}
          />
        </div>
      </form>
      <br></br>
      <div className={style.contentButtons}>
          <div className={style.flexButtons}>
            <button type="button" className={`${urano.btnPlanet}`} onClick={() => setPage(1)}>
              ANTERIOR
            </button>
            <button type="button" className={`${urano.btnPlanet}`} onClick={() => setPage(3)}>
              SIGUIENTE
            </button>
          </div>
        </div>
    </section>
  );
};

/** Page 3 **/
export const Prototipo = ({ setPage, setTitle, texts, categorias, setParams }) => {
  const [data] = useState(categorias);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleInputChange = (e) => {
    // Actualiza el término de búsqueda mientras el usuario escribe
    setSearchTerm(e.target.value);
    // Filtra los datos en tiempo real
    const filtered = data.filter((item) =>
      item.categoria.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  const handleProvider = (array) => {
    setParams(array);
    setPage(3);
  };

  return (
    <section>
      <ScrollToTop />
      <div>
        <Title2 text={texts.pregunta} />
        <ParagraphPlanet text={texts.descripcion} />

        <div className={urano.input_search}>
          <input
            type="search"
            placeholder="Busca alguna categoría"
            className={urano.search}
            value={searchTerm}
            onChange={handleInputChange}
          />
          <FaSearch className={urano.icon} />
        </div>
      </div>
      <div>
        <div className={urano.cardContent}>
          {filteredData.length > 0 ? (
            filteredData.map((items, index) => (
              <div className={urano.card} key={index}>
                <div className={urano.item} onClick={() => handleProvider(items)}>
                  <img src={items.icono_de_categoria} alt="card" />
                </div>
                <p>{items.categoria}</p>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>

        {/*         <div className={urano.content}>
          <a className={`${urano.vermas}`} onClick={() => setItems(true)}>
            VER MÁS
          </a>
        </div> */}

        <div className={style.contentButtons}>
          <div className={style.flexButtons}>
            <button type="button" className={`${urano.btnPlanet}`} onClick={() => setPage(2)}>
              ANTERIOR
            </button>
            <button type="button" className={`${urano.btnPlanet}`} onClick={() => setPage(4)}>
              SIGUIENTE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/** Opcional Page 4 */
export const Marketing = ({ setTitle, texts, params }) => {
  const [market, setMarket] = useState({});
  const [proveedores, setProveedores] = useState([]);
  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  useEffect(() => {
    if (params) {
      setMarket(params);
      setProveedores(params.proveedores);
    }
  }, [params]);

  return (
    <section>
      <ScrollToTop />
      <div>
        <Title2 text={market.categoria} />
        <ParagraphPlanet text={market.descripcion_de_categoria} />
      </div>

      <div className={urano.cardMarketing}>
        {proveedores.length > 0 ? (
          proveedores.map((items, index) => (
            <MarketingCard
              key={index}
              company={items.nombre}
              description={items.descripcion}
              email={items.correo}
              phone={items.telefono}
              foto={items.foto}
            />
          ))
        ) : (
          <MarketingCard
            key={1}
            company={'no hay compañia'}
            description={'sin descripción'}
            email={'rocketnow@info.com'}
            phone={'56581111'}
            foto={''}
          />
        )}
      </div>
    </section>
  );
};

/** Page 4 */
export const PL = ({ setPage, setTitle, setModal, texts }) => {
  const { setLoading } = useAuth();
  const { getLuna } = lunaStore(
    (state) => ({
      getLuna: state.getLuna,
    }),
    shallow
  );
  const { setAlert, setMessage } = globalStore(
    (state) => ({
      setAlert: state.setAlert,
      setMessage: state.setMessage,
    }),
    shallow
  );

  const { uranoGetProjectById } = useEventsUrano();
  const history = useHistory();

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
      serviceUploadPl(getLuna().id, selectedImage)
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

  const handleValidateProject = async () => {
    const res = await uranoGetProjectById();
    if (res.code === 0) {
      if (res.data.completed) {
        setModal(true);
        setPage(1);
      } else {
        setPage(1);
        history.push('/');
      }
    } else {
      setPage(1);
      history.push('/');
    }
  };

  return (
    <section className={urano.jupiterLogo}>
      <ScrollToTop />
      <div>
        <Title2 text={texts.pregunta} />
        <ParagraphPlanet text={texts.descripcion} />
        <a href={texts.adjuntar_formato_para_descargar} className={urano.downloadContent}>
          <p className={urano.descargarTxt}>Descargar formato</p>
          <img src={download} alt="download" className={urano.downloadIcon} />
        </a>
      </div>
      <form>
        <div className={urano.upload}>
          <img src={upload} alt="upload" />
          <input
            type="file"
            name="fileInput"
            id="fileInput"
            onChange={handleImageDoc}
            className={urano.fileInput}
          />
        </div>
        {/*       <p className={urano.subir}>Subir archivo</p>
        <div className={urano.checkText}>
          <input type="checkbox" name="checkInput" id="checkInput" className={urano.checkInput} />
          <p>Subir después</p>
        </div> */}
        <div className={style.contentButtons}>
          <div className={style.flexButtons}>
            <button type="button" className={`${urano.btnPlanet}`} onClick={() => setPage(3)}>
              ANTERIOR
            </button>
            <button
              type="button"
              className={`${urano.btnPlanet}`}
              onClick={() => handleValidateProject()}
            >
              SIGUIENTE
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Urano;
