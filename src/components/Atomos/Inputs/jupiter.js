import { useState, useEffect } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { shallow } from 'zustand/shallow';

// Store
import { jupiterStore } from '@Store/jupiter';

// Styles
import style from '@Sass/pages/general.module.scss';

export const ValueCaracteristicas = ({
  getValueCaracteristica,
  setValueCaracteristica,
  textDisabled,
  }) => {
  const { dataJupiter } = jupiterStore(
    (state) => ({
      dataJupiter: state.dataJupiter,
    }),
    shallow
  );
  const handleClick = () => {
    setValueCaracteristica([...getValueCaracteristica, '']);
  };

  const handleInputChange = (event, index) => {
    const newElements = [...getValueCaracteristica];
    newElements[index] = event.target.value;
    setValueCaracteristica(newElements);
  };

  useEffect(() => {
    if (dataJupiter?.caracteristicas.length > 0) {
      setValueCaracteristica(dataJupiter.caracteristicas);
    }
  }, [dataJupiter]);

  return (
    <fieldset>
      {getValueCaracteristica.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`caracteristicas-${indice}`}
          placeholder="Escribe una característica"
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}
      <div className="fieldsets">
        <p>{textDisabled ? '' : '*Escribe un mínimo de 3 opciones.'}</p>
        {getValueCaracteristica.length === 6 ? null : (
          <a className={style.add} onClick={() => handleClick()}>
            <span>Agregar más</span>
          </a>
        )}
      </div>
    </fieldset>
  );
};

export const ValueCalificativos = ({ getValueAdjetivos, setValueAdjetivos, textDisabled }) => {
  const { dataJupiter } = jupiterStore(
    (state) => ({
      dataJupiter: state.dataJupiter,
    }),
    shallow
  );
  const handleClick = () => {
    setValueAdjetivos([...getValueAdjetivos, '']);
  };

  const handleInputChange = (event, index) => {
    const newElements = [...getValueAdjetivos];
    newElements[index] = event.target.value;
    setValueAdjetivos(newElements);
  };

  useEffect(() => {
    if (dataJupiter?.adjetivos_calificativos.length > 0) {
      setValueAdjetivos(dataJupiter.adjetivos_calificativos);
    }
  }, [dataJupiter]);

  return (
    <fieldset>
      {getValueAdjetivos.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`calificativos-${indice}`}
          placeholder="Escribe un adjetivo"
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}
      <div className="fieldsets">
        <p>{textDisabled ? '' : '*Escribe un mínimo de 3 opciones.'}</p>
        {getValueAdjetivos.length === 6 ? null : (
          <a className={style.add} onClick={() => handleClick()}>
            <span>Agregar más</span>
          </a>
        )}
      </div>
    </fieldset>
  );
};

export const ValueNombre = ({ getValueObjetivos, setValueObjetivos, textDisabled }) => {
  const { dataJupiter } = jupiterStore(
    (state) => ({
      dataJupiter: state.dataJupiter,
    }),
    shallow
  );
  const handleClick = () => {
    setValueObjetivos([...getValueObjetivos, '']);
  };

  const handleInputChange = (event, index) => {
    const newElements = [...getValueObjetivos];
    newElements[index] = event.target.value;
    setValueObjetivos(newElements);
  };

  useEffect(() => {
    if (dataJupiter?.objetivos.length > 0) {
      setValueObjetivos(dataJupiter.objetivos);
    }
  }, [dataJupiter]);

  return (
    <fieldset>
      {getValueObjetivos.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`nombre-${indice}`}
          placeholder="Escribe un objetivo"
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}
      <div className="fieldsets">
        <p>{textDisabled ? '' : '*Escribe un mínimo de 3 opciones.'}</p>
        {getValueObjetivos.length === 6 ? null : (
          <a className={style.add} onClick={() => handleClick()}>
            <span>Agregar más</span>
          </a>
        )}
      </div>
    </fieldset>
  );
};

