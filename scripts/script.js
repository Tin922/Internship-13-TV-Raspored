import { tvSchedule } from "./programs.js";

import { createRateButton, createRating } from "./buttons.js";
import {
  checkForParentalPin,
  getNewParentalPinFromUser,
} from "./parental_control.js";
import { createWatchlistButton } from "./buttons.js";
const hrt1 = document.querySelector(".hrt1");
const hrt2 = document.querySelector(".hrt2");
const novaTv = document.querySelector(".nova_tv");
const rtl = document.querySelector(".rtl");
const filteredProgramsContainer = document.getElementById(
  "filteredProgramsContainer"
);
let parentalPin = "0000";
let openPopup = false;
const watchList = [];
const change_parental_pin_button = document.querySelector(
  ".change_parental_pin"
);

//sortiranje programa po vremenu pocetka
tvSchedule.sort((a, b) => {
  const timeA = getTimeInMinutes(a.startTime);
  const timeB = getTimeInMinutes(b.startTime);
  return timeA - timeB;
});
change_parental_pin_button.addEventListener("click", () => {
  const pin = prompt("Upisite roditeljski pin");

  if (pin == parentalPin) {
    const newPin = getNewParentalPinFromUser();
    if (newPin !== null) {
      alert("Pin je promijenjen");
      parentalPin = newPin;
    } else {
      alert("Pin nije promijenjen");
    }
  } else if (pin === null) return;
  else alert("Neispravan roditeljski pin");
});

createTvGuide(tvSchedule);

function createTvGuide(tvSchedule) {
  tvSchedule.forEach((program) => {
    const item = document.createElement("li");
    item.classList.add("tvg_grid__program");

    const container = document.createElement("div");
    container.classList.add("tvg_grid__program__inner");
    item.appendChild(container);

    const time = document.createElement("span");
    time.classList.add("tvg_grid__program__start-time");
    time.textContent = program.startTime;
    container.appendChild(time);

    const title = document.createElement("span");
    title.classList.add("tvg_grid__program__title");
    title.textContent = program.name;
    container.appendChild(title);

    const startTime = getTimeInMinutes(program.startTime);
    const endTime = getTimeInMinutes(program.endTime);
    item.addEventListener("click", () => {
      showPopup(program, tvSchedule);
    });

    item.style.width = (endTime - startTime) * 2.778 + "px";
    if (program.channel == "HRT 1") hrt1.appendChild(item);
    else if (program.channel == "HRT 2") hrt2.appendChild(item);
    else if (program.channel == "Nova TV") novaTv.append(item);
    else rtl.appendChild(item);
  });
}
function getTimeInMinutes(time) {
  const [hours, minutes] = time.split(":");
  return parseInt(hours) * 60 + parseInt(minutes);
}

function showPopup(program) {
  if (openPopup) return;
  if (!checkForParentalPin(program, parentalPin)) return;

  const popupOverlay = document.createElement("div");
  popupOverlay.classList.add("popupOverlay");
  document.body.appendChild(popupOverlay);
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popupContainer");

  popupContainer.innerHTML = `
     <span class="close">&times;</span>
     <h2>${program.name}</h2>
 
     <p> <span class ="program_description">Opis programa:</span>${
       program.description
     }</p>
     <p>${program.isRepeat ? "Repriza" : "Nije repriza"}</p>
     <p>Kanal: ${program.channel}</p>
     <label for="rating">Ocijenite program:</label>
     <input type="number" id="rating" name="rating" min="1" max="5">
     
   `;
  const rating = createRating(program);
  const rateButton = createRateButton(program, rating);
  popupContainer.appendChild(rateButton);
  popupContainer.appendChild(rating);

  const watchlistButton = createWatchlistButton(program, watchList);
  popupContainer.appendChild(watchlistButton);

  document.body.appendChild(popupContainer);
  openPopup = true;

  const closeBtn = popupContainer.querySelector(".close");
  closeBtn.addEventListener("click", () => {
    openPopup = false;
    document.body.removeChild(popupOverlay);
    document.body.removeChild(popupContainer);
  });
}
document.getElementById("filterButton").addEventListener("click", () => {
  const category = document.getElementById("category").value;
  const minRating = parseInt(document.getElementById("minRating").value);
  const isInWatchlist = document.getElementById("inWatchlist").checked;
  const filteredPrograms = filterPrograms(
    tvSchedule,
    category,
    minRating,
    isInWatchlist
  );
  filteredProgramsContainer.innerHTML = "";
  filteredPrograms.forEach(
    (progarm) => (filteredProgramsContainer.innerHTML += createProgram(progarm))
  );
  console.log(filteredPrograms);
});
function createProgram(program) {
  return `<div><h2>${program.name}</h2>
  <p>${program.description}</p>
  <p>${program.isRepeat ? "Repriza" : "Nije repriza"}</p>
  <p>Kanal: ${program.channel}</p>
  ${program.rating !== undefined ? `<p>Ocjena: ${program.rating}</p>` : ""}
  ${watchList.includes(program) ? `<p>Na watchlisti</p>` : ""}
  </div>`;
}
function filterPrograms(programs, category, minRating, inWatchlist) {
  return programs.filter((program) => {
    if (program.category !== category) {
      return false;
    }
    if (minRating !== 0) {
      if (program.rating === undefined || program.rating < minRating) {
        return false;
      }
    }
    if (inWatchlist && !watchList.includes(program)) {
      return false;
    }
    return true;
  });
}
