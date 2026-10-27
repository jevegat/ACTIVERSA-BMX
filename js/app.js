/**
 * ACTIVERZA BMX RACING ACADEMY
 * Controlador Principal de la Aplicación (App Controller)
 * Gestión de Estado, Navegación, Perfiles, Gamificación y Modales
 */

let state = {
    activeWeek: 1,
    activeDay: 1,
    activeAgeGroup: '7to12',
    currentAthlete: 'Santiago Vega',
    athletes: {
        'Santiago Vega': { ageGroup: '7to12', weight: 38 }
    },
    progress: {}, // { [athleteName]: { [exerciseKey]: boolean } }
    history: {},  // { [athleteName]: [ { date: string, week: number, day: number, count: number } ] }
    calendar: {
        startDate: new Date().toISOString().split('T')[0],
        trainingDays: [1, 3, 5] // 1: Lun, 3: Mié, 5: Vie (0=Dom, 1=Lun...)
    },
    activeTab: 'training'
};

// Galería de fotos destacadas de BMX Racing disponibles en images/
const HERO_BMX_GALLERY = [
    { src: 'images/bmx-proconcept.png', label: 'Partidor UCI Pro' },
    { src: 'images/bmx-proconcept2.png', label: 'Sprint de Partida' },
    { src: 'images/bmx-proconcept3.png', label: 'Peralte Pro Concept' },
    { src: 'images/bmx-proconcept4.png', label: 'Fuerza Explosiva' },
    { src: 'images/bmx1.png', label: 'Curva & Agresividad' },
    { src: 'images/bmx2.png', label: 'Técnica en Salto' },
    { src: 'images/bmx3.png', label: 'Ritmo & Velocidad' }
];

let currentHeroImageIndex = 0;

/**
 * Inicializa el carrusel de fotos BMX:
 * - Selecciona una foto inicial aleatoria (distinta a la de la última sesión si es posible).
 * - Renderiza los indicadores / dots interactivos.
 * - Registra controles gestuales (swipe táctil en móviles).
 */
function initHeroCarousel() {
    const heroImgEl = document.getElementById('heroBmxImage');
    if (!heroImgEl || !HERO_BMX_GALLERY || HERO_BMX_GALLERY.length === 0) return;

    // Obtener la última foto mostrada para priorizar una diferente en cada recarga
    const lastSrc = sessionStorage.getItem('activerza_last_hero_src') || localStorage.getItem('activerza_last_hero_src');
    const candidates = HERO_BMX_GALLERY.filter(item => item.src !== lastSrc);
    const pool = candidates.length > 0 ? candidates : HERO_BMX_GALLERY;

    const selected = pool[Math.floor(Math.random() * pool.length)];
    currentHeroImageIndex = HERO_BMX_GALLERY.findIndex(item => item.src === selected.src);
    if (currentHeroImageIndex === -1) currentHeroImageIndex = 0;

    renderHeroCarouselDots();
    updateHeroCarouselView(false);

    // Guardar para la próxima recarga
    sessionStorage.setItem('activerza_last_hero_src', selected.src);
    localStorage.setItem('activerza_last_hero_src', selected.src);

    setupHeroCarouselTouch();
}

/**
 * Renderiza los dots/indicadores de navegación del carrusel
 */
function renderHeroCarouselDots() {
    const dotsContainer = document.getElementById('heroCarouselDots');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = HERO_BMX_GALLERY.map((item, idx) => `
        <button type="button" 
            onclick="goToHeroImage(${idx})"
            class="hero-dot-btn transition-all duration-300 h-1.5 rounded-full ${idx === currentHeroImageIndex ? 'w-5 bg-red-500 shadow-sm' : 'w-1.5 bg-white/40 hover:bg-white/70'}"
            aria-label="Ir a foto ${idx + 1} (${item.label})">
        </button>
    `).join('');
}

/**
 * Actualiza la vista del carrusel (imagen, etiqueta, contador, dots activos)
 */
function updateHeroCarouselView(withFade = true) {
    const heroImgEl = document.getElementById('heroBmxImage');
    const heroTagEl = document.getElementById('heroImageTag');
    const counterEl = document.getElementById('heroCarouselCounter');
    if (!heroImgEl || !HERO_BMX_GALLERY[currentHeroImageIndex]) return;

    const currentItem = HERO_BMX_GALLERY[currentHeroImageIndex];

    if (withFade) {
        heroImgEl.style.opacity = '0.4';
        heroImgEl.style.transform = 'scale(0.98)';
        setTimeout(() => {
            heroImgEl.src = currentItem.src;
            heroImgEl.onload = () => {
                heroImgEl.style.opacity = '1';
                heroImgEl.style.transform = 'scale(1)';
            };
        }, 120);
    } else {
        heroImgEl.src = currentItem.src;
        heroImgEl.style.opacity = '1';
        heroImgEl.style.transform = 'scale(1)';
    }

    if (heroTagEl) {
        heroTagEl.textContent = currentItem.label;
    }

    if (counterEl) {
        counterEl.textContent = `${currentHeroImageIndex + 1} / ${HERO_BMX_GALLERY.length}`;
    }

    // Actualizar dots interactivos
    const dotsContainer = document.getElementById('heroCarouselDots');
    if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.hero-dot-btn');
        dots.forEach((dot, idx) => {
            if (idx === currentHeroImageIndex) {
                dot.className = 'hero-dot-btn transition-all duration-300 h-1.5 rounded-full w-5 bg-red-500 shadow-sm';
            } else {
                dot.className = 'hero-dot-btn transition-all duration-300 h-1.5 rounded-full w-1.5 bg-white/40 hover:bg-white/70';
            }
        });
    }

    // Guardar estado actual
    sessionStorage.setItem('activerza_last_hero_src', currentItem.src);
    localStorage.setItem('activerza_last_hero_src', currentItem.src);
}

/**
 * Adelanta a la siguiente imagen (Next)
 */
function nextHeroImage() {
    if (!HERO_BMX_GALLERY || HERO_BMX_GALLERY.length === 0) return;
    currentHeroImageIndex = (currentHeroImageIndex + 1) % HERO_BMX_GALLERY.length;
    updateHeroCarouselView(true);
}

/**
 * Retrocede a la imagen anterior (Prev)
 */
function prevHeroImage() {
    if (!HERO_BMX_GALLERY || HERO_BMX_GALLERY.length === 0) return;
    currentHeroImageIndex = (currentHeroImageIndex - 1 + HERO_BMX_GALLERY.length) % HERO_BMX_GALLERY.length;
    updateHeroCarouselView(true);
}

/**
 * Salta a un índice específico de imagen
 */
function goToHeroImage(index) {
    if (index >= 0 && index < HERO_BMX_GALLERY.length && index !== currentHeroImageIndex) {
        currentHeroImageIndex = index;
        updateHeroCarouselView(true);
    }
}

// Mantener compatibilidad por si se llama cycleHeroImage
function cycleHeroImage() {
    nextHeroImage();
}

/**
 * Soporte gestual para swipe táctil en móvil
 */
function setupHeroCarouselTouch() {
    const container = document.getElementById('heroCarouselContainer');
    if (!container || container.dataset.touchBound) return;
    container.dataset.touchBound = 'true';

    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 40) {
            if (diff < 0) {
                nextHeroImage(); // Swipe izquierda -> Siguiente
            } else {
                prevHeroImage(); // Swipe derecha -> Anterior
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initHeroCarousel();
    loadSavedState();
    if (typeof setWeek === 'function') {
        setWeek(state.activeWeek || 1);
    }
    if (typeof setupCalendarInputs === 'function') {
        setupCalendarInputs();
    }
    renderActiveView();
    calculateHydration();
});

