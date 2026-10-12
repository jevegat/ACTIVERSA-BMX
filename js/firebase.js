/**
 * ACTIVERZA BMX RACING ACADEMY
 * Módulo de Persistencia en la Nube con Google Firebase & Cloud Firestore
 * Soporte Offline Nativo (IndexedDB), Sincronización en Tiempo Real y
 * Gestión Multi-Dispositivo por Nombre y PIN de Piloto
 */

// Configuración embebida de Google Firebase para ACTIVERSA-BMX (Lista para producción)
const DEFAULT_FIREBASE_CONFIG = {
    apiKey: "AIzaSyCmoKFcUaxgsz2tEM3kWzYx_jIByIouUhc",
    authDomain: "activersa-bmx.firebaseapp.com",
    projectId: "activersa-bmx",
    storageBucket: "activersa-bmx.firebasestorage.app",
    messagingSenderId: "790081235374",
    appId: "1:790081235374:web:09d832246e06c873ea803f",
    measurementId: "G-NC67WLTV3B"
};

let firebaseApp = null;
let firestoreDb = null;
let firebaseAuth = null;
let firestorePilotUnsubscribe = null;

let cloudState = {
    isConfigured: true,
    isConnected: false,
    isSyncing: false,
    lastSyncTime: null,
    userId: null,
    projectId: 'activersa-bmx',
    activePilotSync: null,
    statusText: 'Conectando a Nube...'
};

/**
 * Normaliza el nombre del piloto para generar un ID seguro y único de documento Firestore
 */
function getPilotDocId(name) {
    if (!name) return 'piloto_default';
    return name.trim().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '_');
}

/**
 * Obtiene o genera un ID de academia persistente localmente
 */
function getOrCreateAcademyId() {
    let id = localStorage.getItem('activerza_academy_id');
    if (!id) {
        id = 'bmx_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
        localStorage.setItem('activerza_academy_id', id);
    }
    return id;
}

/**
 * Inicializa Firebase de forma automática y transparente en cualquier dispositivo
 */
function initFirebase() {
    try {
        if (typeof firebase === 'undefined') {
            console.warn('Firebase SDK no cargado en el navegador.');
            updateCloudStatusUI('error', 'SDK no cargado');
            return;
        }

        // Cargar configuración guardada o usar la configuración predeterminada del proyecto
        let config = DEFAULT_FIREBASE_CONFIG;
        const customConfigStr = localStorage.getItem('activerza_firebase_config');
        if (customConfigStr) {
            try {
                const parsed = JSON.parse(customConfigStr);
                if (parsed.apiKey && parsed.projectId) {
                    config = parsed;
                }
            } catch (e) {
                console.warn('Usando configuración predeterminada.');
            }
        }

        // Inicializar o recuperar instancia de Firebase App
        if (!firebase.apps.length) {
            firebaseApp = firebase.initializeApp(config);
        } else {
            firebaseApp = firebase.app();
        }

        firestoreDb = firebase.firestore();
        firebaseAuth = firebase.auth();
        cloudState.isConfigured = true;
        cloudState.projectId = config.projectId;

        // Activar persistencia offline nativa con IndexedDB (vital para la pista de BMX)
        firestoreDb.enablePersistence({ synchronizeTabs: true })
            .then(() => {
                console.log('✅ Firestore: Persistencia offline (IndexedDB) activa.');
            })
            .catch(err => {
                if (err.code === 'failed-precondition') {
                    console.warn('Persistencia en múltiples pestañas restringida.');
                } else if (err.code === 'unimplemented') {
                    console.warn('Navegador no soporta persistencia IndexedDB.');
                }
            });

        const fallbackUserId = getOrCreateAcademyId();

        // Autenticación transparente (intenta anónima; si no está habilitada en consola, usa fallback directo)
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                cloudState.userId = user.uid;
                cloudState.isConnected = true;
                updateCloudStatusUI('connected', 'Nube Conectada');
                setupCurrentPilotSync();
            } else {
                firebaseAuth.signInAnonymously()
                    .then(cred => {
                        cloudState.userId = cred.user.uid;
                        cloudState.isConnected = true;
                        updateCloudStatusUI('connected', 'Nube Conectada');
                        setupCurrentPilotSync();
                    })
                    .catch(err => {
                        console.warn('Aviso Auth anónima deshabilitada; conectando con ID local:', err.code);
                        cloudState.userId = fallbackUserId;
                        cloudState.isConnected = true;
                        updateCloudStatusUI('connected', 'Nube Conectada');
                        setupCurrentPilotSync();
                    });
            }
        });

    } catch (e) {
        console.error('Error inicializando Firebase:', e);
        updateCloudStatusUI('error', 'Error Conexión');
    }
}

