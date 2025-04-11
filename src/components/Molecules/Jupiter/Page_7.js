/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
// context
import useAuth from '@Auth/userAuth';

// store
import { globalStore } from '@Store/global';
import { lunaStore } from '@Store/luna';
import { jupiterStore } from '@Store/jupiter';

// hooks
import {
  createJupiterNombres,
  getNombresJupiter,
  getProjectJupiter,
} from '@Service/jupiter.service';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { WatchPlanetVideo } from '@Components/Atomos/Buttons';
import Button from '@Components/Button';

// Styles
// import style from '@Sass/pages/general.module.scss';
import _jupiter_style from '@Sass/pages/jupiter.module.scss';
import { useHistory } from 'react-router-dom';

{/* Página 7: Prioridades de los Nombres */}
export const Nombres = ({ setPage, setTitle, texts, modalSalir, setModalSalir }) => {
  const history = useHistory();
  const { setLoading } = useAuth();

  const { dataJupiter, setStateOpcion1, setStateOpcion2, setStateOpcion3 } = jupiterStore(
    (state) => ({
      dataJupiter: state.dataJupiter,
      setStateOpcion1: state.setStateOpcion1,
      setStateOpcion2: state.setStateOpcion2,
      setStateOpcion3: state.setStateOpcion3,
    }),
    shallow
  );

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

  const [buttonNext, setButtonNext] = useState(false);
  const [opciones, setOpciones] = useState({
    opcion_1: '',
    opcion_2: '',
    opcion_3: '',
  });

  const [opcion_1, setOpcion_1] = useState({
    isOpenOpcion1: false,
    selectedOpcion1: '',
    opciones: [{ opcion: '' }, { opcion: '' }, { opcion: '' }],
  });
  const [opcion_2, setOpcion_2] = useState({
    isOpenOpcion2: false,
    selectedOpcion2: '',
    opciones: [{ opcion: '' }, { opcion: '' }, { opcion: '' }],
  });
  const [opcion_3, setOpcion_3] = useState({
    isOpenOpcion3: false,
    selectedOpcion3: '',
    opciones: [{ opcion: '' }, { opcion: '' }, { opcion: '' }],
  });

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  useEffect(() => {
    handleValidateProject();
  }, []);

  useEffect(() => {
    if (
      dataJupiter?.opcion_1 !== '' &&
      dataJupiter?.opcion_2 !== '' &&
      dataJupiter?.opcion_2 !== ''
    ) {
      setButtonNext(true);
    }
  }, [dataJupiter?.opcion_1, dataJupiter?.opcion_2, dataJupiter?.opcion_2]);

  const handleValidateProject = async () => {
    const res = await getNombresJupiter(getLuna().id);
    if (res.code === 0) {
      const { opcion_1, opcion_2, opcion_3 } = res.data;
      if (opcion_1 !== '' && opcion_2 !== '' && opcion_3 !== '') {
        const pro = await getProjectJupiter(getLuna().id);
        const { ideas_nombre } = pro.data;
        setOpcion_1({
          isOpenOpcion1: false,
          selectedOpcion1: opcion_1,
          opciones: [
            { opcion: ideas_nombre[0] },
            { opcion: ideas_nombre[1] },
            { opcion: ideas_nombre[2] },
          ],
        });
        setOpcion_2({
          isOpenOpcion2: false,
          selectedOpcion2: opcion_2,
          opciones: [
            { opcion: ideas_nombre[0] },
            { opcion: ideas_nombre[1] },
            { opcion: ideas_nombre[2] },
          ],
        });
        setOpcion_3({
          isOpenOpcion3: false,
          selectedOpcion3: opcion_3,
          opciones: [
            { opcion: ideas_nombre[0] },
            { opcion: ideas_nombre[1] },
            { opcion: ideas_nombre[2] },
          ],
        });
        return;
      }

      const array = dataJupiter.ideas_nombre.map((item) => {
        return { opcion: item };
      });
      setOpcion_1({
        isOpenOpcion1: false,
        selectedOpcion1: 'Selecciona una opción',
        opciones: array,
      });
      setOpcion_2({
        isOpenOpcion2: false,
        selectedOpcion2: 'Selecciona una opción',
        opciones: array,
      });
      setOpcion_3({
        isOpenOpcion3: false,
        selectedOpcion3: 'Selecciona una opción',
        opciones: array,
      });
    }
  };

  /* EVENTOS OPCION_1 */
  const toggleSelectOpcion1 = () => {
    setOpcion_1({ ...opcion_1, isOpenOpcion1: !opcion_1.isOpenOpcion1 });
  };

  const handleOpcion1Click = (option) => {
    setOpcion_1({ ...opcion_1, selectedOpcion1: option, isOpenOpcion1: false });
    setOpciones({ ...opciones, opcion_1: option.opcion });
    setStateOpcion1(option.opcion);
  };

  /* EVENTOS OPCION_2 */
  const toggleSelectOpcion2 = () => {
    setOpcion_2({ ...opcion_2, isOpenOpcion2: !opcion_2.isOpenOpcion2 });
  };
  const handleOpcion2Click = (option) => {
    setOpcion_2({ ...opcion_2, selectedOpcion2: option, isOpenOpcion2: false });
    setOpciones({ ...opciones, opcion_2: option.opcion });
    setStateOpcion2(option.opcion);
  };

  /* EVENTOS OPCION_3 */
  const toggleSelectOpcion3 = () => {
    setOpcion_3({ ...opcion_3, isOpenOpcion3: !opcion_3.isOpenOpcion3 });
  };
  const handleOpcion3Click = (option) => {
    setOpcion_3({ ...opcion_3, selectedOpcion3: option, isOpenOpcion3: false });
    setOpciones({ ...opciones, opcion_3: option.opcion });
    setStateOpcion3(option.opcion);
  };

  const handleSubmit = async (params) => {
    setLoading(true);
    const obj = JSON.stringify({
      opcion_1: dataJupiter?.opcion_1 || opcion_1.selectedOpcion1.opcion,
      opcion_2: dataJupiter?.opcion_2 || opcion_2.selectedOpcion2.opcion,
      opcion_3: dataJupiter?.opcion_3 || opcion_3.selectedOpcion3.opcion,
    });
    console.log("params ", params);
    const res = await createJupiterNombres(getLuna().id, obj);
    alert("res.code " + res.code);
    if (res.code === 0) {
      if (params === 'save') {
        setLoading(false);
        // setModalSalir(true);
        // setLoading(false);
        history.push("/")
      } else if (params === 'next') {
        setLoading(false);
        setPage(8);
      }
    } else if (res.code < 0) {
      setMessage('Debes seleccionar opciones diferentes');
      setAlert(true);
      setLoading(false);
    }
  };
  console.log("jupiter page 7 texts ", texts)


  return (
    <form method="POST" className="questionWrap">
      Paso 7| página 7 
      <ScrollToTop />
      <h2 dangerouslySetInnerHTML={{__html:texts?.titulo_de_la_vista}}></h2>
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

      
      <div className={`selectContainer`}>
        <label>Opción 1</label>
        <div className={`selectHeader`} onClick={toggleSelectOpcion1}>
          <span >{opcion_1?.selectedOpcion1?.opcion || opcion_1?.selectedOpcion1} </span>
          {opcion_1?.isOpenOpcion1 ? <FaCaretUp /> : <FaCaretDown />}
        </div>
        {opcion_1.isOpenOpcion1 && (
          <div className={`selectOptions`}>
            {opcion_1.opciones.map((option, optionIndex) => (
              <div
                key={optionIndex}
                onClick={() => handleOpcion1Click(option)}
              >
                {option.opcion}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={`selectContainer`}>
        <label>Opción 2</label>
        <div className={`selectHeader`} onClick={toggleSelectOpcion2}>
          <span className={`selectSpanText`}>
            {opcion_2?.selectedOpcion2?.opcion || opcion_2?.selectedOpcion2}
          </span>
          <span className={`selectSpanArrow`}>
            {opcion_2?.isOpenOpcion2 ? <FaCaretUp /> : <FaCaretDown />}
          </span>
        </div>
        {opcion_2.isOpenOpcion2 && (
          <div className={`selectOptions`}>
            {opcion_2.opciones.map((option, optionIndex) => (
              <div
                className={`option`}
                key={optionIndex}
                onClick={() => handleOpcion2Click(option)}
              >
                {option.opcion}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={`selectContainer`}>
        <label>Opción 3</label>
        <div className={`selectHeader`} onClick={toggleSelectOpcion3}>
          <span className={`selectSpanText`}>
            {opcion_3?.selectedOpcion3?.opcion || opcion_3?.selectedOpcion3}
          </span>
          <span className={`selectSpanArrow`}>
            {opcion_3?.isOpenOpcion3 ? <FaCaretUp /> : <FaCaretDown />}
          </span>
        </div>
        {opcion_3.isOpenOpcion3 && (
          <div className={`selectOptions`}>
            {opcion_3.opciones.map((option, optionIndex) => (
              <div
                className={`option`}
                key={optionIndex}
                onClick={() => handleOpcion3Click(option)}
              >
                {option.opcion}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="buttons">
        <Button text="ANTERIOR" isAlt={true} onClick={() => setPage(6)} />
        {/* <Button text="GUARDAR" onClick={() => handleSubmit('save')} disabled={!buttonNext && 'disabled'} /> */}
        <Button text="SIGUIENTE" onClick={() => setModalSalir(!modalSalir)} disabled={!buttonNext && 'disabled'} />
      </div>
    </form>
  );
};
