import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useWeatherApi } from "../hooks/useApi";
import usePrevious from "../hooks/usePrevious";
import styles from "./Country.module.scss";

const Country = () => {
  const localState: any = useLocation().state;
  const [locationData, setLocationData] = useState<any>([]);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const previousCapital = usePrevious(locationData.capital);
  const navigate = useNavigate();
  const { data, error, isLoading } = useWeatherApi(locationData.capital, triggerFetch);

  useEffect(() => {
    if (!localState.data) {
      navigate("/");
    } else {
      setLocationData(localState.data[0]);
      console.log(localState.data[0]);
    }
  }, [localState.data, navigate]);

  const handleOnSumbit = (e: any) => {
    e.preventDefault();
    if (locationData.capital !== previousCapital) setTriggerFetch((prev) => !prev);
  };

  useEffect(() => {
    if (data) navigate("/weather", { state: { data } });
  }, [data, navigate]);

  if (error.type !== 0) {
    return (
      <div>
        {error.type === 400 ? (
          <div>
            <h1>Bad Request</h1>
            <a className={styles.tryAgain} onClick={() => window.location.reload()}>
              Try again
            </a>
          </div>
        ) : (
          <h1>Uh ho! Something went wrong!</h1>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.details}>
          <div className="col-xs-6" style={{ display: "inline-block" }}>
            Country:&nbsp;
          </div>
          <div className="col-xs-6" style={{ display: "inline-block" }}>
            {locationData.name}
          </div>
        </div>
        <div className={styles.details}>
          <div className="col-xs-6" style={{ display: "inline-block" }}>
            Capital:&nbsp;
          </div>
          <div className="col-xs-6" style={{ display: "inline-block" }}>
            {locationData.capital}
          </div>
        </div>
        <div className={styles.details}>
          <div className="col-xs-6" style={{ display: "inline-block" }}>
            Population:&nbsp;
          </div>
          <div className="col-xs-6" style={{ display: "inline-block" }}>
            {locationData.population}
          </div>
        </div>
        <div className={styles.details}>
          <div className="col-xs-6" style={{ display: "inline-block" }}>
            flag:&nbsp;&nbsp;
          </div>
          <div className="col-xs-6" style={{ display: "inline-block" }}>
            <img src={locationData.flag} alt="falg" width={40} height={20} />
          </div>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <button onClick={() => navigate("/")}> 🠠 Back</button>
        <button onClick={handleOnSumbit}> {isLoading ? "Please wait..." : "Weather 🠢"} </button>
      </div>
    </div>
  );
};
export default Country;
