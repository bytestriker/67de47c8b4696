import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Store
import { lunaStore } from '@Store/luna';
import { jupiterStore } from '@Store/jupiter';

// Hooks
import { JupiterWPText } from '@Hooks/useFetchWP';
import { useEventJupiter } from '@Hooks/useEventsJupiter';

// Components
import {
  Intro,
  Caracteristicas,
  Significativos,
  Nombres,
  Nombre,
  Marca,
  Logo,
  IdeasNombre,
  Calificativos,
  BuyerInfo,
} from '@Components/Molecules/Jupiter/';
import { ModalJupiter, ModalSalirJupiter } from '@Components/Atomos/Modals';
import { ButtonClose } from '@Components/Atomos/Buttons';

// Styles
import style from '@Sass/pages/general.module.scss';
import jupiter from '@Sass/pages/jupiter.module.scss';

const Jupiter = () => {
  const { getLuna } = lunaStore(
    (state) => ({
      getLuna: state.getLuna,
    }),
    shallow
  );

  const { dataJupiter } = jupiterStore(
    (state) => ({
      dataJupiter: state.dataJupiter,
    }),
    shallow
  );

  const { jupiterGetProjectById, jupiterGetNombres, jupiterGetMarca } = useEventJupiter();
  const { jupiterQ1, jupiterQ2, jupiterQ3, jupiterQ4, jupiterQ5, jupiterQ6, jupiterQ7, jupiterQ8, jupiterQ9 } =
    JupiterWPText();

  const [page, setPage] = useState(1);
  const [modalSalir, setModalSalir] = useState(false);
  const [title, setTitle] = useState();
  const [modal, setModal] = useState(false);

  // texts states
  const [texts1, setTexts1] = useState({});
  const [texts2, setTexts2] = useState({});
  const [texts3, setTexts3] = useState({});
  const [texts4, setTexts4] = useState({});
  const [texts5, setTexts5] = useState({});
  const [texts6, setTexts6] = useState({});
  const [texts7, setTexts7] = useState({});
  const [texts8, setTexts8] = useState({});
  const [texts9, setTexts9] = useState({});

  useEffect(() => {
    if (jupiterQ1) {
      setTexts1(jupiterQ1);
    }
  }, [jupiterQ1]);

  useEffect(() => {
    if (jupiterQ2) {
      setTexts2(jupiterQ2);
    }
  }, [jupiterQ2]);

  useEffect(() => {
    if (jupiterQ3) {
      setTexts3(jupiterQ3);
    }
  }, [jupiterQ3]);

  useEffect(() => {
    if (jupiterQ4) {
      setTexts4(jupiterQ4);
    }
  }, [jupiterQ4]);

  useEffect(() => {
    if (jupiterQ5) {
      setTexts5(jupiterQ5);
    }
  }, [jupiterQ5]);

  useEffect(() => {
    if (jupiterQ6) {
      setTexts6(jupiterQ6);
    }
  }, [jupiterQ6]);

  useEffect(() => {
    if (jupiterQ7) {
      setTexts7(jupiterQ7);
    }
  }, [jupiterQ7]);

  useEffect(() => {
    if (jupiterQ8) {
      setTexts8(jupiterQ8);
    }
  }, [jupiterQ8]);

  useEffect(() => {
    if (jupiterQ9) {
      setTexts9(jupiterQ9);
    }
  }, [jupiterQ9]);

  useEffect(() => {
    handlePageJupiter();
  }, []);

  const handlePageJupiter = async () => {
    const a = await jupiterGetProjectById();
    if (a.code === 0) {
      const { caracteristicas, adjetivos_calificativos, objetivos, significados, ideas_nombre } =
        a.data;
      if (caracteristicas.length === 0) {
        setPage(1);
        return;
      }
      if (adjetivos_calificativos.length === 0) {
        setPage(2);
        return;
      }
      if (objetivos.length === 0) {
        setPage(3);
        return;
      }
      if (significados.length === 0) {
        setPage(4);
        return;
      }
      if (ideas_nombre.length === 0) {
        setPage(5);
        return;
      }

      const names = await jupiterGetNombres();
      if (names.code === 0) {
        const { opcion_1, opcion_2, opcion_3 } = names.data;
        if (opcion_1 === '' || opcion_2 === '' || opcion_3 === '') {
          setPage(6);
          return;
        }
      }

      const marcas = await jupiterGetMarca();
      if (marcas.code === 0) {
        const { logotipo, descripcion_marca } = marcas.data;
        if (descripcion_marca === "") {
          setPage(8);
          return;
        }
        if (logotipo === '' || logotipo === null) {
          setPage(9);
          return;
        }
      }
      setPage(1);
    }
  };

  return (
    <section className={style.planetPageMain}>
      {modalSalir ? (
        <ModalSalirJupiter
          title="Estás a punto de salir"
          message="¿Deseas guardar tu información?"
          setModalSalir={setModalSalir}
          dataJupiter={dataJupiter}
          proyectID={getLuna().id}
          page={page}
        />
      ) : null}

      {modal ? (
        <ModalJupiter
          title="¡FELICIDADES!"
          message={`Haz completado <strong>
             Jupiter</strong> de tu proyecto
           <strong>${getLuna().nombre}</strong>`}
          buttonName="INICIO"
          setPage={setPage}
          setModal={setModal}
          page={page}
        />
      ) : null}

      <div>
        <ButtonClose setModalSalir={setModalSalir} titlePage={title} />
        <div className={style.pageContainer}>
          <div className={jupiter.Jupiter}>
            {page === 1 ? (
              <Intro
                setPage={setPage}
                setTitle={setTitle}
                texts={texts1}
                dataJupiter={dataJupiter}
              />
            ) : null}
            {page === 2 ? (
              <Caracteristicas
                setPage={setPage}
                setTitle={setTitle}
                texts={texts2}
                dataJupiter={dataJupiter}
              />
            ) : null}
            {page === 3 ? (
              <Calificativos
                setPage={setPage}
                setTitle={setTitle}
                texts={texts3}
                dataJupiter={dataJupiter}
              />
            ) : null}
            {page === 4 ? (
              <Nombre
                setPage={setPage}
                setTitle={setTitle}
                texts={texts4}
                dataJupiter={dataJupiter}
              />
            ) : null}
            {page === 5 ? (
              <Significativos
                setPage={setPage}
                setTitle={setTitle}
                texts={texts5}
                dataJupiter={dataJupiter}
              />
            ) : null}
            {page === 6 ? <IdeasNombre
                setPage={setPage}
                setTitle={setTitle}
                texts={texts6}
                dataJupiter={dataJupiter}
              /> : null}
            {page === 7 ? <Nombres 
            setPage={setPage} 
            setTitle={setTitle} 
            texts={texts7} 
            /> : null}
            {page === 8 ? (
              <Marca
                setPage={setPage}
                setTitle={setTitle}
                texts={texts8}
                dataJupiter={dataJupiter}
              />
            ) : null}
            {page === 9 ? (
              <Logo
                setPage={setPage}
                setTitle={setTitle}
                setModal={setModal}
                modal={modal}
                texts={texts9}
                dataJupiter={dataJupiter}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jupiter;
