import { useState,useCallback } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback( async (requestConfig, dataHandler) => {
        setIsLoading(true);
        setError(null);

      console.log('sendRequest called in custom hook');
        try {
          const response = await fetch(
            requestConfig.url,
            {
                method: requestConfig.method ? requestConfig.method : 'GET',
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
                headers: requestConfig.headers ? requestConfig.headers : {} 
            }
        );
    
          if (!response.ok) {
            throw new Error('Request failed!');
          }
    
          const data = await response.json();
    
          dataHandler(data);

        } catch (err) {
          setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
      }, []);

    return {
        isLoading,
        error,
        sendRequest
    };
}
 
export default useHttp;