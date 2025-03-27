import { useEffect, useState } from 'react';
import { FaCamera, FaCheck, FaTimes } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

// Context
import useAuth from '@Auth/userAuth';

import { instanceWithRocket } from '@Config/axios';

import ButtonGoHome from '@Components/ButtonGoHome';

// Hook
import { useFetchUser, useFetchProjects } from '@Hooks/useFetchUser';

// services
import { serviceUploadImage } from '@Service/entries';

// Images
import _Visa from '@Assets/images/visa.png';

// Styles
// Styles
import style from '@Sass/pages/profile.module.scss';
import general from '@Sass/pages/general.module.scss';
import luna from '@Sass/pages/luna.module.scss';

// Icons
import { FaRegTimesCircle, FaInfoCircle } from 'react-icons/fa';

const Profile = () => {
  const { setLoading } = useAuth();
  const { user, refetch } = useFetchUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenF, setIsOpenF] = useState(false);
  const [modalsuccess, setModalSuccess] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userBilling, setUserBilling] = useState(null);
  const [styles, setStyle] = useState(style.verdatos);
  const [stylesF, setStyleF] = useState(style.verdatosF);
  const { packs } = useFetchProjects();
  const [check, setCheck] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Actualiza el estado con la imagen seleccionada
      uploadImage(file);
    }
  };

  const uploadImage = (selectedImage) => {
    if (selectedImage) {
      setLoading(true);
      serviceUploadImage(selectedImage)
        .then(() => {
          refetch();
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error al cargar la imagen:', error);
          setLoading(false);
        });
    } else {
      console.error('No se ha seleccionado ninguna imagen.');
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    setValue: setValue1,
    formState: { errors: errorsbilling },
  } = useForm();

  const headersUrlencoded = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  // Obtener los campos del formulario de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instanceWithRocket.get(`checkout/get_data`, headersUrlencoded);
        setUserData(response.data.userdata);
        setUserBilling(response.data.userbilling);
      } catch (error) {
        console.log('Exception Error: ', error);
        return error;
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userData) {
      setValue('name', userData.name);
      setValue('lastname', userData.lastname);
      setValue('email', userData.email);
      setValue('country', userData.country);
      setValue('street', userData.street);
      setValue('num_ext', userData.num_ext);
      setValue('num_int', userData.num_int);
      setValue('city', userData.city);
      setValue('zipcode', userData.zipcode);
      setValue('phone', userData.phone);
    }

    if (userBilling) {
      setValue1('company', userBilling.company);
      setValue1('businessname', userBilling.businessname);
      setValue1('email', userBilling.email);
      setValue1('rfc', userBilling.rfc);
      setValue1('address', userBilling.address);
      setValue1('numExt', userBilling.numExt);
      setValue1('numInt', userBilling.numInt);
      setValue1('location', userBilling.location);
      setValue1('postalCode', userBilling.postalCode);
      setValue1('phone', userBilling.phone);
    }
  }, [userData]);

  const togglePersonales = () => {
    setIsOpen((isOpen) => !isOpen);
    if (isOpen === true) setStyle(style.verdatos);
    else setStyle(style.ocultardatos);
  };

  const toggleFactura = () => {
    setIsOpenF((isOpenF) => !isOpenF);
    if (isOpenF === true) setStyleF(style.verdatosF);
    else setStyleF(style.ocultardatosF);
  };

  const headersJson = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const onSubmitPersonales = async (data) => {
    const send = JSON.stringify(data);

    try {
      const response = await instanceWithRocket.post(`checkout/personal_data`, send, headersJson);
      const { data } = response.data;
      setModalSuccess(true);
      return { data: data, completed: data.completed, code: 0 };
    } catch (error) {
      const { response } = error;
      return { messageError: response.data.error, status: response.status, code: -1 };
    }
  };

  const onSubmitFactura = async (data) => {
    const send = JSON.stringify(data);

    try {
      const response = await instanceWithRocket.post(`checkout/billing_data`, send, headersJson);
      const { data } = response.data;
      setModalSuccess(true);
      return { data: data, completed: data.completed, code: 0 };
    } catch (error) {
      const { response } = error;
      return { messageError: response.data.error, status: response.status, code: -1 };
    }
  };

  return (
    <section className="planets">
      <section className={`${general.planetWrap}`}>
        <ButtonGoHome
          className={general.planetBackToTheHomepage}
          onClick={() => {
            history.push('/');
          }}
          text="Volver al Inicio"
        />
        <div className={general.planetContainer}>
          <div className={general.planetContent}>
            <div className={style.profile}>
              <div className={luna.profileContent}>
                <h2>Mi Perfil</h2>
                {/* camera */}
                <fieldset>
                  <figure>
                    <img src={user.imagen} />
                    <div className={style.upload}>
                      <FaCamera className={style.icon} />
                      <input
                        type="file"
                        name="fileInput"
                        id="fileInput"
                        onChange={handleImageChange}
                        className={style.fileInput}
                      />
                    </div>
                  </figure>
                </fieldset>
                {/* confirm */}
                <fieldset>
                  {check ? (
                    <div className={style.nombre_edit}>
                      <input
                        type="text"
                        id="nombre"
                        value={user.nombre}
                        placeholder="Nombre de usuario"
                        className={general.inputMedium}
                      />
                      <label className={style.iconContent}>
                        <FaTimes
                          className={style.icon}
                          title="Cancelar"
                          onClick={() => setCheck(false)}
                        />
                        <FaCheck className={style.icon} title="Confirmar" />
                      </label>
                    </div>
                  ) : (
                    <label>
                      <p>{user?.nombre ? user?.nombre : null}</p>
                      {/*  <FaPen className={style.icon} onClick={() => setCheck(true)} /> */}
                    </label>
                  )}
                </fieldset>
                {/* email */}
                <fieldset>
                  <label>CORREO</label>
                  <p>{user ? user?.email : null}</p>
                </fieldset>
                <fieldset>
                  <label>CONTRASEÑA</label>
                  <p>*******</p>

                  {/*           <div className={style.InfoContent}>
            <label>CONTRASEÑA</label>
            <p>* * * * * * * * *</p>
            <span>
              <a href="/perfil">CAMBIAR CONTRASEÑA</a>
            </span>
          </div> */}

                  {/*      <div className={style.InfoContent}>
                        <label>MÉTODOS DE PAGO</label>
                        <span className={style.cardContent}>
                            <img src={_Visa} alt="visa" />
                            <p>**** **** **** 0007</p>
                        </span>
                        <span>
                            <a href="/perfil"> </a>
                        </span>
                    </div> */}

                  {/*   <div className={style.InfoContent}>
                        <label>MÉTODOS DE PAGO</label>
                        <p></p>
                        <span>
                            <a href="/perfil">AGREGAR FORMA DE PAGO</a>
                        </span>
                    </div> */}

                  {/*     <div className={style.InfoContent}>
                        <label>ASESORÍAS</label>
                        <p>LOREM IPSUM</p>
                        <span>
                            <a href="/perfil">SOLICITAR NUEVA</a>
                        </span>
                    </div>
 */}
                  {/* 
          <div className={style.InfoContent}>
            <label>TANQUES</label>
            <p>10 TANQUES</p>
            <span>
              <a href="/perfil">RECARGA</a>
            </span>
          </div> */}
                </fieldset>

                {/*  map packs section */}
                {packs
            ? packs.map((item) => {
                return (
                  <div className={style.InfoContent} key={item.id}>
                    <label>PROYECTO</label>
                    <p>{item.nombre}</p>
                    {/*  <span>
                      <p
                        onClick={() => history.push(`/launch?0e6f140801f2id=${item.id}`)}
                        className={style.linkView}
                      >
                        VER
                      </p>
                    </span> */}
                  </div>
                );
              })
            : null}                
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Profile;
