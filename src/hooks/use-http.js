import axios from 'axios';
import { useCallback, useState } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, sendData) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await axios({
        method: requestConfig.method,
        url: requestConfig.url,
        data: requestConfig.body ? requestConfig.body : null,
      });
      if (data.statusText !== 'OK') {
        throw new Error('Request failed!');
      }
      sendData(data);
    } catch (error) {
      setError(error.message || 'Something went wrong');
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest };
};

export default useHttp;
