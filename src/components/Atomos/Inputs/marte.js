import { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

// Styles
import style from '@Sass/pages/marte.module.scss';

/* INPUTS MarteQ1Canvas */
export const ValueProposition = ({ dataMarte, getValueProposition, setValueProposition }) => {
  const [textDisabled, setTextDisabled] = useState(false);
  const handleClick = () => {
    setValueProposition([...getValueProposition, '']);
  };

  const handleInputChange = (event, index) => {
    const newElementos = [...getValueProposition];
    newElementos[index] = event.target.value;
    setValueProposition(newElementos);
  };

  useEffect(() => {
    if (dataMarte?.value_proposition.length > 0) {
      setValueProposition(dataMarte.value_proposition);
    }
  }, []);

  useEffect(() => {
    handleArray();
  }, [getValueProposition]);

  const handleArray = () => {
    const isNotEmpty = getValueProposition.filter((value) => value !== '');
    if (isNotEmpty.length >= 3) {
      setTextDisabled(true);
    } else if (isNotEmpty.length < 3) {
      setTextDisabled(false);
    }
  };

  return (
    <>
      {getValueProposition.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`value-proposition-${indice}`}
          className={style.input}
          placeholder="Escribe tu propuesta de valor"
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}
      <p className={style.info}>{textDisabled ? '' : '*Escribe un mínimo de 3 opciones.'}</p>
      {getValueProposition.length === 5 ? null : (
        <span className={style.add} onClick={() => handleClick()}>
          <FaPlusCircle className={style.icon} /> <b>Agregar más</b>
        </span>
      )}
    </>
  );
};

export const KeyActivities = ({ dataMarte, getKeyActivities, setKeyActivities }) => {
  const [textDisabled, setTextDisabled] = useState(false);
  const handleClick = () => {
    setKeyActivities([...getKeyActivities, '']);
  };

  const handleInputChange = (event, index) => {
    const newElementos = [...getKeyActivities];
    newElementos[index] = event.target.value;
    setKeyActivities(newElementos);
  };

  useEffect(() => {
    if (dataMarte?.key_activities.length > 0) {
      setKeyActivities(dataMarte.key_activities);
    }
  }, []);

  useEffect(() => {
    handleArray();
  }, [getKeyActivities]);

  const handleArray = () => {
    const isNotEmpty = getKeyActivities.filter((value) => value !== '');
    if (isNotEmpty.length >= 3) {
      setTextDisabled(true);
    } else if (isNotEmpty.length < 3) {
      setTextDisabled(false);
    }
  };

  return (
    <>
      {getKeyActivities.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`key-activities-${indice}`}
          className={style.input}
          placeholder="Escribe tus actividades"
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}

      <p className={style.info}>{textDisabled ? '' : '*Escribe un mínimo de 3 opciones.'}</p>
      {getKeyActivities.length === 5 ? null : (
        <span className={style.add} onClick={() => handleClick()}>
          <FaPlusCircle className={style.icon} /> <b>Agregar más</b>
        </span>
      )}
    </>
  );
};

export const RevenueStreams = ({ dataMarte, getRevenueStreams, setRevenueStreams }) => {
  const [textDisabled, setTextDisabled] = useState(false);
  const handleClick = () => {
    setRevenueStreams([...getRevenueStreams, '']);
  };

  const handleInputChange = (event, index) => {
    const newElementos = [...getRevenueStreams];
    newElementos[index] = event.target.value;
    setRevenueStreams(newElementos);
  };

  useEffect(() => {
    if (dataMarte?.revenue_streams.length > 0) {
      setRevenueStreams(dataMarte.revenue_streams);
    }
  }, []);

  useEffect(() => {
    handleArray();
  }, [getRevenueStreams]);

  const handleArray = () => {
    const isNotEmpty = getRevenueStreams.filter((value) => value !== '');
    if (isNotEmpty.length >= 3) {
      setTextDisabled(true);
    } else if (isNotEmpty.length < 3) {
      setTextDisabled(false);
    }
  };

  return (
    <>
      {getRevenueStreams.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`revenue-streams-${indice}`}
          className={style.input}
          placeholder="Escribe tus fuentes"
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}
      <p className={style.info}>{textDisabled ? '' : '*Escribe un mínimo de 3 opciones.'}</p>
      {getRevenueStreams.length === 5 ? null : (
        <span className={style.add} onClick={() => handleClick()}>
          <FaPlusCircle className={style.icon} /> <b>Agregar más</b>
        </span>
      )}
    </>
  );
};