/**
 * Vincula el listener en tiempo real de Firestore para el piloto actualmente activo
 */
function setupCurrentPilotSync() {
    if (!firestoreDb) return;
    const currentName = (typeof state !== 'undefined' && state.currentAthlete) ? state.currentAthlete : 'Santiago Vega';
    const pilotDocId = getPilotDocId(currentName);

    if (cloudState.activePilotSync === pilotDocId && firestorePilotUnsubscribe) {
        return; // Ya está escuchando al mismo piloto
    }

    if (firestorePilotUnsubscribe) {
        firestorePilotUnsubscribe();
    }

    cloudState.activePilotSync = pilotDocId;
    const docRef = firestoreDb.collection('pilots').doc(pilotDocId);

    firestorePilotUnsubscribe = docRef.onSnapshot(doc => {
        if (doc.exists) {
            const data = doc.data();
            if (data && data.updatedAt) {
                const localUpdated = parseInt(localStorage.getItem('activerza_last_local_write') || '0', 10);
                if (data.updatedAt > localUpdated) {
                    console.log(`☁️ Firestore: Novedad recibida para el piloto "${data.name}":`, data);
                    applyRemotePilotData(data);
                    cloudState.lastSyncTime = new Date(data.updatedAt).toLocaleTimeString('es-ES');
                    updateCloudStatusUI('connected', 'Sincronizado');
                }
            }
        }
    }, err => {
        console.warn('Aviso en listener de piloto Firestore:', err);
        updateCloudStatusUI('syncing', 'Modo Offline Pista');
    });
}

/**
 * Aplica los datos descargados de un piloto en la nube al estado de la aplicación
 */
function applyRemotePilotData(pilotData) {
    if (!pilotData || !pilotData.name || typeof state === 'undefined') return;

    const name = pilotData.name;
    if (!state.athletes[name]) {
        state.athletes[name] = { 
            ageGroup: pilotData.ageGroup || '7to12', 
            weight: pilotData.weight || 38, 
            photo: pilotData.photo || null,
            pin: pilotData.pin || ''
        };
    } else {
        if (pilotData.ageGroup) state.athletes[name].ageGroup = pilotData.ageGroup;
        if (pilotData.weight) state.athletes[name].weight = pilotData.weight;
        if (pilotData.photo !== undefined) state.athletes[name].photo = pilotData.photo;
        if (pilotData.pin) state.athletes[name].pin = pilotData.pin;
    }

    if (pilotData.progress) {
        state.progress[name] = { ...(state.progress[name] || {}), ...pilotData.progress };
    }

    if (pilotData.history && Array.isArray(pilotData.history)) {
        state.history[name] = pilotData.history;
    }

    if (pilotData.calendar) {
        state.calendar = { ...(state.calendar || {}), ...pilotData.calendar };
    }

    // Actualizar atleta activo y vistas
    state.currentAthlete = name;
    if (state.athletes[name].ageGroup) {
        state.activeAgeGroup = state.athletes[name].ageGroup;
    }

    localStorage.setItem('activerza_state_v1', JSON.stringify(state));

    if (typeof updateNavAthleteInfo === 'function') updateNavAthleteInfo();
    if (typeof renderAthletesList === 'function') renderAthletesList();
    if (typeof renderActiveView === 'function') renderActiveView();
    if (typeof renderHeroCarouselDots === 'function') renderHeroCarouselDots();

    updateCloudModalPilotInfo();
}

