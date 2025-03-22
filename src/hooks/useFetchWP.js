import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// Services
import {
  getServiceLunaTxt,
  getServiceMercurioInfo,
  getServiceVenusInfo,
  getServiceMarteInfo,
  getServiceJupiterInfo,
  getServiceSaturnoInfo,
  getServiceUranoInfo,
  getServiceNeptunoInfo,
  getServiceTierraInfo,
  getServiceHome,
  getServiceLunaQuestions,
  getServiceMercurioQuestions,
  getServiceVenusQuestions,
  getServiceSaturnoQuestions,
  getServiceMarteQuestions,
  getServiceUranoQuestions,
  getServiceJupiterQuestions,
} from '@Service/wp.service';

export const ServiceWPHome = () => {
  const [lunaInfo, setLunaInfo] = useState({});
  const [mercurioInfo, setMercurioInfo] = useState({});
  const [venusInfo, setVenusInfo] = useState({});
  const [marteInfo, setMarteInfo] = useState({});
  const [jupiterInfo, setJupiterInfo] = useState({});
  const [saturnoInfo, setSaturnoInfo] = useState({});
  const [uranoInfo, setUranoInfo] = useState({});
  const [neptunoInfo, setNeptunoInfo] = useState({});
  const [tierraInfo, setTierraInfo] = useState({});

  /* Obtiene Informacion de Luna Home */
  const {
    data: lunaInfoHome,
    isSuccess: successLuna,
    dataUpdatedAt,
  } = useQuery(
    ['lunaWPInfo'],
    async () => {
      const res = await getServiceLunaTxt();
      return res.data;
    },
    { keepPreviousData: false }
  );

  useEffect(() => {
    if (successLuna) {
      const { acf } = lunaInfoHome;
      setLunaInfo(acf);
    }
    // eslint-disable-next-line
  }, [successLuna, dataUpdatedAt]);

  /* Obtiene Informacion de Mercurio Home */
  const {
    data: mercurioInfoHome,
    isSuccess: successMercurio,
    dataUpdatedAt: updateMercurio,
  } = useQuery(
    ['mercurioWPInfo'],
    async () => {
      const res = await getServiceMercurioInfo();
      return res.data;
    },
    { keepPreviousData: false }
  );

  useEffect(() => {
    if (successMercurio) {
      const { acf } = mercurioInfoHome;
      setMercurioInfo(acf);
    }
    // eslint-disable-next-line
  }, [successMercurio, updateMercurio]);

  /* Obtiene Informacion de Venus Home */
  const {
    data: venusInfoHome,
    isSuccess: successVenus,
    dataUpdatedAt: updateVenus,
  } = useQuery(
    ['venusWPInfo'],
    async () => {
      const res = await getServiceVenusInfo();
      return res.data;
    },
    { keepPreviousData: false }
  );

  useEffect(() => {
    if (successVenus) {
      const { acf } = venusInfoHome;
      setVenusInfo(acf);
    }
    // eslint-disable-next-line
  }, [successVenus, updateVenus]);

  /* Obtiene Informacion de Marte Home */
  const {
    data: marteInfoHome,
    isSuccess: successMarte,
    dataUpdatedAt: updateMarte,
  } = useQuery(
    ['marteWPInfo'],
    async () => {
      const res = await getServiceMarteInfo();
      return res.data;
    },
    { keepPreviousData: false }
  );

  useEffect(() => {
    if (successMarte) {
      const { acf } = marteInfoHome;
      setMarteInfo(acf);
    }
    // eslint-disable-next-line
  }, [successMarte, updateMarte]);

  /* Obtiene Informacion de Jupiter Home */
  const {
    data: jupiterInfoHome,
    isSuccess: successJupiter,
    dataUpdatedAt: updateJupiter,
  } = useQuery(
    ['jupiterWPInfo'],
    async () => {
      const res = await getServiceJupiterInfo();
      return res.data;
    },
    { keepPreviousData: false }
  );

  useEffect(() => {
    if (successJupiter) {
      const { acf } = jupiterInfoHome;
      setJupiterInfo(acf);
    }
    // eslint-disable-next-line
  }, [successJupiter, updateJupiter]);

  /* Obtiene Informacion de Saturno Home */
  const {
    data: saturnoInfoHome,
    isSuccess: successSaturno,
    dataUpdatedAt: updateSaturno,
  } = useQuery(
    ['saturnoWPInfo'],
    async () => {
      const res = await getServiceSaturnoInfo();
      return res.data;
    },
    { keepPreviousData: false }
  );

  useEffect(() => {
    if (successSaturno) {
      const { acf } = saturnoInfoHome;
      setSaturnoInfo(acf);
    }
    // eslint-disable-next-line
  }, [successSaturno, updateSaturno]);

  /* Obtiene Informacion de Urano Home */
  const {
    data: uranoInfoHome,
    isSuccess: successUrano,
    dataUpdatedAt: updateUrano,
  } = useQuery(
    ['uranoWPInfo'],
    async () => {
      const res = await getServiceUranoInfo();
      return res.data;
    },
    { keepPreviousData: false }
  );

  useEffect(() => {
    if (successUrano) {
      const { acf } = uranoInfoHome;
      setUranoInfo(acf);
    }
    // eslint-disable-next-line
  }, [successUrano, updateUrano]);

  /* Obtiene Informacion de Neptuno Home */
  const {
    data: neptunoInfoHome,
    isSuccess: successNeptuno,
    dataUpdatedAt: updateNeptuno,
  } = useQuery(
    ['neptunoWPInfo'],
    async () => {
      const res = await getServiceNeptunoInfo();
      return res.data;
    },
    { keepPreviousData: false }
  );

  useEffect(() => {
    if (successNeptuno) {
      const { acf } = neptunoInfoHome;
      setNeptunoInfo(acf);
    }
    // eslint-disable-next-line
  }, [successNeptuno, updateNeptuno]);

  /* Obtiene Informacion de TIERRA Home */
  const {
    data: tierraInfoHome,
    isSuccess: successTierra,
    dataUpdatedAt: updateTierra,
  } = useQuery(
    ['tierraWPInfo'],
    async () => {
      const res = await getServiceTierraInfo();
      return res.data;
    },
    { keepPreviousData: false }
  );

  useEffect(() => {
    if (successTierra) {
      const { acf } = tierraInfoHome;
      setTierraInfo(acf);
    }
    // eslint-disable-next-line
  }, [successTierra, updateTierra]);

  return {
    lunaInfo,
    mercurioInfo,
    venusInfo,
    marteInfo,
    jupiterInfo,
    saturnoInfo,
    uranoInfo,
    neptunoInfo,
    tierraInfo,
  };
};

