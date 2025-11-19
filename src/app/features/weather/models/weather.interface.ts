export interface WeatherDescription {
  icon: string;
  code: number;
  description: string;
}

export interface CurrentWeather {
  temp: number;
  city_name: string;
  country_code: string;
  state_code: string;
  weather: WeatherDescription;
}

export interface WeatherResponse {
  count: number;
  data: CurrentWeather[];
}
