const KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

async function getForecast(city,days = 3) {
    const response  = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${city}&days=${days}`,
        {
            method: "GET",
        }
    )
    if(!response.ok){
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data ;
    
}

export default getForecast