const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores);
const scoreDisplay = document.getElementsByClassName('choice-container');
for (let i = 0; i < highScores.length; i++) {
    scoreDisplay[i].children[0].innerText = highScores[i].score;
    scoreDisplay[i].children[1].innerText = highScores[i].name;
}