const container = document.getElementById("countries-container"); //cards are inserted here

fetch("https://restcountries.com/v2/all")
  .then((response) => response.json()) //js object
  .then((countries) => {
    
    countries.forEach((country) => {
    
      const card = document.createElement("div");
      card.className = "country-card";

      card.innerHTML = `
        <h3>${country.name}</h3>
        <img src="${country.flags.svg}" alt="${country.name} Flag">
        <p><strong>Capital:</strong> ${country.capital || "N/A"}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Country Code:</strong> ${country.alpha3Code}</p>
        <button onclick="getWeather('${country.capital}')"> Weather </button>
      `;

      container.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("error in fetching", error);
    container.innerHTML = "server or internet issue, pls try later!";
  });



function getWeather(capital){
  if(!capital){
    alert('error! no data available');
    return;
  }

  const key = "b6e4752ca73ed6ae7c22840e8aba8ed0";
  const weatherAPI= `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${key}&units=metric`;

  fetch(weatherAPI)
    .then((response)=> response.json())
    .then((data) => {
      if(data.cod== 200){
        alert("weather in " +capital+ ":\n" + "Temprature: " + data.main.temp + 
          "degrees \n" + "Condition: " + data.weather[0].description + "Humidity: " 
          + data.main.humidity + "%");
      }
    })
    .catch((error)=> {
      console.log("error w weather data", error);
      alert("couldnt fetch weather");
    });
}
