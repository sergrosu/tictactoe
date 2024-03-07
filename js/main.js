const X_TEXT = "X"
const O_TEXT = "O"
let currentPlayer = X_TEXT

let boxes = []
for (let i = 0; i < 9; i++) {
    boxes.push(document.getElementById(i))
}

let spaces = Array(9)
spaces.fill(null)

boxes.forEach(e => e.addEventListener("click", selectBox))

function selectBox(e) {
    if (!spaces[e.target.id]) {
        spaces[e.target.id] = currentPlayer
        boxes[e.target.id].innerText = currentPlayer
        checkWin()
        currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT
    }
}

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]

function checkWin() {
    for (const [a, b, c] of winConditions) {
        if (spaces[a] && (spaces[a] === spaces[b] && spaces[a] === spaces[c])) {
            document.querySelector("#playerText").innerText = `${currentPlayer} Wins!`
            boxes.forEach(e => e.removeEventListener("click", selectBox));
            [a, b, c].forEach(index => boxes[index].style.color = 'red')
            break
        }
    }
}

document.getElementById('restartBtn').addEventListener("click", restart)

function restart() {
    document.querySelector("#playerText").innerText = `Tic Tac Toe`
    boxes.forEach(e => e.innerText = '')
    boxes.forEach(e => e.addEventListener("click", selectBox))
    boxes.forEach(e => e.style.color = 'black')
    spaces.fill(null)
    currentPlayer = X_TEXT
}