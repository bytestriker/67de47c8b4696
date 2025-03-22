import { instanceWithRocket } from '@Config/axios';
import { createBussinesMarte } from '@Service/marte.service';
import { createConclusionFO, createConclusionOD, createConclusionFA, createBuyerPersona } from '@Service/venus.service';
import { createJupiterMarca, createJupiterNombres } from '@Service/jupiter.service';

const headersDefault = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

const headersJson = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getTanksUser = async () => {
  try {
    const response = await instanceWithRocket.get(`/user/tanques`, headersDefault);
    return response;
  } catch (error) {
    return error;
  }
};

export const BuyTanks = async (params) => {
  try {
    let conekta = {};
    if (params.pack.code) {
      conekta = {
        amount: +`${params.pack.priceDefault}00`,
        currency: 'MXN',
        amount_refunded: 0,
        customer_info: {
          customer_id: params.customer.id,
        },
        shipping_contact: {
          receiver: `${params.user.name} ${params.user.lastName}`,
          phone: params.user.phone,
          address: {
            street1: `${params.user.street} #${params.user.numExt} ${params?.user?.numInt} ${params.user.location}`,
            city: 'México',
            state: 'México',
            country: 'mx',
            residential: true,
            object: 'shipping_address',
            postal_code: params.user.postalcode,
          },
        },
        metadata: {
          Integration: 'API',
          Integration_Type: 'PHP 8.0',
        },
        line_items: [
          {
            name: params.pack.packageType,
            unit_price: +`${params.pack.priceDefault}00`,
            quantity: params.pack.ammountPack,
            description: params.pack.name,
            sku: 'SKU',
            tags: ['tag1', 'tag2'],
            brand: 'RocketNow',
            metadata: {
              Valor3: 'tanques',
            },
          },
        ],
        charges: [
          {
            payment_method: {
              type: 'default',
              token_id: params.token.id,
            },
          },
        ],
        discount_lines: [
          {
            code: 'Cupón de descuento en orden sin cargo',
            amount: 1000,
            type: params.pack.code,
          },
        ],
      };
    } else {
      conekta = {
        amount: +`${params.pack.price}00`,
        currency: 'MXN',
        amount_refunded: 0,
        customer_info: {
          customer_id: params.customer.id,
        },
        shipping_contact: {
          receiver: `${params.user.name} ${params.user.lastName}`,
          phone: params.user.phone,
          address: {
            street1: `${params.user.street} #${params.user.numExt} ${params?.user?.numInt} ${params.user.location}`,
            city: 'México',
            state: 'México',
            country: 'mx',
            residential: true,
            object: 'shipping_address',
            postal_code: params.user.postalcode,
          },
        },
        metadata: {
          Integration: 'API',
          Integration_Type: 'PHP 8.0',
        },
        line_items: [
          {
            name: params.pack.packageType,
            unit_price: +`${params.pack.priceDefault}00`,
            quantity: params.pack.ammountPack,
            description: params.pack.name,
            sku: 'SKU',
            tags: ['tag1', 'tag2'],
            brand: 'RocketNow',
            metadata: {
              Valor3: 'tanques',
            },
          },
        ],
        charges: [
          {
            payment_method: {
              type: 'default',
              token_id: params.token.id,
            },
          },
        ],
      };
    }
    const response = await instanceWithRocket.post(
      `/user/tanques`,
      JSON.stringify(conekta),
      headersJson
    );
    return { data: response.data, statusText: response.statusText, code: 0 };
  } catch (error) {
    console.log(error);
    return { messageError: error, status: error, code: -1 };
  }
};

export const unlockPlanet = async (param) => {
  try {
    const planet = JSON.stringify({
      planeta_a_desbloquear: param.planet,
    });
    const response = await instanceWithRocket.post(
      `/projects/${param.projectId}/planetas`,
      planet,
      headersJson
    );
    return {
      code: 0,
      planeta_desbloqueado: response.data.planeta_desbloqueado,
      tanques_restantes: response.data.tanques_restantes,
    };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, code: -1, status: response.status };
  }
};

export const createProjectPlanet = async (param) => {
  try {
    let data = {};
    if (param.planet === 'urano') {
      data = {
        proveedores: ['urano', 'points'],
      };
    }
    const response = await instanceWithRocket.post(
      `/projects/${param.projectId}/${param.planet}`,
      JSON.stringify(data),
      headersJson
    );

    if (param.planet === 'marte') {
      await createBussinesMarte(param.projectId, JSON.stringify({}));
    }

    if (param.planet === 'venus') {
      await createConclusionFO(param.projectId, JSON.stringify({}));
      await createConclusionOD(param.projectId, JSON.stringify({}));
      await createConclusionFA(param.projectId, JSON.stringify({}));
      await createBuyerPersona(param.projectId, JSON.stringify({}));
    }

    if (param.planet === 'jupiter') {
      await createJupiterNombres(param.projectId, JSON.stringify({}));
      await createJupiterMarca(param.projectId, JSON.stringify({}));
    }
    return {
      data: response.data,
      Status_planeta: response.statusText,
      Status_planeta: response.data.Status_planeta,
      code: 0,
    };
  } catch (error) {
    console.log(error);
    const { response } = error;
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};
