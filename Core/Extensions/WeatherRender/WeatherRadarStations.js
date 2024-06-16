import React from 'react';

const WeatherRadarStations = ({ stations }) => {
    return (
        <div>
            <h2>Available Radar Stations</h2>
            <ul>
                {stations.map((station, index) => (
                    <li key={index}>
                        <div><strong>Name:</strong> {station.properties.name}</div>
                        <div><strong>ID:</strong> {station.properties.stationIdentifier}</div>
                        <div><strong>Elevation:</strong> {station.properties.elevation.value} meters</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WeatherRadarStations;