function loadSavedState() {
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('activerza_theme') || 'dark';
    applyTheme(savedTheme);

    // Cargar estado de atletas
    const savedState = localStorage.getItem('activerza_state_v1');
    if (savedState) {
        try {
            const parsed = JSON.parse(savedState);
            state = { ...state, ...parsed };
        } catch (e) {
            console.error('Error cargando estado:', e);
        }
    }

    // Asegurar que el atleta actual existe
    if (!state.athletes[state.currentAthlete]) {
        state.athletes[state.currentAthlete] = { ageGroup: '7to12', weight: 38 };
    }
    state.activeAgeGroup = state.athletes[state.currentAthlete].ageGroup;

    updateNavAthleteInfo();
    renderAthletesList();
}

function saveStateToStorage() {
    localStorage.setItem('activerza_state_v1', JSON.stringify(state));
    // Sincronizar automáticamente en segundo plano con Cloud Firestore si está conectado
    if (typeof syncStateToFirestore === 'function') {
        syncStateToFirestore(state);
    }
}

/* ==========================================================================
   TEMA CLARO / OSCURO
   ========================================================================== */
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('activerza_theme', newTheme);
}

function applyTheme(theme) {
    const html = document.documentElement;
    const icon = document.getElementById('themeToggleIcon');
    if (theme === 'light') {
        html.classList.remove('dark');
        html.classList.add('light');
        document.body.classList.remove('bg-slate-950', 'text-slate-100');
        document.body.classList.add('bg-slate-100', 'text-slate-900');
        if (icon) icon.className = "fa-solid fa-moon text-slate-800 text-sm";
    } else {
        html.classList.remove('light');
        html.classList.add('dark');
        document.body.classList.remove('bg-slate-100', 'text-slate-900');
        document.body.classList.add('bg-slate-950', 'text-slate-100');
        if (icon) icon.className = "fa-solid fa-sun text-amber-400 text-sm";
    }
}

/* ==========================================================================
   NAVEGACIÓN ENTRE VISTAS PRINCIPALES
   ========================================================================== */
function switchMainTab(tab) {
    state.activeTab = tab;
    const views = {
        'training': document.getElementById('viewTraining'),
        'calendar': document.getElementById('viewCalendar'),
        'timer': document.getElementById('viewTimer'),
        'nutrition': document.getElementById('viewNutrition')
    };

    const desktopButtons = {
        'training': document.getElementById('tabNavTraining'),
        'calendar': document.getElementById('tabNavCalendar'),
        'timer': document.getElementById('tabNavTimer'),
        'nutrition': document.getElementById('tabNavNutrition')
    };

    const mobileButtons = {
        'training': document.getElementById('tabNavMobTraining'),
        'calendar': document.getElementById('tabNavMobCalendar'),
        'timer': document.getElementById('tabNavMobTimer'),
        'nutrition': document.getElementById('tabNavMobNutrition')
    };

    Object.keys(views).forEach(k => {
        if (views[k]) {
            if (k === tab) {
                views[k].classList.remove('hidden');
            } else {
                views[k].classList.add('hidden');
            }
        }

        if (desktopButtons[k]) {
            if (k === tab) {
                desktopButtons[k].className = "px-3 py-1.5 rounded-lg bg-red-600 text-white transition flex items-center gap-1.5 shadow-sm";
            } else {
                desktopButtons[k].className = "px-3 py-1.5 rounded-lg text-slate-300 hover:text-white transition flex items-center gap-1.5";
            }
        }

        if (mobileButtons[k]) {
            if (k === tab) {
                mobileButtons[k].className = "flex-shrink-0 px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold";
            } else {
                mobileButtons[k].className = "flex-shrink-0 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 font-bold";
            }
        }
    });

    if (tab === 'calendar' && typeof renderCalendarSchedule === 'function') {
        renderCalendarSchedule();
    }
}

/* ==========================================================================
   CONTROLADORES DE RUTINAS (SEMANA, DÍA, EDAD)
   ========================================================================== */
function setWeek(w) {
    state.activeWeek = Number(w);
    [1, 2, 3, 4].forEach(num => {
        const btn = document.getElementById(`btnWeek${num}`);
        if (btn) {
            btn.className = num === state.activeWeek 
                ? "py-2.5 px-2 rounded-xl font-bold text-xs border border-red-500 bg-red-600 text-white transition flex items-center justify-center gap-1.5 shadow"
                : "py-2.5 px-2 rounded-xl font-bold text-xs border border-slate-700 bg-slate-800 text-slate-300 hover:text-white transition flex items-center justify-center gap-1.5";
        }
    });

    const isWeek4 = (state.activeWeek === 4);
    const day4Btn = document.getElementById('btnDay4');
    const dayContainer = document.getElementById('dayButtonsContainer');
    const txtSessionDays = document.getElementById('txtSessionDays');

    if (day4Btn) {
        if (isWeek4) {
            day4Btn.classList.remove('hidden');
        } else {
            day4Btn.classList.add('hidden');
            if (state.activeDay === 4) {
                state.activeDay = 1;
            }
        }
    }
    if (dayContainer) {
        dayContainer.className = isWeek4 ? "grid grid-cols-4 gap-2" : "grid grid-cols-3 gap-2";
    }
    if (txtSessionDays) {
        txtSessionDays.innerText = isWeek4 ? "Sesión Semanal (4 Días)" : "Sesión Semanal (3 Días)";
    }

    setDay(state.activeDay);
    
    const heroTitle = document.getElementById('heroWeekTitle');
    if (heroTitle) heroTitle.innerText = `Semana ${state.activeWeek}`;
    renderActiveView();
}

function setDay(d) {
    state.activeDay = Number(d);
    [1, 2, 3, 4].forEach(num => {
        const btn = document.getElementById(`btnDay${num}`);
        if (btn) {
            btn.className = num === state.activeDay
                ? "py-2.5 px-2 rounded-xl font-bold text-xs border border-red-500 bg-red-600 text-white transition text-center shadow"
                : "py-2.5 px-2 rounded-xl font-bold text-xs border border-slate-700 bg-slate-800 text-slate-300 hover:text-white transition text-center";
        }
    });
    renderActiveView();
}

function onAgeGroupChanged(age) {
    state.activeAgeGroup = age;
    if (state.athletes[state.currentAthlete]) {
        state.athletes[state.currentAthlete].ageGroup = age;
    }
    updateNavAthleteInfo();
    saveStateToStorage();
    renderActiveView();
}

/* ==========================================================================
   RENDERIZACIÓN DE LA RUTINA DINÁMICA
   ========================================================================== */