export const HomeSlider = () => {
  const [sliderInfo, setSliderInfo] = useState({});

  /* Obtiene Informacion de Home */
  const { data, isSuccess, dataUpdatedAt, isLoading } = useQuery(
    ['slideWPInfo'],
    async () => {
      const res = await getServiceHome();
      return res.data[0];
    },
    { keepPreviousData: false }
  );

  useEffect(() => {
    if (isSuccess) {
      const { acf } = data;
      setSliderInfo(acf.slide);
    }
    // eslint-disable-next-line
  }, [isSuccess, dataUpdatedAt]);

  return {
    sliderInfo,
    isLoading,
    isSuccess,
  };
};

export const LunaWPText = () => {
  const [lunaQ1, setLunaQ1] = useState({});
  const [lunaQ2, setLunaQ2] = useState({});
  const [lunaQ3, setLunaQ3] = useState({});
  const [lunaQ4, setLunaQ4] = useState({});
  const [lunaQ5, setLunaQ5] = useState({});

  const { data, isSuccess, isLoading, dataUpdatedAt } = useQuery(
    ['lunaWPtexts'],
    async () => {
      const res = await getServiceLunaQuestions();
      return res.data;
    },
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (isSuccess) {
      const { acf } = data;
      setLunaQ1(acf.pregunta_1);
      setLunaQ2(acf.pregunta_2);
      setLunaQ3(acf.pregunta_3);
      setLunaQ4(acf.pregunta_4);
      setLunaQ5(acf.pregunta_5);
    }

    // eslint-disable-next-line
  }, [isSuccess, dataUpdatedAt]);

  return {
    lunaQ1,
    lunaQ2,
    lunaQ3,
    lunaQ4,
    lunaQ5,
    isSuccess,
    isLoading,
  };
};

