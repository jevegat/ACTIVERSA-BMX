/**
 * ACTIVERZA BMX RACING ACADEMY
 * Módulo de Planificación y Calendarizador Dinámico de Microciclos
 */

const DAYS_NAMES = [
    { id: 1, name: 'Lunes', short: 'Lun' },
    { id: 2, name: 'Martes', short: 'Mar' },
    { id: 3, name: 'Miércoles', short: 'Mié' },
    { id: 4, name: 'Jueves', short: 'Jue' },
    { id: 5, name: 'Viernes', short: 'Vie' },
    { id: 6, name: 'Sábado', short: 'Sáb' },
    { id: 0, name: 'Domingo', short: 'Dom' }
];

function setupCalendarInputs() {
    const dateInput = document.getElementById('calendarStartDate');
    if (dateInput && state && state.calendar) {
        dateInput.value = state.calendar.startDate;
    }
    renderDayPickers();
}

function renderDayPickers() {
    const container = document.getElementById('dayPickerContainer');
    if (!container || !state || !state.calendar) return;
    container.innerHTML = '';

    DAYS_NAMES.forEach(d => {
        const isSelected = state.calendar.trainingDays.includes(d.id);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = isSelected 
            ? "py-2 px-1 rounded-xl text-xs font-bold bg-red-600 text-white border border-red-500 text-center transition shadow"
            : "py-2 px-1 rounded-xl text-xs font-bold bg-slate-900 text-slate-400 border border-slate-700 text-center hover:text-white transition";
        btn.innerText = d.short;
        btn.title = d.name;
        btn.onclick = () => toggleTrainingDay(d.id);
        container.appendChild(btn);
    });

    updateSelectedDaysText();
}

function toggleTrainingDay(dayId) {
    if (!state || !state.calendar) return;
    const idx = state.calendar.trainingDays.indexOf(dayId);
    if (idx > -1) {
        if (state.calendar.trainingDays.length > 1) {
            state.calendar.trainingDays.splice(idx, 1);
        }
    } else {
        if (state.calendar.trainingDays.length < 3) {
            state.calendar.trainingDays.push(dayId);
        } else {
            state.calendar.trainingDays.shift();
            state.calendar.trainingDays.push(dayId);
        }
    }

    // Ordenar de Lunes a Domingo
    state.calendar.trainingDays.sort((a, b) => {
        const orderA = a === 0 ? 7 : a;
        const orderB = b === 0 ? 7 : b;
        return orderA - orderB;
    });

    renderDayPickers();
    renderCalendarSchedule();
    if (typeof renderActiveView === 'function') {
        renderActiveView();
    }
}

function updateSelectedDaysText() {
    const textElem = document.getElementById('selectedDaysSummary');
    if (!textElem || !state || !state.calendar) return;
    const names = state.calendar.trainingDays.map(id => {
        const found = DAYS_NAMES.find(x => x.id === id);
        return found ? found.name : '';
    });
    textElem.innerText = `Días asignados: ${names.map((n, i) => `${n} (Día ${i + 1})`).join(', ')}.`;
}

function saveCalendarSettings() {
    const dateInput = document.getElementById('calendarStartDate');
    if (dateInput && dateInput.value && state && state.calendar) {
        state.calendar.startDate = dateInput.value;
    }
    if (typeof saveStateToStorage === 'function') {
        saveStateToStorage();
    }
    if (typeof renderActiveView === 'function') {
        renderActiveView();
    }
    alert('¡Calendario actualizado con éxito!');
}

function getScheduledDateForSession(weekNum, dayNum) {
    if (!state || !state.calendar || !state.calendar.startDate) return null;
    const start = new Date(state.calendar.startDate + 'T00:00:00');
    const targetDays = state.calendar.trainingDays;
    if (targetDays.length < dayNum) return null;

    const targetDayOfWeek = targetDays[dayNum - 1];
    const currentDayOfWeek = start.getDay();

    let diffDays = targetDayOfWeek - currentDayOfWeek;
    if (diffDays < 0) diffDays += 7;

    const totalOffsetDays = diffDays + ((weekNum - 1) * 7);

    const sessionDate = new Date(start);
    sessionDate.setDate(start.getDate() + totalOffsetDays);

    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return sessionDate.toLocaleDateString('es-ES', options);
}

function renderCalendarSchedule() {
    const timeline = document.getElementById('calendarScheduleTimeline');
    if (!timeline || !state) return;

    let html = '';

    [1, 2].forEach(w => {
        html += `
            <div class="bg-slate-850 bg-slate-800/40 p-5 rounded-2xl border border-slate-700/80 space-y-4">
                <div class="flex items-center justify-between border-b border-slate-700/60 pb-2">
                    <h4 class="font-bold text-white text-base flex items-center gap-2">
                        <span class="w-6 h-6 rounded-md bg-red-600 text-white flex items-center justify-center text-xs">${w}</span>
                        Semana ${w}: ${w === 1 ? 'Fundamentos & Fuerza Base' : 'Potencia Dirigida & Pista'}
                    </h4>
                </div>
                <div class="space-y-3">
        `;

        [1, 2, 3].forEach(d => {
            const dateStr = getScheduledDateForSession(w, d) || `Sesión ${d}`;
            const athlete = state.currentAthlete;
            const prog = (state.progress && state.progress[athlete]) || {};
            const prefix = `w${w}_d${d}_${state.activeAgeGroup}_`;
            const doneCount = Object.keys(prog).filter(k => k.startsWith(prefix) && prog[k]).length;
            const isFullyDone = doneCount >= 6;

            html += `
                <div class="bg-slate-900 p-3.5 rounded-xl border ${isFullyDone ? 'border-emerald-500/50 shadow-md shadow-emerald-950/30' : 'border-slate-800'} flex items-center justify-between gap-3">
                    <div class="space-y-0.5">
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-bold text-white">Día ${d}</span>
                            <span class="text-[10px] text-slate-400 capitalize">${dateStr}</span>
                            ${isFullyDone ? '<span class="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1"><i class="fa-solid fa-circle-check"></i> Finalizada</span>' : ''}
                        </div>
                        <p class="text-[11px] text-slate-400">
                            ${d === 1 ? 'Fuerza Base y Pliometría' : d === 2 ? 'Core, Estabilidad y Partidor' : 'Tolerancia Láctica y Stiffness'}
                        </p>
                    </div>
                    <button onclick="goToSession(${w}, ${d})" class="px-3 py-1.5 rounded-lg text-xs font-bold ${isFullyDone ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30' : 'bg-red-600 text-white hover:bg-red-700'} transition cursor-pointer">
                        ${isFullyDone ? 'Ver Sesión ✓' : 'Ver Rutina'}
                    </button>
                </div>
            `;
        });

        html += `</div></div>`;
    });

    timeline.innerHTML = html;
}

function goToSession(w, d) {
    if (typeof setWeek === 'function') setWeek(w);
    if (typeof setDay === 'function') setDay(d);
    if (typeof switchMainTab === 'function') switchMainTab('training');
}
