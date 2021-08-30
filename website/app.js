// Personal API Key for OpenWeatherMap API
const APIKey = '&appid=c60cd2de942c3919b945012a7ec2c441&units=metric';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Define today's dates
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
  let zipEntry = document.getElementById('zip').value;
  let countryCodeEntry = document.getElementById('country-code').value;
  let feelingsEntry = document.getElementById('feelings').value;
  // console.log(zipEntry, countryCodeEntry, feelingsEntry);
  
  const requestURL = baseURL + zipEntry + ',' + countryCodeEntry + APIKey;
  // console.log(requestURL);

  // API request to openweathermap.org (GET the weather info)
  getWeatherInfo(requestURL)
  // POST collected data to '/addData'
  .then((data) => {
    // console.log(data);
    postData('/addData', {
      date: today,
      city: data.name,
      countryCode: countryCodeEntry,
      temperature: Math.round(data.main.temp),
      feelings: feelingsEntry
    });
  })
  // Update UI
  .then(() => {
    updateUI('.entry-results');
  })
  // Appropriately handle the error (key values are 'zipEntry' and 'countryCodeEntry')
  .catch((error) => {
    alert('Zip or country code is invalid.');
  })
}

/* Function to GET Web API Data*/
const getWeatherInfo = async (url) => {
  // Call  API
  const res = await fetch(url)
    try {
      const weatherData = await res.json();
      return weatherData;
    }  catch(error) {
      // Appropriately handle the error
      console.log("error", error);
    }
}

/* Function to POST data */
const postData = async ( url = '', data = {}) => {
    // console.log(data)
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
    // console.log(newData);
    return newData
  } catch(error) {
    // Appropriately handle the error
    console.log("Error", error);
  }
}

/* Function to GET Project Data */
const retrieveData = async (url = '') => {
  const response = await fetch(url);
  
  try {
    const allData = await response.json();
    return allData;
  } catch(error) {
    // Appropriately handle the error
    console.log('Error', error);
  }
}

/* Function UPDATE UI */
const updateUI = async (DOMelement) => {
  const response = await fetch('/all');

  try {
    const allData = await response.json();
    // console.log(allData);

    document.querySelector(DOMelement).classList.remove('display-none');
    document.getElementById('date').innerHTML = `Today is the <strong>${allData.date}</strong>.`;
    document.getElementById('temp').innerHTML = `In <strong>${allData.city}, ${allData.countryCode.toUpperCase()}</strong>, it is <strong>${allData.temperature}&deg;C</strong>`;
    
    // Check if 'Feelings' entry is empty and handle it accordingly.
    allData.feelings === '' ? 
    document.getElementById('content').innerHTML = `and you feel <strong>empty</strong>.` :
    document.getElementById('content').innerHTML = `and you feel <strong>${allData.feelings}</strong>.`;
  } catch(error) {
    // Appropriately handle the error
    console.log('Error', error);
  }
}

