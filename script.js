// Generate input fields for challenges (2–12)
function generateInputFields(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear existing fields
    for (let i = 2; i <= 12; i++) {
        const inputDiv = document.createElement('div');
        inputDiv.classList.add('challenge-input');
        inputDiv.innerHTML = `
            <label for="${containerId}-challenge-${i}">${i}:</label>
            <input type="text" id="${containerId}-challenge-${i}" />
        `;
        container.appendChild(inputDiv);
    }
}

// Save challenges and log to localStorage
function saveChallenges() {
    const dailyChallenges = [];
    const weeklyChallenges = [];

    for (let i = 2; i <= 12; i++) {
        const dailyInput = document.getElementById(`daily-challenges-challenge-${i}`).value;
        const weeklyInput = document.getElementById(`weekly-challenges-challenge-${i}`).value;

        dailyChallenges.push(dailyInput || '');
        weeklyChallenges.push(weeklyInput || '');
    }

    const logEntries = Array.from(document.getElementById('log').children).map(
        (logItem) => logItem.textContent
    );

    localStorage.setItem('dailyChallenges', JSON.stringify(dailyChallenges));
    localStorage.setItem('weeklyChallenges', JSON.stringify(weeklyChallenges));
    localStorage.setItem('challengeLog', JSON.stringify(logEntries));

    alert('Challenges and log saved!');
}

// Load challenges and log from localStorage
function loadChallenges() {
    const dailyChallenges = JSON.parse(localStorage.getItem('dailyChallenges')) || [];
    const weeklyChallenges = JSON.parse(localStorage.getItem('weeklyChallenges')) || [];
    const challengeLog = JSON.parse(localStorage.getItem('challengeLog')) || [];

    for (let i = 2; i <= 12; i++) {
        document.getElementById(`daily-challenges-challenge-${i}`).value = dailyChallenges[i - 2] || '';
        document.getElementById(`weekly-challenges-challenge-${i}`).value = weeklyChallenges[i - 2] || '';
    }

    const log = document.getElementById('log');
    log.innerHTML = '';
    challengeLog.forEach((entry) => {
        const logItem = document.createElement('li');
        logItem.textContent = entry;
        log.appendChild(logItem);
    });

    alert('Challenges and log loaded!');
}

// Add a new entry to the log
function addToLog(challengeType, rolledValue, challengeText) {
    const log = document.getElementById('log');
    const logItem = document.createElement('li');
    const timestamp = new Date().toLocaleString();
    logItem.textContent = `[${timestamp}] ${challengeType} (${rolledValue}): ${challengeText}`;
    log.appendChild(logItem);
}

// Roll dice and display a challenge
function rollDice(type) {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const sum = dice1 + dice2;

    document.getElementById('dice1').textContent = dice1;
    document.getElementById('dice2').textContent = dice2;

    const challenges = type === 'daily'
        ? JSON.parse(localStorage.getItem('dailyChallenges')) || []
        : JSON.parse(localStorage.getItem('weeklyChallenges')) || [];

    const challenge = challenges[sum - 2] || 'No challenge available for this roll.';

    document.getElementById('result').innerHTML = `
        ${type.charAt(0).toUpperCase() + type.slice(1)} Challenge: You rolled <b>${sum}</b>. Your challenge is: <b>${challenge}</b>
    `;

    addToLog(type.charAt(0).toUpperCase() + type.slice(1), sum, challenge);
}

// Initialize the page
function initialize() {
    generateInputFields('daily-challenges');
    generateInputFields('weekly-challenges');
    loadChallenges();
}

// Run initialization on page load
window.onload = initialize;
