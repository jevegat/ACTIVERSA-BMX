# ACTIVERZA / ACTIVERSA BMX Racing Academy 🚴‍♂️⚡

Plataforma web interactiva (SPA) moderna para la preparación física, biomecánica y entrenamiento estructurado en **BMX Racing**, adaptada para deportistas desde los 3 hasta los 17 años de edad.

Desarrollada sobre la base técnica oficial de los microciclos de entrenamiento:
* **Semana 1**: Fundamentos, Fuerza Base y Adaptación Anatómica.
* **Semana 2**: Potencia Dirigida, Reacción Acústica y Transferencia a Pista.

---

## 🌟 Funcionalidades Principales

### 1. ⏱️ WOD Tracker & Seguimiento Guiado de la Sesión
* **Cronómetro Interválico Modal**: Flujo guiado paso a paso para ejecutar la sesión completa (60 minutos) con control de intervalos de trabajo y descanso.
* **Triple Display de Tiempos**:
  - Tiempo restante del ejercicio o intervalo actual con fases dinámicas (`TRABAJO`, `DESCANSO COMPLETO`, `TRANSICIÓN`).
  - Tiempo restante del bloque en curso (*Calentamiento, Pliometría, Fuerza con Tempos, Cardio HIIT, Estiramiento, Recuperación*).
  - Tiempo total restante de la sesión de 60 minutos con barra porcentual de avance.
* **Anticipación del Siguiente Ejercicio**: Muestra en tiempo real qué ejercicio o serie continúa, objetivo muscular y claves biomecánicas para que el atleta anticipe la postura.
* **Video Embebido Sincronizado**: Reproduce el video tutorial del ejercicio activo y adelanta el del próximo ejercicio durante las pausas de descanso.
* **Controles Interactivos**: Pausar / Reanudar, retroceder, adelantar serie y botón de avanzar rápido si se completan las repeticiones antes de tiempo.
* **Beeps de Partidor UCI**: Señales acústicas en los 3 segundos finales con bocina de salida mediante Web Audio API.

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
│   ├── data.js          # Base de datos de rutinas, ejercicios, videos y nutrición
│   ├── timer.js         # Síntesis de sonido Web Audio API y temporizador WOD
│   ├── calendar.js      # Planificador de fechas y calendario de seguimiento
│   ├── workout.js       # Motor del WOD Tracker, tiempos guiados y control de sesión
│   └── app.js           # Controlador principal, estado, perfiles y modales
├── images/              # Galería de 7 fotos de acción y técnica BMX Racing (selección dinámica)
│   ├── bmx1.png ... bmx3.png
│   └── bmx-proconcept.png ... bmx-proconcept4.png
├── hero_bmx.jpg         # Imagen complementaria BMX Racing
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
