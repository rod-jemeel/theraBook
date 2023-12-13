import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./../context/AuthContext";
import { BASE_URL } from "../config";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token: authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const headers = {};
        
        // Include authorization header if token is available
        if (authToken) {
          headers.Authorization = `Bearer ${authToken}`;
        }

        const res = await fetch(url, {
          headers,
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }

        setData(result.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, authToken]); // Include authToken in the dependency array

  return {
    data,
    loading,
    error,
  };
};

export default useFetchData;
