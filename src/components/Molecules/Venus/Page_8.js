import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { shallow } from 'zustand/shallow';

import { FaUser, FaSuitcase, FaMapMarkerAlt } from 'react-icons/fa';
import Button from '@Components/Button';

// Store
import { venusStore } from '@Store/venus';
import { lunaStore } from '@Store/luna';

// Hooks
import { useEventsVenus } from '@Hooks/useEventVenus';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';

import { ToolTip } from '@Components/Atomos/Tooltips';

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

  const sections = [
    { key: 'GOALS', label: texts.goals },
    { key: 'MOTIVATIONS', label: texts.motivations },
    { key: 'FRUSTATIONS', label: texts.frustrations },
  ];

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
    console.log(item);
  };

  return (
    <form className="questionWrap" onSubmit={handleSubmit}>
      <ScrollToTop />
      <fieldset className="avatarNameAndPhrase">
        <div className="inputAvatarUpload">
          <figure>
            {profile && <img src={profile} />}
            <input
              type="file"
              name="fileInput"
              id="fileInput"
              onChange={() => {}}
            />
          </figure>
        </div>
        <div>
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
        </div>
      </fieldset>
      <div className="buyerAgeLocationAndProfession">
        <fieldset>
          <input
            {...register('edad')}
            type="number"
            placeholder="Edad"
            required
            className={style.inputCard1}
            value={buyer.edad}
            onChange={(e) => setBuyer({ ...buyer, edad: e.target.value })}
          />
          <FaUser className={style.icon} />
        </fieldset>
        <fieldset>
          <input
            {...register('ubicacion')}
            type="text"
            placeholder="Ubicación"
            required
            className={style.inputCard1}
            value={buyer.ubicacion}
            onChange={(e) => setBuyer({ ...buyer, ubicacion: e.target.value })}
          />
          <FaMapMarkerAlt className={style.icon} />
        </fieldset>
        <fieldset>
          <input
            {...register('profesion')}
            type="text"
            placeholder="Profesión"
            required
            className={style.inputCard1}
            value={buyer.profesion}
            onChange={(e) => setBuyer({ ...buyer, profesion: e.target.value })}
          />
          <FaSuitcase className={style.icon} />
        </fieldset>
      </div>
      <fieldset>
        <ToolTip text="Background" tool={texts.background} />
        <textarea
          {...register('background')}
          className={style.descripcion}
          rows="6"
          placeholder="Describe a tu buyer persona"
          required
          value={buyer.background}
          onChange={(e) => setBuyer({ ...buyer, background: e.target.value })}
        ></textarea>
      </fieldset>
      <nav className="tabMenu">
        {sections.map(({ key, label }) => (
          <a
            key={key}
            className={`tabMenuItem ${activeSection === key && 'MenuItem'}`}
            onClick={() => handleMenu(key)}
          >
            {label}
          </a>
        ))}
      </nav>
      <fieldset className={`${activeSection === 'GOALS' ? "d-block" : "d-none"}`}>
        <label>{texts.instruccion_de_goals}</label>
        <textarea
        {...register('goals')}
          className={style.metas}
          rows="6"
          placeholder="Describe tus objetivos"
          required
          value={buyer.goals}
          onChange={(e) => setBuyer({ ...buyer, goals: e.target.value })}
        ></textarea>
      </fieldset>
      <fieldset className={`${activeSection === 'MOTIVATIONS' ? "d-block" : "d-none"}`}>
        <label>{texts.instruccion_de_motivations}</label>
        <textarea
        {...register('motivations')}
          className={style.metas}
          rows="6"
          placeholder="Describe tus motivaciones"
          required
          value={buyer.motivations}
          onChange={(e) => setBuyer({ ...buyer, motivations: e.target.value })}
        ></textarea>
      </fieldset>
      <fieldset className={`${activeSection === 'FRUSTATIONS' ? "d-block" : "d-none"}`}>
        <label>{texts.intruccion_de_frustrations}</label>
        <textarea
        {...register('frustrations')}
          className={style.metas}
          rows="10"
          placeholder="Describe tus frustraciones"
          required
          value={buyer.frustrations}
          onChange={(e) => setBuyer({ ...buyer, frustrations: e.target.value })}
        ></textarea>
      </fieldset>
      <Button text="GUARDAR" type="submit" isCentered />
    </form>
  );
};
