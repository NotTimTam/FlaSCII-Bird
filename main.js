let score = 0;
let playerY = 5;
let pipeX = 0;
let pipeHeight = 0;

let started = false;
let startMenu = [
    [""],
    [""],
    [],
    [],
    ["FlaSCII Bird"],
    [],
    [],
    [">"],
    ["           ^ That's you"],
    [],
    [],
    ["Space to Start..."],
    [],
    [],
    [],
    [],
    ["___________________________"],
    []
];

// Update display
function updateDisplay(data) {
    let display = document.getElementById("display");
    let displayString = "";

    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        for (let j = 0; j < row.length; j++) {
            displayString += row[j];
        }
        displayString += "<br>";
    }

    display.innerHTML = displayString;
}

updateDisplay(display);

// Generate world.
function generateWorld() {
    // Make sure the player is in bounds.
    if (playerY >= 18) {
        killPlayer();
    } else if (playerY < 0) {
        playerY = 0;
    }
    // Handle collisions.
    if ((pipeX == 8 && playerY < pipeHeight) && (pipeX == 8 && playerY > pipeHeight - 4)) {
        score ++;
    } else if ((pipeX == 8 && playerY >= pipeHeight) || (pipeX == 8 && playerY < pipeHeight - 4)) {
        killPlayer();
    }

    let display = [];
    for (let row = 1; row <= 18; row++) {
        let rowIndecies = [];
        if (row == 17) {
            for (let column = 1; column <= 27; column++) {
                rowIndecies.push("_");
            }
        } else if (row < 17) {
            for (let column = 1; column <= 27; column++) {
                if (column == 8) {
                    if (row == playerY) {
                        rowIndecies.push(">");
                    } else {
                        rowIndecies.push(" ");
                    }
                } 
                if (column == pipeX || column == pipeX + 1) {
                    if (row >= pipeHeight || row <= pipeHeight - 4) {
                        if (row == pipeHeight) {
                            rowIndecies.push("_");
                        } else if (row == pipeHeight - 4) {
                            rowIndecies.push("-");
                        } else {
                            rowIndecies.push("|");
                        }
                    }
                } else {
                    rowIndecies.push(" ");
                }
            }
        } else if (row > 17) {
            let scoreName = ["S", "C", "O", "R", "E", ":", " "];
            for (let i = 0; i < 7; i++) {
                rowIndecies.push(scoreName[i]);
            }
            let scoreString = score.toString()
            scoreString = scoreString.split("");
            for (let i = 0; i < scoreString.length; i++) {
                rowIndecies.push(scoreString[i]);
            }
        }
        display.push(rowIndecies);
    }

    updateDisplay(display);
}

// Drop the player.
function gravity() {
    playerY += 1;
    movePipe();
}

// Kill the player.
function killPlayer() {
    window.location.reload();
    alert("YOU DIED. SCORE: " + score);
}

// Add pipes.
function addPipe() {
    pipeX = 17;
    pipeHeight = Math.ceil(Math.random() * (14 - 5) + 5);
    console.log(pipeHeight);
}

// Move pipes.
function movePipe() {
    pipeX -= 1;
    if (pipeX < 0) {
        addPipe();
    }
}

function startGame() {
    started = true;

    addPipe();

    window.setInterval(generateWorld, 10);
    window.setInterval(gravity, 200);
}

updateDisplay(startMenu);

document.body.onkeyup = function(e){ 
    if(e.keyCode == 32) { 
        if (started) {
            playerY -= 3;
        } else {
            startGame();
        }
    } 
}