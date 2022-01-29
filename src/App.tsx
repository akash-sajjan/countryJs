import { Routes, Route, Link } from "react-router-dom";
import styles from "./App.module.css";
import Home from "./pages/Home";
import Country from "./pages/Country";
import Weather from "./pages/Weather";

function App() {
  return (
    <div>
      <Link className={styles.header} to="/">
        Country Weather App
      </Link>
      <div className={styles.appContainer}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="country" element={<Country />} />
          <Route path="weather" element={<Weather />} />
          <Route path="*" element={<Weather />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
