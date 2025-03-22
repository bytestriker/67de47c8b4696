import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [fetchedData, setFetchedData] = useState({
    data: [],
    isLoading: true,
    error: false,
  });

  const cancelTokenSource = axios.CancelToken.source();
  const fecthData = useCallback(async () => {
    try {
      const response = await axios.get(url, {
        cancelToken: cancelTokenSource.token,
      });
      const data = await response.data;

      if (data) {
        setFetchedData({
          data: data.results ? data.results : data,
          isLoading: false,
          error: false,
        });
      }
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log("Fetching data aborted");
      } else {
        console.log("error ocurred", e);
      }
      setFetchedData({
        data: [],
        isLoading: false,
        error: false,
      });
    }
  }, [url]);

  useEffect(() => {
    fecthData();
    return () => cancelTokenSource.cancel();
  }, [url, fecthData]);

  const { data, isLoading, error } = fetchedData;

  return { data, isLoading, error };
};

export default useFetch;
