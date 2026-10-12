# ACTIVERZA / ACTIVERSA BMX Racing Academy 🚴‍♂️⚡

Plataforma web interactiva (SPA) moderna para la preparación física, biomecánica y entrenamiento estructurado en **BMX Racing**, adaptada para deportistas desde los 3 hasta los 17 años de edad.

Desarrollada sobre la base técnica oficial de los microciclos de entrenamiento:
* **Semana 1**: Fundamentos, Fuerza Base y Adaptación Anatómica.
* **Semana 2**: Potencia Dirigida, Reacción Acústica y Transferencia a Pista.

---

## 🌟 Funcionalidades Principales

### 1. ⏱️ WOD Tracker & Seguimiento Guiado de la Sesión
* **Cronómetro Interválico Modal con Duración Total Calculada**: Flujo guiado paso a paso para ejecutar la sesión completa con control exacto de intervalos de trabajo y descanso.
* **Indicaciones Completas por Bloque y Series Repetidas**:
  - **Calentamiento Dinámico de 10 Minutos Garantizado**: Los circuitos de ejercicios (ej. 3 ejercicios de 45s x 15s) se repiten automáticamente por lo menos 3 series hasta completar los 10 minutos previstos con descanso/preparación antes de Pliometría.
  - **Estructura Fisiológica Completa**: Bloque 2A Pliometría (3 series c/60s descanso PCr), Bloque 2B Fuerza Base (3 series con tempos excéntricos), Bloque 2C Cardio Pista (intervalos HIIT/Tabata), Bloque 3 Estiramiento (8 minutos con 2 series de elongación estática) y Bloque 4 Recuperación Parasimpática (4 minutos de respiración SNC e imaginería).
  - **Resumen Estructural de Sesión**: Cálculo dinámico de la duración total (ej. 50 a 58 min) con tarjeta visual de desglose de minutos y series en la cabecera de la rutina y en el hero principal.
* **Triple Display de Tiempos en Pantalla**:
  - Tiempo restante del ejercicio o intervalo actual con fases dinámicas (`TRABAJO`, `DESCANSO COMPLETO`, `TRANSICIÓN`).
  - Tiempo restante del bloque en curso (*Calentamiento, Pliometría, Fuerza con Tempos, Cardio HIIT, Estiramiento, Recuperación*).
  - Tiempo total restante de la sesión con barra porcentual de avance.
* **Anticipación del Siguiente Ejercicio**: Muestra en tiempo real qué ejercicio o serie continúa, objetivo muscular y claves biomecánicas para que el atleta anticipe la postura.
* **Video Embebido Sincronizado**: Reproduce el video tutorial del ejercicio activo y adelanta el del próximo ejercicio durante las pausas de descanso.
* **Controles Interactivos**: Pausar / Reanudar, retroceder, adelantar serie y botón de avanzar rápido si se completan las repeticiones antes de tiempo.
* **Beeps de Partidor UCI**: Señales acústicas en los 3 segundos finales con bocina de salida mediante Web Audio API.

### 2. ⏱️ Cronómetro de Pista y Descansos Avanzado
* **Control Total de Reproducción**: Todos los cronómetros y protocolos (Descanso Pliometría 60s, Intervalos 20/20, Protocolo 15/30, Tabata 30/15, EMOM 8 min y Umbral Láctico 40/20) permiten:
  - **Pausar / Iniciar / Reanudar** en cualquier instante.
  - **Adelantar** de forma inmediata a la siguiente fase o ronda (`⏭️ Ronda Sig`) o sumar tiempo (+15s).
  - **Atrasar** a la fase o ronda anterior (`⏮️ Ronda Ant`) o restar tiempo (-15s).
  - **Reiniciar** el protocolo desde la primera ronda.
* **Displays y Progresión**: Barra de avance porcentual de la fase y cálculo dinámico en tiempo real del tiempo total restante del protocolo completo.

