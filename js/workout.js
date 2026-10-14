/**
 * ACTIVERZA BMX RACING ACADEMY
 * Módulo de Seguimiento Completo de Sesión Guiada (Guided WOD Tracker)
 * Cronómetro interválico con anticipación del siguiente ejercicio,
 * control de tiempos (ejercicio, bloque y sesión), videos, series dinámicas con descanso intercalado,
 * justificación técnica BMX del PDF y finalización de calendario.
 */

let workoutSteps = [];
let currentStepIndex = 0;
let stepSecondsLeft = 0;
let workoutTimerInterval = null;
let isWorkoutRunning = false;
let isWorkoutMuted = false;

/**
 * Extrae el número total de series desde la cadena del ejercicio (ej. "4 series de 20 saltos" -> 4)
 */
function parseSetsCount(setsStr, defaultSets = 3) {
    if (!setsStr) return defaultSets;
    const match = setsStr.match(/(\d+)\s*series/i);
    if (match && match[1]) {
        const val = parseInt(match[1], 10);
        if (!isNaN(val) && val > 0) return val;
    }
    return defaultSets;
}

/**
 * Extrae la duración de descanso desde la cadena (ej. "Descanso 60s" -> 60)
 */
function parseRestSeconds(restStr, defaultRest = 60) {
    if (!restStr) return defaultRest;
    const match = restStr.match(/(\d+)\s*s/i);
    if (match && match[1]) {
        const val = parseInt(match[1], 10);
        if (!isNaN(val) && val > 0) return val;
    }
    return defaultRest;
}

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

    return {
        totalMinutes: Math.round(totalSec / 60),
        totalSeconds: totalSec,
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
 * Construye la lista lineal de pasos para la sesión guiada
 */
function buildWorkoutPlan(week, day, ageGroup) {
    const steps = [];
    if (!TRAINING_DB || !TRAINING_DB[week] || !TRAINING_DB[week].days || !TRAINING_DB[week].days[day]) {
        return steps;
    }

    const session = TRAINING_DB[week].days[day].ageGroups[ageGroup];
    if (!session) return steps;

    const warmupInsight = (typeof getBlockInsight === 'function') ? getBlockInsight('warmup', week, day, ageGroup) : "Calentamiento dinámico y activación neuromuscular sin fatiga previa.";
    const plyoInsight = (typeof getBlockInsight === 'function') ? getBlockInsight('plyo', week, day, ageGroup) : "En el BMX, un tobillo firme transfiere mejor la potencia al pedal. Descanso de 60 segundos entre series.";
    const strengthInsight = (typeof getBlockInsight === 'function') ? getBlockInsight('strength', week, day, ageGroup) : "Nomenclatura del Tempo: [Bajada / Pausa abajo / Subida / Pausa arriba]. Fase de bajada lenta (3 segundos) para proteger articulaciones y desarrollar fuerza tendinosa.";
    const cardioInsight = (typeof getBlockInsight === 'function') ? getBlockInsight('cardio', week, day, ageGroup) : "Simulación de carrera en pista y tolerancia láctica en la última recta.";
    const stretchInsight = (typeof getBlockInsight === 'function') ? getBlockInsight('stretch', week, day, ageGroup) : "POST-ENTRENAMIENTO. Sostener de 20 a 30s sin rebotar para devolver longitud al tejido y reducir tono muscular.";
    const recoveryInsight = (typeof getBlockInsight === 'function') ? getBlockInsight('recovery', week, day, ageGroup) : "Protocolo de Visualización Guiada (Imagery) y Respiración 4-4-6.";

    // 1. BLOQUE 1: CALENTAMIENTO Y ACTIVACIÓN DINÁMICA (Target: 10 min = 600s)
    if (session.warmup && session.warmup.length) {
        const warmupCount = session.warmup.length;
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
                    blockTotalSec: 600,
                    name: ex.name,
                    type: "work",
                    phaseName: "ACTIVACIÓN",
                    duration: 45,
                    setIndex: round,
                    totalSets: totalWarmupRounds,
                    setLabel: `Ronda ${round} de ${totalWarmupRounds} • Ejercicio ${idx + 1} de ${warmupCount}`,
                    executionInfo: `Ronda ${round} de ${totalWarmupRounds} (45s de trabajo continuo)`,
                    blockInsight: warmupInsight,
                    video: ex.video,
                    desc: ex.desc,
                    target: ex.target || "Activación Articular y SNC",
                    tempo: "Fluido y controlado",
                    exerciseKey: round === totalWarmupRounds ? exKey : null
                });

                // Transición / Descanso activo: 15 segundos
                steps.push({
                    blockName: "1. Calentamiento Dinámico",
                    blockIndex: 0,
                    blockTotalSec: 600,
                    name: "Transición y Respiración",
                    type: "rest",
                    phaseName: "TRANSICIÓN",
                    duration: 15,
                    setIndex: round,
                    totalSets: totalWarmupRounds,
                    nextSetIndex: idx + 1 < warmupCount ? `Ej. ${idx + 2}` : `Ronda ${round + 1}`,
                    setLabel: `Transición (15s)`,
                    executionInfo: `Respira hondo y prepárate para el siguiente ejercicio`,
                    blockInsight: warmupInsight,
                    video: ex.video,
                    desc: "Respira hondo, sacude extremidades y prepárate para el siguiente movimiento.",
                    target: "Pausa activa",
                    tempo: "",
                    exerciseKey: null
                });
            });
        }
    }

    // 2. BLOQUE 2A: PLIOMETRÍA, AGILIDAD Y REACCIÓN (Target: ~10 min = 600s)
    if (session.plyo && session.plyo.length) {
        session.plyo.forEach((ex, idx) => {
            const exKey = `w${week}_d${day}_${ageGroup}_plyo_${idx}`;
            const setsCount = parseSetsCount(ex.sets, 4);
            const restSeconds = parseRestSeconds(ex.rest, 60);

            for (let s = 1; s <= setsCount; s++) {
                // Trabajo de la Serie
                steps.push({
                    blockName: "2A. Pliometría, Agilidad y Reacción",
                    blockIndex: 1,
                    blockTotalSec: 600,
                    name: ex.name,
                    type: "work",
                    phaseName: "SERIE EN EJECUCIÓN",
                    duration: 40, // Tiempo sugerido
                    setIndex: s,
                    totalSets: setsCount,
                    restDuration: restSeconds,
                    setLabel: `Serie ${s} de ${setsCount}`,
                    executionInfo: ex.sets ? `${ex.sets}` : `Serie ${s} de ${setsCount}`,
                    blockInsight: plyoInsight,
                    video: ex.video,
                    desc: ex.desc,
                    target: ex.target || "Potencia de Salto y Stiffness",
                    tempo: "Máxima explosividad",
                    exerciseKey: s === setsCount ? exKey : null
                });

                // Descanso entre series
                steps.push({
                    blockName: "2A. Pliometría, Agilidad y Reacción",
                    blockIndex: 1,
                    blockTotalSec: 600,
                    name: `${ex.name} - Descanso Recuperación`,
                    type: "rest",
                    phaseName: "DESCANSO PCr",
                    duration: restSeconds,
                    setIndex: s,
                    totalSets: setsCount,
                    nextSetIndex: s < setsCount ? (s + 1) : "Siguiente Ejercicio",
                    setLabel: `Descanso Serie ${s} (${restSeconds}s)`,
                    executionInfo: `Descanso de ${restSeconds}s tras completar Serie ${s} de ${setsCount}`,
                    blockInsight: plyoInsight,
                    video: ex.video,
                    desc: "Recupera fosfocreatina (PCr). Camina suave, mantente activo y no te sientes.",
                    target: "Sistema Fosfágeno (PCr)",
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
            const setsCount = parseSetsCount(ex.sets, 3);
            const restSeconds = parseRestSeconds(ex.rest, 60);

            for (let s = 1; s <= setsCount; s++) {
                steps.push({
                    blockName: "2B. Fuerza Estricta (Tempos)",
                    blockIndex: 2,
                    blockTotalSec: 900,
                    name: ex.name,
                    type: "work",
                    phaseName: "SERIE DE FUERZA",
                    duration: 45,
                    setIndex: s,
                    totalSets: setsCount,
                    restDuration: restSeconds,
                    setLabel: `Serie ${s} de ${setsCount}`,
                    executionInfo: ex.sets ? `${ex.sets}` : `Serie ${s} de ${setsCount}`,
                    blockInsight: strengthInsight,
                    video: ex.video,
                    desc: ex.desc,
                    target: ex.target || "Fuerza Muscular y Tendinosa",
                    tempo: ex.tempo ? `Tempo ${ex.tempo} [Bajada / Pausa / Subida / Pausa]` : "Tempo controlado 3-0-1-0",
                    exerciseKey: s === setsCount ? exKey : null
                });

                steps.push({
                    blockName: "2B. Fuerza Estricta (Tempos)",
                    blockIndex: 2,
                    blockTotalSec: 900,
                    name: `${ex.name} - Descanso Muscular`,
                    type: "rest",
                    phaseName: "DESCANSO MUSCULAR",
                    duration: restSeconds,
                    setIndex: s,
                    totalSets: setsCount,
                    nextSetIndex: s < setsCount ? (s + 1) : "Siguiente Ejercicio",
                    setLabel: `Descanso Serie ${s} (${restSeconds}s)`,
                    executionInfo: `Descanso de ${restSeconds}s tras completar Serie ${s} de ${setsCount}`,
                    blockInsight: strengthInsight,
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
                setIndex: r,
                totalSets: rounds,
                setLabel: `Ronda ${r} de ${rounds}`,
                executionInfo: `Ronda ${r} de ${rounds} (${workDuration}s Máximo Esfuerzo)`,
                blockInsight: cardioInsight,
                video: cardio.video,
                desc: cardio.desc,
                target: "Tolerancia Láctica y Potencia en Recta",
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
                setIndex: r,
                totalSets: rounds,
                nextSetIndex: r < rounds ? (r + 1) : "Estiramiento",
                setLabel: `Descanso Ronda ${r} (${restDuration}s)`,
                executionInfo: `Recuperación de ${restDuration}s antes del próximo sprint`,
                blockInsight: cardioInsight,
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
                    blockTotalSec: 480,
                    name: ex.name,
                    type: "work",
                    phaseName: "ELONGACIÓN ESTÁTICA",
                    duration: 40,
                    setIndex: r,
                    totalSets: stretchRounds,
                    setLabel: `Serie ${r} de ${stretchRounds} • Postura ${idx + 1} de ${session.stretch.length}`,
                    executionInfo: ex.duration ? `${ex.duration} (Sostener sin rebotar)` : `Sostener 20-30s por lado`,
                    blockInsight: stretchInsight,
                    video: ex.video,
                    desc: ex.desc,
                    target: "Flexibilidad y Prevención de Lesiones",
                    tempo: "Sostener estático sin rebotar",
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
                    setIndex: r,
                    totalSets: stretchRounds,
                    nextSetIndex: idx + 1 < session.stretch.length ? `Postura ${idx + 2}` : `Serie ${r + 1}`,
                    setLabel: "Transición (10s)",
                    executionInfo: "Cambia suavemente de postura sin movimientos bruscos",
                    blockInsight: stretchInsight,
                    video: session.stretch[idx + 1] ? session.stretch[idx + 1].video : ex.video,
                    desc: "Cambia suavemente de extremidad o pasa al siguiente grupo muscular.",
                    target: "Movilidad Articular",
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
            blockTotalSec: 240,
            name: session.recovery.name,
            type: "work",
            phaseName: "RESPIRACIÓN Y VISUALIZACIÓN",
            duration: 240,
            setIndex: 1,
            totalSets: 1,
            setLabel: "Recuperación Final (4 min)",
            executionInfo: "4 minutos de visualización guiada en partidor y respiración diafragmática 4-4-6",
            blockInsight: recoveryInsight,
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
        alert("No se encontró plan de entrenamiento para los parámetros seleccionados.");
        return;
    }

    currentStepIndex = 0;
    stepSecondsLeft = workoutSteps[0].duration;
    isWorkoutRunning = true;

    const modal = document.getElementById('guidedWorkoutModal');
    const trackerView = document.getElementById('gwTrackerView');
    const finishView = document.getElementById('gwFinishedView');
    const playBtn = document.getElementById('gwPlayPauseBtn');
    const btnIcon = document.getElementById('gwPlayPauseIcon');

    if (modal) modal.classList.remove('hidden');
    if (trackerView) trackerView.classList.remove('hidden');
    if (finishView) finishView.classList.add('hidden');

    if (btnIcon) btnIcon.className = "fa-solid fa-pause";
    if (playBtn) {
        playBtn.classList.remove('bg-emerald-600', 'hover:bg-emerald-500');
        playBtn.classList.add('bg-red-600', 'hover:bg-red-500');
    }

    updateWorkoutUI();
    startWorkoutInterval();
}

/**
 * Arranca el temporizador de intervalo por segundo
 */
function startWorkoutInterval() {
    if (workoutTimerInterval) clearInterval(workoutTimerInterval);

    workoutTimerInterval = setInterval(() => {
        if (!isWorkoutRunning) return;

        if (stepSecondsLeft > 0) {
            stepSecondsLeft--;
            // Beep de anticipación en los últimos 3 segundos
            if (stepSecondsLeft <= 3 && stepSecondsLeft > 0 && !isWorkoutMuted) {
                if (typeof playBeep === 'function') playBeep(520, 0.1);
            }
            updateWorkoutUI();
        } else {
            // Sonido de cambio de fase
            if (!isWorkoutMuted && typeof playBeep === 'function') {
                playBeep(880, 0.35);
            }
            advanceWorkoutStep();
        }
    }, 1000);
}

/**
 * Avanza al siguiente paso de la sesión
 */
function advanceWorkoutStep() {
    const curStep = workoutSteps[currentStepIndex];
    if (curStep && curStep.exerciseKey) {
        markExerciseAsDone(curStep.exerciseKey);
    }

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
    if (!isWorkoutMuted && typeof playBeep === 'function') {
        playBeep(800, 0.15);
    }
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

    // 3. CAJAS DINÁMICAS DE EJECUCIÓN Y ENFOQUE BIOMECÁNICO BMX (Requerimiento Usuario)
    const executionBox = document.getElementById('gwExecutionText');
    const insightBox = document.getElementById('gwInsightText');
    if (executionBox) {
        executionBox.innerText = curStep.executionInfo || curStep.setLabel;
    }
    if (insightBox) {
        insightBox.innerText = curStep.blockInsight || "En el BMX, la transferencia de potencia exige estabilidad, técnica y rigidez articular.";
    }

    // 4. BOTÓN DINÁMICO DE SERIE COMPLETADA / PASAR A DESCANSO
    const actionBtn = document.getElementById('gwSetActionButton');
    if (actionBtn) {
        if (curStep.type === 'work') {
            actionBtn.className = "w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-red-600/30 transition flex items-center justify-center gap-2 cursor-pointer active:scale-98";
            actionBtn.innerHTML = `<i class="fa-solid fa-check-double text-emerald-300"></i> <span>¡Serie ${curStep.setIndex || 1} Completada! Pasar a Descanso (${curStep.restDuration || 60}s)</span>`;
            actionBtn.title = "Haz clic al terminar tus repeticiones para avanzar de serie y comenzar el descanso";
        } else {
            actionBtn.className = "w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-cyan-600/30 transition flex items-center justify-center gap-2 cursor-pointer active:scale-98";
            actionBtn.innerHTML = `<i class="fa-solid fa-forward text-cyan-200"></i> <span>¡Listo! Comenzar Serie ${curStep.nextSetIndex || ''}</span>`;
            actionBtn.title = "Si ya te recuperaste, haz clic para saltar el descanso e iniciar la siguiente serie";
        }
    }

    // 5. DETALLE DEL EJERCICIO ACTUAL (Lado Derecho)
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

    // 6. DETALLE DEL SIGUIENTE EJERCICIO ("EL QUE CONTINÚA")
    const nextStep = getNextDistinctExercise(currentStepIndex);
    const nextTitle = document.getElementById('gwNextExerciseTitle');
    const nextDetails = document.getElementById('gwNextExerciseDetails');
    const nextTip = document.getElementById('gwNextExerciseTip');

    if (nextStep) {
        if (nextTitle) nextTitle.innerText = nextStep.name;
        if (nextDetails) nextDetails.innerText = `${nextStep.blockName} • ${nextStep.setLabel}`;
        if (nextTip) nextTip.innerText = nextStep.target ? `Objetivo: ${nextStep.target}` : (nextStep.desc ? nextStep.desc.slice(0, 80) + '...' : '');
    } else {
        if (nextTitle) nextTitle.innerText = "¡Último ejercicio de la sesión!";
        if (nextDetails) nextDetails.innerText = "Finalizando entrenamiento con recuperación parasimpática";
        if (nextTip) nextTip.innerText = "Prepárate para registrar tu victoria.";
    }

    // 7. VIDEO IFRAME DEL EJERCICIO
    const iframe = document.getElementById('gwVideoIframe');
    if (iframe) {
        const videoToPlay = (curStep.type === 'rest' && nextStep && nextStep.video) ? nextStep.video : curStep.video;
        if (videoToPlay && !iframe.src.includes(videoToPlay)) {
            iframe.src = videoToPlay.includes('?') ? `${videoToPlay}&autoplay=1&mute=1` : `${videoToPlay}?autoplay=1&mute=1`;
        }
    }
}

/**
 * Busca el siguiente paso que represente un ejercicio diferente o serie activa
 */
function getNextDistinctExercise(startIndex) {
    const cur = workoutSteps[startIndex];
    for (let i = startIndex + 1; i < workoutSteps.length; i++) {
        const candidate = workoutSteps[i];
        if (candidate.type === 'work' && (candidate.name !== cur.name || candidate.setLabel !== cur.setLabel)) {
            return candidate;
        }
    }
    return null;
}

/**
 * Marca el ejercicio completado en el progreso del atleta
 */
function markExerciseAsDone(exKey) {
    if (!exKey || typeof state === 'undefined') return;
    const athlete = state.currentAthlete;
    if (!state.progress[athlete]) state.progress[athlete] = {};
    if (!state.progress[athlete][exKey]) {
        state.progress[athlete][exKey] = true;
        if (typeof saveStateToStorage === 'function') saveStateToStorage();
        if (typeof renderActiveView === 'function') renderActiveView();
    }
}

/**
 * Finaliza la sesión guiada con pantalla de celebración y registro
 */
function finishGuidedWorkout() {
    if (workoutTimerInterval) clearInterval(workoutTimerInterval);
    isWorkoutRunning = false;

    if (!isWorkoutMuted && typeof playBeep === 'function') {
        playBeep(523, 0.2);
        setTimeout(() => playBeep(659, 0.2), 200);
        setTimeout(() => playBeep(784, 0.4), 400);
    }

    // Registrar en el historial del atleta
    const athlete = state.currentAthlete;
    if (!state.history[athlete]) state.history[athlete] = [];
    state.history[athlete].push({
        date: new Date().toISOString(),
        week: state.activeWeek,
        day: state.activeDay,
        timestamp: Date.now()
    });
    if (typeof saveStateToStorage === 'function') saveStateToStorage();

    const trackerView = document.getElementById('gwTrackerView');
    const finishView = document.getElementById('gwFinishedView');
    if (trackerView) trackerView.classList.add('hidden');
    if (finishView) finishView.classList.remove('hidden');

    if (typeof triggerConfetti === 'function') triggerConfetti();
}

/**
 * Cierra el modal de seguimiento guiado
 */
function exitGuidedWorkout() {
    if (workoutTimerInterval) clearInterval(workoutTimerInterval);
    isWorkoutRunning = false;
    const modal = document.getElementById('guidedWorkoutModal');
    if (modal) modal.classList.add('hidden');
    const iframe = document.getElementById('gwVideoIframe');
    if (iframe) iframe.src = "";
    if (typeof renderActiveView === 'function') renderActiveView();
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function getAgeGroupName(code) {
    if (code === 'sub6') return 'Menores de 6 años';
    if (code === '7to12') return '7 a 12 años';
    return '13 a 17 años';
}
