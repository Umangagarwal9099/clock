let is24HourFormat = true;
let isBold = false;

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const formattedTime = formatTime(hours, minutes, seconds, is24HourFormat);

    document.getElementById('clock').textContent = formattedTime;
    updateWorldClock();
}

function formatTime(hours, minutes, seconds, is24Hour) {
    let formattedHours = is24Hour ? hours : (hours % 12 || 12);
    let ampm = is24Hour ? '' : (hours >= 12 ? ' PM' : ' AM');
    return `${padZero(formattedHours)}:${padZero(minutes)}:${padZero(seconds)}${ampm}`;
}

function padZero(num) {
    return num < 10 ? '0' + num : num;
}

function updateWorldClock() {
    const now = new Date();
    const utcTime = now.toUTCString().split(' ')[4];
    const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' })).toTimeString().split(' ')[0];
    const pstTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })).toTimeString().split(' ')[0];
    const aestTime = new Date(now.toLocaleString('en-US', { timeZone: 'Australia/Sydney' })).toTimeString().split(' ')[0];

    document.getElementById('world-clock').innerHTML = `
        <div>UTC: ${utcTime}</div>
        <div>EST: ${estTime}</div>
        <div>PST: ${pstTime}</div>
        <div>AEST: ${aestTime}</div>
    `;
}

document.getElementById('toggle-format').addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
});

document.getElementById('toggle-weight').addEventListener('click', () => {
    isBold = !isBold;
    document.getElementById('clock').style.fontWeight = isBold ? 'bold' : 'normal';
    document.getElementById('world-clock').style.fontWeight = isBold ? 'bold' : 'normal';
});

setInterval(updateClock, 1000);
updateClock();

let timer;
let isRunning = false;
let [hours, minutes, seconds] = [0, 0, 0];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

startButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTime, 1000);
    }
});

stopButton.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timer);
});

resetButton.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timer);
    [hours, minutes, seconds] = [0, 0, 0];
    display.innerText = '00:00:00';
});

function updateTime() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
    display.innerText = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

const alarmTimeInput = document.getElementById('alarmTime');
const setAlarmButton = document.getElementById('setAlarm');
let alarmTime = null;

setAlarmButton.addEventListener('click', () => {
    alarmTime = alarmTimeInput.value;
    alert(`Alarm set for ${alarmTime}`);
});

setInterval(() => {
    const currentTime = new Date();
    const currentHours = String(currentTime.getHours()).padStart(2, '0');
    const currentMinutes = String(currentTime.getMinutes()).padStart(2, '0');
    const currentSeconds = String(currentTime.getSeconds()).padStart(2, '0');
    const formattedTime = `${currentHours}:${currentMinutes}:${currentSeconds}`;

    if (formattedTime === alarmTime + ':00') {
        alert('Alarm ringing!');
        alarmTime = null; // Reset the alarm
    }
}, 1000);