/**
 * Sincroniza los datos del piloto activo hacia Cloud Firestore
 */
function syncStateToFirestore(currentState) {
    if (!firestoreDb) return Promise.resolve(false);

    const pilotName = currentState.currentAthlete || 'Santiago Vega';
    const pilotDocId = getPilotDocId(pilotName);
    const athleteData = currentState.athletes[pilotName] || { ageGroup: '7to12', weight: 38 };

    cloudState.isSyncing = true;
    updateCloudStatusUI('syncing', 'Guardando...');

    const now = Date.now();
    localStorage.setItem('activerza_last_local_write', now.toString());

    // Objeto limpio para el piloto
    const cleanProgress = currentState.progress[pilotName] || {};
    const cleanHistory = currentState.history[pilotName] || [];
    const cleanCalendar = currentState.calendar || {};

    const payload = {
        pilotId: pilotDocId,
        name: pilotName,
        pin: athleteData.pin || '',
        ageGroup: athleteData.ageGroup || currentState.activeAgeGroup || '7to12',
        weight: athleteData.weight || 38,
        photo: athleteData.photo || null,
        progress: JSON.parse(JSON.stringify(cleanProgress)),
        history: JSON.parse(JSON.stringify(cleanHistory)),
        calendar: JSON.parse(JSON.stringify(cleanCalendar)),
        stateSnapshot: {
            activeWeek: currentState.activeWeek,
            activeDay: currentState.activeDay,
            activeAgeGroup: currentState.activeAgeGroup
        },
        updatedAt: now,
        clientTime: new Date().toISOString(),
        platform: 'ACTIVERSA-BMX Web'
    };

    return firestoreDb.collection('pilots').doc(pilotDocId).set(payload, { merge: true })
        .then(() => {
            cloudState.isSyncing = false;
            cloudState.lastSyncTime = new Date().toLocaleTimeString('es-ES');
            updateCloudStatusUI('connected', 'Sincronizado');
            updateCloudModalPilotInfo();
            return true;
        })
        .catch(err => {
            console.error('Error guardando piloto en Firestore:', err);
            cloudState.isSyncing = false;
            updateCloudStatusUI('connected', 'Pendiente (Offline)');
            return false;
        });
}

/**
 * Conecta o vincula un piloto en este dispositivo usando su Nombre y PIN
 */
