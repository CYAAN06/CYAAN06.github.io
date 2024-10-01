const tempRow = document.getElementById('temp');
const humidityRow = document.getElementById('humidity');
const cloudsRow = document.getElementById('clouds');
const rainRow = document.getElementById('rain');
const weatherIcon = document.getElementById('weatherIcon');

function display(data) {
    const temp = data.main.temp - 273.15;
    const humidity = data.main.humidity;
    const clouds = data.clouds.all;
    const rain = data?.rain?.['1h'] || 0;
    const icon = data.weather[0].icon;

    tempRow.innerText = temp.toFixed(2);
    humidityRow.innerText = humidity;
    cloudsRow.innerText = clouds;
    rainRow.innerText = rain;
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
}

userLocation = navigator.geolocation.getCurrentPosition((position) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=f18f04af48681090c5ab6858348b7dd2`;

    fetch(url)  
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            display(data);
        });
});