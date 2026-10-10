/**
 * ACTIVERZA BMX RACING ACADEMY
 * Módulo de Seguimiento Completo de Sesión Guiada (Guided WOD Tracker)
 * Cronómetro interválico con anticipación del siguiente ejercicio,
 * control de tiempos (ejercicio, bloque y sesión), videos y finalización de calendario.
 */

let workoutSteps = [];
let currentStepIndex = 0;
let stepSecondsLeft = 0;
let workoutTimerInterval = null;
let isWorkoutRunning = false;
let isWorkoutMuted = false;

/**
 * Calcula la duración exacta y el desglose de cada bloque de la sesión
 */
function calculateSessionSummary(week, day, ageGroup) {
    const steps = buildWorkoutPlan(week, day, ageGroup);
    let totalSec = 0;
    const blocksSec = {
        warmup: 0,
        plyo: 0,
        strength: 0,
        cardio: 0,
        stretch: 0,
        recovery: 0
    };

    steps.forEach(s => {
        totalSec += s.duration;
        if (s.blockIndex === 0) blocksSec.warmup += s.duration;
        else if (s.blockIndex === 1) blocksSec.plyo += s.duration;
        else if (s.blockIndex === 2) blocksSec.strength += s.duration;
        else if (s.blockIndex === 3) blocksSec.cardio += s.duration;
        else if (s.blockIndex === 4) blocksSec.stretch += s.duration;
        else if (s.blockIndex === 5) blocksSec.recovery += s.duration;
    });

    const session = TRAINING_DB && TRAINING_DB[week] && TRAINING_DB[week].days && TRAINING_DB[week].days[day] ? TRAINING_DB[week].days[day].ageGroups[ageGroup] : null;
    const warmupCount = session && session.warmup ? session.warmup.length : 3;
    let warmupRounds = 3;
    if (warmupCount <= 3) warmupRounds = 3;
    else if (warmupCount === 4) warmupRounds = 2;
    else if (warmupCount >= 5) warmupRounds = 2;

    let cardioRounds = 8;
    if (session && session.cardio) {
        if (session.cardio.name.includes("40/20") || session.cardio.name.includes("Semáforo")) cardioRounds = 6;
        else if (session.cardio.name.includes("EMOM")) cardioRounds = 8;
    }

    return {
        totalSec,
        totalMin: Math.round(totalSec / 60),
        formattedTotal: formatTime(totalSec),
        warmupRounds,
        cardioRounds,
        stepsCount: steps.length,
        blocks: {
            warmup: Math.round(blocksSec.warmup / 60),
            plyo: Math.round(blocksSec.plyo / 60),
            strength: Math.round(blocksSec.strength / 60),
            cardio: Math.round(blocksSec.cardio / 60),
            stretch: Math.round(blocksSec.stretch / 60),
            recovery: Math.round(blocksSec.recovery / 60)
        }
    };
}

/**
 * Compila la secuencia cronológica de trabajo y descanso de la sesión activa,
 * asegurando la duración completa estipulada para cada bloque (ej. 10 min de calentamiento con series repetidas).
 */
