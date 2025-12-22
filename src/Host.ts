//import fetch from "node-fetch";
import { ICurrentWeatherCard, defaultCard as defaultCardCurrent } from "./components/CurrentTile";
import { WeatherType } from "./components/WeatherIcon";
import { host } from "./App";

export default class Host
{
    // Public accessed data
	private isInitialized = false;
    public weatherCardCurrent: ICurrentWeatherCard = {...defaultCardCurrent}; // Deep copy
	public currentLocation: string = "名間";
	public locationList: any = {};

    constructor()
    {

    }

    public Initialize()
    {
		if (this.isInitialized)
		{
			return;
		}
		this.isInitialized = true;
		this.RequestLocationData();
        this.RequestWeatherData();
    }

    public RequestWeatherData()
    {
		console.log(`Requested weather data at ${this.GetDateString()}`);
        const url = "http://122.117.246.47:4200/";
        this.SendRequest(url + "CurrentWeather", this.ParseCurrentWeather, this.AlertError);
    }

	public RequestLocationData()
	{
		console.log(`Requested location data at ${this.GetDateString()}`);
        const url = "http://122.117.246.47:4200/";
		this.SendRequest(url + "LocationList", this.SaveLocationData, this.AlertError);
		const query = window.location.search;
		const params = new URLSearchParams(query);
		let location = params.get("location");
		if (location)
		{
			this.currentLocation = location;
		}
		else
		{
			this.currentLocation = "名間"; // Default when no location given
		}
	}
	
	private SaveLocationData(data: any)
	{
		host.locationList = data;
	}

	private ParseCurrentWeather(data: any)
	{
		// Parse data
		const stationData = data.records.Station[0];
		const weatherData = stationData.WeatherElement;
		const lastUpdatedTime = data.timestamp;
		const lastUpdatedHour = host.PadNumber(new Date(lastUpdatedTime).getHours().toString(), 2);
		const lastUpdatedMinute = host.PadNumber(new Date(lastUpdatedTime).getMinutes().toString(), 2);

		// Render fields
		host.weatherCardCurrent.location = host.currentLocation;
		host.weatherCardCurrent.locationSub = ""; // Locked for now
		host.weatherCardCurrent.weather = host.TranslateWeather(weatherData.Weather);
		host.weatherCardCurrent.weatherString = weatherData.Weather;
		host.weatherCardCurrent.isNight = host.GetIsNight(new Date().getHours());
		host.weatherCardCurrent.temperature = Math.round(weatherData.AirTemperature);
		host.weatherCardCurrent.precipitation = weatherData.Now.Precipitation;
		host.weatherCardCurrent.humidity = weatherData.RelativeHumidity;
		host.weatherCardCurrent.lastUpdated = lastUpdatedHour + ":" + lastUpdatedMinute;
	}

	private AlertError(error: string)
	{
		console.error(error);
	}

	private async SendRequest(url: string, resolve: (data: object) => void, reject: (error: string) => void)
	{
		let data = {};
		try
		{
			const response = await fetch(url + "?location=" + host.currentLocation);
			if (!response.ok)
			{
				reject(`Response status: ${response.status}`);
			}
			data = await response.json();
		}
		catch (e)
		{
			reject(`Fetching ${url} failed! ${e}`);
		}
		resolve(data);
	}

	public TranslateWeather(inputWx: string): WeatherType
	{
		// Record word inclusions
		const clear: boolean = inputWx.includes("晴");
		const partlyCloudy: boolean = inputWx.includes("多雲");
		const overcast: boolean = inputWx.includes("陰");
		const thunder: boolean = inputWx.includes("雷");
		const scatteredRain: boolean = inputWx.includes("局部") || inputWx.includes("短暫");
		const showers: boolean = inputWx.includes("雨");
		const snow: boolean = inputWx.includes("雪");
		const fog: boolean = inputWx.includes("霧");

		// Decides weather
		let weather = WeatherType.Unknown;
		if (clear)
		{
			weather = WeatherType.Clear;
			if (partlyCloudy)
			{
				if (inputWx.indexOf("晴") < inputWx.indexOf("多雲"))
				{
					weather = WeatherType.MostlyClear;
				}
				else
				{
					weather = WeatherType.PartlyCloudy;
				}
			} 
			if (overcast) weather = WeatherType.MostlyCloudy;
			if (showers) weather = WeatherType.ScatteredShowers;
			if (scatteredRain) weather = WeatherType.ScatteredShowers;
			if (thunder) weather = WeatherType.ScatteredThunderstorms;
			if (snow) weather = WeatherType.ScatteredSnow;
		}
		else if (partlyCloudy)
		{
			weather = WeatherType.PartlyCloudy;
			if (overcast) weather = WeatherType.Cloudy;
			if (showers) weather = WeatherType.ShowersRain;
			if (scatteredRain) weather = WeatherType.Drizzle;
			if (thunder) weather = WeatherType.Thunderstorms;
			if (snow) weather = WeatherType.ShowersSnow;
		}
		else if (overcast)
		{
			weather = WeatherType.Cloudy;
			if (showers) weather = WeatherType.ShowersRain;
			if (scatteredRain) weather = WeatherType.Drizzle;
			if (thunder) weather = WeatherType.Thunderstorms;
			if (snow) weather = WeatherType.ShowersSnow;
		}
		else if (thunder)
		{
			weather = WeatherType.Thunderstorms;
		}
		else if (scatteredRain)
		{
			weather = WeatherType.Drizzle;
		}
		else if (showers)
		{
			weather = WeatherType.ShowersRain;
		}
		else if (snow)
		{
			weather = WeatherType.ShowersSnow;
		}
		else if (fog)
		{
			weather = WeatherType.Haze;
		}

		return weather;
	}

	public GetDate(timeString: string): number
	{
		const standardTime = timeString.replace(" ", "T");
		return Date.parse(standardTime);
	}

	public GetIsNight(hour: number): boolean
	{
		let result = false;
		if (hour <= 5 || hour >= 18)
		{
			result = true;
		}
		return result;
	}

	// Pad number
	public PadNumber(input: string, pad: number): string
	{
		let result = input;
		while(result.length < pad)
		{
			result = "0" + result;
		}
		return result;
	}
	
		// For printing date
	private GetDateString(): string
	{
		const year = new Date().getFullYear().toString();
		const month = this.PadNumber((new Date().getMonth() + 1).toString(), 2);
		const date = this.PadNumber(new Date().getDate().toString(), 2);
		const hour = this.PadNumber(new Date().getHours().toString(), 2);
		const minute = this.PadNumber(new Date().getMinutes().toString(), 2);
		const second = this.PadNumber(new Date().getSeconds().toString(), 2);
		return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
	}
}