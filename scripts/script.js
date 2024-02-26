import { tvSchedule } from "./programs.js";

const hrt = document.querySelector(".hrt");
let parentalPin = "0000";
let openPopup = false;
const watchList = [];
const change_parental_pin_button = document.querySelector(
  ".change_parental_pin"
);

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
  } else alert("Neispravan roditeljski pin");
});
function getNewParentalPinFromUser() {
  let userPin = "";
  do {
    userPin = prompt(
      "Upisite novi pin koji treba sadrzavati od 4 do 8 brojeva i samo brojeve"
    );
    if (userPin == null) return null;

    if (!(userPin.length >= 4 && userPin.length <= 8 && !isNaN(userPin)))
      alert("Neispravan unos pina");
  } while (!(userPin.length >= 4 && userPin.length <= 8 && !isNaN(userPin)));
  return userPin;
}
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
      showPopup(program);
    });

    item.style.width = (endTime - startTime) * 2.778 + "px";
    hrt.appendChild(item);
  });
}
function getTimeInMinutes(time) {
  const [hours, minutes] = time.split(":");
  return parseInt(hours) * 60 + parseInt(minutes);
}

function showPopup(program) {
  if (openPopup) return;
  if (!checkForParentalPin(program)) return;

  const popupOverlay = document.createElement("div");
  popupOverlay.classList.add("popupOverlay");
  document.body.appendChild(popupOverlay);
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popupContainer");

  popupContainer.innerHTML = `
     <span class="close">&times;</span>
     <h2>${program.name}</h2>
     <p>${program.description}</p>
     <p>${program.isRepeat ? "Repriza" : "Nije repriza"}</p>
     <p>Kanal: ${program.channel}</p>
   `;
  const button = createWatchlistButton(program);
  popupContainer.appendChild(button);
  document.body.appendChild(popupContainer);
  openPopup = true;

  const closeBtn = popupContainer.querySelector(".close");
  closeBtn.addEventListener("click", function () {
    openPopup = false;
    document.body.removeChild(popupOverlay);
    document.body.removeChild(popupContainer);
  });
}

function checkForParentalPin(program) {
  if (program.category.toLowerCase() == "odrasli program") {
    const userPin = prompt("Upisite roditeljski pin");
    if (userPin == parentalPin) return true;
    else {
      alert("Unijeli ste krivi roditeljski pin");
      return false;
    }
  } else return true;
}
function createWatchlistButton(program) {
  const watchlist_button = document.createElement("button");
  watchlist_button.classList.add("watchlist_button");

  if (watchList.includes(program))
    watchlist_button.textContent = "Ukloni program s watchliste";
  else watchlist_button.textContent = "Dodaj program na watchlistu";

  watchlist_button.addEventListener("click", () => {
    console.log(watchList);
    if (watchList.includes(program)) {
      const index = watchList.indexOf(program);
      watchList.splice(index, 1);
      watchlist_button.textContent = "Dodaj program na watchlistu";
    } else {
      alert("dodan na listu");
      watchlist_button.textContent = "Ukloni program s watchliste";
      watchList.push(program);
    }
  });
  return watchlist_button;
}
