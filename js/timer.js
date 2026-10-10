/**
 * ACTIVERZA BMX RACING ACADEMY
 * Módulo de Temporizador de Pista y Síntesis de Sonido (Web Audio API)
 * WOD Timer para intervalos HIIT, Tabata, EMOM y descansos estrictos de pliometría.
 */

// Contexto de Web Audio API para simular la bocina del partidor oficial
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playBeep(freq = 880, duration = 0.15, type = 'sine') {
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) {
        console.warn('Audio no disponible en este contexto:', e);
    }
}

// Tono oficial de partidor UCI BMX: 3 beeps cortos + 1 beep grave/explosivo
function playGateBeeps() {
    playBeep(600, 0.12);
    setTimeout(() => playBeep(600, 0.12), 1000);
    setTimeout(() => playBeep(600, 0.12), 2000);
    setTimeout(() => playBeep(1200, 0.45, 'triangle'), 3000);
}

// Variables de Estado del Temporizador
let timerInterval = null;
let timerSecondsLeft = 60;
let timerCurrentRound = 1;
let timerTotalRounds = 1;
let timerCurrentPhase = 'work'; // 'work', 'rest'
let timerWorkSec = 20;
let timerRestSec = 20;
let timerIsRunning = false;
let timerCurrentPresetKey = 'rest60';

const TIMER_PRESETS = {
    'rest60': { name: 'Descanso Pliometría', work: 60, rest: 0, rounds: 1 },
    'interval20_20': { name: 'Intervalos 20/20', work: 20, rest: 20, rounds: 8 },
    'interval15_30': { name: 'Protocolo 15/30', work: 15, rest: 30, rounds: 10 },
    'tabata30_15': { name: 'Tabata BMX 30/15', work: 30, rest: 15, rounds: 8 },
    'emom8': { name: 'BMX Track EMOM', work: 60, rest: 0, rounds: 8 },
    'lactic40_20': { name: 'Umbral Láctico 40/20', work: 40, rest: 20, rounds: 6 }
};

function setTimerPreset(presetKey) {
    pauseTimer();
    const config = TIMER_PRESETS[presetKey];
    if (!config) return;

    timerCurrentPresetKey = presetKey;
    timerWorkSec = config.work;
    timerRestSec = config.rest;
    timerTotalRounds = config.rounds;
    timerCurrentRound = 1;
    timerCurrentPhase = 'work';
    timerSecondsLeft = timerWorkSec;

    // Actualizar estados visuales de los botones
    const buttons = document.querySelectorAll('.timer-preset-btn');
    buttons.forEach(btn => {
        btn.className = "timer-preset-btn px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:text-white transition";
    });
    if (window.event && window.event.target && window.event.target.classList) {
        window.event.target.className = "timer-preset-btn px-4 py-2 rounded-xl text-xs font-bold bg-red-600 text-white transition shadow";
    }

    updateTimerDisplay();
}

function launchPresetForCardio(cardioName) {
    if (typeof switchMainTab === 'function') {
        switchMainTab('timer');
    }
    if (cardioName.includes('20/20')) setTimerPreset('interval20_20');
    else if (cardioName.includes('15/30')) setTimerPreset('interval15_30');
    else if (cardioName.includes('30/15')) setTimerPreset('tabata30_15');
    else if (cardioName.includes('EMOM')) setTimerPreset('emom8');
    else if (cardioName.includes('40/20')) setTimerPreset('lactic40_20');
    else setTimerPreset('rest60');
}

/**
 * Calcula el tiempo total restante de todo el protocolo/preset activo
 */
function calculateTimerTotalRemaining() {
    let total = timerSecondsLeft;
    const roundDuration = timerWorkSec + timerRestSec;
    const remainingRounds = Math.max(0, timerTotalRounds - timerCurrentRound);

    if (timerCurrentPhase === 'work' && timerRestSec > 0) {
        total += timerRestSec;
    }
    total += remainingRounds * roundDuration;
    return total;
}

function updateTimerDisplay() {
    const mins = Math.floor(timerSecondsLeft / 60);
    const secs = timerSecondsLeft % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    
    const displayElem = document.getElementById('timerDisplay');
    if (displayElem) displayElem.innerText = formatted;

    const badge = document.getElementById('timerPhaseBadge');
    const phaseName = document.getElementById('timerPhaseName');
    const roundDisplay = document.getElementById('timerRoundDisplay');
    const totalRemainingBadge = document.getElementById('timerTotalTimeBadge');
    const progressBar = document.getElementById('timerProgressBar');

    if (roundDisplay) roundDisplay.innerText = `${timerCurrentRound} / ${timerTotalRounds}`;

    // Actualizar tiempo total restante
    const totalRemainingSec = calculateTimerTotalRemaining();
    const totMins = Math.floor(totalRemainingSec / 60);
    const totSecs = totalRemainingSec % 60;
    if (totalRemainingBadge) {
        totalRemainingBadge.innerText = `Total: ${String(totMins).padStart(2, '0')}:${String(totSecs).padStart(2, '0')}`;
    }

    // Actualizar barra de progreso de la fase
    if (progressBar) {
        const phaseTotal = timerCurrentPhase === 'work' ? timerWorkSec : (timerRestSec || timerWorkSec);
        const pct = phaseTotal > 0 ? Math.min(100, Math.max(0, (timerSecondsLeft / phaseTotal) * 100)) : 100;
        progressBar.style.width = `${pct}%`;
        progressBar.className = timerCurrentPhase === 'work' ? 'bg-red-500 h-full rounded-full transition-all duration-300' : 'bg-emerald-500 h-full rounded-full transition-all duration-300';
    }

    if (badge && phaseName) {
        if (timerCurrentPhase === 'work') {
            badge.innerText = 'TRABAJO MÁXIMO (EXPLOSIÓN)';
            badge.className = 'inline-block text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-red-600/20 text-red-400 mb-3 border border-red-500/30';
            phaseName.innerText = 'Trabajo Máximo';
        } else {
            badge.innerText = 'RECUPERACIÓN / DESCANSO';
            badge.className = 'inline-block text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-600/20 text-emerald-400 mb-3 border border-emerald-500/30';
            phaseName.innerText = 'Descanso Pasivo';
        }
    }
}

