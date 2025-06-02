import axios from "axios";

interface WeatherApi {
    getWeatherByLocation: (latitude: number, longitude: number) => Promise<string>,
    getWeatherByCityName: (cityName: string) => Promise<string>
}

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const APP_ID = 'c3bd24f13cecf13f96cfdc182bc8d4e8';

/*const WeatherFetchApi: WeatherApi = {
    async getWeatherByCityName(cityName: string): Promise<string> {
        try {
            const response = await fetch(
                `${BASE_URL}?q=${cityName}&units=metric&appid=${APP_ID}`);
            const result = await response.json();
            return JSON.stringify(result);
        } catch (error) {
            return JSON.stringify(error);
        }
    },
    async getWeatherByLocation(latitude: number, longitude: number): Promise<string> {
        try {
            const response = await fetch(
                `${BASE_URL}?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`);
            const result = await response.json();
            return JSON.stringify(result);
        } catch (error) {
            return JSON.stringify(error);
        }
    }
}*/

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    //headers: {'X-Custom-Header': 'foobar'}
});

const WeatherAxiosApi: WeatherApi = {
    async getWeatherByCityName(cityName: string): Promise<string> {
        const response =
            await instance.get(`?q=${cityName}&units=metric&appid=${APP_ID}`);
        return JSON.stringify(response.data);
    },
    async getWeatherByLocation(latitude: number, longitude: number): Promise<string> {
        const response =
            await instance.get(`?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`);
        console.log('response data',response.data);
        return JSON.stringify(response.data);
    }
}

export default WeatherAxiosApi;