function buildWorkoutPlan(week, day, ageGroup) {
    const steps = [];
    if (!TRAINING_DB || !TRAINING_DB[week] || !TRAINING_DB[week].days || !TRAINING_DB[week].days[day]) {
        return steps;
    }

    const session = TRAINING_DB[week].days[day].ageGroups[ageGroup];
    if (!session) return steps;

    // 1. BLOQUE 1: CALENTAMIENTO Y ACTIVACIÓN DINÁMICA (Target: 10 min = 600s)
    if (session.warmup && session.warmup.length) {
        const warmupCount = session.warmup.length;
        // Si hay 3 ejercicios (o menos), se realizan 3 series completas (3 rondas x 3 ej = 9 min + transición = 10 min)
        let totalWarmupRounds = 3;
        if (warmupCount <= 3) totalWarmupRounds = 3;
        else if (warmupCount === 4) totalWarmupRounds = 2;
        else if (warmupCount >= 5) totalWarmupRounds = 2;

        for (let round = 1; round <= totalWarmupRounds; round++) {
            session.warmup.forEach((ex, idx) => {
                const exKey = `w${week}_d${day}_${ageGroup}_warm_${idx}`;
                // Trabajo activo: 45 segundos
                steps.push({
                    blockName: "1. Calentamiento Dinámico",
                    blockIndex: 0,
                    blockTotalSec: 600, // 10 min
                    name: ex.name,
                    type: "work",
                    phaseName: "ACTIVACIÓN",
                    duration: 45,
                    setLabel: `Serie ${round} de ${totalWarmupRounds} • Ejercicio ${idx + 1} de ${warmupCount}`,
                    video: ex.video,
                    desc: ex.desc,
                    target: ex.target || "Movilidad y Core",
                    tempo: "",
                    exerciseKey: round === totalWarmupRounds ? exKey : null
                });

                // 15s de transición al siguiente ejercicio
                steps.push({
                    blockName: "1. Calentamiento Dinámico",
                    blockIndex: 0,
                    blockTotalSec: 600,
                    name: "Transición y Respiración",
                    type: "rest",
                    phaseName: "TRANSICIÓN",
                    duration: 15,
                    setLabel: `Descanso Serie ${round} (${idx + 1}/${warmupCount})`,
                    video: session.warmup[idx + 1] ? session.warmup[idx + 1].video : (session.warmup[0] ? session.warmup[0].video : ex.video),
                    desc: "Respira hondo y prepárate para el siguiente movimiento articular.",
                    target: "Frecuencia Cardíaca",
                    tempo: "",
                    exerciseKey: null
                });
            });
        }

        // Si el tiempo acumulado de calentamiento es menor a 600s, se añade un paso preparatorio/hidratación
        const accumulatedWarmupSec = totalWarmupRounds * warmupCount * 60;
        const remainingWarmupSec = 600 - accumulatedWarmupSec;
        if (remainingWarmupSec > 0) {
            steps.push({
                blockName: "1. Calentamiento Dinámico",
                blockIndex: 0,
                blockTotalSec: 600,
                name: "Hidratación y Transición a Pliometría",
                type: "rest",
                phaseName: "PREPARACIÓN A PLIOMETRÍA",
                duration: remainingWarmupSec,
                setLabel: "Preparación Bloque 2A",
                video: session.plyo && session.plyo[0] ? session.plyo[0].video : session.warmup[0].video,
                desc: "Bebe un sorbo de agua, regula la respiración y prepárate para la máxima reactividad neuromuscular.",
                target: "SNC e Hidratación",
                tempo: "",
                exerciseKey: null
            });
        }
    }

    // 2. BLOQUE 2A: PLIOMETRÍA, AGILIDAD Y REACCIÓN (Target: ~10 min = 600s)
    if (session.plyo && session.plyo.length) {
        session.plyo.forEach((ex, idx) => {
            const exKey = `w${week}_d${day}_${ageGroup}_plyo_${idx}`;
            const setsCount = 3;
            for (let s = 1; s <= setsCount; s++) {
                steps.push({
                    blockName: "2A. Pliometría y Agilidad",
                    blockIndex: 1,
                    blockTotalSec: 600, // 10 min
                    name: ex.name,
                    type: "work",
                    phaseName: "TRABAJO PLIOMÉTRICO",
                    duration: 40,
                    setLabel: `Serie ${s} de ${setsCount} • Ejercicio ${idx + 1} de ${session.plyo.length}`,
                    video: ex.video,
                    desc: ex.desc,
                    target: ex.target || "Potencia de Salto",
                    tempo: "",
                    exerciseKey: s === setsCount ? exKey : null
                });

                steps.push({
                    blockName: "2A. Pliometría y Agilidad",
                    blockIndex: 1,
                    blockTotalSec: 600,
                    name: "Descanso Pliometría Completo",
                    type: "rest",
                    phaseName: "RECUPERACIÓN PCr",
                    duration: 60,
                    setLabel: `Descanso Serie ${s} (60s)`,
                    video: ex.video,
                    desc: "Recupera fosfocreatina (PCr). Camina suave, mantente activo y no te sientes.",
                    target: "Sistema Fosfágeno",
                    tempo: "",
                    exerciseKey: null
                });
            }
        });
    }

    // 3. BLOQUE 2B: FUERZA ESTRICTA CON TEMPOS (Target: ~15 min = 900s)
    if (session.strength && session.strength.length) {
        session.strength.forEach((ex, idx) => {
            const exKey = `w${week}_d${day}_${ageGroup}_str_${idx}`;
            const setsCount = 3;
            for (let s = 1; s <= setsCount; s++) {
                steps.push({
                    blockName: "2B. Fuerza Estricta (Tempos)",
                    blockIndex: 2,
                    blockTotalSec: 900, // 15 min
                    name: ex.name,
                    type: "work",
                    phaseName: "SERIE DE FUERZA",
                    duration: 45,
                    setLabel: `Serie ${s} de ${setsCount} • Ejercicio ${idx + 1} de ${session.strength.length}`,
                    video: ex.video,
                    desc: ex.desc,
                    target: ex.target || "Fuerza Muscular",
                    tempo: ex.tempo || "Tempo controlado",
                    exerciseKey: s === setsCount ? exKey : null
                });

                steps.push({
                    blockName: "2B. Fuerza Estricta (Tempos)",
                    blockIndex: 2,
                    blockTotalSec: 900,
                    name: "Descanso Muscular",
                    type: "rest",
                    phaseName: "DESCANSO",
                    duration: 45,
                    setLabel: `Descanso Serie ${s} (45s)`,
                    video: ex.video,
                    desc: "Hidrátate con pequeños sorbos de agua y sacude los músculos.",
                    target: "Recuperación Muscular",
                    tempo: "",
                    exerciseKey: null
                });
            }
        });
    }

    // 4. BLOQUE 2C: CARDIO ESPECÍFICO BMX (Target: ~10-13 min)
    if (session.cardio) {
        const cardio = session.cardio;
        const exKey = `w${week}_d${day}_${ageGroup}_cardio_0`;
        let rounds = 6;
        let workDuration = 30;
        let restDuration = 15;

        if (cardio.name.includes("20/20")) {
            rounds = 8;
            workDuration = 20;
            restDuration = 20;
        } else if (cardio.name.includes("15/30")) {
            rounds = 8;
            workDuration = 15;
            restDuration = 30;
        } else if (cardio.name.includes("30/15") || cardio.name.includes("Tabata")) {
            rounds = 8;
            workDuration = 30;
            restDuration = 15;
        } else if (cardio.name.includes("40/20") || cardio.name.includes("Semáforo")) {
            rounds = 6;
            workDuration = 40;
            restDuration = 20;
        } else if (cardio.name.includes("EMOM")) {
            rounds = 8;
            workDuration = 45;
            restDuration = 15;
        }

        for (let r = 1; r <= rounds; r++) {
            steps.push({
                blockName: "2C. Cardio Específico BMX",
                blockIndex: 3,
                blockTotalSec: 600,
                name: cardio.name,
                type: "work",
                phaseName: "ESFUERZO MÁXIMO",
                duration: workDuration,
                setLabel: `Ronda ${r} de ${rounds}`,
                video: cardio.video,
                desc: cardio.desc,
                target: "Tolerancia Láctica y Potencia",
                tempo: "Máxima Aceleración",
                exerciseKey: r === rounds ? exKey : null
            });

            steps.push({
                blockName: "2C. Cardio Específico BMX",
                blockIndex: 3,
                blockTotalSec: 600,
                name: "Recuperación Anaeróbica",
                type: "rest",
                phaseName: "DESCANSO INTERVALO",
                duration: restDuration,
                setLabel: `Descanso Ronda ${r}`,
                video: cardio.video,
                desc: "Regula la respiración diafragmática antes del siguiente sprint.",
                target: "Resistencia Anaeróbica",
                tempo: "",
                exerciseKey: null
            });
        }
    }

    // 5. BLOQUE 3: ESTIRAMIENTO POST-ENTRENAMIENTO (Target: 8 min = 480s)
    if (session.stretch && session.stretch.length) {
        const stretchRounds = session.stretch.length <= 3 ? 3 : 2;
        for (let r = 1; r <= stretchRounds; r++) {
            session.stretch.forEach((ex, idx) => {
                const exKey = `w${week}_d${day}_${ageGroup}_strtch_${idx}`;
                steps.push({
                    blockName: "3. Estiramiento Post-Entreno",
                    blockIndex: 4,
                    blockTotalSec: 480, // 8 min
                    name: ex.name,
                    type: "work",
                    phaseName: "ELONGACIÓN ESTÁTICA",
                    duration: 40,
                    setLabel: `Serie ${r} de ${stretchRounds} • Postura ${idx + 1} de ${session.stretch.length}`,
                    video: ex.video,
                    desc: ex.desc,
                    target: "Flexibilidad y Prevención",
                    tempo: "Sostener sin rebotar",
                    exerciseKey: r === stretchRounds ? exKey : null
                });

                steps.push({
                    blockName: "3. Estiramiento Post-Entreno",
                    blockIndex: 4,
                    blockTotalSec: 480,
                    name: "Cambio de Postura",
                    type: "rest",
                    phaseName: "CAMBIO",
                    duration: 10,
                    setLabel: "Transición",
                    video: session.stretch[idx + 1] ? session.stretch[idx + 1].video : ex.video,
                    desc: "Cambia suavemente de extremidad o pasa al siguiente grupo muscular.",
                    target: "Movilidad",
                    tempo: "",
                    exerciseKey: null
                });
            });
        }
    }

    // 6. BLOQUE 4: RECUPERACIÓN PARASIMPÁTICA (Target: 4 min = 240s)
    if (session.recovery) {
        const recKey = `w${week}_d${day}_${ageGroup}_rec_0`;
        steps.push({
            blockName: "4. Recuperación Parasimpática",
            blockIndex: 5,
            blockTotalSec: 240, // 4 min
            name: session.recovery.name,
            type: "work",
            phaseName: "RESPIRACIÓN Y VISUALIZACIÓN",
            duration: 240, // 4 minutos
            setLabel: "Recuperación Final",
            video: "https://www.youtube.com/embed/2MJGg-dUKh0",
            desc: session.recovery.desc,
            target: "Sistema Nervioso Central (SNC)",
            tempo: "Inhalar 4s - Retener 4s - Exhalar 6s",
            exerciseKey: recKey
        });
    }

    return steps;
}