function connectPilotWithPin(name, pin) {
    if (!name || !name.trim()) {
        alert('Por favor ingresa el nombre del piloto.');
        return Promise.reject(new Error('Nombre requerido'));
    }

    const trimmedName = name.trim();
    const pilotDocId = getPilotDocId(trimmedName);
    const cleanPin = (pin || '').trim();

    if (!firestoreDb) {
        alert('Conectando a los servicios de nube, intenta en unos segundos...');
        return Promise.reject(new Error('Firestore no listo'));
    }

    const btn = document.getElementById('btnConnectPilotSubmit');
    if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Verificando en Nube...';

    return firestoreDb.collection('pilots').doc(pilotDocId).get()
        .then(doc => {
            if (btn) btn.innerHTML = '<i class="fa-solid fa-link mr-1"></i> Sincronizar en este Dispositivo';

            if (doc.exists) {
                const remote = doc.data();
                // Si el perfil en la nube tiene PIN registrado, validamos coincidencia
                if (remote.pin && remote.pin.trim() !== '') {
                    if (cleanPin !== remote.pin.trim()) {
                        alert(`❌ PIN incorrecto para el piloto "${trimmedName}".\nPor favor verifica tu PIN de 4 dígitos.`);
                        return false;
                    }
                }

                // PIN correcto o no configurado: aplicamos datos
                applyRemotePilotData(remote);

                // Si ingresó un PIN nuevo y en la nube estaba vacío, lo aseguramos
                if (cleanPin && (!remote.pin || remote.pin === '')) {
                    firestoreDb.collection('pilots').doc(pilotDocId).set({ pin: cleanPin }, { merge: true });
                    if (state.athletes[trimmedName]) state.athletes[trimmedName].pin = cleanPin;
                }

                setupCurrentPilotSync();
                alert(`✅ ¡Piloto "${trimmedName}" sincronizado exitosamente!\nTus entrenamientos y tiempos ya están en este dispositivo.`);
                closeCloudSyncModal();
                return true;
            } else {
                // El piloto no existe aún en la nube; lo creamos
                if (typeof state !== 'undefined') {
                    if (!state.athletes[trimmedName]) {
                        state.athletes[trimmedName] = { ageGroup: '7to12', weight: 38, photo: null, pin: cleanPin };
                    } else {
                        state.athletes[trimmedName].pin = cleanPin;
                    }
                    state.currentAthlete = trimmedName;
                    state.activeAgeGroup = state.athletes[trimmedName].ageGroup;
                    saveStateToStorage();
                    setupCurrentPilotSync();
                }

                alert(`✅ ¡Perfil del piloto "${trimmedName}" creado y registrado en la nube con tu PIN!`);
                closeCloudSyncModal();
                return true;
            }
        })
        .catch(err => {
            if (btn) btn.innerHTML = '<i class="fa-solid fa-link mr-1"></i> Sincronizar en este Dispositivo';
            console.error('Error al conectar piloto:', err);
            alert('Error conectando con la nube: ' + err.message);
            return false;
        });
}

/**
 * Fuerza la subida inmediata de los datos del piloto activo a Firestore
 */
function forcePushToCloud() {
    if (!firestoreDb) {
        alert('Servicio de nube no disponible.');
        return;
    }

    if (typeof state !== 'undefined') {
        const btn = document.getElementById('btnForcePushCloud');
        if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Subiendo...';

        syncStateToFirestore(state).then(ok => {
            if (btn) btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up mr-1"></i> Subir a la Nube';
            if (ok) {
                alert('¡Datos del piloto subidos exitosamente a Cloud Firestore!');
            } else {
                alert('Se guardó localmente. Se sincronizará automáticamente al volver la señal.');
            }
        });
    }
}

/**
 * Fuerza la descarga inmediata de los datos del piloto activo desde Firestore
 */
function forcePullFromCloud() {
    if (!firestoreDb || typeof state === 'undefined') {
        alert('Servicio de nube no disponible.');
        return;
    }

    const currentName = state.currentAthlete;
    const pilotDocId = getPilotDocId(currentName);
    const btn = document.getElementById('btnForcePullCloud');
    if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Descargando...';

    firestoreDb.collection('pilots').doc(pilotDocId).get()
        .then(doc => {
            if (btn) btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down mr-1"></i> Descargar de Nube';
            if (doc.exists && doc.data()) {
                applyRemotePilotData(doc.data());
                alert(`¡Datos del piloto "${currentName}" actualizados desde la nube!`);
            } else {
                alert(`Aún no hay datos en la nube para el piloto "${currentName}".`);
            }
        })
        .catch(err => {
            if (btn) btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down mr-1"></i> Descargar de Nube';
            alert('Error descargando de la nube: ' + err.message);
        });
}

/**
 * Alterna la visibilidad de los campos de PIN (mostrar/ocultar)
 */
function togglePinVisibility(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === 'password') {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
}

/**
 * Actualiza la información del piloto y estado en el modal de nube
 */
