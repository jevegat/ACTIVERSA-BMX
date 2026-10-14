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

let editingSessionContext = { week: 1, day: 1, selectedIndex: -1 };

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

    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return sessionDate.toLocaleDateString('es-ES', options);
}

/**
 * Formatea una fecha ISO o timestamp a formato legible: 'Mar 14 Oct, 10:30 am'
 */
function formatCompletionDate(isoOrTimestamp) {
    if (!isoOrTimestamp) return '';
    const date = new Date(isoOrTimestamp);
    if (isNaN(date.getTime())) return '';
    
    const dayShorts = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const monthShorts = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    const dayName = dayShorts[date.getDay()];
    const dayNum = date.getDate();
    const monthName = monthShorts[date.getMonth()];
    
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 debe ser 12
    
    return `${dayName} ${dayNum} ${monthName}, ${hours}:${minutes} ${ampm}`;
}

/**
 * Convierte un objeto Date o string a formato compatible con <input type="datetime-local"> (YYYY-MM-DDTHH:mm)
 */
function formatForDateTimeInput(dateInput) {
    const d = dateInput ? new Date(dateInput) : new Date();
    if (isNaN(d.getTime())) return '';
    const pad = (n) => n.toString().padStart(2, '0');
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const min = pad(d.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
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
            const historyList = (state.history && state.history[athlete]) || [];
            const sessionCompletions = historyList.filter(h => Number(h.week) === Number(w) && Number(h.day) === Number(d));
            const prog = (state.progress && state.progress[athlete]) || {};
            const prefix = `w${w}_d${d}_${state.activeAgeGroup}_`;
            const doneCount = Object.keys(prog).filter(k => k.startsWith(prefix) && prog[k]).length;
            
            const isFullyDone = sessionCompletions.length > 0 || doneCount >= 6;
            const count = sessionCompletions.length;
            const lastEntry = count > 0 ? sessionCompletions[count - 1] : null;
            const completionFormatted = lastEntry ? formatCompletionDate(lastEntry.date || lastEntry.timestamp) : (isFullyDone ? 'Completada' : null);

            html += `
                <div class="bg-slate-900 p-4 rounded-xl border ${isFullyDone ? 'border-emerald-500/50 shadow-md shadow-emerald-950/30' : 'border-slate-800'} flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 transition-all">
                    <div class="space-y-1.5 flex-1">
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="text-xs font-black text-white bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">Día ${d}</span>
                            <span class="text-[11px] text-slate-300 font-medium capitalize flex items-center gap-1.5">
                                <i class="fa-regular fa-calendar text-slate-400"></i> Programada: <strong class="text-white capitalize">${dateStr}</strong>
                            </span>
                        </div>
                        <p class="text-xs text-slate-400">
                            ${d === 1 ? 'Fuerza Base y Pliometría Reactiva' : d === 2 ? 'Core, Estabilidad Lumbar y Partidor' : 'Tolerancia Láctica y Rigidez Articular (Stiffness)'}
                        </p>
                        
                        <!-- Estado de Finalización y Fecha de Realización -->
                        <div class="flex flex-wrap items-center gap-2 pt-1">
                            ${isFullyDone ? `
                                <span class="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm shadow-emerald-950/30">
                                    <i class="fa-solid fa-circle-check text-emerald-400"></i> 
                                    ${count > 1 ? `Finalizada (${count} veces) • Realizada: ${completionFormatted}` : `Finalizada: ${completionFormatted}`}
                                </span>
                                <button type="button" onclick="openEditSessionDateModal(${w}, ${d})" class="px-2 py-0.5 rounded text-[10px] font-bold text-slate-400 hover:text-amber-300 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition flex items-center gap-1 cursor-pointer" title="Modificar o registrar fecha de realización">
                                    <i class="fa-solid fa-pen-to-square text-amber-400"></i> Editar Fecha
                                </button>
                            ` : `
                                <span class="px-2 py-0.5 rounded text-[10px] font-bold text-slate-500 bg-slate-800/60 border border-slate-700/50 flex items-center gap-1.5">
                                    <i class="fa-regular fa-circle text-slate-500"></i> Pendiente
                                </span>
                                <button type="button" onclick="openEditSessionDateModal(${w}, ${d})" class="px-2 py-0.5 rounded text-[10px] font-bold text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition flex items-center gap-1 cursor-pointer" title="Registrar fecha de realización manual o retroactiva">
                                    <i class="fa-regular fa-calendar-plus text-amber-400"></i> Registrar Fecha
                                </button>
                            `}
                        </div>
                    </div>

                    <div class="flex sm:flex-col items-center justify-end gap-2 shrink-0">
                        <button onclick="goToSession(${w}, ${d})" class="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-black ${isFullyDone ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30' : 'bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-600/20'} transition cursor-pointer flex items-center justify-center gap-1.5">
                            ${isFullyDone ? '<i class="fa-solid fa-check"></i> Ver Sesión' : '<i class="fa-solid fa-play text-[10px]"></i> Ver Rutina'}
                        </button>
                    </div>
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

/* ==========================================================================
   MODAL DE EDICIÓN Y REGISTRO DE FECHAS DE SESIÓN
   ========================================================================== */

function openEditSessionDateModal(week, day) {
    editingSessionContext = { week: Number(week), day: Number(day), selectedIndex: -1 };
    const athlete = state.currentAthlete;
    const historyList = (state.history && state.history[athlete]) || [];
    const completions = historyList.filter(h => Number(h.week) === Number(week) && Number(h.day) === Number(day));
    
    const titleEl = document.getElementById('editSessionModalTitle');
    const subtitleEl = document.getElementById('editSessionModalSubtitle');
    const scheduledEl = document.getElementById('editSessionModalScheduled');
    const historyListContainer = document.getElementById('editSessionCompletionsList');
    const dateInput = document.getElementById('editSessionDateTimeInput');

    const dayTitles = {
        1: 'Fuerza Base y Pliometría Reactiva',
        2: 'Core, Estabilidad Lumbar y Partidor',
        3: 'Tolerancia Láctica y Stiffness'
    };

    if (titleEl) titleEl.innerText = `Semana ${week} • Día ${day}`;
    if (subtitleEl) subtitleEl.innerText = `${dayTitles[day] || 'Entrenamiento BMX'} — Piloto: ${athlete}`;
    
    const scheduledDate = getScheduledDateForSession(week, day) || 'No definida';
    if (scheduledEl) scheduledEl.innerHTML = `<strong>Fecha Programada:</strong> <span class="capitalize">${scheduledDate}</span>`;

    // Renderizar historial de realizaciones de esta sesión
    if (historyListContainer) {
        if (completions.length === 0) {
            historyListContainer.innerHTML = `
                <div class="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-dashed border-slate-700/60 text-center">
                    Aún no hay registros de realización para esta sesión.
                </div>`;
        } else {
            let listHtml = '<div class="space-y-2">';
            completions.forEach((item, idx) => {
                const formatted = formatCompletionDate(item.date || item.timestamp);
                listHtml += `
                    <div class="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
                        <div class="flex items-center gap-2">
                            <span class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px]">${idx + 1}</span>
                            <span class="text-white font-medium">${formatted}</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <button type="button" onclick="selectCompletionToEdit(${idx})" class="px-2 py-1 text-[10px] rounded bg-slate-800 text-amber-300 hover:bg-slate-700 border border-slate-700 transition cursor-pointer" title="Cargar fecha en el selector para modificarla">
                                <i class="fa-solid fa-pen mr-1"></i> Modificar
                            </button>
                            <button type="button" onclick="deleteSessionCompletion(${idx})" class="px-2 py-1 text-[10px] rounded bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-800/40 transition cursor-pointer" title="Eliminar este registro">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>`;
            });
            listHtml += '</div>';
            historyListContainer.innerHTML = listHtml;
        }
    }

    // Cargar en el input la fecha del último registro o la fecha actual
    if (dateInput) {
        let defaultIso = new Date().toISOString();
        if (completions.length > 0) {
            defaultIso = completions[completions.length - 1].date || new Date(completions[completions.length - 1].timestamp).toISOString();
            editingSessionContext.selectedIndex = completions.length - 1;
        }
        dateInput.value = formatForDateTimeInput(defaultIso);
    }

    const modal = document.getElementById('editSessionDateModal');
    if (modal) modal.classList.remove('hidden');
}

function selectCompletionToEdit(index) {
    editingSessionContext.selectedIndex = index;
    const athlete = state.currentAthlete;
    const historyList = (state.history && state.history[athlete]) || [];
    const completions = historyList.filter(h => Number(h.week) === Number(editingSessionContext.week) && Number(h.day) === Number(editingSessionContext.day));
    if (completions[index]) {
        const item = completions[index];
        const dateInput = document.getElementById('editSessionDateTimeInput');
        if (dateInput) {
            dateInput.value = formatForDateTimeInput(item.date || item.timestamp);
        }
    }
}

function saveEditedSessionDate(asNew = false) {
    const input = document.getElementById('editSessionDateTimeInput');
    if (!input || !input.value) {
        alert('Por favor selecciona una fecha y hora válida.');
        return;
    }
    const selectedDate = new Date(input.value);
    if (isNaN(selectedDate.getTime())) {
        alert('Fecha y hora inválida.');
        return;
    }

    const athlete = state.currentAthlete;
    if (!state.history[athlete]) state.history[athlete] = [];

    const w = editingSessionContext.week;
    const d = editingSessionContext.day;
    const completions = state.history[athlete].filter(h => Number(h.week) === Number(w) && Number(h.day) === Number(d));

    const newIso = selectedDate.toISOString();
    const newTimestamp = selectedDate.getTime();

    if (!asNew && editingSessionContext.selectedIndex >= 0 && completions[editingSessionContext.selectedIndex]) {
        // Actualizar el registro existente
        const targetItem = completions[editingSessionContext.selectedIndex];
        targetItem.date = newIso;
        targetItem.timestamp = newTimestamp;
    } else {
        // Adicionar una nueva realización
        state.history[athlete].push({
            date: newIso,
            week: w,
            day: d,
            timestamp: newTimestamp
        });
    }

    // Ordenar cronológicamente
    state.history[athlete].sort((a, b) => (a.timestamp || new Date(a.date).getTime()) - (b.timestamp || new Date(b.date).getTime()));

    if (typeof saveStateToStorage === 'function') saveStateToStorage();
    if (typeof renderCalendarSchedule === 'function') renderCalendarSchedule();
    if (typeof renderActiveView === 'function') renderActiveView();

    closeEditSessionDateModal();
}

function deleteSessionCompletion(index) {
    if (!confirm('¿Deseas eliminar este registro de realización de la sesión?')) return;
    const athlete = state.currentAthlete;
    const w = editingSessionContext.week;
    const d = editingSessionContext.day;
    
    let count = -1;
    let removeIdx = -1;
    for (let i = 0; i < (state.history[athlete] || []).length; i++) {
        const h = state.history[athlete][i];
        if (Number(h.week) === Number(w) && Number(h.day) === Number(d)) {
            count++;
            if (count === index) {
                removeIdx = i;
                break;
            }
        }
    }

    if (removeIdx > -1) {
        state.history[athlete].splice(removeIdx, 1);
        if (typeof saveStateToStorage === 'function') saveStateToStorage();
        if (typeof renderCalendarSchedule === 'function') renderCalendarSchedule();
        if (typeof renderActiveView === 'function') renderActiveView();
        openEditSessionDateModal(w, d);
    }
}

function setEditSessionDateToNow() {
    const input = document.getElementById('editSessionDateTimeInput');
    if (input) input.value = formatForDateTimeInput(new Date());
}

function setEditSessionDateToScheduled() {
    const w = editingSessionContext.week;
    const d = editingSessionContext.day;
    if (!state || !state.calendar || !state.calendar.startDate) {
        setEditSessionDateToNow();
        return;
    }
    const start = new Date(state.calendar.startDate + 'T00:00:00');
    const targetDays = state.calendar.trainingDays;
    if (targetDays.length < d) return;

    const targetDayOfWeek = targetDays[d - 1];
    const currentDayOfWeek = start.getDay();
    let diffDays = targetDayOfWeek - currentDayOfWeek;
    if (diffDays < 0) diffDays += 7;
    const totalOffsetDays = diffDays + ((w - 1) * 7);

    const sessionDate = new Date(start);
    sessionDate.setDate(start.getDate() + totalOffsetDays);
    sessionDate.setHours(10, 0, 0, 0);

    const input = document.getElementById('editSessionDateTimeInput');
    if (input) input.value = formatForDateTimeInput(sessionDate);
}

function closeEditSessionDateModal() {
    const modal = document.getElementById('editSessionDateModal');
    if (modal) modal.classList.add('hidden');
}
