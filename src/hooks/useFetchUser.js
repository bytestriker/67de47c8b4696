import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// Service
import { getUser, getProjects } from '@Service/entries';

export const useFetchUser = () => {
  const [user, setUser] = useState({});

  const { data, isSuccess, isError, dataUpdatedAt, refetch } = useQuery(
    ['Profile'],
    async () => {
      const res = await getUser();
      return res.data;
    },
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (isSuccess) {
      setUser(data.data);
    }
    // eslint-disable-next-line
  }, [isSuccess, dataUpdatedAt]);

  return {
    user,
    isSuccess,
    isError,
    refetch,
  };
};

export const useFetchProjects = () => {
  const [packs, setPacks] = useState();
  const { data, isSuccess, isError, dataUpdatedAt } = useQuery(
    ['Packs'],
    async () => {
      const res = await getProjects();
      return res.data;
    },
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (isSuccess) {
      setPacks(data.data);
    }
    // eslint-disable-next-line
  }, [isSuccess, dataUpdatedAt]);

  return {
    packs,
    isSuccess,
    isError,
  };
};