/**
 * Inicia el cronómetro modal guiado para la sesión activa
 */
function startGuidedWorkout() {
    workoutSteps = buildWorkoutPlan(state.activeWeek, state.activeDay, state.activeAgeGroup);
    if (!workoutSteps.length) {
        alert("No se encontraron ejercicios disponibles para esta sesión.");
        return;
    }

    currentStepIndex = 0;
    stepSecondsLeft = workoutSteps[0].duration;
    isWorkoutRunning = true;

    // Resetear vistas del modal
    const modal = document.getElementById('guidedWorkoutModal');
    const trackerView = document.getElementById('gwTrackerView');
    const finishedView = document.getElementById('gwFinishedView');

    if (trackerView) trackerView.classList.remove('hidden');
    if (finishedView) finishedView.classList.add('hidden');
    if (modal) modal.classList.remove('hidden');

    // Inicializar audio si está soportado
    if (typeof getAudioContext === 'function') {
        getAudioContext();
    }

    // Tono de inicio del gate start
    if (!isWorkoutMuted && typeof playGateBeeps === 'function') {
        playGateBeeps();
    }

    updateWorkoutUI();
    startWorkoutInterval();
}

/**
 * Motor del temporizador con cuenta regresiva en segundos
 */
function startWorkoutInterval() {
    if (workoutTimerInterval) clearInterval(workoutTimerInterval);

    workoutTimerInterval = setInterval(() => {
        if (!isWorkoutRunning) return;

        // Beeps de partidor en los 3 últimos segundos
        if (stepSecondsLeft <= 3 && stepSecondsLeft > 0) {
            if (!isWorkoutMuted && typeof playBeep === 'function') {
                playBeep(700, 0.1);
            }
        }

        stepSecondsLeft--;

        if (stepSecondsLeft <= 0) {
            // Tono de cambio de fase
            if (!isWorkoutMuted && typeof playBeep === 'function') {
                playBeep(1200, 0.3, 'triangle');
            }

            // Marcar ejercicio en el progreso si corresponde
            const currentStep = workoutSteps[currentStepIndex];
            if (currentStep && currentStep.exerciseKey) {
                markExerciseAsDone(currentStep.exerciseKey);
            }

            advanceWorkoutStep();
        } else {
            updateWorkoutUI();
        }
    }, 1000);
}

