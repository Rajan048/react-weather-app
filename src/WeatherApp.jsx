import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        feelsLike: 25,
        temp: 27,
        tempMin: 22,
        tempMax: 30,
        humidity: 78,
        weather: "scattered clouds",
        icon: "03d",
        city: "Mumbai",
        country: "IN"
    });

    let updateInfo = (newInfo)=>{
        setWeatherInfo(newInfo);
    }
    return (
        <div style={{ textAlign: "center" }}>
            <h2>Weather App by Rajan</h2>
            <SearchBox updateInfo = {updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    )
}