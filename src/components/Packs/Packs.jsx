import { useState } from 'react';
import { shallow } from 'zustand/shallow';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

// store
import { storeBuyTank } from '@Store/global';

// Components
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { Title } from '@Components/Atomos/Titles';
import NavPack from '@Components/Packs/navPacks';
import TankPack from '@Components/Packs/tankPack';
import ButtonGoHome from '@Components/ButtonGoHome';
import Button from '@Components/Button';

import { instanceWithRocket } from '@Config/axios';
import { useHistory  } from 'react-router-dom';

// Data
import { Items } from '@Data/packsData';

// Images
import _Tank from '@Assets/images/tanquePack.png';

// Styles
import '@Components/Packs/Packs.scss';

const Packs = () => {
  const { setTanques } = storeBuyTank(
    (state) => ({
      setTanques: state.setTanques,
    }),
    shallow
  );

  const [navPackState, setNavPackState] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPacks, setTotalPacks] = useState(1);
  const [selectedPack, setSelectedPack] = useState("");

  const handlePack = (items) => {
    setTanques({
      packageType: items.packageType,
      price: items.price,
      amount: items.amount,
      pack_id: items.pack_id,
      name: items.name,
      amountDefault: items.amountDefault,
      priceDefault: items.priceDefault,
      code: 0,
      ammountPack: 1,
    });
    setNavPackState(true);
    setTotalPrice(items.price);
    setTotalAmount(items.amount);
    setTotalPacks(1);
    setSelectedPack(items.pack_id)
  };

  const [codigo, setCodigo] = useState('');
  const [codeMessage, setCodeMessage] = useState('');
  const history = useHistory();
  const handleCodigoChange = (event) => {
    setCodigo(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await instanceWithRocket.post(`/codigoPromocion`, {codigo});
      const { message, status } = response.data;
      if(status === 200){
       window.location.href= '/graciasCode';
      }else{
        setCodeMessage(message);
        setCodigo('');
      }
    } catch (error) {
      const { response } = error;
      return { messageError: response.data.error, status: response.status, code: -1 };
    }
  };

  return (
    <section className="planetWrap">
      <ScrollToTop />
      <NavPack
        navPackState={navPackState}
        setNavPackState={setNavPackState}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
        totalAmount={totalAmount}
        setTotalAmount={setTotalAmount}
        totalPacks={totalPacks}
        setTotalPacks={setTotalPacks}
      />
      <ButtonGoHome
        text="Volver al Inicio"
        className="planetBackToTheHomepage"
        onClick={() => history.push('/')}
        />
      <div className="packContent">
        <h2>NUESTROS PAQUETES</h2>
        <p>Completa tu plan de negocios de la mano de <b>ROCKET NOW</b>.<br></br> La mejor guía y red de apoyo para emprendedores como tú.</p>
        <Swiper
          modules={[Scrollbar]}
          scrollbar={{ draggable: true }}
          spaceBetween={30}
          slidesPerView="auto"
          freeMode={true}
          className="packs-swiper"
        >
          {Items.map((pack) => (
            <SwiperSlide key={pack.id} className="pack-slide">
              <TankPack data={pack} handleClick={() => handlePack(pack)} isSelected={selectedPack === pack.pack_id} />
            </SwiperSlide>
          ))}
        </Swiper>
        <form onSubmit={handleSubmit}>
          <p>Ingresa tu código de descuento <strong>aquí</strong>:</p>
          <fieldset>
            <input
              type="text"
              value={codigo}
              onChange={handleCodigoChange}
              placeholder="Código"
            /> 
            {codeMessage && (
              <div className="articlePack articlePack-error">
                <p>{codeMessage}</p>
              </div>
            )}
          </fieldset>
          <Button text="CANJEA TUS TANQUES" size="lg" type="submit" />
        </form>
      </div>
    </section>
  );
};

export default Packs;