function renderActiveView() {
    const w = state.activeWeek;
    const d = state.activeDay;
    const age = state.activeAgeGroup;

    if (typeof TRAINING_DB === 'undefined') return;

    const weekData = TRAINING_DB[w];
    if (!weekData || !weekData.days[d] || !weekData.days[d].ageGroups[age]) {
        const container = document.getElementById('routineContainer');
        if (container) {
            container.innerHTML = `
                <div class="p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center text-slate-400">
                    No hay rutina registrada para estos parámetros.
                </div>`;
        }
        return;
    }

    const dayData = weekData.days[d];
    const session = dayData.ageGroups[age];
    const dailyTips = weekData.dailyTips[d] || [];
    const warmupInsight = (typeof getBlockInsight === 'function') ? getBlockInsight('warmup', w, d, age) : '';
    const plyoInsight = (typeof getBlockInsight === 'function') ? getBlockInsight('plyo', w, d, age) : '';
    const strengthInsight = (typeof getBlockInsight === 'function') ? getBlockInsight('strength', w, d, age) : '';
    const cardioInsight = (typeof getBlockInsight === 'function') ? getBlockInsight('cardio', w, d, age) : '';
    const stretchInsight = (typeof getBlockInsight === 'function') ? getBlockInsight('stretch', w, d, age) : '';


    // Actualizar Hero
    const heroDesc = document.getElementById('heroAgeDesc');
    if (heroDesc) heroDesc.innerText = session.methodology;

    // Obtener fecha programada para esta sesión
    if (typeof getScheduledDateForSession === 'function') {
        const scheduledDate = getScheduledDateForSession(w, d);
        const heroDate = document.getElementById('heroDateDisplay');
        if (scheduledDate && heroDate) {
            heroDate.innerHTML = `
                <i class="fa-regular fa-calendar-check text-red-400 mr-1"></i> Sesión programada: <strong class="text-white">${scheduledDate}</strong>
            `;
        }
    }

    // Progreso
    const athlete = state.currentAthlete;
    const athleteProgress = state.progress[athlete] || {};

    let totalExercises = 0;
    let completedExercises = 0;

    let html = '';

    // 1. CÁLCULO DE DURACIÓN TOTAL DE LA SESIÓN Y DESGLOSE
    let sessionSummary = { totalMin: 60, formattedTotal: "60:00", warmupRounds: 3, cardioRounds: 8, blocks: { warmup: 10, plyo: 10, strength: 15, cardio: 13, stretch: 8, recovery: 4 } };
    if (typeof calculateSessionSummary === 'function') {
        sessionSummary = calculateSessionSummary(w, d, age);
    }

    // Actualizar indicador de duración en el Hero principal
    const heroDurationElem = document.getElementById('statSessionDuration');
    if (heroDurationElem) {
        heroDurationElem.innerText = `${sessionSummary.totalMin}'`;
    }

    // 1. TARJETA DE CONSEJOS CLÍNICOS, NUTRICIÓN Y RESUMEN ESTRUCTURAL COMPLETO
    html += `
        <div class="bg-gradient-to-r from-amber-950/40 to-slate-900 border-l-4 border-amber-500 p-5 rounded-3xl border border-amber-900/40 shadow-lg space-y-4">
            <div class="flex flex-wrap justify-between items-center gap-2">
                <h3 class="font-black text-amber-400 text-sm sm:text-base flex items-center gap-2 font-heading">
                    <i class="fa-solid fa-lightbulb"></i> Consejos del Entrenador & Nutrición del Día ${d}
                </h3>
                <span class="text-[11px] font-bold text-amber-300/80 bg-amber-900/30 px-2 py-0.5 rounded border border-amber-800/40">
                    ${dayData.focus}
                </span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
                <div class="space-y-1.5">
                    <strong class="text-white block font-bold flex items-center gap-1.5">
                        <i class="fa-solid fa-person-chalkboard text-red-400"></i> Pautas de Sesión:
                    </strong>
                    <ul class="space-y-1 list-disc list-inside text-slate-300/90 text-[11px]">
                        ${dailyTips.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                </div>
                <div class="space-y-1.5">
                    <strong class="text-white block font-bold flex items-center gap-1.5">
                        <i class="fa-solid fa-utensils text-amber-400"></i> Recomendación Nutricional Pediátrica:
                    </strong>
                    <p class="text-[11px] text-slate-300/90 leading-relaxed">
                        ${dayData.nutrition.energy} ${dayData.nutrition.hydration}
                    </p>
                </div>
            </div>

            <!-- RESUMEN ESTRUCTURAL COMPLETO Y DURACIÓN TOTAL DE LA SESIÓN -->
            <div class="p-3.5 rounded-2xl bg-slate-950/70 border border-amber-500/30 shadow-inner space-y-2.5">
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                        <span class="w-6 h-6 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center font-bold text-xs">
                            <i class="fa-solid fa-stopwatch-20"></i>
                        </span>
                        <span class="text-xs font-black text-white uppercase tracking-wider font-heading">
                            Estructura de la Sesión y Duración Total Calculada:
                        </span>
                    </div>
                    <span class="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow flex items-center gap-1.5">
                        <i class="fa-solid fa-clock"></i> ${sessionSummary.totalMin} Minutos (${sessionSummary.formattedTotal})
                    </span>
                </div>

                <!-- Desglose de los 6 bloques con sus series y tiempos exactos -->
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
                    <div class="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                        <span class="text-[10px] text-orange-400 font-bold block truncate">1. Calentamiento</span>
                        <strong class="text-white font-extrabold text-sm">${sessionSummary.blocks.warmup} min</strong>
                        <span class="text-[9px] text-slate-400 block">${sessionSummary.warmupRounds} series (${session.warmup ? session.warmup.length : 0} ej)</span>
                    </div>
                    <div class="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                        <span class="text-[10px] text-amber-400 font-bold block truncate">2A. Pliometría</span>
                        <strong class="text-white font-extrabold text-sm">${sessionSummary.blocks.plyo} min</strong>
                        <span class="text-[9px] text-slate-400 block">3 series de 60s des</span>
                    </div>
                    <div class="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                        <span class="text-[10px] text-cyan-400 font-bold block truncate">2B. Fuerza Base</span>
                        <strong class="text-white font-extrabold text-sm">${sessionSummary.blocks.strength} min</strong>
                        <span class="text-[9px] text-slate-400 block">3 series c/tempos</span>
                    </div>
                    <div class="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                        <span class="text-[10px] text-red-400 font-bold block truncate">2C. Cardio Pista</span>
                        <strong class="text-white font-extrabold text-sm">${sessionSummary.blocks.cardio} min</strong>
                        <span class="text-[9px] text-slate-400 block">${sessionSummary.cardioRounds} rondas sprint</span>
                    </div>
                    <div class="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                        <span class="text-[10px] text-emerald-400 font-bold block truncate">3. Estiramiento</span>
                        <strong class="text-white font-extrabold text-sm">${sessionSummary.blocks.stretch} min</strong>
                        <span class="text-[9px] text-slate-400 block">Elongación 8 min</span>
                    </div>
                    <div class="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                        <span class="text-[10px] text-purple-400 font-bold block truncate">4. Recuperación</span>
                        <strong class="text-white font-extrabold text-sm">${sessionSummary.blocks.recovery} min</strong>
                        <span class="text-[9px] text-slate-400 block">Respiración SNC</span>
                    </div>
                </div>
            </div>

            <!-- Single Official Instagram Link & Guided Workout Launch Banner -->
            <div class="pt-3 border-t border-amber-900/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <a href="https://www.instagram.com/pipearenas.fit/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-xs text-pink-400 hover:text-white font-bold bg-pink-950/60 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 border border-pink-700/40 px-3.5 py-1.5 rounded-xl transition shadow-sm cursor-pointer group">
                    <i class="fa-brands fa-instagram text-pink-400 group-hover:text-white text-sm"></i>
                    <span>Preparación física y técnica oficial: <strong>@pipearenas.fit</strong></span>
                    <i class="fa-solid fa-arrow-up-right-from-square text-[9px] opacity-75"></i>
                </a>

                <button onclick="startGuidedWorkout()" class="w-full sm:w-auto bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 group">
                    <i class="fa-solid fa-play text-xs p-1 bg-white/20 rounded-md group-hover:scale-110 transition-transform"></i>
                    <span>INICIAR SESIÓN GUIADA (WOD TRACKER)</span>
                </button>
            </div>
        </div>
    `;

    // 2. BLOQUE 1: CALENTAMIENTO Y ACTIVACIÓN DINÁMICA (10 MIN)
    html += `
        <section class="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div class="flex flex-wrap justify-between items-center gap-2 border-b border-slate-800 pb-3">
                <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-xl bg-orange-600/20 text-orange-500 flex items-center justify-center font-bold text-sm">
                        <i class="fa-solid fa-fire"></i>
                    </div>
                    <div>
                        <h3 class="text-base sm:text-lg font-black text-white font-heading">1. Calentamiento y Activación Dinámica</h3>
                        <p class="text-[11px] text-slate-400">10 Minutos • Movilidad articular, lubricación y activación neuromuscular</p>
                    </div>
                </div>
                <span class="text-xs bg-slate-800 text-orange-400 font-bold px-2.5 py-1 rounded-lg border border-slate-700">
                    45s Trabajo x 15s Transición
                </span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    `;

    session.warmup.forEach((ex, idx) => {
        totalExercises++;
        const exKey = `w${w}_d${d}_${age}_warm_${idx}`;
        const isChecked = !!athleteProgress[exKey];
        if (isChecked) completedExercises++;

        html += renderExerciseCard(ex, exKey, isChecked, 'Calentamiento', 'border-orange-500/30');
    });

    html += `</div></section>`;

    // 3. BLOQUE 2: PLIOMETRÍA Y AGILIDAD (10 MIN)
    html += `
        <section class="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div class="flex flex-wrap justify-between items-center gap-2 border-b border-slate-800 pb-3">
                <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold text-sm">
                        <i class="fa-solid fa-bolt"></i>
                    </div>
                    <div>
                        <h3 class="text-base sm:text-lg font-black text-white font-heading">2A. Pliometría, Agilidad y Reacción</h3>
                        <p class="text-[11px] text-slate-400">10 Minutos • Calidad del salto, aterrizaje suave y reflejo del partidor</p>
                    </div>
                </div>
                <span class="text-xs bg-slate-800 text-red-400 font-bold px-2.5 py-1 rounded-lg border border-slate-700">
                    Descanso 60s entre series
                </span>
            </div>
            <!-- Enfoque Biomecánico BMX del Bloque (PDF) -->
            <div class="bg-amber-950/25 border border-amber-500/30 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-amber-200/90 leading-relaxed shadow-sm">
                <i class="fa-solid fa-lightbulb text-amber-400 mt-0.5 text-sm flex-shrink-0"></i>
                <div>
                    <strong class="font-bold text-amber-300 block text-[10px] uppercase tracking-wider mb-0.5">Enfoque Biomecánico BMX (PDF):</strong>
                    ${plyoInsight}
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    `;

    session.plyo.forEach((ex, idx) => {
        totalExercises++;
        const exKey = `w${w}_d${d}_${age}_plyo_${idx}`;
        const isChecked = !!athleteProgress[exKey];
        if (isChecked) completedExercises++;

        html += renderExerciseCard(ex, exKey, isChecked, 'Pliometría & Reacción', 'border-red-500/30');
    });

    html += `</div></section>`;

    // 4. BLOQUE 3: FUERZA ESTRICTA CON TEMPOS (15 MIN)
    html += `
        <section class="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div class="flex flex-wrap justify-between items-center gap-2 border-b border-slate-800 pb-3">
                <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-sm">
                        <i class="fa-solid fa-dumbbell"></i>
                    </div>
                    <div>
                        <h3 class="text-base sm:text-lg font-black text-white font-heading">2B. Fuerza Estricta con Peso Corporal (Tempos)</h3>
                        <p class="text-[11px] text-slate-400">15 Minutos • Control excéntrico lento para fuerza tendinosa e hipertrofia</p>
                    </div>
                </div>
                <span class="text-xs bg-slate-800 text-purple-400 font-bold px-2.5 py-1 rounded-lg border border-slate-700">
                    Nomenclatura [Bajada - Pausa - Subida - Pausa]
                </span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    `;

    session.strength.forEach((ex, idx) => {
        totalExercises++;
        const exKey = `w${w}_d${d}_${age}_str_${idx}`;
        const isChecked = !!athleteProgress[exKey];
        if (isChecked) completedExercises++;

        html += renderExerciseCard(ex, exKey, isChecked, 'Fuerza Estricta', 'border-purple-500/30');
    });

    html += `</div></section>`;

    // 5. BLOQUE 4: CARDIO ESPECÍFICO BMX (13 MIN)
    html += `
        <section class="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div class="flex flex-wrap justify-between items-center gap-2 border-b border-slate-800 pb-3">
                <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-xl bg-rose-600/20 text-rose-500 flex items-center justify-center font-bold text-sm">
                        <i class="fa-solid fa-heart-pulse"></i>
                    </div>
                    <div>
                        <h3 class="text-base sm:text-lg font-black text-white font-heading">2C. Cardio Específico BMX (HIIT & Tolerancia Láctica)</h3>
                        <p class="text-[11px] text-slate-400">13 Minutos • Simulación del esfuerzo anaeróbico en pista</p>
                    </div>
                </div>
                <button onclick="launchPresetForCardio('${session.cardio.name}')" class="text-xs bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1.5 rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer">
                    <i class="fa-solid fa-stopwatch"></i> Abrir en Cronómetro
                </button>
            </div>
            <!-- Enfoque Biomecánico BMX del Bloque (PDF) -->
            <div class="bg-amber-950/25 border border-amber-500/30 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-amber-200/90 leading-relaxed shadow-sm">
                <i class="fa-solid fa-lightbulb text-amber-400 mt-0.5 text-sm flex-shrink-0"></i>
                <div>
                    <strong class="font-bold text-amber-300 block text-[10px] uppercase tracking-wider mb-0.5">Enfoque Biomecánico BMX (PDF):</strong>
                    ${cardioInsight}
                </div>
            </div>

            
            <div class="bg-slate-850 bg-slate-800/40 p-5 rounded-2xl border border-rose-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div class="space-y-2 flex-1">
                    <div class="flex items-center gap-2">
                        <span class="text-xs bg-rose-950 text-rose-400 font-extrabold px-2.5 py-0.5 rounded border border-rose-800/40">PROTOCOLO</span>
                        <h4 class="text-base font-bold text-white">${session.cardio.name}</h4>
                    </div>
                    <p class="text-xs text-slate-300 leading-relaxed">${session.cardio.desc}</p>
                    <span class="inline-block text-xs font-semibold text-amber-400"><i class="fa-regular fa-clock mr-1"></i> Formato: ${session.cardio.format}</span>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="openVideoModal('${session.cardio.name}', '${session.cardio.video}', '${session.cardio.desc}', 'Cardio BMX')" class="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 cursor-pointer">
                        <i class="fa-brands fa-youtube"></i> Video Tutorial
                    </button>
                </div>
            </div>
        </section>
    `;

    // 6. BLOQUE 5: ESTIRAMIENTO Y RECUPERACIÓN (8 + 4 MIN)
    html += `
        <section class="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div class="flex flex-wrap justify-between items-center gap-2 border-b border-slate-800 pb-3">
                <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-xl bg-teal-600/20 text-teal-400 flex items-center justify-center font-bold text-sm">
                        <i class="fa-solid fa-spa"></i>
                    </div>
                    <div>
                        <h3 class="text-base sm:text-lg font-black text-white font-heading">3 & 4. Estiramiento Completo y Recuperación Parasimpática</h3>
                        <p class="text-[11px] text-slate-400">8 Min Estiramiento estático + 4 Min Respiración 4-4-6 o Automasaje</p>
                    </div>
                </div>
                <span class="text-xs bg-slate-800 text-teal-400 font-bold px-2.5 py-1 rounded-lg border border-slate-700">
                    Post-Entrenamiento Vital
                </span>
            </div>
            <!-- Enfoque Biomecánico BMX del Bloque (PDF) -->
            <div class="bg-amber-950/25 border border-amber-500/30 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-amber-200/90 leading-relaxed shadow-sm">
                <i class="fa-solid fa-lightbulb text-amber-400 mt-0.5 text-sm flex-shrink-0"></i>
                <div>
                    <strong class="font-bold text-amber-300 block text-[10px] uppercase tracking-wider mb-0.5">Enfoque Biomecánico BMX (PDF):</strong>
                    ${stretchInsight}
                </div>
            </div>


            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    `;

    session.stretch.forEach((ex, idx) => {
        totalExercises++;
        const exKey = `w${w}_d${d}_${age}_strtch_${idx}`;
        const isChecked = !!athleteProgress[exKey];
        if (isChecked) completedExercises++;

        html += renderExerciseCard(ex, exKey, isChecked, 'Estiramiento', 'border-teal-500/30');
    });

    totalExercises++;
    const recKey = `w${w}_d${d}_${age}_rec_0`;
    const isRecChecked = !!athleteProgress[recKey];
    if (isRecChecked) completedExercises++;

    html += `
        <div class="bg-slate-850 bg-slate-800/40 p-4 rounded-2xl border border-teal-500/30 flex flex-col justify-between gap-3 md:col-span-2">
            <div class="flex justify-between items-start">
                <div>
                    <span class="text-[10px] font-extrabold uppercase tracking-widest text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/40">4. RECUPERACIÓN FINAL (4 MIN)</span>
                    <h4 class="font-bold text-sm text-white mt-1">${session.recovery.name}</h4>
                </div>
                <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300 hover:text-white transition">
                    <input type="checkbox" ${isRecChecked ? 'checked' : ''} onchange="toggleExerciseProgress('${recKey}')" class="w-4 h-4 text-red-600 rounded focus:ring-red-500 cursor-pointer accent-red-600"> Hecho
                </label>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">${session.recovery.desc}</p>
        </div>
    `;

    html += `</div></section>`;

    const container = document.getElementById('routineContainer');
    if (container) container.innerHTML = html;

    updateProgressStats(totalExercises, completedExercises);
}

