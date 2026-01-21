// Score du jeu

const game ={
    score: 0, //Trump total
    tpc: 1, //Trump par click
    tps: 0, //Trump par seconde
    upgrades: {}
}

// Sélecteurs

const element = {
  score: document.querySelector(".trump-cost"),
  trumpImage: document.querySelector(".trump-image"),
  tpcText: document.querySelector("#tpc-text"),
  tpsText: document.querySelector("#tps-text"),
  upgradesContainer: document.querySelector("#upgrades-container"),
  saveBtn: document.querySelector("#save-btn"),
  loadBtn: document.querySelector("#load-btn"),
  upgradeTemplate: document.querySelector("#upgrade-template"),
};

// MAJ UI

function updateUI(){
    if (element.score) element.score.textContent = Math.floor(game.score)
    if (element.tpcText) element.tpcText.textContent = game.tpc
    if (element.tpsText) element.tpsText.textContent = game.tps
}
// Click principal

function onTrumpClick(){
    game.score += game.tpc;
    updateUI()
}

//Timer (pour les Trump/secode)

function startAutoIncome(){
    setInterval(() =>{
        if (game.tps > 0) {
            game.score += game.tps
            updateUI()
        }
    }, 1000)
}

//Save / Load

function saveGame(){
    localStorage.setItem("trump_clicker_save", JSON.stringify(game))
}

function loadGame(){
    const raw = localStorage.getItem("trump_clicker_save")
    if (!raw) return

    try{
        const data = JSON.parse(raw)

        game.score = Number(data.score) || 0
        game.tpc = Number(data.tpc) || 1
        game.tps = Number(data.tps) || 0
        game.upgrades = data.upgrades || {}

        updateUI()
    } catch (e) {
        console.error("Sauvegarde corrompue :", e)
    }
}

//Evènement

if (element.trumpImage){
    element.trumpImage.addEventListener("click", onTrumpClick)
}

if (element.saveBtn){
    element.saveBtn.addEventListener("click", saveGame)
}

if (element.loadBtn){
    element.loadBtn.addEventListener("click", loadGame)
}

//Démarrage

loadGame()
updateUI()
startAutoIncome()