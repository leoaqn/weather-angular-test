export interface WeatherDescription {
  icon: string;
  code: number;
  description: string;
}

export interface CurrentWeather {
  date: string;
  temp: number;
  city_name: string;
  max_temp: number;
  min_temp: number;
  country_code: string;
  state_code: string;
  weather: WeatherDescription;
}

export interface ForecastDay {
  datetime: string;
  temp: number;
  max_temp: number;
  min_temp: number;
  weather: WeatherDescription;
}

export interface WeatherResponse {
  city_name: string;
  state_code: string;
  country_code: string;
  lat: number;
  lon: number;
  timezone: string;
  data: CurrentWeather[];
}

export interface ForecastResponse {
  city_name: string;
  state_code: string;
  data: ForecastDay[];
}
