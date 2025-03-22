import { useEffect, useState } from 'react';
import { FaCamera, FaCheck, FaTimes } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

// Context
import useAuth from '@Auth/userAuth';

import { instanceWithRocket } from '@Config/axios';

// Components
import { Title } from '@Components/Atomos/Titles';

// Hook
import { useFetchUser, useFetchProjects } from '@Hooks/useFetchUser';

// services
import { serviceUploadImage } from '@Service/entries';

// Images
import _Visa from '@Assets/images/visa.png';

// Styles
import style from '@Sass/pages/profile.module.scss';
import general from '@Sass/pages/general.module.scss';

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
      const response =  await instanceWithRocket.get(`checkout/get_data`, headersUrlencoded);
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

const onSubmitPersonales = async data => {

  const send = JSON.stringify(data);

  try {
    const response = await instanceWithRocket.post(
      `checkout/personal_data`,
      send,
      headersJson
    );
    const { data } = response.data;
    setModalSuccess(true);
    return { data: data, completed: data.completed, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
  
};

const onSubmitFactura = async data => {

  const send = JSON.stringify(data);

  try {
    const response = await instanceWithRocket.post(
      `checkout/billing_data`,
      send,
      headersJson
    );
    const { data } = response.data;
    setModalSuccess(true);
    return { data: data, completed: data.completed, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
 
};

  return (
    <section className={style.Profile}>
      <div className="container">
        <div className={style.ProfileContent}>
          <Title title="MI PERFIL" />
          <p className={style.info}>
            Consulta tus datos y no te pierdas el seguimiento de tus proyectos
          </p>
          {/* 
                    <div className={style.accountName}>
                        <h3>CUENTA</h3>
                        <h4>MIEMBRO DESDE MAYO 2022</h4>
                    </div>
 */}
          <div className={style.Avatar}>
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
            <div>
              {check ? (
                <div className={style.nombre_edit}>
                  <input
                    type="text"
                    id="nombre"
                    value={user.nombre}
                    placeholder="Nombre de usuario"
                    className={general.inputMedium}
                  />
                  <span className={style.iconContent}>
                    <FaTimes
                      className={style.icon}
                      title="Cancelar"
                      onClick={() => setCheck(false)}
                    />
                    <FaCheck className={style.icon} title="Confirmar" />
                  </span>
                </div>
              ) : (
                <div className={style.nombre}>
                  <p>{user?.nombre ? user?.nombre : null}</p>
                  {/*  <FaPen className={style.icon} onClick={() => setCheck(true)} /> */}
                </div>
              )}
            </div>
          </div>

          <div className={style.InfoContent}>
            <label>CORREO</label>
            <p>{user ? user?.email : null}</p>
          </div>
          <div className={style.InfoContent}>
            <label>CONTRASEÑA</label>
            <p>*******</p>
          </div>

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
      
      
        
            
              <div className={style.InfoContent}>
              <label>DATOS PERSONALES</label>
              <p onClick={() => togglePersonales()} ><span>Ver más</span></p>
            </div>
            <div className={style.formContent}>
            <div className={style.form1}>
                {isOpen && (
                <form className={style.form} onSubmit={handleSubmit(onSubmitPersonales)}>
                  <div className={style.formControl}>
                    <span className={style.formInputs}>
                    <label htmlFor="name" className={style.formLabel}>
                      Nombre<small>*</small>
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre"
                      id="name"
                      className={style.inputText}
                      {...register('name', { required: true })}
                    />
                    {errors.name && (
                      <span className={style.spanError}>
                        <FaInfoCircle /> <span>Ingrese su nombre</span>
                      </span>
                    )}
                    </span>

                    <span className={style.formInputs}>
                    <label htmlFor="lastname" className={style.formLabel}>
                      Apellidos<small>*</small>
                    </label>
                    <input
                      type="text"
                      placeholder="Apellidos"
                      id="lastname"
                      className={style.inputText}
                      {...register('lastname', { required: true })}
                    />
                    {errors.lastname && (
                      <span className={style.spanError}>
                        <FaInfoCircle /> <span>Ingrese sus apellidos</span>
                      </span>
                    )}
                    </span>

                    <span className={style.formInputs}>
                    <label htmlFor="country" className={style.formLabel}>
                      País/Región <small>*</small>
                    </label>
                      <input
                      type="text"
                      placeholder="País"
                      id="country"
                      name="country"
                      className={style.inputText}
                      {...register('country', { required: true })}
                    />
                    {errors.country && (
                      <span className={style.spanError}>
                        <FaInfoCircle /> <span>Ingrese su país</span>
                      </span>
                    )}
                    </span>
                  </div>

                  <div className={style.formControlPlus}>
                    <span className={style.formInputs}>
                    <label htmlFor="street" className={style.formLabel}>
                      Calle<small>*</small>
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre de la calle"
                      id="street"
                      name="street"
                      className={style.inputText}
                      {...register('street', { required: true })}
                    />
                    {errors.street && (
                      <span className={style.spanError}>
                        <FaInfoCircle /> <span>Ingrese su calle</span>
                      </span>
                    )}
                    </span>
                  </div>

                  <div className={style.formControl}>
                      <span className={style.formInputs}>
                      <label htmlFor="num_ext" className={style.formLabel}>
                        Número exterior<small>*</small>
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        id="num_ext"
                        className={style.inputText}
                        {...register('num_ext', { required: true })}
                      />
                      {errors.num_ext && (
                        <span className={style.spanError}>
                          <FaInfoCircle /> <span>Ingrese su número exterior</span>
                        </span>
                      )}
                      </span>

                      <span className={style.formInputs}>
                        <label htmlFor="num_int" className={style.formLabel}>
                          Número interior<small></small>
                        </label>
                        <input
                          type="text"
                          placeholder=""
                          id="num_int"
                          className={style.inputText}
                          {...register('num_int', { required: false })}
                        />
                      </span>
                    </div>

                    <div className={style.formControl}>
                      <span className={style.formInputs}>
                      <label htmlFor="city" className={style.formLabel}>
                      Localidad / Ciudad<small>*</small>
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        id="city"
                        className={style.inputText}
                        {...register('city', { required: true })}
                      />
                      {errors.city && (
                        <span className={style.spanError}>
                          <FaInfoCircle /> <span>Ingrese su localidad</span>
                        </span>
                      )}
                    </span>

                    <span className={style.formInputs}>
                      <label htmlFor="zipcode" className={style.formLabel}>
                        Código postal<small>*</small>
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        id="zipcode"
                        minLength="0"
                        maxLength="5"
                        className={style.inputText}
                        {...register('zipcode', {
                          required: 'Ingrese su código postal',
                          pattern: {
                            value: /^[0-9]{5}$/,
                            message: 'El código postal debe tener 5 dígitos numéricos',
                          },
                        })}
                      />
                      {errors.zipcode && (
                        <span className={style.spanError}>
                          <FaInfoCircle /> <span>{errors.zipcode.message}</span>
                        </span>
                      )}
                    </span>
                  </div>

                <div className={style.formControl}>
                  <span className={style.formInputs}>
                    <label htmlFor="phone" className={style.formLabel}>
                      Teléfono<small>*</small>
                    </label>
                    <input
                      type="number"
                      placeholder=""
                      id="phone"
                      minLength="0"
                      maxLength="10"
                      className={style.inputText}
                      {...register('phone', {
                        required: 'Ingrese su número de teléfono',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'El número de teléfono debe tener 10 dígitos y solo números',
                        },
                      })}
                    />
                    {errors.phone && (
                      <span className={style.spanError}>
                        <FaInfoCircle /> <span>{errors.phone.message}</span>
                      </span>
                    )}
                  </span>

                  <span className={style.formInputs}>
                    <label htmlFor="email" className={style.formLabel}>
                      Correo electrónico<small>*</small>
                    </label>
                    <input
                      type="email"
                      placeholder=""
                      id="email"
                      className={style.inputText}
                      {...register('email', {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
                      })}
                    />
                    {errors.email && (
                      <span className={style.spanError}>
                        <FaInfoCircle /> <span>Ingrese su email</span>
                      </span>
                    )}
                  </span>
                </div>
                <button className={style.compra} type="submit">
                  GUARDAR
                </button>
              </form>
              )} 
              </div>
              </div>
              <div className={style.InfoContent}>
                  <label>DATOS DE FACTURACIÓN</label>
                  <p onClick={() => toggleFactura()} ><span>Ver más</span></p>
              </div>
              <div className={style.formContent}>
            <div className={style.form1}>
                {isOpenF && (
                <form className={style.form} onSubmit={handleSubmit1(onSubmitFactura)}>
                  <div className={style.formControlPlus}>
                    <span className={style.formInputs}>
                    <label htmlFor="company" className={style.formLabel}>
                      Nombre de Empresa o Persona Física<small>*</small>
                    </label>
                    <input
                      type="text"
                      placeholder="Empresa"
                      id="company"
                      className={style.inputText}
                      {...register1('company', { required: true })}
                    />
                    {errorsbilling.company && (
                      <span className={style.spanError}>
                        <FaInfoCircle /> <span>Ingrese su nombre o la empresa</span>
                      </span>
                    )}
                    </span>                    
                  </div>
                  <div className={style.formControl}>
                  <span className={style.formInputs}>
                    <label htmlFor="businessname" className={style.formLabel}>
                      Razón Social<small>*</small>
                    </label>
                    <input
                      type="text"
                      placeholder="Razón Social"
                      id="businessname"
                      className={style.inputText}
                      {...register1('businessname', { required: true })}
                    />
                    {errorsbilling.businessname && (
                      <span className={style.spanError}>
                        <FaInfoCircle /> <span>Ingrese su Razón Social</span>
                      </span>
                    )}
                    </span>

                    <span className={style.formInputs}>
                    <label htmlFor="rfc" className={style.formLabel}>
                      RFC<small>*</small>
                    </label>
                    <input
                      type="text"
                      placeholder="RFC"
                      id="rfc"
                      className={style.inputText}
                      {...register1('rfc', { required: true })}
                    />
                    {errorsbilling.rfc && (
                      <span className={style.spanError}>
                        <FaInfoCircle /> <span>Ingrese su RFC</span>
                      </span>
                    )}
                    </span>

                    
                  </div>

                  <div className={style.formControlPlus}>
                    <span className={style.formInputs}>
                    <label htmlFor="address" className={style.formLabel}>
                      Dirección Fiscal<small>*</small>
                    </label>
                    <input
                      type="text"
                      placeholder="Dirección Fiscal"
                      id="address"
                      name="address"
                      className={style.inputText}
                      {...register1('address', { required: true })}
                    />
                    {errorsbilling.address && (
                      <span className={style.spanError}>
                        <FaInfoCircle /> <span>Ingrese su dirección fiscal</span>
                      </span>
                    )}
                    </span>
                  </div>

                  <div className={style.formControl}>
                      <span className={style.formInputs}>
                      <label htmlFor="numExt" className={style.formLabel}>
                        Número exterior<small>*</small>
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        id="numExt"
                        className={style.inputText}
                        {...register1('numExt', { required: true })}
                      />
                      {errorsbilling.numExt && (
                        <span className={style.spanError}>
                          <FaInfoCircle /> <span>Ingrese su número exterior</span>
                        </span>
                      )}
                      </span>

                      <span className={style.formInputs}>
                        <label htmlFor="numInt" className={style.formLabel}>
                          Número interior<small></small>
                        </label>
                        <input
                          type="text"
                          placeholder=""
                          id="numInt"
                          className={style.inputText}
                          {...register1('numInt', { required: false })}
                        />
                      </span>
                    </div>

                    <div className={style.formControl}>
                      <span className={style.formInputs}>
                      <label htmlFor="location" className={style.formLabel}>
                      Localidad / Ciudad<small>*</small>
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        id="location"
                        className={style.inputText}
                        {...register1('location', { required: true })}
                      />
                      {errorsbilling.location && (
                        <span className={style.spanError}>
                          <FaInfoCircle /> <span>Ingrese su localidad</span>
                        </span>
                      )}
                    </span>

                    <span className={style.formInputs}>
                      <label htmlFor="postalCode" className={style.formLabel}>
                        Código postal<small>*</small>
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        id="postalCode"
                        minLength="0"
                        maxLength="5"
                        className={style.inputText}
                        {...register1('postalCode', {
                          required: 'Ingrese su código postal',
                          pattern: {
                            value: /^[0-9]{5}$/,
                            message: 'El código postal debe tener 5 dígitos numéricos',
                          },
                        })}
                      />
                      {errorsbilling.postalCode && (
                        <span className={style.spanError}>
                          <FaInfoCircle /> <span>{errorsbilling.postalCode.message}</span>
                        </span>
                      )}
                    </span>
                  </div>

                <div className={style.formControl}>
                  <span className={style.formInputs}>
                    <label htmlFor="phone" className={style.formLabel}>
                      Teléfono<small>*</small>
                    </label>
                    <input
                      type="number"
                      placeholder=""
                      id="phone"
                      minLength="0"
                      maxLength="10"
                      className={style.inputText}
                      {...register1('phone', {
                        required: 'Ingrese su número de teléfono',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'El número de teléfono debe tener 10 dígitos y solo números',
                        },
                      })}
                    />
                    {errorsbilling.phone && (
                      <span className={style.spanError}>
                        <FaInfoCircle /> <span>{errors.phone.message}</span>
                      </span>
                    )}
                  </span>

                  <span className={style.formInputs}>
                    <label htmlFor="email" className={style.formLabel}>
                      Correo electrónico<small>*</small>
                    </label>
                    <input
                      type="email"
                      placeholder=""
                      id="email"
                      className={style.inputText}
                      {...register1('email', {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
                      })}
                    />
                    {errorsbilling.email && (
                      <span className={style.spanError}>
                        <FaInfoCircle /> <span>Ingrese su email</span>
                      </span>
                    )}
                  </span>
                </div>
                <button className={style.compra} type="submit">
                  GUARDAR
                </button>
              </form>
              )} 
            </div>
          </div>
        
        <div>
        {modalsuccess ? (
          <div className={style.modal}>
            <div className={style.ModalContent}>
              <div className={style.closeNav}>
                <FaRegTimesCircle className={style.iconClose} onClick={() => setModalSuccess(false)} />
              </div>
              <div id="conektaIframeContainer" className={style.success}>Datos Guardados</div>
            </div>
          </div>
        ) : null}
      </div>
      

      <div>
       
      </div>
      <div>
        
      </div>
  
        </div>
      </div>
    </section>
  );
};

export default Profile;
