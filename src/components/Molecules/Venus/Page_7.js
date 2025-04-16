import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { shallow } from 'zustand/shallow';

import { FaUser, FaSuitcase, FaMapMarkerAlt } from 'react-icons/fa';

// Store
import { venusStore } from '@Store/venus';
import { lunaStore } from '@Store/luna';

// Hooks
import { useEventsVenus } from '@Hooks/useEventVenus';

import Button from '@Components/Button';
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
export const Buyer = ({ setModal, setTitle, texts, setMessage, buyer, setBuyer }) => {
  const { venusGetProjectById, venusGetBuyerPersona, venusCreateBuyerPersona } = useEventsVenus();
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
    handleGetBuyer();
    setActiveSection('GOALS');
  }, []);

  const sections = [
    { key: 'GOALS', label: texts.goals },
    { key: 'MOTIVATIONS', label: texts.motivations },
    { key: 'FRUSTATIONS', label: texts.frustrations },
  ];
  const handleGetBuyer = async () => {
    console.log(buyer);
  };

  const handleValidateProject = async () => {
    const venus = await venusGetProjectById();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await venusCreateBuyerPersona(buyer);
    if (res.code === 0) {
      setMessage(`Tus datos se han guardado correctamente.`);
      handleValidateProject();
      setModal(true);
    }
  };

  const handleMenu = (item) => {
    setActiveSection(item);
  };

  return (
    <form className="questionWrap" onSubmit={handleSubmit}>
      <ScrollToTop />
      <fieldset className="avatarNameAndPhrase">
        <div className="inputAvatarUpload">
          <figure>
            {profile && <img src={profile} />}
            <input type="file" name="fileInput" id="fileInput" onChange={() => {}} />
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
            className={`h3 ${activeSection === key && 'activeTabMenuItem'}`}
            onClick={() => handleMenu(key)}
          >
            {label}
          </a>
        ))}
      </nav>
      <fieldset className={`${activeSection === 'GOALS' ? 'd-block' : 'd-none'}`}>
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
      <fieldset className={`${activeSection === 'MOTIVATIONS' ? 'd-block' : 'd-none'}`}>
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
      <fieldset className={`${activeSection === 'FRUSTATIONS' ? 'd-block' : 'd-none'}`}>
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
