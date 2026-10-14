const CONFIG = {
  photo: "assets/nossa-foto.jpg",
  relationshipStart: "2024-08-22",
  music: "videoplayback.mp4",
  story: [
    {
      title: "Onde tudo começou",
      text: "Foi na festa de aniversário da Nicolly que a nossa história começou. Um dia que ficou guardado com muito carinho no meu coração.",
    },
    {
      title: "Uma lembrança que guardo com carinho",
      text: "E o nosso primeiro beijo? Eu fui te beijar e você virou o rosto!!!! 😠 Hoje, essa lembrança me faz sorrir e ficou guardada como uma das histórias mais fofas da gente.",
    },
    {
      title: "Ainda temos tantas páginas",
      text: "Meu sonho é viajar bastante com você, conhecer lugares novos e colecionar muitas histórias e lembranças juntinhos.",
    },
  ],
  surprise:
    "Lembra que você comentou que queria um site nosso assim, mas estavam cobrando caro? Então decidi fazer esse mimo pra você, com a ajuda dos meus amigos chats, e coloquei nele muito amor e carinho. Fiz tudo pensando em você, porque eu te amo muito! 💗\n\nCom amor, Lucas. ♡",
};

const welcome = document.querySelector(".welcome");
const giftContent = document.querySelector("#presente");
const enterButton = document.querySelector("#enter-button");
const heartLayer = document.querySelector("#heart-layer");
const ambientHearts = document.querySelector(".ambient-hearts");

function addHeart(x, y, size = 20) {
  const heart = document.createElement("span");
  heart.className = "click-heart";
  heart.textContent = Math.random() > 0.5 ? "♥" : "♡";
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.fontSize = `${size}px`;
  heart.style.setProperty("--drift", `${Math.round(Math.random() * 70 - 35)}px`);
  heartLayer.append(heart);
  heart.addEventListener("animationend", () => heart.remove(), { once: true });
}

function celebrate() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  for (let index = 0; index < 18; index += 1) {
    const angle = (Math.PI * 2 * index) / 18;
    addHeart(centerX + Math.cos(angle) * 65, centerY + Math.sin(angle) * 45, 14 + (index % 4) * 3);
  }
}

