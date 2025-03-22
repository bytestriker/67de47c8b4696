import { useHistory } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

// store
import { storeBuyTank } from '@Store/global';

// Icons
import { FaRegTimesCircle } from 'react-icons/fa';

// Images
import _Astronaut from '@Assets/images/astronauta.png';
import _Tank from '@Assets/images/tanquePack.png';

// Styles
import styles from '@Sass/components/navPack.module.scss';

const NavPacks = ({
  navPackState,
  setNavPackState,
  totalPrice,
  setTotalPrice,
  totalAmount,
  setTotalAmount,
  totalPacks,
  setTotalPacks,
}) => {
  const { tanquesData, setTanques } = storeBuyTank(
    (state) => ({
      tanquesData: state.tanquesData,
      setTanques: state.setTanques,
    }),
    shallow
  );

  const history = useHistory();

/*   const handleClickMore = () => {
    const result = parseFloat(totalPrice) + parseFloat(tanquesData.price);
    const monto = parseFloat(totalAmount) + parseFloat(tanquesData.amount);
    setTotalPacks((prevTotalPacks) => prevTotalPacks + 1);
    setTotalAmount(monto);
    setTotalPrice(result);
  }; */

/*   const handleClickRest = () => {
    const result = parseFloat(totalPrice) - parseFloat(tanquesData.price);
    const monto = parseFloat(totalAmount) - parseFloat(tanquesData.amount);

    if (result < tanquesData.price) {
      setTotalPrice(tanquesData.price);
    } else {
      setTotalPrice(result);
    }

    if (monto < tanquesData.amount) {
      setTotalAmount(tanquesData.amount);
    } else {
      setTotalAmount(monto);
    }
    if (totalPacks > 1) {
      setTotalPacks((prevTotalPacks) => prevTotalPacks - 1);
    }
  }; */

  const handlePagar = () => {
    setTanques({
      packageType: tanquesData.packageType,
      price: totalPrice,
      amount: totalAmount,
      pack_id: tanquesData.pack_id,
      name: tanquesData.name,
      amountDefault: tanquesData.amountDefault,
      priceDefault: tanquesData.priceDefault,
      ammountPack: totalPacks,
    });
    setTimeout(() => {
      history.push('/carrito');
      setNavPackState(false);
    }, 800);
  };

  return (
    <nav className={navPackState ? styles.NavPack : styles.NavPackColapse} id="navPacks">
      <div className={styles.closeNav}>
        <FaRegTimesCircle className={styles.iconClose} onClick={() => setNavPackState(false)} />
      </div>

      <div>
        <div className={styles.NavPackContent}>
          <h3 className={styles.NavPackTitle}>Carrito</h3>

          <div className={styles.descriptionPack}>
            <div className={styles.tanqueImageContent}>
              <img src={_Tank} alt="tanque" />
            </div>

            <div className={styles.tanqueDescriptionContent}>
              <p>
                <strong>{`${tanquesData.name}`}</strong> MXN ${`${tanquesData.price}.00`}
              </p>
              <p>{`${totalAmount}`} tanques</p>
              <p>${`${totalPrice}.00`}</p>
           {/*    <p>{totalPacks} paquete</p> */}
           {/*    <span className={styles.tanqueButtons}>
                <button className={styles.tanqueButtonRest} onClick={handleClickRest}>
                  -
                </button>
                <button className={styles.tanqueButtonMore} onClick={handleClickMore}>
                  +
                </button>
              </span> */}
            </div>
          </div>
          <hr></hr>
          <div className={styles.tanqueTotal}>
            <p>Total</p>
            <p>${`${totalPrice}.00`}</p>
          </div>
          <div className={styles.Link}>
            <button className="buttonPlanet" onClick={() => handlePagar()}>
              VER CARRITO
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavPacks;
