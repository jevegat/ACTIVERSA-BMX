# Memoria y Reglas del Proyecto: ACTIVERZA / ACTIVERSA BMX Racing Academy

## 1. Contexto General
Plataforma web interactiva (SPA en Vanilla JavaScript ES6+, HTML5 y Tailwind CSS) diseñada para la preparación física, biomecánica, nutrición y seguimiento de entrenamientos de **BMX Racing** (Metodología Semilleros y fotografía de `@bmxproconcept`).
- **Idioma**: Todo el contenido de la interfaz, comentarios de código, textos técnicos y respuestas al usuario deben mantenerse en **español**.
- **Entorno**: Aplicación estática lista para ejecutarse directamente en navegador o desplegarse en **GitHub Pages** sin requerir pasos de compilación (no bundler).

## 2. Arquitectura de Archivos
- `index.html`: Maquetación principal de la SPA, modales (WOD Tracker, Perfiles, Sincronización Firebase, Edición de Sesiones en Calendario) y carga de scripts con cache-busting (`?v=6.2.0`).
- `css/styles.css`: Estilos personalizados, animaciones y soporte visual (modo oscuro/claro).
- `js/data.js`: Base de datos maestra (`TRAINING_DB`) con los microciclos semanales, ejercicios, videos embebidos de YouTube, claves biomecánicas y guías de nutrición.
- `js/app.js`: Controlador principal. Gestiona el estado global (`state`), perfiles de deportistas (incluyendo foto comprimida en Canvas y PIN de 4 dígitos), carrusel hero de fotos (`HERO_BMX_GALLERY`), checklist de ejercicios, rachas (*streak*), exportación/importación JSON y modales.
- `js/workout.js`: Motor del **Guided WOD Tracker**. Construye la secuencia lineal de pasos (`buildWorkoutPlan`) garantizando los tiempos por bloque, series dinámicas con descansos intercalados, reproducción de videos sincronizados y marcado automático de sesión completada.
- `js/timer.js`: Cronómetro de pista e intervalos (`rest60`, `interval20_20`, `interval15_30`, `tabata30_15`, `emom8`, `lactic40_20`) y síntesis de sonido de partidor UCI BMX mediante **Web Audio API** (`playGateBeeps`).
- `js/calendar.js`: Planificador dinámico de microciclos (soporta hasta 4 días de entrenamiento por semana), registro de sesiones finalizadas con fecha/hora exacta, edición manual y soporte de múltiples repeticiones por sesión.
- `js/firebase.js`: Integración con Google Firebase (`projectId: "activersa-bmx"`), Cloud Firestore con persistencia offline-first (`IndexedDB`) para uso en pista sin internet, y sincronización en tiempo real (`onSnapshot`) multidispositivo mediante **Nombre de Piloto + PIN de 4 dígitos**.

## 3. Estructura de `TRAINING_DB` (`js/data.js`)
Cada semana en `TRAINING_DB[week]` contiene:
- `name`: Nombre y enfoque del microciclo semanal.
  - **Semana 1 a 3**: Microciclos de **3 días** semanales (`days["1"]` a `days["3"]`).
  - **Semana 4 a Semana 6**: Microciclos de **4 días** semanales (`days["1"]` a `days["4"]`).
  - *(Nota: En la raíz del proyecto se encuentran los PDFs fuente `Rutina Semillero 01..06 ACTIVERZA.pdf`).*
- `dailyTips`: Consejos diarios por día.
- `days[day]`:
  - `focus`, `duration`, `structure`, `nutrition` (`energy`, `protein`, `hydration`, `snacks`).
  - `ageGroups`: Dividido siempre en 4 categorías:
    - `sub6`: Semillero Inicial (3 a 6 años) - Enfoque multimotor y lúdico.
    - `7to12`: Desarrollo (7 a 12 años) - Coordinación, técnica y velocidad.
    - `13to17`: Juvenil / Competitivo (13 a 17 años) - Potencia, rigor biomecánico y tolerancia láctica.
    - `18plus`: Cruiser / Padres (18+ años) - Movilidad, salud articular, fuerza funcional y potencia en pista.
  - Bloques por categoría de edad:
    1. `warmup` (Bloque 1: Calentamiento dinámico - objetivo 10 min).
    2. `plyo` (Bloque 2A: Pliometría y potencia reactiva - series con 60s de descanso PCr).
    3. `strength` (Bloque 2B: Fuerza base con control de tempo excéntrico).
    4. `cardio` (Bloque 2C: Cardio de pista HIIT / Tabata / EMOM / Sprints).
    5. `stretch` (Bloque 3: Estiramiento estático y movilidad post-entreno - 8 min).
    6. `recovery` (Bloque 4: Recuperación parasimpática, respiración 4-4-6 e imaginería - 4 min).

## 4. Reglas y Convenciones al Modificar el Proyecto
1. **Preservar Historial y Perfiles**: Cualquier cambio en `state`, `localStorage` (`activerza_bmx_state_v1`) o sincronización con Firestore debe ser retrocompatible con los perfiles existentes y los respaldos `.json` de los atletas.
2. **Integración de Nuevas Semanas / Rutinas PDF**:
   - Al agregar una nueva semana desde un PDF (`Rutina Semillero XX ACTIVERZA.pdf`), incluir las 4 categorías (`sub6`, `7to12`, `13to17`, `18plus`) con todos sus bloques completos, descripciones biomecánicas y enlaces de video embebidos (`https://www.youtube.com/embed/...`) verificados y funcionales.
   - Actualizar los selectores de semana en `index.html`, la lógica de días en `js/app.js` y el planificador en `js/calendar.js`.
3. **Cache-Busting**: Cuando se modifiquen archivos JS o CSS para producción, actualizar el parámetro de versión `?v=X.Y.Z` en `index.html` para evitar problemas de caché en navegadores móviles.
4. **Offline-First**: Ninguna funcionalidad de entrenamiento, cronómetro o guardado local debe bloquearse si falla la conexión a internet o la autenticación de Firebase.

