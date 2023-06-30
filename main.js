const search = document.querySelector('.search'),
searchIcon = document.querySelector('header>button'),
cityName = document.querySelector('main>h1'),
time = document.querySelector('.time'),
temperature = document.querySelector('.gradus'),
weatherIcon = document.querySelector('.dayNight-icon'),
weatherDesc = document.querySelector('.weatherDesc'),
dayNight = document.querySelector('.dayNight'),
humidity = document.querySelector('.humidity'),
windSpeed = document.querySelector('.speed'),
content = document.querySelector('#content'),
loading = document.querySelector('.loading'),
invalidError = document.querySelector('.errorInvalid'),
emptyError = document.querySelector('.errorEmpty'),
footer = document.querySelector('footer'),
main = document.querySelector('main');

getData('tbilisi');


async function getData(city) {
    const apiKey = '5aaca4098066ff4e807e6d42eecce65d';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    

    try {

      loading.style.display = 'flex';
      setTimeout(function() {
        loading.style.display = 'none';
      }, 3000);

        const response = await fetch(apiUrl);
        const data = await response.json();
    
        cityName.innerHTML = data.name;
        temperature.innerHTML = Math.round(data.main.temp);
        humidity.innerHTML = data.main.humidity;
        windSpeed.innerHTML = data.wind.speed;
        
        invalidError.style.display = 'none';
        emptyError.style.display = 'none';
        footer.style.display = "flex";
        main.style.display = 'block';
        content.style.background = "url('https://source.unsplash.com/1920x1080/?"+ city +"')";
        search.value = '';

        const timestamp = data.dt;
        const date = new Date(timestamp * 1000);
        const timezoneOffsetMinutes = date.getTimezoneOffset();
        const apiTimezoneOffsetMs = data.timezone * 1000;
        const totalOffsetMs = timezoneOffsetMinutes * 60000 + apiTimezoneOffsetMs;
        const localTime = new Date(date.getTime() + totalOffsetMs);
        const hours = localTime.getHours();
        const formattedTime = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
        time.innerHTML = formattedTime;

        if (hours >= 6 && hours < 18) {
          dayNight.innerHTML = 'day'
        } else {
          dayNight.innerHTML = 'night'
        }

        if (data.weather[0].main == 'Clear') {
          weatherDesc.innerHTML = 'Clear';
          if (hours >= 6 && hours < 18) {
            weatherIcon.innerHTML = 'clear_day';
            } else {
            weatherIcon.innerHTML = 'clear_night';
            }
        } else if (data.weather[0].main == 'Clouds'){
          weatherIcon.innerHTML = 'cloud';
          weatherDesc.innerHTML = 'Cloudy';
        } else if (data.weather[0].main == 'Snow'){
          weatherIcon.innerHTML = 'cloudy_snowing';
          weatherDesc.innerHTML = 'Snowy';
        } else if (data.weather[0].main == ('Rain' || 'Drizzle' || 'Thunderstorm')){
          weatherIcon.innerHTML = 'rainy';
          weatherDesc.innerHTML = 'Rainy';
        } else {
          weatherIcon.innerHTML = 'foggy';
          weatherDesc.innerHTML = 'Foggy';
        }
        
      } catch (error) {
        console.log('Error:', error.message);
        invalidError.style.display = 'block';
        emptyError.style.display = 'none';
        footer.style.display = "none";
        main.style.display = 'none';

        loading.style.display = 'flex';
        setTimeout(function() {
          loading.style.display = 'none';
        }, 0);
        
        }
    }

searchIcon.addEventListener('click', () => {
  if (search.value !== '') {
    getData(search.value);
    loading.style.display = 'flex';
    setTimeout(function() {
      loading.style.display = 'none';
    }, 2000);
  } else {
    emptyError.style.display = 'block'
    loading.style.display = 'flex';
    setTimeout(function() {
      loading.style.display = 'none';
    }, 0);
  }
    
});

search.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    if (search.value !== '') {
      getData(search.value);

      loading.style.display = 'flex';
      setTimeout(function() {
        loading.style.display = 'none';
      }, 2000);
    } else {
      emptyError.style.display = 'block'

      loading.style.display = 'flex';
      setTimeout(function() {
        loading.style.display = 'none';
      }, 0);
    }
  };
})