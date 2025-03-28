
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let parameter=new URLSearchParams(search)
  return parameter.get("city")
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let cityProm=await fetch(config.backendEndpoint + "/adventures?city="+city)
    let cityData=await cityProm.json()
    return cityData 
    }
    catch(err){
      return null;
    }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((adv)=>{
    let container = document.createElement("div");
    container.setAttribute("class", "col-sm-6 col-lg-3 my-4")
    container.innerHTML += `
    <a href="detail/?adventure=${adv.id}" id="${adv.id}" target="_blank">
    <div class="activity-card">
    <div class="category-banner">
    <h5 class="my-0">${adv.category}</h5>
    </div>
    <img src="${adv.image}">
    <div class="d-flex justify-content-between align-items-center py-2" style="width: 90%">
    <div>
    <h6>${adv.name}</h6>
    <h6>Duration</h6>
    </div>
    <div>
    <h6>${adv.currency} ${adv.costPerHead}</h6>
    <h6>${adv.duration} Hours</h6>
    </div>
    </div>
    </div>
    </a>
    `
    let parent=document.getElementById("data")
    parent.append(container)
  })
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(adventureList, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  return adventureList.filter(adventure => {
    const {duration} = adventure;

    if(duration > low && duration <= high) {
      return true;
    } else {
      return false;
    }
  })

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(adventureList, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  const filterList = adventureList.filter(adventure => categoryList.includes (adventure.category));
  return filterList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(allAdventures, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  if(filters["duration"].length && filters["category"].length) {

    const duration = filters["duration"];
    const splitDuration = duration.split("-");
    const low = splitDuration[0];
    const high = splitDuration[1];

    let filterAdventureFromDuration = filterByDuration(allAdventures, low, high);

    //Filter for Category ------
    const categoryList = filters["category"];
    const filterAdventureFromCategory = filterByCategory(filterAdventureFromDuration, categoryList);

    return filterAdventureFromCategory;

  } else if (filters["duration"].length) {
    
    const duration = filters["duration"];
    const splitDuration = duration.split("-");
    const low = splitDuration[0];
    const high = splitDuration[1];

    let filterAdventureFromDuration = filterByDuration(allAdventures, low, high);
    
    return filterAdventureFromDuration;

  } else if (filters["category"].length) {
    
    const categoryList = filters["category"];
    const filterAdventureFromCategory = filterByCategory(allAdventures, categoryList);

    return filterAdventureFromCategory;
  } else {
    return allAdventures;
  }
  // filterByDuration(allAdventures, );

  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const stringFilter = localStorage.getItem("filters");

  // Place holder for functionality to work in the Stubs
  return JSON.parse(stringFilter);
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  const categoryFilter = filters["category"];
  categoryFilter.forEach(key => {
    let newElem = document.createElement("div");
    newElem.className = "category-filter";
    newElem.innerHTML = `
      <div> ${key} </div>
    `
    document.getElementById("category-list").appendChild(newElem);
  });

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
