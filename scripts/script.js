const tvSchedule = [
  {
    startTime: "0:00",
    endTime: "0:30",
    name: "Europa iz zraka",
    description: "Daily news updates",
    category: "Odrasli program",
    isRepeat: false,
    channel: "HRT 1",
  },
  {
    startTime: "0:30",
    endTime: "3:30",
    name: "Anarhistice",
    description: "Action-packed thriller",
    category: "Odrasli program",
    isRepeat: false,
    channel: "HRT 1",
  },
  {
    startTime: "3:30",
    endTime: "4:30",
    name: "Glazba, glazba",
    description: "Action-packed thriller",
    category: "Dokumentarac",
    isRepeat: false,
    channel: "HRT 1",
  },
  {
    startTime: "4:30",
    endTime: "6:00",
    name: "Noćni glazbeni program",
    description: "Action-packed thriller",
    category: "Film",
    isRepeat: false,
    channel: "HRT 1",
  },
  {
    startTime: "6:00",
    endTime: "7:00",
    name: "Dobro jutro, Hrvatska",
    description: "Action-packed thriller",
    category: "Informativni program",
    isRepeat: false,
    channel: "HRT 1",
  },
  {
    startTime: "7:00",
    endTime: "10:00",
    name: "Maša i medvjed",
    description: "Action-packed thriller",
    category: "Dječji program",
    isRepeat: false,
    channel: "HRT 1",
  },
  {
    startTime: "10:00",
    endTime: "12:00",
    name: "Obitelj čudnih životninja",
    description: "Action-packed thriller",
    category: "Zabavni program",
    isRepeat: false,
    channel: "HRT 1",
  },
  {
    startTime: "12:00",
    endTime: "15:00",
    name: "Gorski liječnik",
    description: "Action-packed thriller",
    category: "Zabavni program",
    isRepeat: false,
    channel: "HRT 1",
  },
  {
    startTime: "15:00",
    endTime: "17:30",
    name: "TV izlog",
    description: "Action-packed thriller",
    category: "Informativni program",
    isRepeat: false,
    channel: "HRT 1",
  },
  {
    startTime: "17:30",
    endTime: "20:30",
    name: "I to je Hrvatska",
    description: "Action-packed thriller",
    category: "Informativni program",
    isRepeat: false,
    channel: "HRT 1",
  },
  {
    startTime: "20:30",
    endTime: "22:30",
    name: "Večernje vijesti",
    description: "Action-packed thriller",
    category: "Informativni program",
    isRepeat: false,
    channel: "HRT 1",
  },
  {
    startTime: "22:30",
    endTime: "24:00",
    name: "Kumovi",
    description: "Action-packed thriller",
    category: "Odrasli program",
    isRepeat: false,
    channel: "HRT 1",
  },
];
const hrt = document.querySelector(".hrt");
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

    item.style.width = (endTime - startTime) * 2.778 + "px";
    hrt.appendChild(item);
  });
}
function getTimeInMinutes(time) {
  const [hours, minutes] = time.split(":");
  return parseInt(hours) * 60 + parseInt(minutes);
}
