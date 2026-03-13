const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = 'f078297227db886e0cf6b71bbc2bcbc1';

const GEO_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

export async function fetchWeatherData(lat, lon) {
  try {
    let [weatherPromise, forcastPromise] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
      fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
    ]);

    // Check for 401 Unauthorized errors
    if (weatherPromise.status === 401 || forcastPromise.status === 401) {
      throw new Error('Invalid API key. Please see https://openweathermap.org/faq#error401 for more info.');
    }

    // Check for other HTTP errors
    if (!weatherPromise.ok || !forcastPromise.ok) {
      throw new Error(`HTTP error! status: ${weatherPromise.status || forcastPromise.status}`);
    }

    const weatherResponse = await weatherPromise.json();
    const forcastResponse = await forcastPromise.json();
    return [weatherResponse, forcastResponse];
  } catch (error) {
    console.log('Weather API error:', error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
}

export async function fetchCities(input) {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    // Check for 401 Unauthorized errors
    if (response.status === 401) {
      throw new Error('401 Unauthorized: Invalid API key. Please check your GeoDB API key.');
    }

    // Check for other HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Geo API error:', error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
}