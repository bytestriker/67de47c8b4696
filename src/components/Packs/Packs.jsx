import { useState } from 'react';
import { shallow } from 'zustand/shallow';

// store
import { storeBuyTank } from '@Store/global';

// Components
// import { LinkRouter, GoBack } from '@Components/UtilsComponents/Button';
import { ScrollToTop } from '@Components/UtilsComponents/ScrollTop';
import { Title } from '@Components/Atomos/Titles';
import NavPack from '@Components/Packs/navPacks';

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
  };

  const [codigo, setCodigo] = useState('');
  const [codeMessage, setCodeMessage] = useState('');
  const history = useHistory();
  const handleCodigoChange = (event) => {
    setCodigo(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para manejar el código introducido
    try {
      const response = await instanceWithRocket.post(`/codigoPromocion`, {codigo});
      const { message, status } = response.data;
      if(status === 200){
     

       // history.push({ pathname: '/graciasCode', from: location });
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
    <section>
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
      <div className="Packs">
        <div className="container">
          <div className="packContent">
        {/*     <GoBack /> */}
            <Title title="NUESTROS PAQUETES" />

            <p className="packsParagraph">
              Completa tu plan de negocios de la mano de <b>ROCKET NOW</b>.<br></br> La mejor guía y
              red de apoyo para emprendedores como tú.
            </p>

            <div>
              <ul className="packsItemsContent">
                {Items.map((pack) => (
                  <li key={pack.id} className="packsItems" onClick={() => handlePack(pack)}>
                    <span>
                      <img src={_Tank} alt="tanque" />
                    </span>
                    <div className="articlePack">
                      <h4>{pack.name}</h4>
                      <p>{pack.description}</p>
                      <a to="/gracias" className="linkCompra">
                        {pack.nameButton}
                      </a>
                    </div>
                  </li>
                ))}
                <li className="packsItems packsItems-codigo">
                  <div className="articlePack">
                    <p>¡Ingresa tu Código de Descuento <strong>aquí</strong>!</p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      value={codigo}
                      onChange={handleCodigoChange}
                      placeholder="Código"
                    /> 
                    <div className="articlePack articlePack-error">
                      <p>{codeMessage}</p>
                    </div>
                    <button type="submit" className='buttonPlanet'>ENVIAR</button>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packs;
