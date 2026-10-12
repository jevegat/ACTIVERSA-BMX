/**
 * ACTIVERZA BMX RACING ACADEMY
 * Módulo de Persistencia en la Nube con Google Firebase & Cloud Firestore
 * Soporte Offline Nativo (IndexedDB), Sincronización en Tiempo Real y Autenticación
 */

let firebaseApp = null;
let firestoreDb = null;
let firebaseAuth = null;
let firestoreUnsubscribe = null;

/**
 * Obtiene o genera un identificador persistente de la academia para Firestore
 */
function getOrCreateAcademyId() {
    let id = localStorage.getItem('activerza_academy_id');
    if (!id) {
        id = 'bmx_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
        localStorage.setItem('activerza_academy_id', id);
    }
    return id;
}

let cloudState = {
    isConfigured: false,
    isConnected: false,
    isSyncing: false,
    lastSyncTime: null,
    userId: null,
    projectId: null,
    statusText: 'Modo Local (Sin Nube)'
};

/**
 * Inicializa Firebase si existe una configuración guardada
 */
function initFirebase() {
    const savedConfigStr = localStorage.getItem('activerza_firebase_config');
    if (!savedConfigStr) {
        updateCloudStatusUI('local', 'Modo Local');
        return;
    }

    try {
        const config = JSON.parse(savedConfigStr);
        if (!config.apiKey || !config.projectId) {
            updateCloudStatusUI('local', 'Configuración incompleta');
            return;
        }

        // Verificar si Firebase SDK está disponible en el DOM
        if (typeof firebase === 'undefined') {
            console.warn('Firebase SDK no cargado en el navegador.');
            updateCloudStatusUI('error', 'SDK no disponible');
            return;
        }

        // Inicializar o reutilizar app
        if (!firebase.apps.length) {
            firebaseApp = firebase.initializeApp(config);
        } else {
            firebaseApp = firebase.app();
        }

        firestoreDb = firebase.firestore();
        firebaseAuth = firebase.auth();
        cloudState.isConfigured = true;
        cloudState.projectId = config.projectId;

        // Habilitar persistencia offline nativa en IndexedDB para la pista de BMX
        firestoreDb.enablePersistence({ synchronizeTabs: true })
            .then(() => {
                console.log('✅ Firestore: Persistencia offline (IndexedDB) habilitada.');
            })
            .catch(err => {
                if (err.code === 'failed-precondition') {
                    console.warn('Persistencia en múltiples pestañas restringida.');
                } else if (err.code === 'unimplemented') {
                    console.warn('Navegador no soporta persistencia IndexedDB.');
                }
            });

        // Identificador persistente de respaldo si Auth anónima no está activada en la consola
        const fallbackAcademyId = getOrCreateAcademyId();

        // Intentar autenticación con Firebase Auth
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                cloudState.userId = user.uid;
                cloudState.isConnected = true;
                updateCloudStatusUI('connected', 'Nube Sincronizada');
                setupFirestoreListener(user.uid);
            } else {
                firebaseAuth.signInAnonymously()
                    .then(cred => {
                        cloudState.userId = cred.user.uid;
                        cloudState.isConnected = true;
                        updateCloudStatusUI('connected', 'Nube Sincronizada');
                        setupFirestoreListener(cred.user.uid);
                    })
                    .catch(err => {
                        console.warn('Aviso: Proveedor anónimo deshabilitado en Firebase Console. Conectando a Firestore directamente con ID de academia:', err.code);
                        // Fallback transparente: permitimos que Firestore funcione directamente
                        cloudState.userId = fallbackAcademyId;
                        cloudState.isConnected = true;
                        updateCloudStatusUI('connected', 'Nube Sincronizada');
                        setupFirestoreListener(fallbackAcademyId);
                    });
            }
        });

    } catch (e) {
        console.error('Error inicializando Firebase:', e);
        updateCloudStatusUI('error', 'Error de configuración');
    }
}

/**
 * Escucha cambios en tiempo real desde Firestore
 */