export const MercurioWPText = () => {
  const [mercurioQ1, setMercurioQ1] = useState({});
  const [mercurioQ2, setMercurioQ2] = useState({});
  const [mercurioQ3, setMercurioQ3] = useState({});

  const { data, isSuccess, isLoading, dataUpdatedAt } = useQuery(
    ['mercurioWPtexts'],
    async () => {
      const res = await getServiceMercurioQuestions();
      return res.data;
    },
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (isSuccess) {
      const { acf } = data;
      setMercurioQ1(acf.pregunta_1);
      setMercurioQ2(acf.pregunta_2);
      setMercurioQ3(acf.pregunta_3);
    }
    // eslint-disable-next-line
  }, [isSuccess, dataUpdatedAt]);

  return {
    mercurioQ1,
    mercurioQ2,
    mercurioQ3,
    isSuccess,
    isLoading,
  };
};

export const VenusWPText = () => {
  const [venusQ0, setVenusQ0] = useState({});
  const [venusQ1, setvVnusQ1] = useState({});
  const [venusQ2, setVenusQ2] = useState({});
  const [venusQ3, setVenusQ3] = useState({});
  const [venusQ3od, setVenusQ3od] = useState({});
  const [venusQ3fa, setVenusQ3fa] = useState({});
  const [venusQ3deam, setVenusQ3deam] = useState({});
  const [venusQ4, setVenusQ4] = useState({});

  const { data, isSuccess, isLoading, dataUpdatedAt } = useQuery(
    ['venusWPtexts'],
    async () => {
      const res = await getServiceVenusQuestions();
      return res.data;
    },
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (isSuccess) {
      const { acf } = data;
      setVenusQ0(acf.pregunta_0);
      setvVnusQ1(acf.pregunta_1);
      setVenusQ2(acf.pregunta_2);
      setVenusQ3(acf.pregunta_3);
      setVenusQ3od(acf.pregunta_3od);
      setVenusQ3fa(acf.pregunta_3fa);
      setVenusQ3deam(acf.pregunta_3deam);
      setVenusQ4(acf.pregunta_4);
    }
    // eslint-disable-next-line
  }, [isSuccess, dataUpdatedAt]);

  return {
    venusQ0,
    venusQ1,
    venusQ2,
    venusQ3,
    venusQ3od,
    venusQ4,
    isSuccess,
    isLoading,
    venusQ3fa,
    venusQ3deam,
  };
};

export const SaturnoWPText = () => {
  const [saturnoQ1, setSaturnoQ1] = useState({});
  const [saturnoQ2, setSaturnoQ2] = useState({});
  const [saturnoQ3, setSaturnoQ3] = useState({});
  const [saturnoQ4, setSaturnoQ4] = useState({});

  const { data, isSuccess, isLoading, dataUpdatedAt } = useQuery(
    ['saturnoWPtexts'],
    async () => {
      const res = await getServiceSaturnoQuestions();
      return res.data;
    },
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (isSuccess) {
      const { acf } = data;
      setSaturnoQ1(acf.pregunta_1);
      setSaturnoQ2(acf.pregunta_2);
      setSaturnoQ3(acf.pregunta_3);
      setSaturnoQ4(acf.pregunta_4);
    }
    // eslint-disable-next-line
  }, [isSuccess, dataUpdatedAt]);

  return {
    saturnoQ1,
    saturnoQ2,
    saturnoQ3,
    saturnoQ4,
    isSuccess,
    isLoading,
  };
};

