import axios from 'axios';

class WeatherManager {
    async fetchWeatherMetadata(latitude, longitude) {
        const url = `http://localhost:8008/weather/points/${latitude},${longitude}`;
        const response = await axios.get(url);
        return response.data;
    }

    async initialize(latitude, longitude) {
        try {
            const metadata = await this.fetchWeatherMetadata(latitude, longitude);
            console.log('Metadata response:', metadata);
            const forecastUrl = metadata.properties.forecast;
            const forecastResponse = await axios.get(forecastUrl);
            console.log('Forecast response:', forecastResponse.data);
            return {
                metadata,
                forecast: forecastResponse.data
            };
        } catch (error) {
            console.error('Error initializing weather manager:', error);
            throw error;
        }
    }
}

export default WeatherManager;