/**
 * Avanza al siguiente paso de la sesión
 */
function advanceWorkoutStep() {
    currentStepIndex++;
    if (currentStepIndex >= workoutSteps.length) {
        finishGuidedWorkout();
    } else {
        stepSecondsLeft = workoutSteps[currentStepIndex].duration;
        updateWorkoutUI();
    }
}

/**
 * Retrocede al paso anterior o reinicia el actual
 */
function prevWorkoutStep() {
    const curStep = workoutSteps[currentStepIndex];
    if (stepSecondsLeft < curStep.duration - 4) {
        stepSecondsLeft = curStep.duration;
    } else {
        if (currentStepIndex > 0) {
            currentStepIndex--;
            stepSecondsLeft = workoutSteps[currentStepIndex].duration;
        } else {
            stepSecondsLeft = curStep.duration;
        }
    }
    updateWorkoutUI();
}

/**
 * Salta al siguiente paso manualmente (adelantar)
 */
function nextWorkoutStep() {
    const currentStep = workoutSteps[currentStepIndex];
    if (currentStep && currentStep.exerciseKey) {
        markExerciseAsDone(currentStep.exerciseKey);
    }
    advanceWorkoutStep();
}

/**
 * Completa la serie actual (pasa directo al descanso o siguiente ejercicio)
 */
