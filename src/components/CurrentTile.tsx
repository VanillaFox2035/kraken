import "./CurrentTile.css";
import { useEffect, useState } from "react";
import WeatherIcon, { WeatherType } from "./WeatherIcon";

export interface ICurrentWeatherCard
{
    lastUpdated: string;
    location: string;
    locationSub?: string;
    weather: WeatherType;
    weatherString: string;
    isNight: boolean;
    temperature: number;
    precipitation: number;
    humidity: number;
}

export const defaultCard: ICurrentWeatherCard = 
{
    lastUpdated: "00:00",
    location: "新莊",
    locationSub: "Xinzhuang",
    weather: WeatherType.Clear,
    weatherString: "晴",
    isNight: false,
    temperature: 0,
    precipitation: 0,
    humidity: 0
}

interface ICurrentTile
{    
    weatherCard: ICurrentWeatherCard;
}

export default function CurrentTile(props: ICurrentTile)
{
    // Weather update
    const [weatherCard, setWeatherCard] = useState(defaultCard);

    function UpdateWeatherCard() 
    {
        setWeatherCard(props.weatherCard);
    }

    useEffect(() => {
        const interval =setInterval(() => {
            UpdateWeatherCard();
        }, 1000);

        // Clear clock after component destroyed
        return () => {
            clearInterval(interval);
        }
    }, []);

    function CheckNotAvailable(input :number): string
	{
		if (input === -99)
		{
			return "N/A";
		}
		return input.toString();
	}

    return (
        <div className="current-tile">
            <WeatherIcon weather={weatherCard.weather} isNight={weatherCard.isNight} width="150px" title={weatherCard.weatherString}/> 
            <h1 className="current-temperature">{CheckNotAvailable(weatherCard.temperature)}°</h1>
        </div>
    );
}

