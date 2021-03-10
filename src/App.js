import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import "./App.css";
import { AppContext } from "./Context/ContextProvider";
import backGround from "./img/back2.jpeg";

function App() {
  const [search, setSearch] = useState("Tel Aviv");
  const [weatherObj, setWeatherObj] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let date = new Date();
  const API = "0e67d88088aeb9e83f456200e2202ddc";
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var day = days[date.getDay()];
  var hr = date.getHours();
  var min = date.getMinutes();
  var numDate = date.getDate();
  var month = date.getMonth();
  if (min < 10) {
    min = "0" + min;
  }
  var ampm = "am";
  if (hr > 12) {
    hr -= 12;
    ampm = "pm";
  }

  const getWeather = async () => {
    await axios({
      method: "GET",
      url: `http://api.weatherstack.com/current?access_key=${API}&query=${search}`,
    }).then((res) => {
      if (!res.data.success) {
        setError(res.data.error);
      }
      setWeatherObj(res.data);
      console.log(res.data);
      return setLoading(false);
    });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    getWeather();
  }, [loading]);

  return (
    <div
      className="weather-container"
      style={{ backgroundImage: `url(${backGround})` }}
    >
      <div className="search-div">
        <div className="search-input">
          <InputGroup className="mb-3">
            <FormControl
              className="mb-33"
              onChange={handleChange}
              placeholder="Insert Location"
              aria-label="Insert Location"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button className="mb-333" variant="info" onClick={getWeather}>
                Search
              </Button>{" "}
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
      {!loading && (
        <div className="weather-presentation">
          <div className="temperature-icon-div">
            <img
              src={weatherObj.current.weather_icons[0]}
              alt="icon"
              style={{
                borderRadius: "50%",
                width: "3rem",
                float: "right",
              }}
            />
            <div className="currentDateTime">
              <p className="currentDateTime-p">
                {day} {numDate}/{month + 1} {hr}:{min} {ampm}
              </p>
            </div>
          </div>

          <div className="location-div">
            <h2 className="temperature">
              {weatherObj.current.temperature}&#176;
              <h5>Feels Like {weatherObj.current.feelslike}</h5>
            </h2>{" "}
            <h2 style={{ textAlign: "center" }}>{weatherObj.location.name}</h2>
            <h3 style={{ textAlign: "center" }}>
              {weatherObj.location.country}
            </h3>
          </div>
          <div className="wind_details">
            <ul class="list">
              <li>
                <span className="list-title">local time:</span>{" "}
                {weatherObj.location.localtime.slice(10, 16)}
              </li>
              <li>
                <span className="list-title">wind:</span>{" "}
                {weatherObj.current.wind_speed}km/h
              </li>
              <li>
                <span className="list-title">visibility:</span>{" "}
                {weatherObj.current.visibility}%
              </li>
              <li>
                <span className="list-title">humidity:</span>{" "}
                {weatherObj.current.humidity}%
              </li>
              <li>
                <span className="list-title">cloud cover:</span>{" "}
                {weatherObj.current.cloudcover}%
              </li>
            </ul>
          </div>
        </div>
      )}

      {error ? <p>{error.info}</p> : ""}
    </div>
  );
}

export default App;
