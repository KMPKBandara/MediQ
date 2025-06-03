import React, { useEffect, useState } from "react";
import { token } from "../config";
import { toast } from "react-toastify";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(flase);
  const [error, setError] = useState(null);

  useEffect(() => {
    const FetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await res.json();
        if (!res.ok) {
          return toast.error(result.message);
        }

        setData(result.data);
        setLoading(false);
      } catch (err) {}
    };
  }, []);

  return <div>FetchData</div>;
};

export default useFetchData;
