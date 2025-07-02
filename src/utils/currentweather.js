const KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;



async function getCurrentWeather(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}`,
    {
      method: "GET",
    },
  )
  if(!response.ok){
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
 
  
   
}
export default getCurrentWeather