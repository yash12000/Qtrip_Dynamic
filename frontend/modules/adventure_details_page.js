import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  return params.get('adventure');
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  const backendEndpoint = "http://52.66.232.143:8082";
    const apiUrl = `${backendEndpoint}/adventures/detail?adventure=${adventureId}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // console.error("Error fetching adventure details:", error);
        return null;
    }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const { name, subtitle, images, content } = adventure;
    const adventureNameElement = document.getElementById('adventure-name');
    const adventureSubtitleElement = document.getElementById('adventure-subtitle');
    const photoGalleryElement = document.getElementById('photo-gallery');
    const adventureContentElement = document.getElementById('adventure-content');
    adventureNameElement.textContent = name;
    adventureSubtitleElement.textContent = subtitle;
    adventureContentElement.innerHTML = content;
    photoGalleryElement.innerHTML = '';
    images.forEach((image) => {
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('activity-card-image');
        imageDiv.innerHTML = `<img src="${image}" class="adventure.images.length" alt="Adventure image">`;
        photoGalleryElement.appendChild(imageDiv);
    });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoGallery = document.getElementById('photo-gallery');

    let carouselInnerHTML = `
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        ${images.map((_, index) => `<li data-target="#carouselExampleIndicators" data-slide-to="${index}" ${index === 0 ? 'class="active"' : ''}></li>`).join('')}
      </ol>
      <div class="carousel-inner">
        ${images.map((image, index) => `
          <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img class="d-block w-100 activity-card-image" src="${image}" alt="Slide ${index + 1}">
          </div>
        `).join('')}
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>`;

    photoGallery.innerHTML = carouselInnerHTML;
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const soldOutPanel = document.getElementById('reservation-panel-sold-out');
    const availablePanel = document.getElementById('reservation-panel-available');
    const costPerHeadElement = document.getElementById('reservation-person-cost');

    if (!soldOutPanel || !availablePanel || !costPerHeadElement) {
        console.error('Required elements not found in the DOM');
        return;
    }

    if (adventure.available) {
        soldOutPanel.style.display = 'none';
        availablePanel.style.display = 'block';
        costPerHeadElement.innerHTML = adventure.costPerHead;
    } else {
        soldOutPanel.style.display = 'block';
        availablePanel.style.display = 'none';
    }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const totalCost = persons * adventure.costPerHead;
    const totalCostElement = document.getElementById('reservation-cost');
    if (totalCostElement) {
        totalCostElement.innerHTML = totalCost;
    } else {
        console.error('Element with id "reservation-cost" not found.');
    }
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById('myForm');
    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const name = form.elements['name'].value;
        const date = form.elements['date'].value;
        const person = parseInt(form.elements['persons'].value, 10);
        const reservationData = {
            name: name,
            date: date,
            person: person,
            adventure: adventure.id
        };
        const backendEndpoint = "http://52.66.232.143:8082";
        const url = `${backendEndpoint}/reservations/new`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reservationData)
            });
            const result = await response.json();
            if (response.ok) {
                alert('Success!');
                window.location.reload();
            } else {
                alert('Failed!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed!');
        }
    });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const bannerElement = document.getElementById('reserved-banner');
    
    if (adventure.reserved) {
      bannerElement.style.display = 'block';
    } else {
      bannerElement.style.display = 'none';
    }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
