import axios from "axios";
import { useEffect, useState } from "react";

const ACCESS_KEY = "fbdb55a670d9d6cc8c010388d15cc357";
const API_ENDPOINT = `http://api.weatherstack.com/current`;

export const useWeatherApi = (query: string, triggerFetch: boolean) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState({ type: 0, message: "" });

  useEffect(() => {
    async function triggerApi() {
      try {
        setLoading(true);
        const response = await axios.get(API_ENDPOINT, {
          params: {
            access_key: ACCESS_KEY,
            query,
          },
        });
        if (response.data.success === false)
          setError({
            type: 400,
            message: "Please provide valid input",
          });
        else setData(response.data);
      } catch (e: any) {
        setError({ type: 500, message: "" });
      } finally {
        setLoading(false);
      }
    }
    if (query) triggerApi();
  }, [triggerFetch]);

  return { data, error, isLoading };
};

export const useCountry = (country: string, triggerFetch: boolean) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState({ type: 0, message: "" });
  useEffect(() => {
    async function triggerApi() {
      try {
        setLoading(true);
        const response = await axios.get(`https://restcountries.com/v2/name/${country}`);
        if (response) {
          setData(response.data);
        } else {
          setError({
            type: 400,
            message: "Please provide valid input",
          });
        }
      } catch (e: any) {
        setError({ type: 500, message: "" });
      } finally {
        setLoading(false);
      }
    }
    if (country.length > 0) triggerApi();
  }, [triggerFetch]);
  return { data, error, isLoading };
};
