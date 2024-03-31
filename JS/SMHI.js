document.addEventListener('DOMContentLoaded', function() {
    fetchWeatherData();
});

function fetchWeatherData() {
    const latitude = 56.6745; // Halmstad
    const longitude = 12.8578;
    const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Kunde inte hämta väderdata:', error));
}

function displayWeatherData(data) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = ''; 

    const datesHandled = new Set();
    const weekdays = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];

    const uniqueDailyForecasts = data.timeSeries.filter(forecast => {
        const date = forecast.validTime.split('T')[0]; // Extrahera bara datumdelen
        if (!datesHandled.has(date)) {
            datesHandled.add(date);
            return true; 
        }
        return false; 
    }).slice(0, 5); // ändra (0,5) för att öka eller minska mäng dagar som vissas

    uniqueDailyForecasts.forEach(forecast => {
        const forecastDate = new Date(forecast.validTime);
        const weekday = weekdays[forecastDate.getDay()]; // Få veckodagen som en sträng
        const temperature = forecast.parameters.find(p => p.name === 't').values[0];
        const roundedTemperature = Math.round(temperature); // Avrunda temperaturen till närmaste heltal
        const weatherSymbol = forecast.parameters.find(p => p.name === 'Wsymb2').values[0];
        const weatherDescription = weatherSymbolDescriptions[weatherSymbol] || 'Molnigt';

        const weatherDayDiv = document.createElement('div');
        weatherDayDiv.classList.add('weather-info');
        weatherDayDiv.innerHTML = `<div class="weather-day">${weekday}</div>
                                   <div class="weather-details">${getWeatherIcon(weatherSymbol)} ${roundedTemperature} °C, ${weatherDescription}</div>`;
        
        weatherInfoDiv.appendChild(weatherDayDiv);
    });
}

function getWeatherIcon(wSymbol) {
    switch (wSymbol) {
        case 1: // Klart och soligt
            return '<i class="wi wi-day-sunny"></i>';
        case 2: // Lätt molnighet
        return '<i class="wi wi-cloud"></i>';
        case 3: // Halvklart
            return '<i class="wi wi-day-cloudy"></i>';
        case 4: // Mulet
            return '<i class="wi wi-cloudy"></i>';
        case 5: // Regnskurar
            return '<i class="wi wi-sleet"></i>';
        case 6: // Regn
            return '<i class="wi wi-rain"></i>';
        case 7: // Snöfall
            return '<i class="wi wi-snow"></i>';
        
        default:
            return '<i class="wi wi-cloud"></i>';
    }
}

const weatherSymbolDescriptions = {
    1: 'Klart och soligt',
    2: 'Lätt molnighet',
    3: 'Halvklart',
    4: 'Molnigt',
    5: 'Regnskurar',
    6: 'Regn',
    7: 'snöfall',
};