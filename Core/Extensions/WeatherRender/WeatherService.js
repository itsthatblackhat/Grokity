const axios = require('axios');

const BASE_URL = "https://api.weather.gov";

const getWeatherAlerts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/alerts`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather alerts:', error);
        throw error;
    }
};

const getActiveWeatherAlerts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/alerts/active`);
        return response.data;
    } catch (error) {
        console.error('Error fetching active weather alerts:', error);
        throw error;
    }
};

const getWeatherByZone = async (zoneId) => {
    try {
        const response = await axios.get(`${BASE_URL}/alerts/active/zone/${zoneId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching weather for zone ${zoneId}:`, error);
        throw error;
    }
};

// Add more functions as needed...

module.exports = {
    getWeatherAlerts,
    getActiveWeatherAlerts,
    getWeatherByZone,
};