function updateCloudModalPilotInfo() {
    if (typeof state === 'undefined') return;

    const currentName = state.currentAthlete || 'Santiago Vega';
    const currentProfile = (state.athletes && state.athletes[currentName]) ? state.athletes[currentName] : null;

    const nameElem = document.getElementById('modalCloudPilotName');
    const pinElem = document.getElementById('modalCloudPilotPinBadge');
    const photoElem = document.getElementById('modalCloudPilotPhoto');
    const placeholderElem = document.getElementById('modalCloudPilotPlaceholder');

    if (nameElem) nameElem.textContent = currentName;
    if (pinElem) {
        if (currentProfile && currentProfile.pin) {
            pinElem.textContent = 'PIN: ' + '•'.repeat(currentProfile.pin.length);
            pinElem.className = 'text-[11px] px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-mono font-bold border border-amber-500/30';
        } else {
            pinElem.textContent = 'Sin PIN (Asigna uno en tu perfil)';
            pinElem.className = 'text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 font-bold border border-slate-700';
        }
    }

    if (photoElem && placeholderElem) {
        if (currentProfile && currentProfile.photo) {
            photoElem.src = currentProfile.photo;
            photoElem.classList.remove('hidden');
            placeholderElem.classList.add('hidden');
        } else {
            photoElem.classList.add('hidden');
            placeholderElem.classList.remove('hidden');
        }
    }
}

/**
 * Actualiza los indicadores visuales de estado de nube en la UI
 */
function updateCloudStatusUI(status, text) {
    const dot = document.getElementById('cloudStatusDot');
    const label = document.getElementById('cloudStatusText');
    const modalDot = document.getElementById('modalCloudDot');
    const modalText = document.getElementById('modalCloudStatusText');
    const modalProject = document.getElementById('modalCloudProjectId');
    const modalSyncTime = document.getElementById('modalCloudSyncTime');

    if (dot) {
        if (status === 'connected') {
            dot.className = "w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50 animate-pulse";
        } else if (status === 'syncing') {
            dot.className = "w-2.5 h-2.5 rounded-full bg-amber-400 animate-spin";
        } else if (status === 'error') {
            dot.className = "w-2.5 h-2.5 rounded-full bg-rose-500";
        } else {
            dot.className = "w-2.5 h-2.5 rounded-full bg-slate-400";
        }
    }

    if (label) label.textContent = text;
    if (modalDot && dot) modalDot.className = dot.className;
    if (modalText) modalText.textContent = text;
    if (modalProject) modalProject.textContent = cloudState.projectId || 'activersa-bmx';
    if (modalSyncTime) modalSyncTime.textContent = cloudState.lastSyncTime || 'Sincronizado';
}

/**
 * Abre el modal de sincronización por Piloto y PIN
 */
function openCloudSyncModal() {
    const modal = document.getElementById('cloudSyncModal');
    if (modal) {
        modal.classList.remove('hidden');
        updateCloudModalPilotInfo();
        updateCloudStatusUI(cloudState.isConnected ? 'connected' : 'local', cloudState.isConnected ? 'Nube Conectada' : 'Modo Offline');
        
        // Sugerir nombre de piloto actual en el formulario si está vacío
        const inputName = document.getElementById('inputSyncPilotName');
        if (inputName && !inputName.value.trim() && typeof state !== 'undefined') {
            inputName.value = state.currentAthlete || '';
        }
    }
}

/**
 * Cierra el modal de sincronización
 */
function closeCloudSyncModal() {
    const modal = document.getElementById('cloudSyncModal');
    if (modal) modal.classList.add('hidden');
}

/**
 * Manejador del formulario de conexión de piloto por PIN
 */
function handleConnectPilotSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    const inputName = document.getElementById('inputSyncPilotName');
    const inputPin = document.getElementById('inputSyncPilotPin');

    const name = inputName ? inputName.value.trim() : '';
    const pin = inputPin ? inputPin.value.trim() : '';

    if (!name) {
        alert('Por favor escribe el nombre del piloto.');
        return;
    }

    connectPilotWithPin(name, pin);
}

// Inicializar automáticamente al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
    initFirebase();
});