function skipCurrentWorkoutPhase() {
    nextWorkoutStep();
}

/**
 * Pausa o reanuda el cronómetro de la sesión
 */
function toggleWorkoutPlayPause() {
    isWorkoutRunning = !isWorkoutRunning;
    const btnIcon = document.getElementById('gwPlayPauseIcon');
    const playBtn = document.getElementById('gwPlayPauseBtn');

    if (btnIcon) {
        btnIcon.className = isWorkoutRunning ? "fa-solid fa-pause" : "fa-solid fa-play ml-0.5";
    }
    if (playBtn) {
        if (isWorkoutRunning) {
            playBtn.classList.remove('bg-emerald-600', 'hover:bg-emerald-500');
            playBtn.classList.add('bg-red-600', 'hover:bg-red-500');
        } else {
            playBtn.classList.remove('bg-red-600', 'hover:bg-red-500');
            playBtn.classList.add('bg-emerald-600', 'hover:bg-emerald-500');
        }
    }
}

/**
 * Activa o silencia los beeps sonoros del partidor
 */
function toggleWorkoutSound() {
    isWorkoutMuted = !isWorkoutMuted;
    const soundIcon = document.getElementById('gwSoundIcon');
    const soundBtn = document.getElementById('gwSoundBtn');

    if (soundIcon) {
        soundIcon.className = isWorkoutMuted ? "fa-solid fa-volume-xmark text-slate-500" : "fa-solid fa-volume-high text-amber-400";
    }
    if (soundBtn) {
        soundBtn.title = isWorkoutMuted ? "Sonido silenciado (clic para activar)" : "Sonido activado (clic para silenciar)";
    }
}

/**
 * Actualiza todos los elementos reactivos del modal de seguimiento
 */