function renderExerciseCard(ex, exKey, isChecked, category, borderClass) {
    const safeName = ex.name.replace(/'/g, "\\'");
    const safeDesc = (ex.desc || '').replace(/'/g, "\\'");
    const tempoHtml = ex.tempo ? `<span class="text-[10px] bg-purple-950 text-purple-300 font-mono px-2.5 py-0.5 rounded border border-purple-800/40" title="Tempo [Bajada / Pausa abajo / Subida / Pausa arriba]"><i class="fa-solid fa-stopwatch mr-1 text-purple-400"></i> Tempo ${ex.tempo}</span>` : '';
    const setsHtml = ex.sets ? `<span class="text-[10px] bg-red-950/90 text-red-300 font-bold px-2.5 py-0.5 rounded border border-red-800/50"><i class="fa-solid fa-repeat mr-1 text-red-400"></i> ${ex.sets}</span>` : '';
    const durHtml = ex.duration ? `<span class="text-[10px] bg-slate-800 text-slate-300 font-bold px-2.5 py-0.5 rounded border border-slate-700"><i class="fa-regular fa-clock mr-1 text-amber-400"></i> ${ex.duration}</span>` : '';
    const restHtml = ex.rest ? `<span class="text-[10px] bg-cyan-950 text-cyan-300 font-bold px-2.5 py-0.5 rounded border border-cyan-800/40"><i class="fa-solid fa-bed mr-1 text-cyan-400"></i> ${ex.rest}</span>` : '';
    const targetHtml = ex.target ? `<span class="text-[10px] text-slate-400 font-medium"><i class="fa-solid fa-bullseye text-red-500 mr-1"></i> ${ex.target}</span>` : '';

    return `
        <div class="bg-slate-850 bg-slate-800/40 p-4 rounded-2xl border ${borderClass} flex flex-col justify-between gap-3 hover:border-red-500/50 transition">
            <div class="space-y-1.5">
                <div class="flex justify-between items-start gap-2">
                    <h4 class="font-bold text-sm text-white">${ex.name}</h4>
                    <label class="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-slate-300 hover:text-white transition flex-shrink-0">
                        <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleExerciseProgress('${exKey}')" class="w-4 h-4 rounded text-red-600 focus:ring-red-500 cursor-pointer accent-red-600">
                        <span class="${isChecked ? 'text-emerald-400 font-bold' : ''}">Hecho</span>
                    </label>
                </div>
                <div class="flex flex-wrap items-center gap-1.5">
                    ${setsHtml}
                    ${durHtml}
                    ${restHtml}
                    ${tempoHtml}
                    ${targetHtml}
                </div>
            </div>

            <p class="text-xs text-slate-300/90 leading-relaxed">${ex.desc || ''}</p>

            <div class="pt-2 border-t border-slate-700/60 flex items-center justify-between">
                <button onclick="openVideoModal('${safeName}', '${ex.video}', '${safeDesc}', '${category}', '${ex.tempo || ''}')" class="text-xs bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer">
                    <i class="fa-brands fa-youtube text-red-500 hover:text-white"></i> Ver Video Técnico
                </button>
                <span class="text-[10px] text-slate-500 uppercase font-semibold">Técnica Oficial</span>
            </div>
        </div>
    `;
}

/* ==========================================================================
   PROGRESO Y GAMIFICACIÓN
   ========================================================================== */
function toggleExerciseProgress(exKey) {
    const athlete = state.currentAthlete;
    if (!state.progress[athlete]) {
        state.progress[athlete] = {};
    }

    state.progress[athlete][exKey] = !state.progress[athlete][exKey];

    if (state.progress[athlete][exKey] && typeof playBeep === 'function') {
        playBeep(800, 0.08);
    }

    saveStateToStorage();
    renderActiveView();
    checkSessionCompletion();
}

function updateProgressStats(total, completed) {
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    const bar = document.getElementById('sessionProgressBar');
    const pctText = document.getElementById('sessionProgressPct');
    
    if (bar) bar.style.width = `${pct}%`;
    if (pctText) pctText.innerText = `${pct}% (${completed}/${total})`;

    const athlete = state.currentAthlete;
    const athleteProg = state.progress[athlete] || {};
    const totalDone = Object.values(athleteProg).filter(Boolean).length;
    const statTotal = document.getElementById('statCompletedTotal');
    if (statTotal) statTotal.innerText = totalDone;

    const statStreak = document.getElementById('statStreakDays');
    if (statStreak) {
        const streak = calculateAthleteStreak();
        statStreak.innerText = streak;
    }
}

function checkSessionCompletion() {
    const athlete = state.currentAthlete;
    const w = state.activeWeek;
    const d = state.activeDay;
    const age = state.activeAgeGroup;
    const prog = state.progress[athlete] || {};

    const prefix = `w${w}_d${d}_${age}_`;
    const sessionKeys = Object.keys(prog).filter(k => k.startsWith(prefix) && prog[k]);
    
    let requiredCount = 6;
    if (typeof TRAINING_DB !== 'undefined' && TRAINING_DB[w] && TRAINING_DB[w].days[d] && TRAINING_DB[w].days[d].ageGroups[age]) {
        const s = TRAINING_DB[w].days[d].ageGroups[age];
        const total = (s.warmup ? s.warmup.length : 0) + 
                      (s.plyo ? s.plyo.length : 0) + 
                      (s.strength ? s.strength.length : 0) + 
                      (s.stretch ? s.stretch.length : 0) + 
                      (s.recovery ? 1 : 0);
        requiredCount = Math.max(6, total);
    }

    if (sessionKeys.length >= requiredCount) {
        if (!state.history[athlete]) state.history[athlete] = [];
        
        // Registrar en el historial si no se ha registrado hoy
        const todayStr = new Date().toISOString().split('T')[0];
        const alreadyRecordedToday = state.history[athlete].some(h => 
            Number(h.week) === Number(w) && 
            Number(h.day) === Number(d) && 
            (h.date || '').startsWith(todayStr)
        );

        if (!alreadyRecordedToday) {
            state.history[athlete].push({
                date: new Date().toISOString(),
                week: Number(w),
                day: Number(d),
                timestamp: Date.now()
            });
            if (typeof saveStateToStorage === 'function') saveStateToStorage();
        }

        if (window.confetti) {
            window.confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        if (typeof renderCalendarSchedule === 'function') {
            renderCalendarSchedule();
        }
    }
}

function calculateAthleteStreak() {
    const athlete = state.currentAthlete;
    const athleteProg = state.progress[athlete] || {};
    const count = Object.values(athleteProg).filter(Boolean).length;
    return Math.floor(count / 7) + (count > 0 ? 1 : 0);
}

/* ==========================================================================
   MODAL DE VIDEO EXPLICATIVO
   ========================================================================== */
function openVideoModal(title, videoUrl, desc, category, tempo) {
    const titleElem = document.getElementById('modalVideoTitle');
    const catElem = document.getElementById('modalVideoCategory');
    const descElem = document.getElementById('modalVideoDescription');
    const tempoBox = document.getElementById('modalVideoTempoContainer');
    const iframe = document.getElementById('modalVideoIframe');

    if (titleElem) titleElem.innerText = title;
    if (catElem) catElem.innerText = category || 'EJERCICIO BMX';
    if (descElem) descElem.innerText = desc || 'Instrucciones biomecánicas oficiales de Activerza BMX.';
    
    if (tempoBox) {
        if (tempo) {
            tempoBox.classList.remove('hidden');
            tempoBox.innerHTML = `<strong>Tempo de Ejecución Recomendado:</strong> ${tempo}`;
        } else {
            tempoBox.classList.add('hidden');
        }
    }

    if (iframe) {
        iframe.src = videoUrl.includes('?') ? `${videoUrl}&autoplay=1` : `${videoUrl}?autoplay=1`;
    }

    const modal = document.getElementById('videoModal');
    if (modal) modal.classList.remove('hidden');
}

function closeVideoModal() {
    const iframe = document.getElementById('modalVideoIframe');
    if (iframe) iframe.src = '';
    const modal = document.getElementById('videoModal');
    if (modal) modal.classList.add('hidden');
}

/* ==========================================================================
   CALCULADORA DE HIDRATACIÓN
   ========================================================================== */
function calculateHydration() {
    const weightInput = document.getElementById('calcAthleteWeight');
    const weight = parseFloat(weightInput ? weightInput.value : 38) || 38;

    const pre = Math.min(Math.max(Math.round(weight * 10), 300), 500);
    const duringMin = Math.round(weight * 2.5);
    const duringMax = Math.round(weight * 3.8);
    const post = Math.round(weight * 12);

    const preElem = document.getElementById('hydraPreDisplay');
    const durElem = document.getElementById('hydraDuringDisplay');
    const postElem = document.getElementById('hydraPostDisplay');

    if (preElem) preElem.innerText = `${pre} ml`;
    if (durElem) durElem.innerText = `${duringMin} - ${duringMax} ml`;
    if (postElem) postElem.innerText = `${post} ml + Fruta`;
}

/* ==========================================================================
   GESTIÓN DE PERFILES DE ATLETAS & FOTOS
   ========================================================================== */
let tempUploadedPhoto = null; // Buffer para foto cargada pendiente de guardar

function handleAthletePhotoUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido (JPG, PNG, WebP).');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // Optimizar y redimensionar la imagen para no saturar LocalStorage (máx 256x256 px)
            const canvas = document.createElement('canvas');
            const maxDim = 256;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxDim) {
                    height = Math.round((height * maxDim) / width);
                    width = maxDim;
                }
            } else {
                if (height > maxDim) {
                    width = Math.round((width * maxDim) / height);
                    height = maxDim;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
            tempUploadedPhoto = compressedDataUrl;
            updatePhotoPreviewUI(compressedDataUrl);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function removeAthletePhoto() {
    tempUploadedPhoto = ''; // Cadena vacía indica que el usuario eliminó la foto
    updatePhotoPreviewUI(null);
    const fileInput = document.getElementById('inputProfilePhoto');
    if (fileInput) fileInput.value = '';
    const pinInputSel = document.getElementById('inputProfilePin');
    if (pinInputSel) pinInputSel.value = profile.pin || '';
    if (typeof setupCurrentPilotSync === 'function') setupCurrentPilotSync();
    const pinInputNew = document.getElementById('inputProfilePin');
    if (pinInputNew) pinInputNew.value = '';
    const pinInput = document.getElementById('inputProfilePin');
    if (pinInput) pinInput.value = current.pin || '';
}

function updatePhotoPreviewUI(photoUrl) {
    const imgElem = document.getElementById('profilePhotoPreview');
    const placeholder = document.getElementById('profilePhotoPlaceholder');
    const btnRemove = document.getElementById('btnRemoveProfilePhoto');

    if (photoUrl) {
        if (imgElem) {
            imgElem.src = photoUrl;
            imgElem.classList.remove('hidden');
        }
        if (placeholder) placeholder.classList.add('hidden');
        if (btnRemove) btnRemove.classList.remove('hidden');
    } else {
        if (imgElem) {
            imgElem.src = '';
            imgElem.classList.add('hidden');
        }
        if (placeholder) placeholder.classList.remove('hidden');
        if (btnRemove) btnRemove.classList.add('hidden');
    }
}

let isCreatingNewProfile = false; // Bandera para indicar si estamos creando un nuevo perfil

function prepareNewAthleteForm() {
    isCreatingNewProfile = true;

    const nameInput = document.getElementById('inputProfileName');
    const ageInput = document.getElementById('inputProfileAgeGroup');
    const weightInput = document.getElementById('inputProfileWeight');
    const fileInput = document.getElementById('inputProfilePhoto');
    const pinInput = document.getElementById('inputProfilePin');
    const modeBadge = document.getElementById('modalProfileModeBadge');
    const titleElem = document.getElementById('modalProfileTitle');
    const btnDelete = document.getElementById('btnDeleteCurrentAthlete');
    const btnSave = document.getElementById('btnSaveAthleteProfile');

    if (nameInput) {
        nameInput.value = '';
        nameInput.placeholder = 'Escribe el nombre del nuevo deportista...';
        nameInput.focus();
    }
    if (ageInput) ageInput.value = '7to12';
    if (weightInput) weightInput.value = '';
    if (fileInput) fileInput.value = '';
    if (pinInput) pinInput.value = '';

    tempUploadedPhoto = '';
    updatePhotoPreviewUI(null);

    if (modeBadge) modeBadge.classList.remove('hidden');
    if (titleElem) titleElem.innerText = 'Nuevo Deportista';
    if (btnDelete) btnDelete.classList.add('hidden');
    if (btnSave) btnSave.innerHTML = `<i class="fa-solid fa-user-plus mr-1"></i> Crear y Guardar Perfil`;
}

function openProfileModal() {
    isCreatingNewProfile = false;

    const current = state.athletes[state.currentAthlete] || { ageGroup: '7to12', weight: 38, photo: null, pin: '' };
    const nameInput = document.getElementById('inputProfileName');
    const ageInput = document.getElementById('inputProfileAgeGroup');
    const weightInput = document.getElementById('inputProfileWeight');
    const fileInput = document.getElementById('inputProfilePhoto');
    const pinInput = document.getElementById('inputProfilePin');
    const modeBadge = document.getElementById('modalProfileModeBadge');
    const titleElem = document.getElementById('modalProfileTitle');
    const btnDelete = document.getElementById('btnDeleteCurrentAthlete');
    const btnSave = document.getElementById('btnSaveAthleteProfile');

    if (nameInput) {
        nameInput.value = state.currentAthlete;
        nameInput.placeholder = 'Ej: Santiago Vega';
    }
    if (ageInput) ageInput.value = current.ageGroup;
    if (weightInput) weightInput.value = current.weight || '';
    if (fileInput) fileInput.value = '';
    if (pinInput) pinInput.value = current.pin || '';

    if (modeBadge) modeBadge.classList.add('hidden');
    if (titleElem) titleElem.innerText = 'Perfil del Deportista';
    if (btnDelete) btnDelete.classList.remove('hidden');
    if (btnSave) btnSave.innerHTML = `<i class="fa-solid fa-check mr-1"></i> Guardar y Aplicar`;

    tempUploadedPhoto = current.photo || null;
    updatePhotoPreviewUI(tempUploadedPhoto);

    renderAthletesList();
    const modal = document.getElementById('profileModal');
    if (modal) modal.classList.remove('hidden');
}

function closeProfileModal() {
    isCreatingNewProfile = false;
    tempUploadedPhoto = null;
    const fileInput = document.getElementById('inputProfilePhoto');
    if (fileInput) fileInput.value = '';
    const pinInput = document.getElementById('inputProfilePin');
    if (pinInput) pinInput.value = '';
    const modal = document.getElementById('profileModal');
    if (modal) modal.classList.add('hidden');
}

function saveCurrentAthleteProfile() {
    const nameInput = document.getElementById('inputProfileName');
    const ageInput = document.getElementById('inputProfileAgeGroup');
    const weightInput = document.getElementById('inputProfileWeight');
    const pinInput = document.getElementById('inputProfilePin');

    const name = nameInput ? nameInput.value.trim() : '';
    const ageGroup = ageInput ? ageInput.value : '7to12';
    const weight = parseFloat(weightInput ? weightInput.value : 38) || 38;
    const pin = pinInput ? pinInput.value.trim() : '';

    if (!name) {
        alert('Por favor escribe un nombre para el deportista.');
        return;
    }

    if (isCreatingNewProfile) {
        if (state.athletes[name]) {
            if (!confirm(`Ya existe un deportista registrado con el nombre "${name}". ¿Deseas sobreescribir sus datos?`)) {
                return;
            }
        }
        const finalPhoto = tempUploadedPhoto || null;
        state.athletes[name] = { ageGroup, weight, photo: finalPhoto, pin };
        state.currentAthlete = name;
        state.activeAgeGroup = ageGroup;
        if (!state.progress[name]) state.progress[name] = {};
        if (!state.history[name]) state.history[name] = [];
        isCreatingNewProfile = false;
    } else {
        const oldName = state.currentAthlete;
        const previousPhoto = (state.athletes[oldName] && state.athletes[oldName].photo) || null;
        
        let finalPhoto = previousPhoto;
        if (tempUploadedPhoto === '') {
            finalPhoto = null;
        } else if (tempUploadedPhoto !== null) {
            finalPhoto = tempUploadedPhoto;
        }

        // Si el nombre cambió a otro, migrar el progreso
        if (oldName && oldName !== name) {
            if (state.athletes[name] && !confirm(`Ya existe un deportista llamado "${name}". ¿Deseas reemplazarlo?`)) {
                return;
            }
            if (state.progress[oldName]) {
                state.progress[name] = state.progress[oldName];
                delete state.progress[oldName];
            }
            if (state.history[oldName]) {
                state.history[name] = state.history[oldName];
                delete state.history[oldName];
            }
            delete state.athletes[oldName];
        }

        state.currentAthlete = name;
        state.activeAgeGroup = ageGroup;
        state.athletes[name] = { 
            ageGroup, 
            weight, 
            photo: finalPhoto, 
            pin: pin || (state.athletes[name] && state.athletes[name].pin) || ''
        };
    }

    const calcWeight = document.getElementById('calcAthleteWeight');
    if (calcWeight) {
        calcWeight.value = weight;
        calculateHydration();
    }

    const selectAge = document.getElementById('selectAgeGroup');
    if (selectAge) selectAge.value = ageGroup;

    updateNavAthleteInfo();
    renderAthletesList();
    saveStateToStorage();
    closeProfileModal();
    renderActiveView();
}

function deleteCurrentAthleteProfile() {
    const name = state.currentAthlete;
    if (!name || !state.athletes[name]) return;

    const athleteNames = Object.keys(state.athletes);
    const isSingle = athleteNames.length <= 1;

    const confirmMsg = isSingle
        ? `¿Seguro que deseas eliminar el perfil de "${name}"?\nComo es el único atleta registrado, se creará uno nuevo por defecto.`
        : `¿Seguro que deseas eliminar el perfil de "${name}"?\nSe borrará su historial y progreso registrado.`;

    if (!confirm(confirmMsg)) return;

    delete state.athletes[name];
    delete state.progress[name];
    delete state.history[name];

    const remaining = Object.keys(state.athletes);
    if (remaining.length > 0) {
        state.currentAthlete = remaining[0];
        state.activeAgeGroup = state.athletes[remaining[0]].ageGroup;
    } else {
        const defaultName = 'Deportista BMX';
        state.athletes[defaultName] = { ageGroup: '7to12', weight: 38, photo: null };
        state.currentAthlete = defaultName;
        state.activeAgeGroup = '7to12';
    }

    const currentProfile = state.athletes[state.currentAthlete];
    const selectAge = document.getElementById('selectAgeGroup');
    if (selectAge) selectAge.value = currentProfile.ageGroup;

    const calcWeight = document.getElementById('calcAthleteWeight');
    if (calcWeight) {
        calcWeight.value = currentProfile.weight || 38;
        calculateHydration();
    }

    saveStateToStorage();
    updateNavAthleteInfo();
    renderAthletesList();
    closeProfileModal();
    renderActiveView();
}

function deleteSpecificAthlete(targetName, event) {
    if (event) event.stopPropagation();
    if (!targetName || !state.athletes[targetName]) return;

    if (!confirm(`¿Eliminar al atleta "${targetName}"?`)) return;

    delete state.athletes[targetName];
    delete state.progress[targetName];
    delete state.history[targetName];

    if (state.currentAthlete === targetName) {
        const remaining = Object.keys(state.athletes);
        if (remaining.length > 0) {
            state.currentAthlete = remaining[0];
            state.activeAgeGroup = state.athletes[remaining[0]].ageGroup;
        } else {
            const defaultName = 'Deportista BMX';
            state.athletes[defaultName] = { ageGroup: '7to12', weight: 38, photo: null };
            state.currentAthlete = defaultName;
            state.activeAgeGroup = '7to12';
        }
    }

    saveStateToStorage();
    updateNavAthleteInfo();
    renderAthletesList();
    renderActiveView();
}

function renderAthletesList() {
    const container = document.getElementById('athletesListPills');
    if (!container) return;
    container.innerHTML = '';

    const athleteNames = Object.keys(state.athletes);

    athleteNames.forEach(name => {
        const isCurrent = name === state.currentAthlete && !isCreatingNewProfile;
        const athlete = state.athletes[name] || {};
        
        const pillWrapper = document.createElement('div');
        pillWrapper.className = "flex items-center rounded-xl overflow-hidden border transition " + 
            (isCurrent ? "border-red-500 shadow-md shadow-red-600/20" : "border-slate-700 hover:border-slate-600");

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = isCurrent
            ? "px-3 py-1.5 text-xs font-bold bg-red-600 text-white flex items-center gap-1.5 cursor-pointer"
            : "px-3 py-1.5 text-xs font-bold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition flex items-center gap-1.5 cursor-pointer";
        
        const avatarHtml = athlete.photo
            ? `<img src="${athlete.photo}" alt="${name}" class="w-4 h-4 rounded-full object-cover border border-white/50 flex-shrink-0">`
            : `<i class="fa-solid fa-user text-[10px] opacity-75"></i>`;

        btn.innerHTML = `${avatarHtml} <span>${name}</span>`;
        btn.onclick = () => selectAthlete(name);
        pillWrapper.appendChild(btn);

        // Si hay más de un atleta registrado, permitir botón de borrar rápido
        if (athleteNames.length > 1) {
            const delBtn = document.createElement('button');
            delBtn.type = 'button';
            delBtn.title = `Eliminar a ${name}`;
            delBtn.className = isCurrent
                ? "px-2 py-1.5 bg-red-700 text-red-200 hover:text-white hover:bg-red-800 text-xs transition cursor-pointer"
                : "px-2 py-1.5 bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700 text-xs transition cursor-pointer";
            delBtn.innerHTML = `<i class="fa-solid fa-xmark text-[11px]"></i>`;
            delBtn.onclick = (e) => deleteSpecificAthlete(name, e);
            pillWrapper.appendChild(delBtn);
        }

        container.appendChild(pillWrapper);
    });

    // Botón de nuevo atleta al final de las píldoras
    const newBtn = document.createElement('button');
    newBtn.type = 'button';
    newBtn.className = "px-3 py-1.5 text-xs font-bold border border-dashed border-red-500/50 text-red-400 hover:text-white hover:bg-red-600/20 hover:border-red-500 rounded-xl transition flex items-center gap-1.5 cursor-pointer";
    newBtn.innerHTML = `<i class="fa-solid fa-plus text-[10px]"></i> <span>Nuevo Atleta</span>`;
    newBtn.onclick = prepareNewAthleteForm;
    container.appendChild(newBtn);
}

function selectAthlete(name) {
    isCreatingNewProfile = false;
    state.currentAthlete = name;
    const profile = state.athletes[name] || { ageGroup: '7to12', weight: 38 };
    state.activeAgeGroup = profile.ageGroup;
    
    const selectAge = document.getElementById('selectAgeGroup');
    if (selectAge) selectAge.value = profile.ageGroup;
    
    const nameInput = document.getElementById('inputProfileName');
    const ageInput = document.getElementById('inputProfileAgeGroup');
    const weightInput = document.getElementById('inputProfileWeight');
    const pinInput = document.getElementById('inputProfilePin');
    const modeBadge = document.getElementById('modalProfileModeBadge');
    const titleElem = document.getElementById('modalProfileTitle');
    const btnDelete = document.getElementById('btnDeleteCurrentAthlete');
    const btnSave = document.getElementById('btnSaveAthleteProfile');

    if (nameInput) {
        nameInput.value = name;
        nameInput.placeholder = 'Ej: Santiago Vega';
    }
    if (ageInput) ageInput.value = profile.ageGroup;
    if (weightInput) weightInput.value = profile.weight || '';
    if (pinInput) pinInput.value = profile.pin || '';

    if (modeBadge) modeBadge.classList.add('hidden');
    if (titleElem) titleElem.innerText = 'Perfil del Deportista';
    if (btnDelete) btnDelete.classList.remove('hidden');
    if (btnSave) btnSave.innerHTML = `<i class="fa-solid fa-check mr-1"></i> Guardar y Aplicar`;

    tempUploadedPhoto = profile.photo || null;
    updatePhotoPreviewUI(tempUploadedPhoto);

    updateNavAthleteInfo();
    renderAthletesList();
    saveStateToStorage();
    renderActiveView();
}

function updateNavAthleteInfo() {
    const nameElem = document.getElementById('navAthleteName');
    const badgeElem = document.getElementById('navAthleteBadge');
    const avatarImg = document.getElementById('navAthleteAvatarImg');
    const avatarIcon = document.getElementById('navAthleteAvatarIcon');

    if (nameElem) nameElem.innerText = state.currentAthlete;
    
    if (badgeElem) {
        const labels = {
            'sub6': 'Menores de 6 Años',
            '7to12': '7 a 12 Años',
            '13to17': '13 a 17 Años',
            '18plus': '18+ Años y Padres'
        };
        badgeElem.innerText = labels[state.activeAgeGroup] || '7 a 12 Años';
    }

    const currentProfile = state.athletes[state.currentAthlete];
    if (currentProfile && currentProfile.photo) {
        if (avatarImg) {
            avatarImg.src = currentProfile.photo;
            avatarImg.classList.remove('hidden');
        }
        if (avatarIcon) avatarIcon.classList.add('hidden');
    } else {
        if (avatarImg) {
            avatarImg.src = '';
            avatarImg.classList.add('hidden');
        }
        if (avatarIcon) avatarIcon.classList.remove('hidden');
    }
}

/* ==========================================================================
   EXPORTAR / IMPORTAR DATOS EN JSON
   ========================================================================== */
function exportDataJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `activerza_bmx_${state.currentAthlete.replace(/\s+/g, '_')}_progreso.json`);
    dlAnchorElem.click();
}

function importDataJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            state = { ...state, ...imported };
            saveStateToStorage();
            loadSavedState();
            renderActiveView();
            alert('¡Datos restaurados con éxito!');
        } catch (err) {
            alert('Error al leer el archivo JSON.');
        }
    };
    reader.readAsText(file);
}
