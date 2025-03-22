import { useEffect } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

// Styles
import style from '@Sass/pages/general.module.scss';
import saturno from '@Sass/pages/saturno.module.scss';

export const ValueAwareness = ({
  dataSaturno,
  getValueAwareness,
  setValueAwareness,
  textDisabled,
}) => {
  const handleClick = () => {
    setValueAwareness([...getValueAwareness, '']);
  };

  const handleInputChange = (event, index) => {
    const newElements = [...getValueAwareness];
    newElements[index] = event.target.value;
    setValueAwareness(newElements);
  };

  useEffect(() => {
    if (dataSaturno?.awarenesses.length > 0) {
      setValueAwareness(dataSaturno.awarenesses);
    }
  }, [dataSaturno]);

  return (
    <>
      {getValueAwareness.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`Awareness-${indice}`}
          className={style.inputMedium}
          placeholder={`Paso ${indice + 1}`}
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}
      <p className={saturno.info}>{textDisabled ? '' : '*Escribe un mínimo de 4 opciones.'}</p>
      {getValueAwareness.length === 6 ? null : (
        <span className={style.add} onClick={() => handleClick()}>
          <FaPlusCircle className={style.icon} /> <b>Agregar más</b>
        </span>
      )}
    </>
  );
};

export const ValueConsideration = ({
  dataSaturno,
  getValueConsideration,
  setValueConsideration,
  textDisabled,
}) => {
  const handleClick = () => {
    setValueConsideration([...getValueConsideration, '']);
  };

  const handleInputChange = (event, index) => {
    const newElements = [...getValueConsideration];
    newElements[index] = event.target.value;
    setValueConsideration(newElements);
  };

  useEffect(() => {
    if (dataSaturno?.considerations.length > 0) {
      setValueConsideration(dataSaturno.considerations);
    }
  }, []);

  return (
    <>
      {getValueConsideration.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`Consideration-${indice}`}
          className={style.inputMedium}
          placeholder={`Paso ${indice + 1}`}
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}
      <p className={saturno.info}>{textDisabled ? '' : '*Escribe un mínimo de 4 opciones.'}</p>
      {getValueConsideration.length === 6 ? null : (
        <span className={style.add} onClick={() => handleClick()}>
          <FaPlusCircle className={style.icon} /> <b>Agregar más</b>
        </span>
      )}
    </>
  );
};

export const ValuePurchase = ({
  dataSaturno,
  getValuePurchase,
  setValuePurchase,
  textDisabled,
}) => {
  const handleClick = () => {
    setValuePurchase([...getValuePurchase, '']);
  };

  const handleInputChange = (event, index) => {
    const newElements = [...getValuePurchase];
    newElements[index] = event.target.value;
    setValuePurchase(newElements);
  };

  useEffect(() => {
    if (dataSaturno?.purchases.length > 0) {
      setValuePurchase(dataSaturno.purchases);
    }
  }, []);
  return (
    <>
      {getValuePurchase.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`Purchase-${indice}`}
          className={style.inputMedium}
          placeholder={`Paso ${indice + 1}`}
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}
      <p className={saturno.info}>{textDisabled ? '' : '*Escribe un mínimo de 4 opciones.'}</p>
      {getValuePurchase.length === 6 ? null : (
        <span className={style.add} onClick={() => handleClick()}>
          <FaPlusCircle className={style.icon} /> <b>Agregar más</b>
        </span>
      )}
    </>
  );
};

export const ValueRetention = ({
  dataSaturno,
  getValueRetention,
  setValueRetention,
  textDisabled,
}) => {
  const handleClick = () => {
    setValueRetention([...getValueRetention, '']);
  };

  const handleInputChange = (event, index) => {
    const newElements = [...getValueRetention];
    newElements[index] = event.target.value;
    setValueRetention(newElements);
  };

  useEffect(() => {
    if (dataSaturno?.retentions.length > 0) {
      setValueRetention(dataSaturno.retentions);
    }
  }, []);

  return (
    <>
      {getValueRetention.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`Retention-${indice}`}
          className={style.inputMedium}
          placeholder={`Paso ${indice + 1}`}
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}
      <p className={saturno.info}>{textDisabled ? '' : '*Escribe un mínimo de 4 opciones.'}</p>
      {getValueRetention.length === 6 ? null : (
        <span className={style.add} onClick={() => handleClick()}>
          <FaPlusCircle className={style.icon} /> <b>Agregar más</b>
        </span>
      )}
    </>
  );
};