function updateWorkoutUI() {
    const curStep = workoutSteps[currentStepIndex];
    if (!curStep) return;

    // 1. TÍTULOS Y CABECERA
    const blockBadge = document.getElementById('gwBlockBadge');
    const sessionTitle = document.getElementById('gwSessionTitle');
    if (blockBadge) blockBadge.innerText = curStep.blockName;
    if (sessionTitle) sessionTitle.innerText = `Semana ${state.activeWeek} • Día ${state.activeDay} (${getAgeGroupName(state.activeAgeGroup)})`;

    // 2. TIMERS Y PROGRESS BARS
    const exTimer = document.getElementById('gwExerciseTimer');
    const phaseBadge = document.getElementById('gwPhaseBadge');
    const setCounter = document.getElementById('gwSetCounter');

    if (exTimer) exTimer.innerText = formatTime(stepSecondsLeft);
    if (setCounter) setCounter.innerText = curStep.setLabel;

    if (phaseBadge) {
        phaseBadge.innerText = curStep.phaseName;
        if (curStep.type === 'work') {
            phaseBadge.className = "px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/30 animate-pulse";
        } else {
            phaseBadge.className = "px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-cyan-600/20 text-cyan-400 border border-cyan-500/30";
        }
    }

    // Cálculo del tiempo restante en el bloque actual
    let blockSecondsRemaining = stepSecondsLeft;
    for (let i = currentStepIndex + 1; i < workoutSteps.length; i++) {
        if (workoutSteps[i].blockIndex === curStep.blockIndex) {
            blockSecondsRemaining += workoutSteps[i].duration;
        }
    }
    const blockTimer = document.getElementById('gwBlockTimer');
    if (blockTimer) blockTimer.innerText = formatTime(blockSecondsRemaining);

    // Cálculo del tiempo total restante de la sesión
    let sessionSecondsRemaining = stepSecondsLeft;
    for (let i = currentStepIndex + 1; i < workoutSteps.length; i++) {
        sessionSecondsRemaining += workoutSteps[i].duration;
    }
    const sessionTimer = document.getElementById('gwSessionTimer');
    if (sessionTimer) sessionTimer.innerText = formatTime(sessionSecondsRemaining);

    // Barra de progreso general de la sesión
    let totalWorkoutSec = 0;
    workoutSteps.forEach(s => totalWorkoutSec += s.duration);
    const sessionElapsedSec = totalWorkoutSec - sessionSecondsRemaining;
    const sessionPct = totalWorkoutSec > 0 ? Math.min(Math.round((sessionElapsedSec / totalWorkoutSec) * 100), 100) : 0;

    const sessionBar = document.getElementById('gwSessionProgressBar');
    const sessionPctElem = document.getElementById('gwSessionProgressPct');
    if (sessionBar) sessionBar.style.width = `${sessionPct}%`;
    if (sessionPctElem) sessionPctElem.innerText = `${sessionPct}%`;

    // Barra de progreso del paso actual
    const stepPct = curStep.duration > 0 ? Math.max(Math.round((stepSecondsLeft / curStep.duration) * 100), 0) : 0;
    const stepBar = document.getElementById('gwStepProgressBar');
    if (stepBar) stepBar.style.width = `${stepPct}%`;

    // 3. DETALLE DEL EJERCICIO ACTUAL (Lado Derecho)
    const activeTitle = document.getElementById('gwActiveExerciseTitle');
    const activeDetails = document.getElementById('gwActiveExerciseDetails');
    const activeDesc = document.getElementById('gwActiveExerciseDesc');
    const activeTempo = document.getElementById('gwActiveExerciseTempo');

    if (activeTitle) activeTitle.innerText = curStep.name;
    if (activeDetails) activeDetails.innerText = `${curStep.blockName} • ${curStep.setLabel}`;
    if (activeDesc) activeDesc.innerText = curStep.desc || '';
    if (activeTempo) {
        if (curStep.tempo) {
            activeTempo.classList.remove('hidden');
            activeTempo.innerHTML = `<i class="fa-solid fa-stopwatch mr-1 text-purple-400"></i> ${curStep.tempo}`;
        } else {
            activeTempo.classList.add('hidden');
        }
    }

    // 4. DETALLE DEL SIGUIENTE EJERCICIO ("EL QUE CONTINÚA")
    const nextStep = getNextDistinctExercise(currentStepIndex);
    const nextTitle = document.getElementById('gwNextExerciseTitle');
    const nextDetails = document.getElementById('gwNextExerciseDetails');
    const nextTip = document.getElementById('gwNextExerciseTip');

    if (nextStep) {
        if (nextTitle) nextTitle.innerText = nextStep.name;
        if (nextDetails) nextDetails.innerText = `${nextStep.blockName} • ${nextStep.setLabel}`;
        if (nextTip) nextTip.innerText = nextStep.target ? `Objetivo: ${nextStep.target}` : (nextStep.desc ? nextStep.desc.slice(0, 75) + '...' : '');
    } else {
        if (nextTitle) nextTitle.innerText = "¡Último ejercicio de la sesión!";
        if (nextDetails) nextDetails.innerText = "Finalizando entrenamiento con recuperación parasimpática";
        if (nextTip) nextTip.innerText = "Prepárate para registrar tu victoria.";
    }

    // 5. VIDEO IFRAME DEL EJERCICIO
    const iframe = document.getElementById('gwVideoIframe');
    if (iframe) {
        // En descanso, si hay próximo ejercicio con video, mostramos el próximo para que aprenda la técnica
        const videoToPlay = (curStep.type === 'rest' && nextStep && nextStep.video) ? nextStep.video : curStep.video;
        if (videoToPlay && !iframe.src.includes(videoToPlay)) {
            iframe.src = videoToPlay.includes('?') ? `${videoToPlay}&autoplay=1&mute=1` : `${videoToPlay}?autoplay=1&mute=1`;
        }
    }
}

/**
 * Busca el siguiente paso que represente un ejercicio diferente o serie activa
 */
