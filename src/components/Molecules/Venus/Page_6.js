import { useEffect, useState } from 'react';

// Components
import { ParagraphPlanet } from '@Components/Atomos/Titles';
import Button from '@Components/Button';

// Images
import astronout from '@Assets/images/astro_buyer.png';

import { shallow } from 'zustand/shallow';

// Hooks
import { useEventsVenus } from '@Hooks/useEventVenus';
import { venusStore } from '@Store/venus';

// Styles
import style from '@Sass/pages/venus.module.scss';

import { FaPlusCircle, FaCaretDown, FaCaretUp } from 'react-icons/fa';

import { SaberMas } from '@Components/Atomos/Buttons';

/** VENUS BUYER INFO
 * page 8
 */
export const BuyerInfo = ({
  setModal,
  setPage,
  setTitle,
  texts,
  setMessage,
  buyerall,
  setBuyer,
}) => {
  const { venusGetProjectById, venusGetBuyerPersona, venusCreateBuyerPersona } = useEventsVenus();

  const [buyerallnew, setBuyerallnew] = useState(buyerall || []);
  const [buttonNext, setButtonNext] = useState(false);
  const [isOpenBuyer, setIsOpenBuyer] = useState(false);
  const [namebuyer, setnamebuyer] = useState('');

  const { getVenus, setStateBuyer } = venusStore(
    (state) => ({
      getVenus: state.getVenus,
      setStateBuyer: state.setStateBuyer,
    }),
    shallow
  );

  useEffect(() => {
    setTitle('BUYER PERSONA');
  }, []);

  useEffect(() => {
    handleProjectById();
  }, []);

  const handleProjectById = async () => {
    try {
      const buyerresult = await venusGetBuyerPersona();
      if (buyerresult?.data) {
        setBuyerallnew(buyerresult.data);
        if (buyerresult.data.length > 0 && buyerresult.data[0]?.completed === false) {
          setButtonNext(true);
        } else {
          setButtonNext(false);
        }
      }
    } catch (error) {
      console.error('Error fetching buyer persona:', error);
      setBuyerallnew([]);
      setButtonNext(false);
    }
  };

  const handleClickBuyer = (index, option) => {
    if (index !== -1 && buyerallnew.length > index) {
      const selectedBuyer = buyerallnew[index] || {};
      setBuyer({
        id: selectedBuyer.id || '',
        nombre: selectedBuyer.nombre || '',
        frase: selectedBuyer.frase || '',
        edad: selectedBuyer.edad || '',
        ubicacion: selectedBuyer.ubicacion || '',
        profesion: selectedBuyer.profesion || '',
        background: selectedBuyer.background || '',
        goals: selectedBuyer.goals || '',
        motivations: selectedBuyer.motivations || '',
        frustrations: selectedBuyer.frustrations || '',
      });

      const nameselectbuyer = selectedBuyer.nombre || '';
      setButtonNext(true);
      setIsOpenBuyer(false);
      setnamebuyer(nameselectbuyer);
    } else {
      setButtonNext(false);
    }
  };

  const hasCompletedBuyers = buyerallnew.length > 0 && buyerallnew[0]?.completed;

  return (
    <div className="questionWrap">
      Page_6.js | BuyerInfo
      <h2 dangerouslySetInnerHTML={{__html:texts.pregunta||'Buyer Persona'}}></h2>
      <p dangerouslySetInnerHTML={{__html:texts.descripcion}}></p>
      <SaberMas data={texts} />
      {/* 
      {hasCompletedBuyers ? (
        <div>
          <span>
            <label className={style.identify}>Ver mis Buyer Persona</label>
          </span>
          <div key="buyerselect" className={style.selectContainer}>
            <div className={style.selectHeader} onClick={() => setIsOpenBuyer(!isOpenBuyer)}>
              <span className={style.selectSpanText}>
                {namebuyer || 'Selecciona una buyer persona'}
              </span>
              <span className={style.selectSpanArrow}>
                {isOpenBuyer ? <FaCaretUp /> : <FaCaretDown />}
              </span>
            </div>
            {isOpenBuyer && buyerallnew.length > 0 && (
              <div className={style.selectOptions}>
                {buyerallnew.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={style.option}
                    onClick={() => handleClickBuyer(optionIndex, option)}
                  >
                    {option.nombre}
                  </div>
                ))}
              </div>
            )}
          </div>
          <span className={style.addbuyer} onClick={() => setPage(10)}>
            <FaPlusCircle className={style.icon} /> <b>Agregar más Buyer Persona</b>
          </span>
        </div>
      ) : (
        <div>
          <p>No hay Buyer Personas disponibles. Crea una nueva.</p>
          <span className={style.addbuyer} onClick={() => setPage(10)}>
            <FaPlusCircle className={style.icon} /> <b>Crear Buyer Persona</b>
          </span>
        </div>
      )} */}

      { 1 === 2 && hasCompletedBuyers && (
        <div>
          <span>
            <label className={style.identify}>Ver mis Buyer Persona</label>
          </span>
          <div key="buyerselect" className={style.selectContainer}>
            <div className={style.selectHeader} onClick={() => setIsOpenBuyer(!isOpenBuyer)}>
              <span className={style.selectSpanText}>
                {namebuyer || 'Selecciona una buyer persona'}
              </span>
              <span className={style.selectSpanArrow}>
                {isOpenBuyer ? <FaCaretUp /> : <FaCaretDown />}
              </span>
            </div>
            {isOpenBuyer && buyerallnew.length > 0 && (
              <div className={style.selectOptions}>
                {buyerallnew.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={style.option}
                    onClick={() => handleClickBuyer(optionIndex, option)}
                  >
                    {option.nombre}
                  </div>
                ))}
              </div>
            )}
          </div>
          <span className={style.addbuyer} onClick={() => setPage(10)}>
            <FaPlusCircle className={style.icon} /> <b>Agregar más Buyer Persona</b>
          </span>
        </div>
      ) }
      <div className='buttons'>

      <Button
        text="SIGUIENTE"
        onClick={() => setPage(9)}
      />
      </div>
    </div>
  );
};