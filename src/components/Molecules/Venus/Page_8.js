import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { shallow } from 'zustand/shallow';

import { FaUser, FaSuitcase, FaMapMarkerAlt } from 'react-icons/fa';

// Store
import { venusStore } from '@Store/venus';
import { lunaStore } from '@Store/luna';

// Hooks
import { useEventsVenus } from '@Hooks/useEventVenus';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';

import { ToolTipBackground } from '@Components/Atomos/Tooltips';

// Images
import profile from '@Assets/images/profile.png';

// Styles
import style from '@Sass/pages/venus.module.scss';

/** VENUS BUYER COMPLETE
 * page 7
 */
export const BuyerAdd = ({ setModal, setTitle, texts, setMessage, buyer, setBuyer }) => {
  const { venusGetBuyerPersona, venusCreateBuyerPersona } = useEventsVenus();
  const { getLuna } = lunaStore(
    (state) => ({
      getLuna: state.getLuna,
    }),
    shallow
  );
  const { getVenus, setStateBuyer } = venusStore(
    (state) => ({
      getVenus: state.getVenus,
      setStateBuyer: state.setStateBuyer,
    }),
    shallow
  );
  const { register } = useForm();

  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    setTitle(texts.titulo_de_la_vista);
  }, [texts]);

  useEffect(() => {
    setStateBuyer(buyer);
  }, [buyer]);

  useEffect(() => {
    setActiveSection('GOALS');
  }, []);

  useEffect(() => {
    setBuyer({
      id: 0,
      nombre: '',
      num_buyer: 0,
      frase: '',
      edad: '',
      ubicacion: '',
      profesion: '',
      background: '',
      goals: '',
      motivations: '',
      frustrations: '',
    });
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await venusCreateBuyerPersona(buyer);
    if (res.code === 0) {
      setMessage(
        `Tus datos se han guardado correctamente.`
      );
  
      setModal(true);
    }
  };

  const handleMenu = (item) => {
    setActiveSection(item);
  };

  return (
    <section className={style.venusQuestions}>
      <ScrollToTop />

      <form onSubmit={handleSubmit}>
        <div className={style.buyer}>
          <div className={style.card1}>
            <div className={style.card1Content}>
              <div className={style.imageContent}>
                <img src={profile} alt="profile" />
              </div>
              <input
                {...register('nombre')}
                type="text"
                placeholder="Nombre del buyer persona"
                required
                className={style.inputBuyernanme}
                value={buyer.nombre}
                onChange={(e) => setBuyer({ ...buyer, nombre: e.target.value })}
              />
              <input
                {...register('frase')}
                type="text"
                placeholder="Frase favorita"
                required
                className={style.inputFrase}
                value={buyer.frase}
                onChange={(e) => setBuyer({ ...buyer, frase: e.target.value })}
              />
              <div className={style.iconsContent}>
                <div className={style.box}>
                  <FaUser className={style.icon} />
                  <input
                    {...register('edad')}
                    type="number"
                    placeholder="Edad"
                    required
                    className={style.inputCard1}
                    value={buyer.edad}
                    onChange={(e) => setBuyer({ ...buyer, edad: e.target.value })}
                  />
                </div>
                <div className={style.box}>
                  <FaMapMarkerAlt className={style.icon} />
                  <input
                    {...register('ubicacion')}
                    type="text"
                    placeholder="Ubicación"
                    required
                    className={style.inputCard1}
                    value={buyer.ubicacion}
                    onChange={(e) => setBuyer({ ...buyer, ubicacion: e.target.value })}
                  />
                </div>
                <div className={style.box}>
                  <FaSuitcase className={style.icon} />
                  <input
                    {...register('profesion')}
                    type="text"
                    placeholder="Profesión"
                    required
                    className={style.inputCard1}
                    value={buyer.profesion}
                    onChange={(e) => setBuyer({ ...buyer, profesion: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={style.card2}>
            <ToolTipBackground text="Background" toottip={texts.background} />
            <textarea
              {...register('background')}
              className={style.descripcion}
              rows="10"
              placeholder="Describe a tu buyer persona"
              required
              value={buyer.background}
              onChange={(e) => setBuyer({ ...buyer, background: e.target.value })}
            ></textarea>
          </div>

          <div className={style.card3}>
            <span className={style.options}>
              <div className={`${style.item}`}>
                <p
                  className={`${activeSection === 'GOALS' ? style.activeItem : ''}`}
                  onClick={() => handleMenu('GOALS')}
                >
                  {texts.goals}
                </p>
              </div>
              <div className={`${style.item}`}>
                <p
                  className={`${activeSection === 'MOTIVATIONS' ? style.activeItem : ''}`}
                  onClick={() => handleMenu('MOTIVATIONS')}
                >
                  {texts.motivations}
                </p>
              </div>
              <div className={`${style.item}`}>
                <p
                  className={`${activeSection === 'FRUSTATIONS' ? style.activeItem : ''}`}
                  onClick={() => handleMenu('FRUSTATIONS')}
                >
                  {texts.frustrations}
                </p>
              </div>
            </span>

            <div className={`${style.section} ${activeSection === 'GOALS' ? style.active : ''}`}>
              <p className={style.info}>{texts.instruccion_de_goals}</p>
              <textarea
              {...register('goals')}
                className={style.metas}
                rows="10"
                placeholder="Describe tus objetivos"
                required
                value={buyer.goals}
                onChange={(e) => setBuyer({ ...buyer, goals: e.target.value })}
              ></textarea>
            </div>

            <div
              className={`${style.section} ${activeSection === 'MOTIVATIONS' ? style.active : ''}`}
            >
              <p className={style.info}>{texts.instruccion_de_motivations}</p>
              <textarea
              {...register('motivations')}
                className={style.metas}
                rows="10"
                placeholder="Describe tus motivaciones"
                required
                value={buyer.motivations}
                onChange={(e) => setBuyer({ ...buyer, motivations: e.target.value })}
              ></textarea>
            </div>

            <div
              className={`${style.section} ${activeSection === 'FRUSTATIONS' ? style.active : ''}`}
            >
              <p className={style.info}>{texts.intruccion_de_frustrations}</p>
              <textarea
              {...register('frustrations')}
                className={style.metas}
                rows="10"
                placeholder="Describe tus frustraciones"
                required
                value={buyer.frustrations}
                onChange={(e) => setBuyer({ ...buyer, frustrations: e.target.value })}
              ></textarea>
            </div>
          </div>

          <div className={style.btnContent}>
            <button type="submit" className={style.btnBuyer}>
              GUARDAR
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
