import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Weather.module.scss";

const Weather = (): JSX.Element => {
  const localState: any = useLocation().state;
  const [locationData, setLocationData] = useState<any>({
    location: { name: "", country: "", region: "" },
    current: { temperature: "", weather_icons: [], weather_descriptions: [] },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!localState.data) {
      navigate("/");
    } else {
      const { location, current } = localState.data;
      setLocationData({ location, current });
    }
  }, [localState.data, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.weatherData}>
          <img className={styles.weatherIcon} alt="icon" src={locationData.current.weather_icons[0]} width={25} height={25} />
          <span>
            {locationData.current.temperature}
            <sup>°C</sup>
          </span>
        </div>
        <h4>{locationData.current.weather_descriptions[0]}</h4>
        <p>
          {locationData.location.name}, {locationData.location.region},&nbsp;
          {locationData.location.country}
        </p>
      </div>
      <button onClick={() => navigate("/")}> ← Back</button>
    </div>
  );
};
export default Weather;