function setupFirestoreListener(userId) {
    if (!firestoreDb || !userId) return;

    if (firestoreUnsubscribe) {
        firestoreUnsubscribe();
    }

    const docRef = firestoreDb.collection('academies').doc(userId);

    firestoreUnsubscribe = docRef.onSnapshot(doc => {
        if (doc.exists) {
            const remoteData = doc.data();
            if (remoteData && remoteData.state && remoteData.updatedAt) {
                const localUpdated = parseInt(localStorage.getItem('activerza_last_local_write') || '0', 10);
                
                // Si la versión de la nube es más reciente o no hay conflicto, actualizamos el estado local
                if (remoteData.updatedAt > localUpdated) {
                    console.log('☁️ Actualización recibida desde Firestore:', remoteData);
                    applyRemoteState(remoteData.state);
                    cloudState.lastSyncTime = new Date(remoteData.updatedAt).toLocaleTimeString('es-ES');
                    updateCloudStatusUI('connected', 'Sincronizado');
                }
            }
        }
    }, err => {
        console.warn('Aviso en listener de Firestore (posible falta de reglas públicas):', err);
        updateCloudStatusUI('syncing', 'Modo Offline Pista');
    });
}

/**
 * Aplica el estado descargado de la nube al estado de la aplicación
 */
function applyRemoteState(remoteState) {
    if (!remoteState || typeof remoteState !== 'object') return;

    if (typeof state !== 'undefined') {
        state = {
            ...state,
            ...remoteState,
            athletes: { ...state.athletes, ...(remoteState.athletes || {}) },
            progress: { ...state.progress, ...(remoteState.progress || {}) },
            history: { ...state.history, ...(remoteState.history || {}) },
            calendar: { ...state.calendar, ...(remoteState.calendar || {}) }
        };

        // Guardar copia local sin disparar bucle
        localStorage.setItem('activerza_state_v1', JSON.stringify(state));

        // Re-renderizar vistas activas
        if (typeof updateNavAthleteInfo === 'function') updateNavAthleteInfo();
        if (typeof renderAthletesList === 'function') renderAthletesList();
        if (typeof renderActiveView === 'function') renderActiveView();
        if (typeof renderCalendarSchedule === 'function') renderCalendarSchedule();
    }
}

/**
 * Guarda el estado actual de la aplicación en Cloud Firestore
 */
function syncStateToFirestore(currentState) {
    if (!cloudState.isConfigured || !firestoreDb || !cloudState.userId) {
        return Promise.resolve(false);
    }

    cloudState.isSyncing = true;
    updateCloudStatusUI('syncing', 'Guardando...');

    const now = Date.now();
    localStorage.setItem('activerza_last_local_write', now.toString());

    // Sanitizar estado para Firestore (remover valores undefined)
    const cleanState = JSON.parse(JSON.stringify(currentState));

    const payload = {
        state: cleanState,
        updatedAt: now,
        clientTime: new Date().toISOString(),
        platform: 'ACTIVERSA-BMX Web'
    };

    return firestoreDb.collection('academies').doc(cloudState.userId).set(payload, { merge: true })
        .then(() => {
            cloudState.isSyncing = false;
            cloudState.lastSyncTime = new Date().toLocaleTimeString('es-ES');
            updateCloudStatusUI('connected', 'Sincronizado');
            return true;
        })
        .catch(err => {
            console.error('Error guardando en Firestore:', err);
            cloudState.isSyncing = false;
            updateCloudStatusUI('connected', 'Pendiente (Offline)');
            return false;
        });
}

/**
 * Guarda y aplica una nueva configuración de Firebase introducida por el usuario
 */
