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
function checkForParentalPin(program, parentalPin) {
  if (program.category.toLowerCase() == "odrasli program") {
    const userPin = prompt("Upisite roditeljski pin");
    if (userPin == parentalPin) return true;
    else {
      alert("Unijeli ste krivi roditeljski pin");
      return false;
    }
  } else return true;
}
export { getNewParentalPinFromUser, checkForParentalPin };
