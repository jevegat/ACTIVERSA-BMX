# Memoria y Reglas del Proyecto: ACTIVERZA / ACTIVERSA BMX Racing Academy

## 1. Contexto General
Plataforma web interactiva (SPA en Vanilla JavaScript ES6+, HTML5 y Tailwind CSS) diseñada para la preparación física, biomecánica, nutrición y seguimiento de entrenamientos de **BMX Racing** (Metodología Semilleros y fotografía de `@bmxproconcept`).
- **Idioma**: Todo el contenido de la interfaz, comentarios de código, textos técnicos y respuestas al usuario deben mantenerse en **español**.
- **Entorno**: Aplicación estática lista para ejecutarse directamente en navegador o desplegarse en **GitHub Pages** sin requerir pasos de compilación (no bundler).

## 2. Arquitectura de Archivos
- `index.html`: Maquetación principal de la SPA, selector desplegable de semanas (`#selectWeek`), menú desplegable extensible de **Herramientas** (hover en escritorio / toque en móvil), modales (WOD Tracker, Perfiles, Sincronización Firebase, Edición de Sesiones en Calendario) y carga de scripts con cache-busting (`?v=6.3.0`).
- `css/styles.css`: Estilos personalizados, animaciones, semáforo UCI (`.gate-semaforo`, `.gate-luz`) y soporte visual (modo oscuro/claro).
- `js/data.js`: Base de datos maestra (`TRAINING_DB`) con los microciclos semanales, metadatos por grupo (`ageGroupMeta`), ejercicios, videos embebidos de YouTube, claves biomecánicas y guías/dietas de nutrición.
- `js/app.js`: Controlador principal. Gestiona el estado global (`state`), registro extensible de herramientas (`TOOLS_MENU_ITEMS`), perfiles de deportistas (incluyendo foto comprimida en Canvas y PIN de 4 dígitos), carrusel hero de fotos (`HERO_BMX_GALLERY`), checklist de ejercicios, rachas (*streak*), exportación/importación JSON, tablas de Dieta Estricta y modales.
- `js/workout.js`: Motor del **Guided WOD Tracker**. Construye la secuencia lineal de pasos (`buildWorkoutPlan`) garantizando los tiempos por bloque, seguimiento en vivo segundo a segundo del **Tempo `[Bajada - Pausa - Subida - Pausa]`** por cada repetición (`buildStrengthTempoMeta`, con transición automática de 10s en ejercicios por pierna/lado), series dinámicas con descansos intercalados, *Roll Recovery*, reproducción de videos sincronizados y celebración de cierre de ciclo (Día 4).
- `js/timer.js`: Cronómetro de pista e intervalos (`rest60`, `interval20_20`, `interval15_30`, `tabata30_15`, `emom8`, `lactic40_20`) y síntesis de sonido de partidor UCI BMX mediante **Web Audio API** (`playGateBeeps`).
- `js/gate.js`: Módulo integrado **BMX Gate Start Pro Practice** (creado por Eduardo Vega). Simulador oficial de partidor UCI con voces reales embebidas (*"OK riders, random start"* / *"Riders ready, watch the gate"*), semáforo de 4 luces, beeps de 632 Hz, medición de reacción en milisegundos (`ms`) en luz Roja o 1ra Amarilla, historial persistente por piloto activo e importación/exportación JSON.
- `js/calendar.js`: Planificador dinámico de microciclos (soporta hasta 4 días de entrenamiento por semana y manejo específico de `8to13_adv`), registro de sesiones finalizadas con fecha/hora exacta, edición manual y soporte de múltiples repeticiones por sesión.
- `js/firebase.js`: Integración con Google Firebase (`projectId: "activersa-bmx"`), Cloud Firestore con persistencia offline-first (`IndexedDB`) para uso en pista sin internet, y sincronización en tiempo real (`onSnapshot`) multidispositivo mediante **Nombre de Piloto + PIN de 4 dígitos**.

