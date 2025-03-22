import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// Services
import {
  getServiceLegales,
} from '@Service/wp.service';

export const useFetchLegales = () => {
    const [legales, setLegales] = useState('');


    const { data, isSuccess, isError, dataUpdatedAt } = useQuery(['legales'],
        async () => {
            const res = await getServiceLegales();
            return res.data;
        },
        { keepPreviousData: true }
    );

    useEffect(() => {
        if (isSuccess) {
            setLegales(data);
        }
        // eslint-disable-next-line
    }, [isSuccess, dataUpdatedAt]);

    return {
        legales,
        isSuccess,
        isError,
    };
};