export const CustomerRelationships = ({
  dataMarte,
  getCustomerRelationships,
  setCustomerRelationships,
}) => {
  const [textDisabled, setTextDisabled] = useState(false);

  const handleClick = () => {
    setCustomerRelationships([...getCustomerRelationships, '']);
  };

  const handleInputChange = (event, index) => {
    const newElementos = [...getCustomerRelationships];
    newElementos[index] = event.target.value;
    setCustomerRelationships(newElementos);
  };

  useEffect(() => {
    if (dataMarte?.customer_relationships.length > 0) {
      setCustomerRelationships(dataMarte.customer_relationships);
    }
  }, []);

  useEffect(() => {
    handleArray();
  }, [getCustomerRelationships]);

  const handleArray = () => {
    const isNotEmpty = getCustomerRelationships.filter((value) => value !== '');
    if (isNotEmpty.length >= 3) {
      setTextDisabled(true);
    } else if (isNotEmpty.length < 3) {
      setTextDisabled(false);
    }
  };

  return (
    <>
      {getCustomerRelationships.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`customer-relationships-${indice}`}
          className={style.input}
          placeholder="Escribe tus relaciones"
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}
      <p className={style.info}>{textDisabled ? '' : '*Escribe un mínimo de 3 opciones.'}</p>
      {getCustomerRelationships.length === 5 ? null : (
        <span className={style.add} onClick={() => handleClick()}>
          <FaPlusCircle className={style.icon} /> <b>Agregar más</b>
        </span>
      )}
    </>
  );
};

export const Channels = ({ dataMarte, getChannels, setChannels }) => {
  const [textDisabled, setTextDisabled] = useState(false);

  const handleClick = () => {
    setChannels([...getChannels, '']);
  };

  const handleInputChange = (event, index) => {
    const newElementos = [...getChannels];
    newElementos[index] = event.target.value;
    setChannels(newElementos);
  };

  useEffect(() => {
    if (dataMarte?.channels.length > 0) {
      setChannels(dataMarte.channels);
    }
  }, []);

  useEffect(() => {
    handleArray();
  }, [getChannels]);

  const handleArray = () => {
    const isNotEmpty = getChannels.filter((value) => value !== '');
    if (isNotEmpty.length >= 3) {
      setTextDisabled(true);
    } else if (isNotEmpty.length < 3) {
      setTextDisabled(false);
    }
  };

  return (
    <>
      {getChannels.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`channels-${indice}`}
          className={style.input}
          placeholder="Escribe tus canales"
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}

      <p className={style.info}>{textDisabled ? '' : '*Escribe un mínimo de 3 opciones.'}</p>
      {getChannels.length === 5 ? null : (
        <span className={style.add} onClick={() => handleClick()}>
          <FaPlusCircle className={style.icon} /> <b>Agregar más</b>
        </span>
      )}
    </>
  );
};

/* INPUTS MarteQ2Canvas */
export const KeyPartners = ({ dataMarte, getKeyPartners, setKeyPartners }) => {
  const [textDisabled, setTextDisabled] = useState(false);
  const handleClick = () => {
    setKeyPartners([...getKeyPartners, '']);
  };

  const handleInputChange = (event, index) => {
    const newElementos = [...getKeyPartners];
    newElementos[index] = event.target.value;
    setKeyPartners(newElementos);
  };

  useEffect(() => {
    if (dataMarte?.key_partners.length > 0) {
      setKeyPartners(dataMarte.key_partners);
    }
  }, []);

  useEffect(() => {
    handleArray();
  }, [getKeyPartners]);

  const handleArray = () => {
    const isNotEmpty = getKeyPartners.filter((value) => value !== '');
    if (isNotEmpty.length >= 3) {
      setTextDisabled(true);
    } else if (isNotEmpty.length < 3) {
      setTextDisabled(false);
    }
  };

  return (
    <>
      {getKeyPartners.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`key-partners-${indice}`}
          className={style.input}
          placeholder="Escribe tus alianzas"
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}
      <p className={style.info}>{textDisabled ? '' : '*Escribe un mínimo de 3 opciones.'}</p>
      {getKeyPartners.length === 5 ? null : (
        <span className={style.add} onClick={() => handleClick()}>
          <FaPlusCircle className={style.icon} /> <b>Agregar más</b>
        </span>
      )}
    </>
  );
};

