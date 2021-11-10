const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');

const userScore = localStorage.getItem('userScore');

const scoreText = document.getElementById('finalScore');
scoreText.innerHTML = userScore;

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
})

const saveScore = event => {
    event.preventDefault();
    const user = {
        score: userScore,
        name: username.value
    }
    highScores.push(user);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('index.html');
}