function startTimer() {
    if (timerIsRunning) return;
    timerIsRunning = true;

    const btnStart = document.getElementById('btnStartTimer');
    const btnPause = document.getElementById('btnPauseTimer');
    if (btnStart) btnStart.classList.add('hidden');
    if (btnPause) btnPause.classList.remove('hidden');

    playBeep(880, 0.15); // Beep de inicio

    timerInterval = setInterval(() => {
        if (timerSecondsLeft > 0) {
            timerSecondsLeft--;
            // Alertas sonoras en los últimos 3 segundos
            if (timerSecondsLeft <= 3 && timerSecondsLeft > 0) {
                playBeep(440, 0.1);
            }
            updateTimerDisplay();
        } else {
            // Cambio de fase o ronda
            playBeep(1200, 0.35, 'triangle');

            if (timerRestSec > 0 && timerCurrentPhase === 'work') {
                timerCurrentPhase = 'rest';
                timerSecondsLeft = timerRestSec;
            } else {
                if (timerCurrentRound < timerTotalRounds) {
                    timerCurrentRound++;
                    timerCurrentPhase = 'work';
                    timerSecondsLeft = timerWorkSec;
                } else {
                    pauseTimer();
                    alert('¡Bloque completado con éxito!');
                    if (window.confetti) window.confetti({ particleCount: 70, spread: 60 });
                    return;
                }
            }
            updateTimerDisplay();
        }
    }, 1000);
}

function pauseTimer() {
    timerIsRunning = false;
    clearInterval(timerInterval);
    const btnStart = document.getElementById('btnStartTimer');
    const btnPause = document.getElementById('btnPauseTimer');
    if (btnStart) btnStart.classList.remove('hidden');
    if (btnPause) btnPause.classList.add('hidden');
}

/**
 * Adelanta a la siguiente fase o ronda (Next Phase/Round)
 */
function stepForwardTimer() {
    if (timerRestSec > 0 && timerCurrentPhase === 'work') {
        timerCurrentPhase = 'rest';
        timerSecondsLeft = timerRestSec;
    } else {
        if (timerCurrentRound < timerTotalRounds) {
            timerCurrentRound++;
            timerCurrentPhase = 'work';
            timerSecondsLeft = timerWorkSec;
        } else {
            timerSecondsLeft = 0;
            pauseTimer();
            if (window.confetti) window.confetti({ particleCount: 70, spread: 60 });
        }
    }
    updateTimerDisplay();
}

/**
 * Retrocede a la fase o ronda anterior (Prev Phase/Round)
 */
function stepBackwardTimer() {
    const phaseTotal = timerCurrentPhase === 'work' ? timerWorkSec : (timerRestSec || timerWorkSec);
    if (timerSecondsLeft < phaseTotal - 2) {
        // Si ya pasaron más de 2 segundos, reinicia la fase actual
        timerSecondsLeft = phaseTotal;
    } else {
        // Si está al inicio, retrocede a la fase o ronda anterior
        if (timerCurrentPhase === 'rest') {
            timerCurrentPhase = 'work';
            timerSecondsLeft = timerWorkSec;
        } else if (timerCurrentRound > 1) {
            timerCurrentRound--;
            if (timerRestSec > 0) {
                timerCurrentPhase = 'rest';
                timerSecondsLeft = timerRestSec;
            } else {
                timerCurrentPhase = 'work';
                timerSecondsLeft = timerWorkSec;
            }
        } else {
            timerSecondsLeft = timerWorkSec;
        }
    }
    updateTimerDisplay();
}

/**
 * Adelanta (+) o atrasa (-) segundos en el temporizador activo
 */
function adjustTimerSeconds(delta) {
    timerSecondsLeft += delta;
    if (timerSecondsLeft <= 0) {
        stepForwardTimer();
    } else {
        const maxSec = timerCurrentPhase === 'work' ? timerWorkSec : (timerRestSec || timerWorkSec);
        if (timerSecondsLeft > maxSec + 60) {
            timerSecondsLeft = maxSec;
        }
        updateTimerDisplay();
    }
}

function resetTimer() {
    pauseTimer();
    timerCurrentRound = 1;
    timerCurrentPhase = 'work';
    timerSecondsLeft = timerWorkSec;
    updateTimerDisplay();
}
