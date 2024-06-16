import axios from 'axios';

class WeatherManager {
    constructor(weatherMap) {
        this.weatherMap = weatherMap;
    }

    async getForecastData(latitude, longitude) {
        try {
            const metadataUrl = `https://api.weather.gov/points/${latitude},${longitude}`;
            console.log(`Fetching metadata from URL: ${metadataUrl}`);
            const metadataResponse = await axios.get(metadataUrl);
            const forecastUrl = metadataResponse.data.properties.forecast;
            console.log(`Fetching forecast data from URL: ${forecastUrl}`);
            const forecastResponse = await axios.get(forecastUrl);
            return forecastResponse.data;
        } catch (error) {
            console.error('Error fetching forecast data:', error);
            throw error;
        }
    }

    async getRadarStations() {
        try {
            const radarStationsUrl = 'https://api.weather.gov/radar/stations';
            console.log(`Fetching radar stations from URL: ${radarStationsUrl}`);
            const radarStationsResponse = await axios.get(radarStationsUrl);
            return radarStationsResponse.data.features;
        } catch (error) {
            console.error('Error fetching radar stations:', error);
            throw error;
        }
    }

    async getRadarData(stationIdentifier) {
        try {
            const radarDataUrl = `https://api.weather.gov/radar/stations/${stationIdentifier}/images/latest`;
            console.log(`Fetching radar data from URL: ${radarDataUrl}`);
            const radarDataResponse = await axios.get(radarDataUrl);
            return radarDataResponse.data.properties.imageUrl;
        } catch (error) {
            console.error('Error fetching radar data:', error);
            throw error;
        }
    }
}

export default WeatherManager;
