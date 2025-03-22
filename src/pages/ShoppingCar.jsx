import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

// store
import { storeBuyTank } from '@Store/global';

// Icons
import { FaTimes } from 'react-icons/fa';

// images
import tanke from '@Assets/images/tanquePack.png';

// styles
import styles from '@Sass/pages/shoppingcar.module.scss';

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
    <section className={styles.ShoppingCar}>
      <div className={styles.container}>
        <h2 className={styles.titlePage}>Carrito</h2>

        <div className={styles.table}>
          <div className={styles.titlesContent}>
            <div className={styles.titleProduct}></div>
            <div className={styles.titleProduct}>
              <h4>PAQUETE</h4>
            </div>
            <div className={styles.titleProduct}>
              <h4>PRECIO</h4>
            </div>
            <div className={styles.titleProduct}>
              <h4>CANTIDAD DE PRODUCTO</h4>
            </div>
            <div className={styles.titleProduct}>
              <h4>CANTIDAD DE TANQUES</h4>
            </div>
            <div className={styles.titleProduct}>
              <h4>TOTAL</h4>
            </div>
          </div>

          <div className={styles.displaysContent}>
            <div className={styles.displayProduct}>
              <span className={styles.displayClose} onClick={() => handleClose()}>
                <FaTimes />
              </span>

              <div className={styles.displayProductImage}>
                <img src={tanke} alt="tanque" />
              </div>
            </div>

            <div className={styles.name}>{tanquesData.name}</div>
            <div className={styles.precio}>${tanquesData.priceDefault}.00</div>
            <div className={styles.tanques}>
       {/*        <button className={styles.tanqueButtonRest} onClick={handleClickRest}>
                -
              </button> */}
              {totalPacks}
            {/*   <button className={styles.tanqueButtonMore} onClick={handleClickMore}>
                +
              </button> */}
            </div>

            <div className={styles.cantidad}>{totalAmount}</div>
            <div className={styles.subtotal}>${totalPrice}.00</div>
          </div>
        </div>

       

        <div className={styles.totalContent}>
          <div className={styles.totalInfo}>
            <h2>TOTAL DEL CARRITO</h2>
            <div className={styles.subtotal}>
              <p>
                <strong>Subtotal</strong>
              </p>
              <p>${tanquesData.price}.00</p>
            </div>
            <div className={styles.total}>
              <p>
                <strong>Total</strong>
              </p>
              <p>${tanquesData.price}.00</p>
            </div>
            <button className={styles.checkout} onClick={() => handleNextPage()}>
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCar;