### 2. 📸 Carrusel Interactivo de Fotos de Acción BMX & ProconceptBMX
* **Rotación y Selección Aleatoria**: Cada vez que el usuario carga o recarga el sitio, se selecciona una foto de acción distinta sin repetir la sesión anterior.
* **Navegación Completa**: Botones para adelantar (>) y atrasar (<) fotos, navegación rápida con dots indicadores y soporte táctil para deslizamiento (swipe) en dispositivos móviles.
* **Fotografía Oficial ProconceptBMX**: Enlace directo y destacado en el carrusel al perfil oficial de Instagram de [**@bmxproconcept**](https://www.instagram.com/bmxproconcept/).

### 2. 🎥 Videoteca Técnica Biomecánica Verificada
* 45 ejercicios auditados con videos demostrativos embebidos al 100% (sin caídas ni errores de disponibilidad).
* Claves biomecánicas para la rigidez articular (*stiffness*), control excéntrico y transferencia al primer pedalazo en el partidor (*gate start*).
* Reconocimiento y enlace oficial a la preparación física y asesoría técnica de [@pipearenas.fit](https://www.instagram.com/pipearenas.fit/).

### 3. 👤 Perfiles de Deportistas, Fotos y Gamificación
* Gestión multiatleta: creación de perfiles, alternancia y eliminación segura.
* **Carga de Foto del Deportista**: Carga de imágenes con auto-escalado y compresión vía HTML5 Canvas (máx. 256x256 px) persistida en `LocalStorage`.
* Visualización de foto en el avatar superior, en el modal y en las píldoras de cambio de atleta.
* Checklist de ejercicios con guardado automático, cálculo de racha (*streak*) y celebración con confeti al completar sesiones.
* Respaldo y restauración completa de datos en formato JSON.

### 4. 📅 Planificador Flexible de Microciclos & Calendario
* Selección de fecha de inicio y de los 3 días de entrenamiento semanales (ej. Lun-Mié-Vie o Mar-Jue-Sáb).
* Cálculo dinámico de fechas exactas y vinculación directa a cada día del plan.
* **Marcado automático de sesiones finalizadas**: Al culminar un entrenamiento en el WOD Tracker, la fecha del calendario se marca automáticamente como `[✓ Finalizada]`.

### 6. ☁️ Sincronización en la Nube con Google Firebase & Cloud Firestore
* **Persistencia Offline-First en Pista**: Implementa IndexedDB local en el navegador para registrar y cronometrar entrenamientos en la pista de BMX aun sin señal de internet o WiFi; el SDK de Firestore sincroniza automáticamente en segundo plano al recuperar conectividad.
* **Sincronización Multi-Dispositivo**: Padres, deportistas y entrenadores pueden sincronizar el progreso entre teléfonos móviles, tablets y computadores sin perder el estado.
* **Panel de Conexión Amigable**: Botón de estado en la barra superior (🟢 Nube Sincronizada / 🟡 Guardando / ⚪ Modo Local) con modal para conectar fácilmente credenciales de Firebase (`firebaseConfig`), forzar subida/bajada manual y cambiar entre modo nube y local en un clic.

### 5. 🥗 Nutrición Pediátrica & Calculadora de Hidratación
* Cálculo personalizado del volumen de hidratación antes, durante y después del esfuerzo según el peso corporal del deportista.
* Fichas clínicas sobre mielinización, recarga de glucógeno y recuperación muscular sin suplementación artificial.

---

## 🚀 Estructura del Proyecto

Arquitectura modular en Vanilla JavaScript (ES6+), HTML5 semántico y CSS3 con Tailwind CSS:

```
├── index.html           # Estructura principal y maquetación de la SPA
├── css/
│   └── styles.css       # Estilos globales, modo oscuro/claro y animaciones
├── js/
│   ├── firebase.js      # Integración con Google Firebase Firestore, Auth y Offline Sync
│   ├── data.js          # Base de datos de rutinas, ejercicios, videos y nutrición
│   ├── timer.js         # Síntesis de sonido Web Audio API y temporizador WOD
│   ├── calendar.js      # Planificador de fechas y calendario de seguimiento
│   ├── workout.js       # Motor del WOD Tracker, tiempos guiados y control de sesión
│   └── app.js           # Controlador principal, estado, perfiles y modales
├── images/              # Galería de 7 fotos de acción y técnica BMX Racing (selección dinámica)
│   ├── bmx1.png ... bmx3.png
│   └── bmx-proconcept.png ... bmx-proconcept4.png
├── package.json         # Configuración del paquete
└── .gitignore           # Exclusiones de Git
```

---

## 💻 Despliegue y Uso Local

1. **Uso Local Inmediato**:
   - Abre directamente `index.html` en cualquier navegador web moderno (Chrome, Edge, Firefox, Brave, Safari).
   - O inicia un servidor estático local:
     ```bash
     python -m http.server 3000
     ```
     y navega a `http://localhost:3000/index.html`.

2. **Despliegue en GitHub Pages**:
   - Este repositorio está listo para funcionar en **GitHub Pages**.
   - En GitHub: ve a **Settings** > **Pages** > en *Branch* selecciona `main` y carpeta `/ (root)` > **Save**.

---

## 🚴‍♂️ Metodología & Créditos
* Metodología de entrenamiento deportivo adaptado para Semilleros de BMX Racing.
* Preparación física y técnica orientada por [@pipearenas.fit](https://www.instagram.com/pipearenas.fit/).
* Plataforma desarrollada para BMX Racing • *Unleash Your Power*.
