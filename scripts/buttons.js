function createRateButton(program, ratingContainer) {
  const rateButton = document.createElement("button");
  rateButton.classList.add("rate_button");
  rateButton.textContent = "Ocijeni";

  rateButton.addEventListener("click", function () {
    const ratingInput = document.getElementById("rating");
    const rating = parseFloat(ratingInput.value);
    if (!isNaN(rating) && rating >= 1 && rating <= 5) {
      if (!program.hasOwnProperty("rating")) {
        alert(`Program je ocijenjen s ${ratingInput.value}`);
        ratingContainer.textContent = `Ocjena je: ${rating}`;
        Object.defineProperty(program, "rating", {
          value: rating,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      } else {
        ratingContainer.textContent = `Ocjena je: ${rating}`;

        alert(`Program je ocijenjen s ${ratingInput.value}`);
        program.rating = rating;
      }
    } else {
      alert("Neispravan unos ocjene.");
    }
    console.log(program);
  });

  return rateButton;
}
function createRating(program) {
  const text = document.createElement("p");
  if (program.rating) {
    text.textContent = `Ocijena je: ${program.rating}`;
  } else text.textContent = `Nije ocijenjen`;
  return text;
}
function createWatchlistButton(program, watchList) {
  const watchlist_button = document.createElement("button");
  watchlist_button.classList.add("watchlist_button");

  if (watchList.includes(program))
    watchlist_button.textContent = "Ukloni program s watchliste";
  else watchlist_button.textContent = "Dodaj program na watchlistu";

  watchlist_button.addEventListener("click", () => {
    console.log(watchList);
    if (watchList.includes(program)) {
      const index = watchList.indexOf(program);
      alert("Program uklonjen s watchliste");
      watchList.splice(index, 1);
      watchlist_button.textContent = "Dodaj program na watchlistu";
    } else {
      alert("Program dodan na watchlistu");
      watchlist_button.textContent = "Ukloni program s watchliste";
      watchList.push(program);
    }
  });
  return watchlist_button;
}
export { createRateButton, createWatchlistButton, createRating };