function getNextDistinctExercise(fromIndex) {
    for (let i = fromIndex + 1; i < workoutSteps.length; i++) {
        if (workoutSteps[i].type === 'work') {
            return workoutSteps[i];
        }
    }
    return null;
}

/**
 * Finaliza la sesión guiada, marca el progreso y actualiza el calendario
 */
function finishGuidedWorkout() {
    if (workoutTimerInterval) clearInterval(workoutTimerInterval);
    isWorkoutRunning = false;

    // 1. Marcar todos los ejercicios de la sesión activa como completados
    const athlete = state.currentAthlete;
    if (!state.progress[athlete]) state.progress[athlete] = {};

    workoutSteps.forEach(s => {
        if (s.exerciseKey) {
            state.progress[athlete][s.exerciseKey] = true;
        }
    });

    // 2. Registrar en el historial del atleta con fecha actual
    if (!state.history[athlete]) state.history[athlete] = [];
    const scheduledDate = (typeof getScheduledDateForSession === 'function') 
        ? getScheduledDateForSession(state.activeWeek, state.activeDay) 
        : new Date().toLocaleDateString('es-ES');

    state.history[athlete].push({
        date: new Date().toISOString(),
        scheduledDate: scheduledDate,
        week: state.activeWeek,
        day: state.activeDay,
        ageGroup: state.activeAgeGroup,
        completedAt: new Date().toLocaleTimeString('es-ES')
    });

    // 3. Guardar en LocalStorage
    if (typeof saveStateToStorage === 'function') {
        saveStateToStorage();
    }

    // 4. Actualizar calendario de seguimiento y vista principal
    if (typeof renderCalendarSchedule === 'function') {
        renderCalendarSchedule();
    }
    if (typeof renderActiveView === 'function') {
        renderActiveView();
    }

    // 5. Celebración con Confetti
    if (window.confetti) {
        window.confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.5 }
        });
    }

    // 6. Sonido de victoria si está activo
    if (!isWorkoutMuted && typeof playGateBeeps === 'function') {
        playGateBeeps();
    }

    // 7. Mostrar pantalla de victoria en el modal
    const trackerView = document.getElementById('gwTrackerView');
    const finishedView = document.getElementById('gwFinishedView');
    const finishAthleteName = document.getElementById('gwFinishAthleteName');
    const finishSessionDetail = document.getElementById('gwFinishSessionDetail');

    if (trackerView) trackerView.classList.add('hidden');
    if (finishedView) finishedView.classList.remove('hidden');
    if (finishAthleteName) finishAthleteName.innerText = athlete;
    if (finishSessionDetail) finishSessionDetail.innerText = `Semana ${state.activeWeek} • Día ${state.activeDay} • ${scheduledDate}`;
}

/**
 * Cierra o minimiza el modal de seguimiento
 */
function exitGuidedWorkout() {
    if (isWorkoutRunning) {
        const confirmExit = confirm("¿Deseas pausar y salir del entrenamiento guiado? Tu progreso actual se guardará.");
        if (!confirmExit) return;
    }

    if (workoutTimerInterval) clearInterval(workoutTimerInterval);
    isWorkoutRunning = false;

    const iframe = document.getElementById('gwVideoIframe');
    if (iframe) iframe.src = '';

    const modal = document.getElementById('guidedWorkoutModal');
    if (modal) modal.classList.add('hidden');

    if (typeof renderActiveView === 'function') {
        renderActiveView();
    }
}

/**
 * Función auxiliar para marcar un ejercicio individual como hecho
 */
function markExerciseAsDone(exKey) {
    const athlete = state.currentAthlete;
    if (!state.progress[athlete]) state.progress[athlete] = {};
    state.progress[athlete][exKey] = true;

    if (typeof saveStateToStorage === 'function') {
        saveStateToStorage();
    }
}

/**
 * Convierte segundos a formato MM:SS
 */
function formatTime(totalSec) {
    const s = Math.max(0, Math.floor(totalSec));
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m < 10 ? '0' : ''}${m}:${rem < 10 ? '0' : ''}${rem}`;
}

function getAgeGroupName(age) {
    const map = {
        'sub6': 'Menores de 6 años',
        '7to12': '7 a 12 años',
        '13to17': '13 a 17 años'
    };
    return map[age] || '7 a 12 años';
}
