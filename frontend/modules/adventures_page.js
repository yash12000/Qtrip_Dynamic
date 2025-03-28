import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  const city = params.get('city');
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  const backendEndpoint = "http://52.66.232.143:8082";
    const apiUrl = `${backendEndpoint}/adventures?city=${city}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // console.error("Error fetching adventure city:", error);
        return null;
    }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const parentContainer = document.getElementById('adventure-container');
    console.log('Parent Container:', parentContainer);

    adventures.forEach(adventure => {
        const adventureLink = document.createElement('a');
        adventureLink.setAttribute('href', `detail/?adventure=${adventure.id}`);
        adventureLink.className = 'activity-card-link';
        adventureLink.id = adventure.id;
        console.log('Adventure Link:', adventureLink);

        const adventureCard = document.createElement('div');
        adventureCard.className = 'activity-card';

        adventureCard.innerHTML = `
            <div class="category-banner">${adventure.category}</div>
            <img class="activity-card img" src="${adventure.image}" alt="${adventure.name}">
            <div class="adventure-details">
                <h5>${adventure.name}</h5>
                <p>Cost: ₹${adventure.costPerHead}</p>
                <p>Duration: ${adventure.duration} hours</p>
            </div>
        `;

        adventureLink.appendChild(adventureCard);
        parentContainer.appendChild(adventureLink);
        console.log('Appended Adventure:', adventureCard);
    }); 
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(adventures, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return adventures.filter(adventure => adventure.duration >= low && adventure.duration <= high);
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(adventures, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return adventures.filter(adventure => categoryList.includes(adventure.category));
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(adventures, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredAdventures = adventures;
  if (filters.duration) {
    const [low, high] = filters.duration.split('-').map(Number);
    filteredAdventures = filterByDuration(filteredAdventures, low, high);
  }
  if (filters.category && filters.category.length > 0) {
    filteredAdventures = filterByCategory(filteredAdventures, filters.category);
  }
  return filteredAdventures;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const filters = localStorage.getItem('filters');
  return filters ? JSON.parse(filters) : { duration: null, category: [] };

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const categoryListElement = document.getElementById('category-list');
  categoryListElement.innerHTML = '';
  if (filters.category && filters.category.length > 0) {
    filters.category.forEach(category => {
      const pill = document.createElement('span');
      pill.className = 'category-filter';
      pill.innerText = category;
      categoryListElement.appendChild(pill);
    });
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
