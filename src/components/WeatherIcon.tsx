import { useEffect, useState } from "react";
import "./WeatherIcon.css";

export enum WeatherType
{
    // Day & Night icons
    Clear,
    MostlyClear,
    PartlyCloudy,
    MostlyCloudy,
    ScatteredShowers,
    ScatteredSnow,
    ScatteredThunderstorms,
    // General icons
    Windy,
    Cloudy,
    Haze,
    Drizzle,
    ShowersRain,
    HeavyRain,
    Thunderstorms,
    StrongThunderstorms,
    RainSnow,
    RainHail,
    Flurries,
    ShowersSnow,
    Icy,
    Hail,
    HeavySnow,
    BlowingSnow,
    Blizzard,
    Tornado,
    Typhoon,
    VeryHot,
    VeryCold,
    Umbrella,
    // Error
    Unknown
}

interface IWeatherIcon
{
    weather: WeatherType;
    width?: string;
    isNight?: boolean;
    title?: string;
}

export default function WeatherIcon(props: IWeatherIcon)
{
    // Update render on props value changed
    const [weather, setWeather] = useState(WeatherType.Clear);
    useEffect(() => {
        setWeather(props.weather);
    }, [props]);

    function GetIconPath(weather: WeatherType): string
    {
        const query = window.location.search;
		const params = new URLSearchParams(query);
		let weatherIconType = params.get("weather-icon");
        if (!weatherIconType) 
        {
            // Uses Google's icon as default if none given
            weatherIconType = "Google";
        }

        const base = import.meta.env.BASE_URL;
        let dir = "/WeatherIcons/Google/";
        let file = "question-mark";
        let extention = ".svg";

        switch (weatherIconType) 
        {
            case "Flat":
                dir = "/WeatherIcons/Flat/"
                extention = ".png"
                file = ParseFlatIcon(weather);
                break;
            default:
                file = ParseGoogleIcon(weather);
                break;
        }
        return base + dir + file + extention;
    }

    function ParseGoogleIcon(weather: WeatherType): string
    {
        let file = "General/question-mark";
        switch (weather)
        {
            case WeatherType.Clear:
                file = (props.isNight? "Night/clear_night" : "Day/clear_day");
                break;
            case WeatherType.MostlyClear:
                file = (props.isNight? "Night/mostly_clear_night" : "Day/mostly_clear_day");
                break;
            case WeatherType.PartlyCloudy:
                file = (props.isNight? "Night/partly_cloudy_night" : "Day/partly_cloudy_day");
                break;
            case WeatherType.MostlyCloudy:
                file = (props.isNight? "Night/mostly_cloudy_night" : "Day/mostly_cloudy_day");
                break;
            case WeatherType.ScatteredShowers:
                file = (props.isNight? "Night/scattered_showers_night" : "Day/scattered_showers_day");
                break;
            case WeatherType.ScatteredSnow:
                file = (props.isNight? "Night/scattered_snow_showers_night" : "Day/scattered_snow_showers_day");
                break;
            case WeatherType.ScatteredThunderstorms:
                file = (props.isNight? "Night/isolated_scattered_thunderstorms_night" : "Day/isolated_scattered_thunderstorms_day");
                break;
            case WeatherType.Windy:
                file = "General/windy";
                break;
            case WeatherType.Cloudy:
                file = "General/cloudy";
                break;
            case WeatherType.Haze:
                file = "General/haze_fog_dust_smoke";
                break;
            case WeatherType.Drizzle:
                file = "General/drizzle";
                break;
            case WeatherType.ShowersRain:
                file = "General/showers_rain";
                break;
            case WeatherType.HeavyRain:
                file = "General/heavy_rain";
                break;
            case WeatherType.Thunderstorms:
                file = "General/isolated_thunderstorms";
                break;
            case WeatherType.StrongThunderstorms:
                file = "General/strong_thunderstorms";
                break;
            case WeatherType.RainSnow:
                file = "General/mixed_rain_snow";
                break;
            case WeatherType.RainHail:
                file = "General/mixed_rain_hail_sleet";
                break;
            case WeatherType.Flurries:
                file = "General/flurries";
                break;
            case WeatherType.ShowersSnow:
                file = "General/showers_snow";
                break;
            case WeatherType.Icy:
                file = "General/icy";
                break;
            case WeatherType.Hail:
                file = "General/sleet_hail";
                break;
            case WeatherType.HeavySnow:
                file = "General/heavy_snow";
                break;
            case WeatherType.BlowingSnow:
                file = "General/blowing_snow";
                break;
            case WeatherType.Blizzard:
                file = "General/blizzard";
                break;
            case WeatherType.Tornado:
                file = "General/tornado";
                break;
            case WeatherType.Typhoon:
                file = "General/tropical_storm_hurricane";
                break;
            case WeatherType.VeryHot:
                file = "Day/very_hot";
                break;
            case WeatherType.VeryCold:
                file = "General/very_cold";
                break;
            case WeatherType.Umbrella:
                file = "General/umbrella";
                break;
            default:
                file = "General/question-mark";
                break;
        }
        return file;
    }

    function ParseFlatIcon(weather: WeatherType): string
    {
        let file = "General/question-mark";
        switch (weather)
        {
            case WeatherType.Clear:
                file = (props.isNight? "Night/clear" : "Day/clear");
                break;
            case WeatherType.MostlyClear:
                file = (props.isNight? "Night/partly_cloudy" : "Day/partly_cloudy");
                break;
            case WeatherType.PartlyCloudy:
                file = (props.isNight? "Night/partly_cloudy" : "Day/partly_cloudy");
                break;
            case WeatherType.MostlyCloudy:
                file = (props.isNight? "Night/mostly_cloudy_night" : "Day/mostly_cloudy_day");
                break;
            case WeatherType.ScatteredShowers:
                file = "General/rain";
                break;
            case WeatherType.ScatteredSnow:
                file = "General/snow";
                break;
            case WeatherType.ScatteredThunderstorms:
                file = "General/thunderstorms";
                break;
            case WeatherType.Windy:
                file = "General/haze";
                break;
            case WeatherType.Cloudy:
                file = "General/cloudy";
                break;
            case WeatherType.Haze:
                file = "General/haze";
                break;
            case WeatherType.Drizzle:
                file = "General/rain";
                break;
            case WeatherType.ShowersRain:
                file = "General/rain";
                break;
            case WeatherType.HeavyRain:
                file = "General/rain";
                break;
            case WeatherType.Thunderstorms:
                file = "General/thunderstorms";
                break;
            case WeatherType.StrongThunderstorms:
                file = "General/thunderstorms";
                break;
            case WeatherType.RainSnow:
                file = "General/snow";
                break;
            case WeatherType.RainHail:
                file = "General/hail";
                break;
            case WeatherType.Flurries:
                file = "General/snow";
                break;
            case WeatherType.ShowersSnow:
                file = "General/snow";
                break;
            case WeatherType.Icy:
                file = "General/snow";
                break;
            case WeatherType.Hail:
                file = "General/hail";
                break;
            case WeatherType.HeavySnow:
                file = "General/snow";
                break;
            case WeatherType.BlowingSnow:
                file = "General/snow";
                break;
            case WeatherType.Blizzard:
                file = "General/snow";
                break;
            case WeatherType.Tornado:
                file = "General/tornado";
                break;
            case WeatherType.Typhoon:
                file = "General/thunderstorms";
                break;
            case WeatherType.VeryHot:
                file = "Day/clear";
                break;
            case WeatherType.VeryCold:
                file = "General/snow";
                break;
            case WeatherType.Umbrella:
                file = "General/rain";
                break;
            default:
                file = "General/question-mark";
                break;
        }
        return file;
    }

    return (
        <img className="weather-icon" width={props.width? props.width : "50px"} src={GetIconPath(weather)} title={props.title}/>
    );
}