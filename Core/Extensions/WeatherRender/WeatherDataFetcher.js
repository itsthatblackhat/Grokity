import React, { Component } from 'react';
import WeatherRadarStations from './WeatherRadarStations';

class WeatherDataFetcher extends Component {
    state = {
        loading: true,
        stations: [],
        error: null
    };

    async componentDidMount() {
        const latitude = 39.3528; // Example latitude
        const longitude = -94.3711; // Example longitude
        const pointsUrl = `https://api.weather.gov/points/${latitude},${longitude}`;

        try {
            // Fetch point data to get observation stations URL
            const pointsResponse = await fetch(pointsUrl, {
                method: 'GET',
                headers: {
                    Accept: 'application/geo+json',
                    'User-Agent': 'your-unique-user-agent', // Replace with your actual user agent
                },
            });

            if (!pointsResponse.ok) {
                throw new Error('Failed to fetch points data');
            }

            const pointsData = await pointsResponse.json();
            const stationsUrl = pointsData.properties.observationStations;

            // Fetch observation stations data
            const stationsResponse = await fetch(stationsUrl, {
                method: 'GET',
                headers: {
                    Accept: 'application/geo+json',
                    'User-Agent': 'your-unique-user-agent', // Replace with your actual user agent
                },
            });

            if (!stationsResponse.ok) {
                throw new Error('Failed to fetch stations data');
            }

            const stationsData = await stationsResponse.json();
            this.setState({ stations: stationsData.features, loading: false });

        } catch (error) {
            console.error('Error fetching data:', error);
            this.setState({ error: error.message, loading: false });
        }
    }

    render() {
        const { loading, stations, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        return (
            <div>
                <WeatherRadarStations stations={stations} />
            </div>
        );
    }
}

export default WeatherDataFetcher;
