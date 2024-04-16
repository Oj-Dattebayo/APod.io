const API_KEY =
  'AHU01w2xMTetJySFMJL0PxOydeFkYtttbxcPZclN' ;
function formatDate(date) {
  const yyyy = date.getFullYear().toString();
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function getRandomDate() {
    const start = new Date('1995-06-16');
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    console.log('Generated random date:', formatDate(randomDate)); // Log the generated random date
    return randomDate;
  }

getRandomDate();
function initializedatepicker() {
  const Today = new Date();
  const formattedDate = formatDate(Today);
  console.log('initializing today date', formattedDate);
  document.getElementById('datepicker').max = formattedDate ;
  document.getElementById('datepicker').value = formattedDate ;
}
async function fetchAPODData(date) {
  try {
    const endpoint = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`;
    console.log('Fetching APOD data for date:', date); // Log the date for which APOD data is being fetched
    const response = await fetch(endpoint);
    console.log('Full fetch response:', response); // Log the full fetch response
    const data = await response.json();
    console.log('Received APOD data:', data); // Log the received APOD data
    updateUI(data, date);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
function updateUI(data, date) {
  console.log('Updating UI with APOD data:', date);
  document.getElementById('apod-image').innerHTML =
    `<img src = ${data.url} alt='NOT ABLE TO LOAD IMAGE..'>`;
  document.getElementById('apodTitle').textContent = data.title;
  document.getElementById('apod-date').textContent = `Date: ${date}`;
  document.getElementById('apod-description').textContent = data.explanation;
}
async function loadAPODData() {
  const randomDate = formatDate(getRandomDate());
  console.log("Loading APOD data for a random date:", randomDate);
  await fetchAPODData(randomDate);
}
async function loadSelectedDateAPOD() {
  const selectedDate = document.getElementById('datepicker').value;
  console.log('Loading APOD data for selected date:', selectedDate);
  await fetchAPODData(selectedDate);
}
async function loadCurrentDateAPOD() {
  initializedatepicker();
  const currentDate = formatDate(new Date());
  console.log("Loading APOD data for the current date:", currentDate);
  await fetchAPODData(currentDate);
}