function saveFirebaseConfig(configObj) {
    try {
        if (!configObj || !configObj.apiKey || !configObj.projectId) {
            throw new Error('Configuración inválida. Debe incluir al menos apiKey y projectId.');
        }

        localStorage.setItem('activerza_firebase_config', JSON.stringify(configObj));

        // Reinicializar
        if (firestoreUnsubscribe) firestoreUnsubscribe();
        if (firebaseApp) {
            firebase.apps.forEach(app => app.delete());
        }

        initFirebase();
        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
}

/**
 * Elimina la configuración de Firebase y vuelve a modo local
 */
function disconnectFirebase() {
    if (confirm('¿Deseas desconectar Firebase? Tus datos locales se conservarán en este dispositivo.')) {
        if (firestoreUnsubscribe) firestoreUnsubscribe();
        localStorage.removeItem('activerza_firebase_config');
        cloudState.isConfigured = false;
        cloudState.isConnected = false;
        cloudState.userId = null;
        cloudState.projectId = null;
        updateCloudStatusUI('local', 'Modo Local');
        closeCloudSyncModal();
        alert('Se ha desconectado Firebase. La aplicación ahora está en Modo Local.');
    }
}

/**
 * Fuerza una sincronización manual del estado local a Firestore
 */
function forcePushToCloud() {
    if (!cloudState.isConfigured || !cloudState.isConnected) {
        alert('Debes conectar tu proyecto de Firebase primero.');
        return;
    }

    if (typeof state !== 'undefined') {
        const btn = document.getElementById('btnForcePushCloud');
        if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Subiendo...';

        syncStateToFirestore(state).then(ok => {
            if (btn) btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up mr-1"></i> Subir a la Nube';
            if (ok) {
                alert('¡Datos subidos exitosamente a Cloud Firestore!');
            } else {
                alert('Se encolaron los datos localmente. Se sincronizarán en cuanto haya señal.');
            }
        });
    }
}

/**
 * Fuerza una descarga manual del estado desde Firestore
 */
function forcePullFromCloud() {
    if (!cloudState.isConfigured || !cloudState.userId || !firestoreDb) {
        alert('Debes conectar tu proyecto de Firebase primero.');
        return;
    }

    const btn = document.getElementById('btnForcePullCloud');
    if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Descargando...';

    firestoreDb.collection('academies').doc(cloudState.userId).get()
        .then(doc => {
            if (btn) btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down mr-1"></i> Descargar de la Nube';
            if (doc.exists && doc.data() && doc.data().state) {
                applyRemoteState(doc.data().state);
                alert('¡Datos descargados y sincronizados desde la nube!');
            } else {
                alert('Aún no hay datos guardados en la nube para esta cuenta.');
            }
        })
        .catch(err => {
            if (btn) btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down mr-1"></i> Descargar de la Nube';
            alert('Error descargando de la nube: ' + err.message);
        });
}

/**
 * Actualiza los elementos visuales de estado de nube en la UI
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
            dot.className = "w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse";
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
    if (modalProject) modalProject.textContent = cloudState.projectId || 'Ninguno (Modo Local)';
    if (modalSyncTime) modalSyncTime.textContent = cloudState.lastSyncTime || 'No sincronizado aún';
}

/**
 * Abre el modal de configuración y sincronización de Firebase
 */
function openCloudSyncModal() {
    const modal = document.getElementById('cloudSyncModal');
    if (modal) {
        modal.classList.remove('hidden');
        
        // Cargar configuración existente en el textarea si existe
        const saved = localStorage.getItem('activerza_firebase_config');
        const input = document.getElementById('inputFirebaseConfigText');
        if (input && saved) {
            try {
                input.value = JSON.stringify(JSON.parse(saved), null, 2);
            } catch (e) {
                input.value = saved;
            }
        }
        updateCloudStatusUI(cloudState.isConnected ? 'connected' : 'local', cloudState.isConnected ? 'Conectado a Firebase' : 'Modo Local');
    }
}

/**
 * Cierra el modal de configuración de Firebase
 */
function closeCloudSyncModal() {
    const modal = document.getElementById('cloudSyncModal');
    if (modal) modal.classList.add('hidden');
}

/**
 * Maneja el envío del formulario de configuración de Firebase
 */
function handleSaveFirebaseConfigSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    const input = document.getElementById('inputFirebaseConfigText');
    if (!input || !input.value.trim()) {
        alert('Por favor pega el objeto de configuración de Firebase.');
        return;
    }

    let parsedConfig = null;
    const raw = input.value.trim();

    try {
        // Intentar parsear como JSON
        parsedConfig = JSON.parse(raw);
    } catch (err) {
        try {
            // Intentar extraer si el usuario pegó el código JS completo: const firebaseConfig = { ... };
            const match = raw.match(/\{[\s\S]*\}/);
            if (match) {
                // Convertir propiedades JS a formato JSON seguro
                const jsonLike = match[0]
                    .replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":')
                    .replace(/'/g, '"')
                    .replace(/,\s*\}/g, '}');
                parsedConfig = JSON.parse(jsonLike);
            }
        } catch (err2) {
            alert('No se pudo interpretar el formato. Asegúrate de pegar el objeto { apiKey: "...", projectId: "..." }');
            return;
        }
    }

    if (!parsedConfig || !parsedConfig.apiKey || !parsedConfig.projectId) {
        alert('La configuración debe contener al menos "apiKey" y "projectId".');
        return;
    }

    const res = saveFirebaseConfig(parsedConfig);
    if (res.success) {
        alert('¡Configuración de Firebase guardada exitosamente! Conectando a la nube...');
        closeCloudSyncModal();
    } else {
        alert('Error: ' + res.error);
    }
}

// Inicializar al cargar el script
document.addEventListener('DOMContentLoaded', () => {
    initFirebase();
});
