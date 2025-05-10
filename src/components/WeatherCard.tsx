import "./WeatherCard.css";
import "./WeatherIcon";
import { useEffect, useState } from "react";
import WeatherIcon, {WeatherType} from "./WeatherIcon";

export interface IWeatherCard
{
    key: string;
    title: string;
    isNight?: boolean;
    weather: WeatherType;
    weatherString?: string;
    tempMain: number;
    tempSub?: number;
}

export default function WeatherCard(props: IWeatherCard)
{
    // Update render on props value changed
    const [title, setTitle] = useState("Title");
    const [weather, setWeather] = useState(WeatherType.Clear);
    const [isNight, setIsNight] = useState(false);
    const [tempMain, setTempMain] = useState("0");
    const [tempSub, setTempSub] = useState("0");
    useEffect(() => {
        const interval = setInterval(() => {
            // Set time
            setTitle(props.title);
            // Set weather icon
            setWeather(props.weather);
            if (props.isNight)
            {
                setIsNight(true);
            }
            else
            {
                setIsNight(false);
            }
            // Set temperature
            setTempMain(props.tempMain.toString());
            if (props.tempSub)
            {
                setTempSub(props.tempSub.toString());
            }
        }, 100);
        return () =>
        {
            clearInterval(interval);
        }
    }, [props]);

    return (
    <div className="weather-card">
        <h4 className="forecast-title">{title}</h4>
        <div className="spacing"></div>
        <WeatherIcon weather={weather} isNight={isNight} title={props.weatherString}/>
        <div className="spacing"></div>
        {
            props.tempSub? 
            <div className="flex-block">
                <h3 className="forecast-temperature-high">{tempMain}°</h3>
                <h3 className="forecast-temperature-divider">/</h3>
                <h3 className="forecast-temperature-low">{tempSub}°</h3>
            </div>
            :
            <h3 className="forecast-temperature">{tempMain}°</h3>
        }
    </div>
    );
}