import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

// store
import { storeBuyTank } from '@Store/global';

// Icons
import { FaTimes } from 'react-icons/fa';
import ButtonGoHome from '@Components/ButtonGoHome';


// images
import iconTank from '@Assets/images/icon-tank.svg';

// styles
import '@Sass/pages/planet.scss';

import '@Sass/pages/shoppingcart.scss';

const ShoppingCar = () => {
  const { tanquesData, setTanques } = storeBuyTank(
    (state) => ({
      tanquesData: state.tanquesData,
      setTanques: state.setTanques,
    }),
    shallow
  );

  const history = useHistory();
  const [valorInput, setValorInput] = useState('');
  const [totalPrice, setTotalPrice] = useState(tanquesData.price);
  const [totalAmount, setTotalAmount] = useState(tanquesData.amount);
  const [totalPacks, setTotalPacks] = useState(tanquesData.ammountPack);

  const handleChange = (event) => {
    setValorInput(event.target.value);
  };

  const handleNextPage = () => {
    setTanques({
      packageType: tanquesData.packageType,
      price: totalPrice,
      amount: totalAmount,
      pack_id: tanquesData.pack_id,
      name: tanquesData.name,
      amountDefault: tanquesData.amountDefault,
      priceDefault: tanquesData.priceDefault,
      code: valorInput,
      ammountPack: totalPacks,
    });
    history.push('/checkout');
  };

/*   const handleClickMore = () => {
    const result = parseFloat(totalPrice) + parseFloat(tanquesData.priceDefault);
    const monto = parseFloat(totalAmount) + parseFloat(tanquesData.amountDefault);
    setTotalPacks((prevTotalPacks) => prevTotalPacks + 1);
    setTotalAmount(monto);
    setTotalPrice(result);
  };

  const handleClickRest = () => {
    const result = parseFloat(totalPrice) - parseFloat(tanquesData.priceDefault);
    const monto = parseFloat(totalAmount) - parseFloat(tanquesData.amountDefault);
    if (totalPacks > 1) {
      setTotalPacks((prevTotalPacks) => prevTotalPacks - 1);
    }

    if (result < tanquesData.price) {
      setTotalPrice(tanquesData.priceDefault);
    } else {
      setTotalPrice(result);
    }

    if (monto < tanquesData.amount) {
      setTotalAmount(tanquesData.amountDefault);
    } else {
      setTotalAmount(monto);
    }
  }; */

  const handleClose = () => {
    const tanques = {
      packageType: '',
      price: '',
      amount: '',
      pack_id: '',
      name: '',
      priceDefault: '',
      code: '',
      ammountPack: 1,
    };
    setTanques(tanques);
    history.push('/paquetes');
  };

  useEffect(() => {
    if (!tanquesData.packageType) {
      history.push('/paquetes');
    }
  }, [tanquesData]);

  return (
    <section className="planetWrap">
      <ButtonGoHome
        className="planetBackToTheHomepage"
        onClick={() => {
          history.push('/');
        }}
        text="Volver al Inicio"
      />
      <div className="shoppingCart">
        <h2 className="text-center">Carrito</h2>
        <div className="cartWrap">

          <div className="table">
            <div className="tableRow">
              <h4>PRODUCTO</h4>
              <h4>PRECIO</h4>
              <h4>CANTIDAD</h4>
              <h4>TOTAL</h4>
            </div>
            <div className="tableRow">
              <div className="displayProduct">
                <FaTimes onClick={() => handleClose()}/>
                <img src={iconTank} alt="tanque" />
                <div>
                  <h3>{tanquesData.name}</h3>
                  <p>{totalPacks} tanques</p>
                </div>
              </div>
              <div className="precio">${tanquesData.priceDefault}.00</div>
              <div className="cantidad">{totalAmount}</div>
              <div className="subtotal">${totalPrice}.00</div>
            </div>
          </div>
          <div className="cartTotals">
            <div>
              <h2>TOTAL DEL CARRITO</h2>
              <dl>
                <dd>Subtotal</dd>
                <dt>${tanquesData.price}.00</dt>
                <dd>Total</dd>
                <dt>${tanquesData.price}.00</dt>
              </dl>
            </div>
            <button onClick={() => handleNextPage()}>CHECKOUT</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCar;
