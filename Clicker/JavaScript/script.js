//Etat du jeu

const game = {
  score: 0, // Trump total
  tpc: 1, // Trump par click
  tps: 0, // Trump par seconde
  upgrades: {},
};


//Sélecteurs

const element = {
  score: document.querySelector(".trump-cost"),
  trumpImage: document.querySelector(".trump-image"),
  tpcText: document.querySelector("#tpc-text"),
  tpsText: document.querySelector("#tps-text"),
  upgradesContainer: document.querySelector("#upgrades-container"),
  upgradeTemplate: document.querySelector("#upgrade-template"),
  buyTpcBtn: document.querySelector("#buy-tpc-upgrade"),
tpcUpgradeCostText: document.querySelector("#tpc-upgrade-cost")
};


//Sauvegarde auto

function autoSave() {
  localStorage.setItem("trump_clicker_save", JSON.stringify(game));
}


//Chargement auto

function autoLoad() {
  const raw = localStorage.getItem("trump_clicker_save");
  if (!raw) return;

  try {
    const data = JSON.parse(raw);

    game.score = Number(data.score) || 0;
    game.tpc = Number(data.tpc) || 1;
    game.tps = Number(data.tps) || 0;
    game.upgrades = data.upgrades || {};
  } catch (e) {
    console.error("Sauvegarde corrompue :", e);
  }
}


//MAJ UI

function updateUI() {
  if (element.score) element.score.textContent = Math.floor(game.score);
  if (element.tpcText) element.tpcText.textContent = game.tpc;
  if (element.tpsText) element.tpsText.textContent = game.tps;
}

//Click principal

function onTrumpClick() {
  game.score += game.tpc;
  updateUI();
  autoSave();
}

//Trump par seconde

let autoIncomeInterval = null;

function startAutoIncome() {
  if (autoIncomeInterval) return;

  autoIncomeInterval = setInterval(() => {
    if (game.tps > 0) {
      game.score += game.tps;
      updateUI();
      autoSave();
    }
  }, 1000);
}

//Démarrage

autoLoad();
updateUI();
startAutoIncome();

if (element.trumpImage) {
  element.trumpImage.addEventListener("click", onTrumpClick);
}

//Amélioration Trump par click

const tpcUpgrade ={
    level: 0,
    baseCost: 10,
    costMultiplier: 1.5, //50% d'augmentation à chaque upgrade (TEMPORAIRE)
    augmentationParLvl: 1
}

function getTpcUpgradeCost(){
    return Math.floor(tpcUpgrade.baseCost * (tpcUpgrade.costMultiplier ** tpcUpgrade.level))
}

function updateTpcUpgr