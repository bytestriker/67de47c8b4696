import { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

// Styles
import style from '@Sass/pages/venus.module.scss';

export const PaintPoints = ({ dataPoints, setDataPoints, setPainPoints }) => {
  const [button, setButton] = useState(true);
  const handleClick = () => {
    setDataPoints([...dataPoints, { pain_point: '', pain_reliever: '' }]);
  };

  const handleInputChange = (event, index, field) => {
    const newElements = [...dataPoints];
    newElements[index][field] = event.target.value;
    setDataPoints(newElements);
    setPainPoints(newElements);
  };

  useEffect(() => {
    if (dataPoints.length > 0) {
      setDataPoints(dataPoints);
    }
  }, [dataPoints]);

  useEffect(() => {
    if (dataPoints.length === 5) {
      setButton(false);
    }
  }, [dataPoints]);

  return (
    <fieldset>
      {dataPoints.map((elemento, indice) => (
        <div key={indice}>
          <fieldset>
            <input
              type="text"
              name={`pain-point-${indice}`}
              placeholder="Pain point"
              value={elemento.pain_point}
              onChange={(event) => handleInputChange(event, indice, 'pain_point')}
            />
          </fieldset>
          <fieldset>
            <input
              type="text"
              name={`pain-relievers-${indice}`}
              placeholder="Pain relievers"
              value={elemento.pain_reliever}
              onChange={(event) => handleInputChange(event, indice, 'pain_reliever')}
            />
          </fieldset>
        </div>
      ))}
      {button ? (
        <a className="buttonAdd" onClick={() => handleClick()}>
          <span>Agregar más</span>
        </a>
      ) : null}
    </fieldset>
  );
};

export const ValueFortalezas = ({ valueFortaleza, setValueFortaleza, setFortaleza }) => {
  const [textDisabled, setTextDisabled] = useState(false);

  const handleClick = () => {
    setValueFortaleza([...valueFortaleza, '']);
  };

  const handleInputChange = (event, index) => {
    const newElements = [...valueFortaleza];
    newElements[index] = event.target.value;
    setValueFortaleza(newElements);
    setFortaleza(newElements);
  };

  useEffect(() => {
    if (valueFortaleza.length > 0) {
      setValueFortaleza(valueFortaleza);
    }
  }, [valueFortaleza]);

  useEffect(() => {
    const arraySinVacios = valueFortaleza.filter((element) => element !== '');
    if (arraySinVacios.length === 3) {
      setTextDisabled(false);
    } else {
      setTextDisabled(true);
    }
  }, [valueFortaleza]);

  return (
    <fieldset>
      {valueFortaleza.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`fortalezas-${indice}`}
          placeholder="Escribe tus fortalezas"
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}
      <div className="fieldsets">
        <p className={style.questions}>{textDisabled ? '*Escribe un mínimo de 3 opciones.' : ''}</p>
        {valueFortaleza.length === 5 ? null : (
          <a className="buttonAdd" onClick={() => handleClick()}>
            <span>Agregar más</span>
          </a>
        )}
      </div>
    </fieldset>
  );
};

export const ValueOportunidades = ({ valueOportunidad, setValueOportunidad, setOportunidades }) => {
  const [textDisabled, setTextDisabled] = useState(false);
  const handleClick = () => {
    setValueOportunidad([...valueOportunidad, '']);
  };

  const handleInputChange = (event, index) => {
    const newElements = [...valueOportunidad];
    newElements[index] = event.target.value;
    setValueOportunidad(newElements);
    setOportunidades(newElements);
  };

  useEffect(() => {
    if (valueOportunidad.length > 0) {
      setValueOportunidad(valueOportunidad);
    }
  }, [valueOportunidad]);

  useEffect(() => {
    const arraySinVacios = valueOportunidad.filter((element) => element !== '');
    if (arraySinVacios.length === 3) {
      setTextDisabled(false);
    } else {
      setTextDisabled(true);
    }
  }, [valueOportunidad]);

  return (
    <fieldset>
      {valueOportunidad.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`oportunidades-${indice}`}
          className={style.input}
          placeholder="Escribe tus oportunidades"
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}
      <div className="fieldsets">

      </div>
      <p className={style.questions}>{textDisabled ? '*Escribe un mínimo de 3 opciones.' : ''}</p>
      {valueOportunidad.length === 5 ? null : (
        <a className="buttonAdd" onClick={() => handleClick()}>
          <span>Agregar más</span>
        </a>
      )}
    </fieldset>
  );
};

export const ValueDebilidades = ({ valueDebilidad, setValueDebilidad, setDebilidades }) => {
  const [textDisabled, setTextDisabled] = useState(false);
  const handleClick = () => {
    setValueDebilidad([...valueDebilidad, '']);
  };

  const handleInputChange = (event, index) => {
    const newElements = [...valueDebilidad];
    newElements[index] = event.target.value;
    setValueDebilidad(newElements);
    setDebilidades(newElements);
  };

  useEffect(() => {
    if (valueDebilidad.length > 0) {
      setValueDebilidad(valueDebilidad);
    }
  }, [valueDebilidad]);

  useEffect(() => {
    const arraySinVacios = valueDebilidad.filter((element) => element !== '');
    if (arraySinVacios.length === 3) {
      setTextDisabled(false);
    } else {
      setTextDisabled(true);
    }
  }, [valueDebilidad]);

  return (
    <fieldset>
      {valueDebilidad.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`debilidades-${indice}`}
          className={style.input}
          placeholder="Escribe tus debilidades"
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}
      <div className="fieldsets">
        <p className={style.questions}>{textDisabled ? '*Escribe un mínimo de 3 opciones.' : ''}</p>
        {valueDebilidad.length === 5 ? null : (
          <a className="buttonAdd" onClick={() => handleClick()}>
            <span>Agregar más</span>
          </a>
        )}
      </div>
    </fieldset>
  );
};

export const ValueAmenazas = ({ valueAmenaza, setValueAmenaza, setAmenazas }) => {
  const [textDisabled, setTextDisabled] = useState(false);
  const handleClick = () => {
    setValueAmenaza([...valueAmenaza, '']);
  };

  const handleInputChange = (event, index) => {
    const newElements = [...valueAmenaza];
    newElements[index] = event.target.value;
    setValueAmenaza(newElements);
    setAmenazas(newElements);
  };

  useEffect(() => {
    if (valueAmenaza.length > 0) {
      setValueAmenaza(valueAmenaza);
    }
  }, [valueAmenaza]);

  useEffect(() => {
    const arraySinVacios = valueAmenaza.filter((element) => element !== '');
    if (arraySinVacios.length === 3) {
      setTextDisabled(false);
    } else {
      setTextDisabled(true);
    }
  }, [valueAmenaza]);

  return (
    <fieldset>
      {valueAmenaza.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`amenazas-${indice}`}
          className={style.input}
          placeholder="Escribe tus amenazas"
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}
      <div className="fieldsets">
        <p className={style.questions}>{textDisabled ? '*Escribe un mínimo de 3 opciones.' : ''}</p>
        {valueAmenaza.length === 5 ? null : (
          <a className="buttonAdd" onClick={() => handleClick()}>
            <span>Agregar más</span>
          </a>
        )}
      </div>
    </fieldset>
  );
};