export const ValueSignificativos = ({
  getValueSignificados,
  setValueSignificados,
  textDisabled,
  }) => {
  const { dataJupiter } = jupiterStore(
    (state) => ({
      dataJupiter: state.dataJupiter,
    }),
    shallow
  );
  const handleClick = () => {
    setValueSignificados([...getValueSignificados, '']);
  };

  const handleInputChange = (event, index) => {
    const newElements = [...getValueSignificados];
    newElements[index] = event.target.value;
    setValueSignificados(newElements);
  };

  useEffect(() => {
    if (dataJupiter?.significados.length > 0) {
      setValueSignificados(dataJupiter.significados);
    }
  }, [dataJupiter]);

  return (
    <fieldset>
      {getValueSignificados.map((elemento, indice) => (
        <textarea
          key={indice}
          type="text"
          name={`significado-${indice}`}
          className='text-area-sm'
          placeholder="Escribe un significado de tu marca"
          required
          rows={10}
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        ></textarea>
      ))}
      <div className="fieldsets">
        <p>{textDisabled ? '' : '*Escribe un mínimo de 3 opciones.'}</p>
        {
          getValueSignificados.length === 6 ? null : (
          <a className={style.add} onClick={() => handleClick()}>
            <span>Agregar más</span>
          </a>
        )}
      </div>
    </fieldset>
  );
};

export const ValueIdeasNombre = ({ getValueIdeasNombre, setValueIdeasNombre, textDisabled }) => {
  const { dataJupiter } = jupiterStore(
    (state) => ({
      dataJupiter: state.dataJupiter,
    }),
    shallow
  );
  const handleClick = () => {
    setValueIdeasNombre([...getValueIdeasNombre, '']);
  };

  const handleInputChange = (event, index) => {
    const newElements = [...getValueIdeasNombre];
    newElements[index] = event.target.value;
    setValueIdeasNombre(newElements);
  };

  useEffect(() => {
    if (dataJupiter?.ideas_nombre.length > 0) {
      setValueIdeasNombre(dataJupiter.ideas_nombre);
    }
  }, [dataJupiter]);

  return (
    <fieldset>
      {getValueIdeasNombre.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`ideas-nombre-${indice}`}
          placeholder="Escribe un nombre"
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}
      <div className="fieldsets">
        <p>{textDisabled ? '' : '*Escribe un mínimo de 3 opciones.'}</p>
        {
          getValueIdeasNombre.length === 6 ? null : (
          <a className={style.add} onClick={() => handleClick()}>
            <span>Agregar más</span>
          </a>
        )}
      </div>
    </fieldset>
  );
};
export const TextAreaMarca = ({ getDescripcionMarca, setDescripcionMarca, textDisabled }) => {
  const { dataJupiter } = jupiterStore(
    (state) => ({
      dataJupiter: state.dataJupiter,
    }),
    shallow
  );
  

  useEffect(() => {
    setDescripcionMarca(dataJupiter.descripcion_marca);
  }, [dataJupiter]);

  return (
    <textarea
      name="descripcion_marca"
      id="descripcion_marca"
      cols="30"
      rows="10"
      required
      onChange={(e) => setDescripcionMarca(e.target.value)}
      placeholder="Describe la personalidad de tu marca"
      value={getDescripcionMarca}
    ></textarea>
  );
};

export const ValueMarca = ({ getValueAdjetivos, setValueAdjetivos, textDisabled }) => {
  const { dataJupiter } = jupiterStore(
    (state) => ({
      dataJupiter: state.dataJupiter,
    }),
    shallow
  );
  const handleClick = () => {
    setValueAdjetivos([...getValueAdjetivos, '']);
  };

  const handleInputChange = (event, index) => {
    const newElements = [...getValueAdjetivos];
    newElements[index] = event.target.value;
    setValueAdjetivos(newElements);
  };

  useEffect(() => {
    if (dataJupiter?.adjetivos.length > 0) {
      setValueAdjetivos(dataJupiter.adjetivos);
    }
  }, [dataJupiter]);

  return (
    <fieldset>
      {getValueAdjetivos.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`adjetivo-${indice}`}
          placeholder="Escribe un adjetivo"
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}
      <div className="fieldsets">
        <p>{textDisabled ? '' : '*Escribe un mínimo de 3 opciones.'}</p>
        {
          getValueAdjetivos.length === 6 ? null : (
          <a className={style.add} onClick={() => handleClick()}>
            <span>Agregar más</span>
          </a>
        )}
      </div>
    </fieldset>
  );
};
