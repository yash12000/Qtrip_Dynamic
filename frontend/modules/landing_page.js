import config from "../conf/index.js";

async function init() {
  console.log("From init()");
  console.log(config.backendEndpoint);
  try {
    let cities = await fetchCities();

    if (cities) {
      cities.forEach(city => {
        addCityToDOM(city.id, city.city, city.description, city.image);
      });
    }
  } catch (error) {
    console.error('Error during initialization:', error);
    console.error('Error details:', error.message, error.stack);
  }
}


async function fetchCities() {
  try {
    const response = await fetch('http://52.66.232.143:8082/cities');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log('Error fetching cities:', error);
    return null;
  }
}


function addCityToDOM(id, city, description, image) {
  const cityCard = document.createElement("div");
  cityCard.className = "col-6 col-lg-3 mb-4";

  cityCard.innerHTML = `
    <a href="pages/adventures/?city=${id}" id="${id}" class="text-decoration-none">
      <div class="tile">
        <div class="tile-text text-center">
          <h5>${city}</h5>
          <p>${description}</p>
        </div>
        <img src="${image}" alt="${city}" class="img-fluid" />
      </div>
    </a>
  `;

  const dataDiv = document.getElementById("data");
  dataDiv.appendChild(cityCard);
}

export { init, fetchCities, addCityToDOM };
