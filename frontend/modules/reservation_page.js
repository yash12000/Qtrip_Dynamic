import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  const backendEndpoint = config.backendEndpoint; 
  try {
    const response = await fetch(`${backendEndpoint}/reservations/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const reservations = await response.json();
    console.log('Fetched Reservations:', reservations);
    return reservations;
  } catch (error) {
    // console.error('Error fetching reservations:', error);
    return null;
  }
}

// Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
// function addReservationToTable(reservations) {
//   // TODO: MODULE_RESERVATIONS
//   // 1. Add the Reservations to the HTML DOM so that they show up in the table
//   const noReservationBanner = document.getElementById('no-reservation-banner');
//   const reservationTableParent = document.getElementById('reservation-table-parent');
//   const reservationTable = document.getElementById('reservation-table');

//   reservationTable.innerHTML = '';

//   if (reservations.length === 0) {
//     noReservationBanner.style.display = 'block';
//     reservationTableParent.style.display = 'none';
//   } else {
//     noReservationBanner.style.display = 'none';
//     reservationTableParent.style.display = 'block';

//     reservations.forEach(reservation => {
//       const row = document.createElement('tr');

//       const date = new Date(reservation.date);
//       const bookingTime = new Date(reservation.time);

//       row.id = reservation.id;
//       // row.setAttribute('id',reservation.id);
//       row.innerHTML = `
//         <td>${reservation.id}</td>
//         <td>${reservation.name}</td>
//         <td>${reservation.adventure}</td>
//         <td>${reservation.person === 0 ? 'N/A' : reservation.person}</td>
//         <td>${date.toLocaleDateString('en-IN')}</td>
//         <td>₹${reservation.price}</td>
//         <td>${bookingTime.toLocaleString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
//         <td id=${reservation.id}><a href="detail/?adventure=${reservation.adventure}" class="reservation-visit-button">Visit Adventure</a></td>
//       `;

//       reservationTable.appendChild(row);
//     });
//   }
//   //Conditionally render the no-reservation-banner and reservation-table-parent

//   /*
//     Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
//     The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

//     Note:
//     1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
//     2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
//   */

// }


function addReservationToTable(reservations) {


    const reservationTableElement = document.getElementById("reservation-table");
  const reservationParentTableElement = document.getElementById("reservation-table-parent");
  reservationTableElement.innerHTML = "";
  const noReservationRendering = document.getElementById("no-reservation-banner");
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  if (reservations.length !== 0) {
    noReservationRendering.style.display = "none";
    reservationParentTableElement.style.display = "block";
    reservations.forEach((val, index) => {
      const anchorTag = document.createElement("a");
      anchorTag.setAttribute("href", `../detail/?adventure=${val.adventure}`);
      const buttonElement = document.createElement("button");
      buttonElement.textContent = "Visit Adventure";
      buttonElement.classList.add("reservation-visit-button");
      const trElement = document.createElement("tr");
      const idTdElement = document.createElement("td");
      const bookingTdElement = document.createElement("td");
      const adventureTdElement = document.createElement("td");
      const personTdElement = document.createElement("td");
      const dateTdElement = document.createElement("td");
      const priceTdElement = document.createElement("td");
      const bookingTimeTdElement = document.createElement("td");
      const actionTdElement = document.createElement("td");
      actionTdElement.setAttribute('id',val.id);
      idTdElement.textContent = val.id;
      bookingTdElement.textContent = val.name;
      adventureTdElement.textContent = val.adventureName;
      personTdElement.textContent = val.person;
      dateTdElement.textContent = new Date(val.date).toLocaleDateString("en-IN");
      priceTdElement.textContent = val.price;
      bookingTimeTdElement.textContent = new Date(val.time).toLocaleString("en-IN",options).split(" at").join(",");
      actionTdElement.appendChild(anchorTag);
      anchorTag.appendChild(buttonElement);
      trElement.appendChild(idTdElement);
      trElement.appendChild(bookingTdElement);
      trElement.appendChild(adventureTdElement);
      trElement.appendChild(personTdElement);
      trElement.appendChild(dateTdElement);
      trElement.appendChild(priceTdElement);
      trElement.appendChild(bookingTimeTdElement);
      trElement.appendChild(actionTdElement);
      reservationTableElement.appendChild(trElement);
    });
  } else {
    noReservationRendering.style.display = "block";
    reservationParentTableElement.style.display = "none";
  }
}


export { fetchReservations, addReservationToTable };
