// Personal API Key for OpenWeatherMap API
const APIKey = '&appid=c60cd2de942c3919b945012a7ec2c441&units=metric';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const baseCityURL = 'api.openweathermap.org/data/2.5/weather?q=';

// Zip: api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&units=metric&appid={API key}
// City: api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


// Today's dates
let date = new Date();
const year = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let today = `${date.getDate()} ${year[date.getMonth()]} ${date.getFullYear()}`;
console.log(today);


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', processData);

/* Function called by event listener */
function processData(event) {
  event.preventDefault(); // to avoid 'undefined' values when clicked first time
  // Inputs values
  const zipEntry = document.getElementById('zip').value;
  // const cityEntry = document.getElementById('zip').value;
  const feelingsEntry = document.getElementById('feelings').value;
  console.log(zipEntry, feelingsEntry);
  
  const requestURL = baseURL + zipEntry + ',AU' + APIKey;
  console.log(requestURL);
  // const requestURL = baseCityURL + cityEntry + APIKey;
  getWeatherInfo(requestURL)
  .then((data) => {
    console.log(data);
    postData('/addData', {
      date: today,
      temperature: data,
      feelings: feelingsEntry
    });
  })
  .then(
    updateUI()
  )
}

/* Function to GET Web API Data*/
const getWeatherInfo = async (url) => {
  // 1. Call  API
  const res = await fetch(url)
    try {
      const weatherData = await res.json();
      console.log(weatherData.main.temp, Math.round(weatherData.main.temp));
      return Math.round(weatherData.main.temp);
      
    }  catch(error) {
      // appropriately handle the error
      console.log("error", error);
    }

}

/* Function to POST data */
const postData = async ( url = '', data = {}) => {
  console.log(data)
  const response = await fetch(url, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data) // body data type must match "Content-Type" header        
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData
  } catch(error) {
    // appropriately handle the error
    console.log("Error", error);
  }
}

/* Function to GET Project Data */
const retrieveData = async (url = '') => {
  const response = await fetch(url);
  
  try {
    const allData = await response.json();
    console.log('From app.js retrieveData function: ' + allData);
    return allData;
  } catch(error) {
    // appropriately handle the error
    console.log('Error', error);
  }
}

/* Function Update UI */
const updateUI = async () => {
  const response = await fetch('/all');

  try {
    const allData = await response.json();
    console.log(allData);

    document.getElementById('date').innerHTML = `Today is the <strong>${allData.date}</strong>.`;
    document.getElementById('temp').innerHTML = `In <strong>Sydney, AU</strong>, it is <strong>${allData.temperature}&deg;C</strong>`;
    document.getElementById('content').innerHTML = `and you feel <strong>${allData.feelings}</strong>.`;
  } catch(error) {
    // appropriately handle the error
    console.log('Error', error);
  }
}

/*
<div id="date">Today is the <strong>27 August 2021</strong>.</div> 
<div id="temp">In <strong>Sydney, AU</strong>, the temperature is <strong>17&deg;C</strong></div>
<div id="content">and you feel <strong>ok</strong>.</div>
*/