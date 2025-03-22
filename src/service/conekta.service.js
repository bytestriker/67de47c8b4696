import { instanceWithConekta } from '@Config/axios';

const headersJson = {
  headers: {
    Accept: 'application/vnd.conekta-v2.0.0+json',
    'Content-Type': 'application/json',
  },
};

export const CreateCustomer = async (token, user) => {
  try {
    const body = JSON.stringify({
      name: `${user.name} ${user.lastName}`,
      email: user.email,
      phone: user.phone,
      payment_sources: [
        {
          type: 'card',
          token_id: token.id,
        },
      ],
    });
    const response = await instanceWithConekta.post(`/customers`, body, headersJson);
    return { data: response.data, statusText: response.statusText, code: 0 };
  } catch (error) {
    console.log(error);
    return { error: error, statusText: response.statusText, code: -1 };
  }
};
