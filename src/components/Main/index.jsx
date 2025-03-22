import { Redirect, Route } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

// Context
import useAuth from '@Auth/userAuth';

// Store
import { globalStore, storeModalTank, Popup } from '@Store/global';

// RouterComponents
import PrivateRoute from '@Router/PrivateRouter';

// Components
import Home from '@Pages/Home';
import Tycos from '@Pages/Tycos';
import AboutUs from '@Pages/AboutUs';
import Privacy from '@Pages/Privacy';
import KnowMore from '@Pages/KnowMore';
import { Index } from '@Components/Advisory/Advisory';
import Packs from '@Components/Packs/Packs';
import Thanks from '@Components/ThankYouPage/Thanks';
import ThanksCode from '@Components/ThankYouPage/ThanksCode';
import SocialHub from '@Components/SocialHub/SocialHub';
import Welcome from '@Components/Welcome/Welcome';
import Header from '@Components/Header';
import Footer from '@Components/Footer';
import Loading from '@Components/UtilsComponents/Loading';
import { ModalInfoProject, ModalBlockPlanet, ModalPopup } from '@Components/Atomos/Alerts';

// Pages
import Profile from '@Pages/Profile';
import ShoppingCar from '@Pages/ShoppingCar';
import Mercurio from '@Pages/Mercurio';
import Luna from '@Pages/Luna';
import Login from '@Pages/Login';
import SingUp from '@Pages/SingUp';
import Venus from '@Pages/Venus';
import Marte from '@Pages/Marte';
import Jupiter from '@Pages/Jupiter';
import Saturno from '@Pages/Saturno';
import Urano from '@Pages/Urano';
import Checkout from '@Pages/Checkout';
import RePassword from '@Pages/Password';

import style from '@Sass/pages/general.module.scss';

const Main = () => {
  const { contextValue, getLoading } = useAuth();

  // Store global
  const { warningData, setAlert } = globalStore(
    (state) => ({
      warningData: state.warningData,
      setAlert: state.setAlert,
    }),
    shallow
  );

  const { storeTankModal } = storeModalTank(
    (state) => ({
      storeTankModal: state.storeTankModal,
    }),
    shallow
  );

  const { popupstate, setPopup } = Popup(
    (state) => ({
      popupstate: state.popupstate,
      setPopup: state.setPopup,
    }),
    shallow
  );

  return (
    <>
      {getLoading ? <Loading /> : null}
      {warningData.modalAlert ? (
        <ModalInfoProject setAlert={setAlert} warningData={warningData} />
      ) : null}
      {storeTankModal.modalTank ? <ModalBlockPlanet /> : null}
      
      {popupstate.modalP ? (
        <ModalPopup setPopup={setPopup} />
      ) : null}
      <main className={style.layout}>
        <div className={style.headerLayout}>
          <Header />
        </div>
        
          
                <Route exact path="/" component={Home} />
                <Route exact path="/login" render={() => (contextValue.isLogged() ? <Redirect to="/" /> : <Login />)} />
                <Route exact path="/terminos" component={Tycos} />
                <Route exact path="/acercade" component={AboutUs} />
                <Route exact path="/asesoria" component={Index} />
                <Route exact path="/paquetes" component={Packs} />
                <Route exact path="/singup" component={SingUp} />
                <Route exact path="/gracias" component={Thanks} />
                <Route exact path="/graciasCode" component={ThanksCode} />
                <Route exact path="/social-hub" component={SocialHub} />
                <Route exact path="/privacidad" component={Privacy} />
                <Route exact path="/saber-mas" component={KnowMore} />
                <Route exact path="/bienvenido" component={Welcome} />
                <Route exact path="/repassword" component={RePassword} />
                <Route exact path="/launch" component={Luna} />
                <PrivateRoute exact path="/perfil" component={Profile} />
                <PrivateRoute exact path="/mercurio" component={Mercurio} />
                <PrivateRoute exact path="/venus" component={Venus} />
                <PrivateRoute exact path="/marte" component={Marte} />
                <PrivateRoute exact path="/jupiter" component={Jupiter} />
                <PrivateRoute exact path="/saturno" component={Saturno} />
                <PrivateRoute exact path="/urano" component={Urano} />
                <PrivateRoute exact path="/carrito" component={ShoppingCar} />
                <PrivateRoute exact path="/checkout" component={Checkout} />

                {/* 
                <Route path="*">
                  <Redirect to="/" />
                </Route> 
                */}
      </main>
    </>
  );
};

export default Main;
