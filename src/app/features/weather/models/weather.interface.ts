export interface WeatherDescription {
  icon: string;
  code: number;
  description: string;
}

export interface CurrentWeather {
  temp: number;
  city_name: string;
  max_temp: number;
  min_temp: number;
  country_code: string;
  state_code: string;
  weather: WeatherDescription;
}

export interface WeatherResponse {
  count: number;
  city_name: string;
  state_code: string;
  data: CurrentWeather[];
}
