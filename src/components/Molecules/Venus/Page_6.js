import { useEffect, useState } from 'react';

// Components
import { ParagraphPlanet } from '@Components/Atomos/Titles';

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
export const BuyerInfo = ({ setModal,setPage, setTitle, texts, setMessage, buyerall, setBuyer }) => {

  const { venusGetProjectById, venusGetBuyerPersona, venusCreateBuyerPersona } = useEventsVenus();

  const [buyerallnew, setBuyerallnew] = useState(buyerall);
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

      const buyerresult = await venusGetBuyerPersona();
      setBuyerallnew(buyerresult.data);
      if(buyerresult.data[0].completed === false){
        setButtonNext(true);
      }else{
        setButtonNext(false);
      }
      
         
  };
 
  const handleClickBuyer = (index, option) => {

    if(index !== -1){
      setBuyer({
        id: buyerallnew[index]?.id|| '',
        nombre: buyerallnew[index]?.nombre || '',
        frase: buyerallnew[index]?.frase || '',
        edad: buyerallnew[index]?.edad || '',
        ubicacion: buyerallnew[index]?.ubicacion || '',
        profesion: buyerallnew[index]?.profesion || '',
        background: buyerallnew[index]?.background || '',
        goals: buyerallnew[index]?.goals || '',
        motivations: buyerallnew[index]?.motivations || '',
        frustrations: buyerallnew[index]?.frustrations || '',
      });

      const nameselectbuyer = buyerallnew[index]?.nombre || '';
      setButtonNext(true);
      setIsOpenBuyer(false);
      setnamebuyer(nameselectbuyer);

    }else{

      setButtonNext(false);

    }

  };

  return (
    <div className={style.buyerInfo}>
      <section className={style.venusQuestions}>
        <ParagraphPlanet text={texts.descripcion} />
        <SaberMas data={texts} />
        <br></br>
        {(buyerallnew[0].completed !== false)&&
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
              {isOpenBuyer && (
                <div className={style.selectOptions}>
                  {buyerallnew.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={style.option}
                      onClick={() => handleClickBuyer(optionIndex,option)}
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
        }
        <button 
        type="button" 
        className={buttonNext ? style.btnBuyer : style.btnBuyerOff}
        disabled={buttonNext ? '' : 'disabled'}
        onClick={() => setPage(9)}
        >
          CONTINUAR
        </button>
      </section>
      <div className={style.astronaut}>
        <img src={astronout} alt="astronaut" />
      </div>
    </div>
  );
};