enterButton.addEventListener("click", () => {
  if (!giftContent.hidden) return;
  celebrate();
  welcome.classList.add("is-leaving");
  window.setTimeout(() => {
    welcome.hidden = true;
    giftContent.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 500);
});

function returnToWelcome(event) {
  event.preventDefault();
  giftContent.hidden = true;
  welcome.hidden = false;
  welcome.classList.remove("is-leaving");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelector("#return-home-button").addEventListener("click", returnToWelcome);
document.querySelector("#return-home-link").addEventListener("click", returnToWelcome);

document.addEventListener("click", (event) => {
  if (event.target.closest("button, a, audio")) return;
  addHeart(event.clientX, event.clientY, 17 + Math.round(Math.random() * 9));
});

function createAmbientHeart() {
  if (document.hidden || ambientHearts.childElementCount >= 12) return;
  const heart = document.createElement("span");
  heart.className = "ambient-heart";
  heart.textContent = Math.random() > 0.55 ? "♡" : "♥";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.round(Math.random() * 15)}px`;
  heart.style.animationDuration = `${12 + Math.random() * 9}s`;
  ambientHearts.append(heart);
  heart.addEventListener("animationend", () => heart.remove(), { once: true });
}

window.setInterval(createAmbientHeart, 1500);

const photo = document.querySelector("#couple-photo");
const photoPlaceholder = document.querySelector("#photo-placeholder");
photo.addEventListener("load", () => {
  photo.hidden = false;
  photoPlaceholder.hidden = true;
});
photo.addEventListener("error", () => {
  photo.hidden = true;
  photoPlaceholder.hidden = false;
});
if (CONFIG.photo.trim() !== "") {
  photo.src = CONFIG.photo;
}

const storyList = document.querySelector("#story-list");
for (const [index, moment] of CONFIG.story.entries()) {
  const card = document.createElement("article");
  card.className = "story-card";
  const dot = document.createElement("span");
  dot.className = "story-dot";
  dot.setAttribute("aria-hidden", "true");
  dot.textContent = "♡";
  const copy = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = moment.title;
  const text = document.createElement("p");
  text.textContent = moment.text;
  copy.append(title, text);
  card.append(dot, copy);
  card.style.setProperty("--story-index", index);
  storyList.append(card);
}

const counterMessage = document.querySelector("#counter-message");
const counterGrid = document.querySelector("#counter-grid");
const counterFootnote = document.querySelector("#counter-footnote");
const startDateParts =
  /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2}))?)?$/.exec(
    CONFIG.relationshipStart.trim(),
  );
const startDate = startDateParts
  ? new Date(
      Number(startDateParts[1]),
      Number(startDateParts[2]) - 1,
      Number(startDateParts[3]),
      Number(startDateParts[4] ?? 0),
      Number(startDateParts[5] ?? 0),
      Number(startDateParts[6] ?? 0),
    )
  : new Date(Number.NaN);
const hasValidStartDate =
  startDateParts !== null &&
  startDate.getFullYear() === Number(startDateParts[1]) &&
  startDate.getMonth() === Number(startDateParts[2]) - 1 &&
  startDate.getDate() === Number(startDateParts[3]) &&
  startDate.getHours() === Number(startDateParts[4] ?? 0) &&
  startDate.getMinutes() === Number(startDateParts[5] ?? 0) &&
  startDate.getSeconds() === Number(startDateParts[6] ?? 0) &&
  startDate.getTime() <= Date.now();

if (!hasValidStartDate) {
  counterMessage.textContent =
    "Configure a data em CONFIG.relationshipStart, no arquivo script.js (formato: AAAA-MM-DDTHH:MM:SS).";
} else {
  counterGrid.hidden = false;
  counterFootnote.hidden = false;
  counterMessage.textContent = "Cada segundo ao seu lado é um presente.";
  counterFootnote.textContent =
    startDateParts[4] === undefined
      ? "Contando desde o começo desse dia ♡"
      : "e eu escolheria você em cada um deles ♡";
  const updateCounter = () => {
    const elapsedSeconds = Math.floor((Date.now() - startDate.getTime()) / 1000);
    const days = Math.floor(elapsedSeconds / 86400);
    const hours = Math.floor((elapsedSeconds % 86400) / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;
    document.querySelector("#count-days").textContent = days.toLocaleString("pt-BR");
    document.querySelector("#count-hours").textContent = String(hours).padStart(2, "0");
    document.querySelector("#count-minutes").textContent = String(minutes).padStart(2, "0");
    document.querySelector("#count-seconds").textContent = String(seconds).padStart(2, "0");
  };
  updateCounter();
  window.setInterval(updateCounter, 1000);
}

const surpriseButton = document.querySelector("#surprise-button");
const surpriseMessage = document.querySelector("#surprise-message");
surpriseMessage.textContent = CONFIG.surprise;
surpriseButton.addEventListener("click", () => {
  const isVisible = surpriseButton.getAttribute("aria-expanded") === "true";
  surpriseButton.setAttribute("aria-expanded", String(!isVisible));
  surpriseMessage.hidden = isVisible;
  surpriseButton.firstChild.textContent = isVisible
    ? "Tenho mais uma coisinha pra você 💝"
    : "Esconder a surpresinha ♡";
  if (!isVisible) celebrate();
});

const loveSong = document.querySelector("#music-source");
const musicHint = document.querySelector("#music-hint");
const musicPlay = document.querySelector("#music-play");
const musicPlayIcon = document.querySelector("#music-play-icon");
const musicProgress = document.querySelector("#music-progress");
const musicCurrentTime = document.querySelector("#music-current-time");
const musicDuration = document.querySelector("#music-duration");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function updateMusicControls() {
  musicPlay.setAttribute("aria-label", loveSong.paused ? "Reproduzir música" : "Pausar música");
  musicPlayIcon.textContent = loveSong.paused ? "▶" : "Ⅱ";
}

loveSong.addEventListener("loadedmetadata", () => {
  musicProgress.disabled = false;
  musicProgress.max = String(loveSong.duration);
  musicDuration.textContent = formatTime(loveSong.duration);
  musicHint.hidden = true;
});
loveSong.addEventListener("timeupdate", () => {
  musicProgress.value = String(loveSong.currentTime);
  musicCurrentTime.textContent = formatTime(loveSong.currentTime);
});
loveSong.addEventListener("play", updateMusicControls);
loveSong.addEventListener("pause", updateMusicControls);
loveSong.addEventListener("ended", updateMusicControls);
loveSong.addEventListener("error", () => {
  musicHint.textContent =
    "Não foi possível carregar o áudio. Confira se videoplayback.mp4 está na pasta principal e tente um navegador compatível com MP4.";
  musicHint.hidden = false;
});
musicPlay.addEventListener("click", async () => {
  if (!loveSong.paused) {
    loveSong.pause();
    return;
  }

  try {
    await loveSong.play();
  } catch {
    musicHint.textContent = "Não foi possível reproduzir o áudio. Confira o arquivo e tente novamente.";
    musicHint.hidden = false;
  }
});
musicProgress.addEventListener("input", () => {
  loveSong.currentTime = Number(musicProgress.value);
});
loveSong.src = CONFIG.music;
