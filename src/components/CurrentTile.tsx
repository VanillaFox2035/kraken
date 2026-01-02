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
    humidity: 0,
}

interface ICurrentTile
{    
    weatherCard: ICurrentWeatherCard;
}

export default function CurrentTile(props: ICurrentTile)
{
    // Weather update
    const [weatherCard, setWeatherCard] = useState(defaultCard);

    // Time update
    const [timeSecond, setTimeSecond] = useState("00");

    function SetTimeTile()
    {
        setTimeSecond(GetFormattedTimeSecond());
    }

    useEffect(() => {
        // Update on prop change
        setWeatherCard(props.weatherCard);

        // Update every 0.1 seconds
        SetTimeTile();
        const interval = setInterval(SetTimeTile, 100);

        // Clear clock after component destroyed
        return () => {
            clearInterval(interval);
        }
    }, [props]);

    function GetFormattedTimeSecond(): string
    {
        const second: string = PadNumber(new Date().getSeconds(), 2);
        const result = ":" + second;
        return result;
    }

    function PadNumber(input: number, length: number): string
    {
        let result = input.toString();
        while (result.length < length)
        {
            result = "0" + result;
        }
        return result;
    }

    function CheckNotAvailable(input :number): string
	{
		if (input.toString() === "-99")
		{
			return "?";
		}
		return input.toString();
	}

    return (
        <>
        <div className="current-tile">
            <WeatherIcon weather={weatherCard.weather} isNight={weatherCard.isNight} width="150spx" title={weatherCard.weatherString}/> 
            <h1 className="current-temperature">{CheckNotAvailable(weatherCard.temperature)}°</h1>
            <div className="current-time">{timeSecond}</div>
        </div>
        </>
    );
}