export const CostStructure = ({ dataMarte, getCostStructure, setCostStructure }) => {
  const [textDisabled, setTextDisabled] = useState(false);
  const handleClick = () => {
    setCostStructure([...getCostStructure, '']);
  };

  const handleInputChange = (event, index) => {
    const newElementos = [...getCostStructure];
    newElementos[index] = event.target.value;
    setCostStructure(newElementos);
  };

  useEffect(() => {
    if (dataMarte?.cost_structure.length > 0) {
      setCostStructure(dataMarte.cost_structure);
    }
  }, []);

  useEffect(() => {
    handleArray();
  }, [getCostStructure]);

  const handleArray = () => {
    const isNotEmpty = getCostStructure.filter((value) => value !== '');
    if (isNotEmpty.length >= 3) {
      setTextDisabled(true);
    } else if (isNotEmpty.length < 3) {
      setTextDisabled(false);
    }
  };

  return (
    <>
      {getCostStructure.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`cost-structure-${indice}`}
          className={style.input}
          placeholder="Escribe aquí tu estructura"
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}
      <p className={style.info}>{textDisabled ? '' : '*Escribe un mínimo de 3 opciones.'}</p>
      {getCostStructure.length === 5 ? null : (
        <span className={style.add} onClick={() => handleClick()}>
          <FaPlusCircle className={style.icon} /> <b>Agregar más</b>
        </span>
      )}
    </>
  );
};

export const CustomerSegments = ({ dataMarte, getCustomerSegments, setCustomerSegments }) => {
  const [textDisabled, setTextDisabled] = useState(false);
  const handleClick = () => {
    setCustomerSegments([...getCustomerSegments, '']);
  };

  const handleInputChange = (event, index) => {
    const newElementos = [...getCustomerSegments];
    newElementos[index] = event.target.value;
    setCustomerSegments(newElementos);
  };

  useEffect(() => {
    if (dataMarte?.customer_segments.length > 0) {
      setCustomerSegments(dataMarte.customer_segments);
    }
  }, []);

  useEffect(() => {
    handleArray();
  }, [getCustomerSegments]);

  const handleArray = () => {
    const isNotEmpty = getCustomerSegments.filter((value) => value !== '');
    if (isNotEmpty.length >= 3) {
      setTextDisabled(true);
    } else if (isNotEmpty.length < 3) {
      setTextDisabled(false);
    }
  };

  return (
    <>
      {getCustomerSegments.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`customer-segments-${indice}`}
          className={style.input}
          placeholder="Escribe aquí tus segmentos"
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}
      <p className={style.info}>{textDisabled ? '' : '*Escribe un mínimo de 3 opciones.'}</p>
      {getCustomerSegments.length === 5 ? null : (
        <span className={style.add} onClick={() => handleClick()}>
          <FaPlusCircle className={style.icon} /> <b>Agregar más</b>
        </span>
      )}
    </>
  );
};

export const KeyResources = ({ dataMarte, getKeyResources, setKeyResources }) => {
  const [textDisabled, setTextDisabled] = useState(false);
  const handleClick = () => {
    setKeyResources([...getKeyResources, '']);
  };

  const handleInputChange = (event, index) => {
    const newElementos = [...getKeyResources];
    newElementos[index] = event.target.value;
    setKeyResources(newElementos);
  };

  useEffect(() => {
    if (dataMarte?.key_resources.length > 0) {
      setKeyResources(dataMarte.key_resources);
    }
  }, []);

  useEffect(() => {
    handleArray();
  }, [getKeyResources]);

  const handleArray = () => {
    const isNotEmpty = getKeyResources.filter((value) => value !== '');
    if (isNotEmpty.length >= 3) {
      setTextDisabled(true);
    } else if (isNotEmpty.length < 3) {
      setTextDisabled(false);
    }
  };

  return (
    <>
      {getKeyResources.map((elemento, indice) => (
        <input
          key={indice}
          type="text"
          name={`key-resources-${indice}`}
          className={style.input}
          placeholder="Escribe aquí tus principales recursos"
          required
          value={elemento}
          onChange={(event) => handleInputChange(event, indice)}
        />
      ))}
      <p className={style.info}>{textDisabled ? '' : '*Escribe un mínimo de 3 opciones.'}</p>
      {getKeyResources.length === 5 ? null : (
        <span className={style.add} onClick={() => handleClick()}>
          <FaPlusCircle className={style.icon} /> <b>Agregar más</b>
        </span>
      )}
    </>
  );
};