## 3. Estructura de `TRAINING_DB` (`js/data.js`)
Cada semana en `TRAINING_DB[week]` contiene:
- `name`: Nombre y enfoque del microciclo semanal.
  - **Semana 1 a 3**: Microciclos de **3 días** semanales (`days["1"]` a `days["3"]`), con excepción de `8to13_adv` que tiene **4 días** en **Semana 1** (`days["1"]` a `days["4"]`).
  - **Semana 4 a Semana 6**: Microciclos de **4 días** semanales (`days["1"]` a `days["4"]`) para las categorías generales (y aviso de *"Próximamente"* para `8to13_adv`).
  - *(Nota: En la raíz del proyecto se encuentran los PDFs fuente `Rutina Semillero 01..06 ACTIVERZA.pdf` y `Rutina Especifica 8-13 Años Semana 01 ACTIVERZA.pdf`).*
- `ageGroupMeta` *(opcional)*: Metadatos específicos por grupo (`introBanner`, `dailyCapsule`, `closingMessage`).
- `dailyTips`: Consejos diarios por día.
- `days[day]`:
  - `focus`, `duration`, `structure`, `nutrition` (`energy`, `protein`, `hydration`, `snacks`).
  - `ageGroups`: Dividido en 4 categorías generales + 1 plan específico:
    - `sub6`: Semillero Inicial (3 a 6 años) - Enfoque multimotor y lúdico.
    - `7to12`: Desarrollo (7 a 12 años) - Coordinación, técnica y velocidad.
    - `8to13_adv`: 8-13 Avanzado (Plan Específico Semana 1 de 4 días) - Calistenia pediátrica, Cápsula Diaria de Reflejos y Partidor, Cardio en Rodillo (`workSec`/`restSec`/`rounds`) + *Roll Recovery* (`durationSec`) y Dieta Estricta de 5 comidas (`strictDiet`).
    - `13to17`: Juvenil / Competitivo (13 a 17 años) - Potencia, rigor biomecánico y tolerancia láctica.
    - `18plus`: Cruiser / Padres (18+ años) - Movilidad, salud articular, fuerza funcional y potencia en pista.
  - Bloques por categoría de edad:
    1. `warmup` (Bloque 1: Calentamiento dinámico - objetivo 10 min).
    2. `plyo` (Bloque 2A: Pliometría y potencia reactiva - series con 60s de descanso PCr).
    3. `strength` (Bloque 2B: Fuerza base con control de tempo excéntrico `[Bajada - Pausa - Subida - Pausa]`).
    4. `cardio` (Bloque 2C: Cardio de pista HIIT / Tabata / EMOM / Sprints o intervalos en rodillo).
    5. `stretch` (Bloque 3: Estiramiento estático y movilidad post-entreno - 8 min).
    6. `recovery` (Bloque 4: Recuperación parasimpática 4-4-6 o *Roll Recovery* en rodillo).

## 4. Reglas y Convenciones al Modificar el Proyecto
1. **Preservar Historial y Perfiles**: Cualquier cambio en `state`, `localStorage` (`activerza_bmx_state_v1`, `activerza_bmx_gate_history_v1`) o sincronización con Firestore debe ser retrocompatible con los perfiles existentes y los respaldos `.json` de los atletas.
2. **Integración de Nuevas Semanas / Rutinas PDF**:
   - Al agregar una nueva semana desde un PDF (`Rutina Semillero XX ACTIVERZA.pdf`), incluir las categorías correspondientes con todos sus bloques completos, descripciones biomecánicas y enlaces de video embebidos (`https://www.youtube.com/embed/...`) verificados y funcionales.
   - Actualizar el selector desplegable `#selectWeek` en `index.html`, la lógica de días en `js/app.js` y el planificador en `js/calendar.js`.
3. **Extensibilidad de Herramientas**: Para agregar nuevas herramientas al menú desplegable **Herramientas**, registrar el ítem en `TOOLS_MENU_ITEMS` (`js/app.js`) y añadir su sub-vista dentro de `#viewTimer` (`index.html`).
4. **Sin Enlaces Externos de Terceros No Autorizados**: No incluir menciones ni enlaces a `@pipearenas.fit`.
5. **Cache-Busting**: Cuando se modifiquen archivos JS o CSS para producción, actualizar el parámetro de versión `?v=X.Y.Z` en `index.html` para evitar problemas de caché en navegadores móviles.
6. **Offline-First**: Ninguna funcionalidad de entrenamiento, cronómetro, partidor o guardado local debe bloquearse si falla la conexión a internet o la autenticación de Firebase.