export const MarteWPText = () => {
  const [marteQ1, setMarteQ1] = useState({});
  const [marteQ2, setMarteQ2] = useState({});
  const [marteQ3, setMarteQ3] = useState({});

  const { data, isSuccess, isLoading, dataUpdatedAt } = useQuery(
    ['marteWPtexts'],
    async () => {
      const res = await getServiceMarteQuestions();
      return res.data;
    },
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (isSuccess) {
      const { acf } = data;
      setMarteQ1(acf.pregunta_1);
      setMarteQ2(acf.pregunta_2);
      setMarteQ3(acf.pregunta_3);
    }
    // eslint-disable-next-line
  }, [isSuccess, dataUpdatedAt]);

  return {
    marteQ1,
    marteQ2,
    marteQ3,
    isSuccess,
    isLoading,
  };
};

export const UranoWPText = () => {
  const [uranoQ1, setUranoQ1] = useState({});
  const [uranoQ2, setUranoQ2] = useState({});
  const [uranoQ2Categorias, setUranoQ2Categorias] = useState([]);
  const [uranoQ3, setUranoQ3] = useState({});

  const { data, isSuccess, isLoading, dataUpdatedAt } = useQuery(
    ['marteWPtexts'],
    async () => {
      const res = await getServiceUranoQuestions();
      return res.data;
    },
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (isSuccess) {
      const { acf } = data;
      setUranoQ1(acf.pregunta_1);
      setUranoQ2(acf.pregunta_2);
      setUranoQ3(acf.pregunta3);
      const categorias = [];
      categorias.push(acf.pregunta_2.categoria_1);
      categorias.push(acf.pregunta_2.categoria_2);
      categorias.push(acf.pregunta_2.categoria_3);
      categorias.push(acf.pregunta_2.categoria_4);
      categorias.push(acf.pregunta_2.categoria_5);
      categorias.push(acf.pregunta_2.categoria_6);
      categorias.push(acf.pregunta_2.categoria_7);
      categorias.push(acf.pregunta_2.categoria_8);
      categorias.push(acf.pregunta_2.categoria_9);

      setUranoQ2Categorias(categorias);
    }
    // eslint-disable-next-line
  }, [isSuccess, dataUpdatedAt]);

  return {
    uranoQ1,
    uranoQ2,
    uranoQ3,
    uranoQ2Categorias,
    isSuccess,
    isLoading,
  };
};

export const JupiterWPText = () => {
  const [jupiterQ1, setJupiterQ1] = useState({});
  const [jupiterQ2, setJupiterQ2] = useState({});
  const [jupiterQ3, setJupiterQ3] = useState({});
  const [jupiterQ4, setJupiterQ4] = useState({});
  const [jupiterQ5, setJupiterQ5] = useState({});
  const [jupiterQ6, setJupiterQ6] = useState({});
  const [jupiterQ7, setJupiterQ7] = useState({});
  const [jupiterQ8, setJupiterQ8] = useState({});
  const [jupiterQ9, setJupiterQ9] = useState({});

  const { data, isSuccess, isLoading, dataUpdatedAt } = useQuery(
    ['marteWPtexts'],
    async () => {
      const res = await getServiceJupiterQuestions();
      return res.data;
    },
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (isSuccess) {
      const { acf } = data;
      setJupiterQ1(acf.pregunta_1);
      setJupiterQ2(acf.pregunta_2);
      setJupiterQ3(acf.pregunta_3);
      setJupiterQ4(acf.pregunta_4);
      setJupiterQ5(acf.pregunta_5);
      setJupiterQ6(acf.pregunta_6);
      setJupiterQ7(acf.pregunta_7);
      setJupiterQ8(acf.pregunta_8);
      setJupiterQ9(acf.pregunta_9);
    }
    // eslint-disable-next-line
  }, [isSuccess, dataUpdatedAt]);

  return {
    jupiterQ1,
    jupiterQ2,
    jupiterQ3,
    jupiterQ4,
    jupiterQ5,
    jupiterQ6,
    jupiterQ7,
    jupiterQ8,
    jupiterQ9,
    isSuccess,
    isLoading,
  };
};
