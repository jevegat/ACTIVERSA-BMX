/**
 * ACTIVERZA BMX RACING ACADEMY
 * Base de Datos Oficial de Rutinas, Ejercicios, Videos y Nutrición
 * Semanas 1 y 2 • 3 a 17 Años
 */

const TRAINING_DB = {
            "1": { // SEMANA 1
                name: "Semana 1 - Fundamentos, Fuerza Base y Adaptación",
                dailyTips: {
                    "1": [
                        "Supervisión del Tempo: En fuerza (13-17 años), insistir en la bajada lenta (3 segundos) para proteger articulaciones y construir fuerza tendinosa.",
                        "Calzado Adecuado: Utilizar tenis deportivos con buen agarre para evitar resbalones en saltos de agilidad.",
                        "Hidratación en la Habitación: Mantener termo de agua visible todo el día para crear hábito inconsciente de beber agua.",
                        "Higiene del Sueño: Hasta 12 años, asegurar 9 a 11 horas de sueño nocturno; 13 a 17 años, mínimo 8 a 9 horas para liberar hormona de crecimiento."
                    ],
                    "2": [
                        "Ergonomía Escolar: Los deportistas pasan muchas horas sentados, acortando el psoas ilíaco. Un psoas corto impide un bombeo (pump) fluido en la pista.",
                        "Calidad del Descanso (Pantallas): Apagar pantallas 45 min antes de dormir. La luz azul inhibe la melatonina y reduce la recuperación del sistema nervioso.",
                        "Tolerancia a la Frustración: En ejercicios de equilibrio (peso muerto a una pierna), fomentar: 'El equilibrio se construye a través del error, no de la perfección'."
                    ],
                    "3": [
                        "Revisión del Equipo: Revisar presión de llantas, ajustar tornillería del stem (espiga) y tensión de cadena para fomentar disciplina e independencia.",
                        "Prevención del Arm Pump: En juveniles, el agarre al manubrio debe ser firme pero no al 100% todo el tiempo; los brazos deben actuar como suspensiones naturales.",
                        "Descanso Activo el Fin de Semana: Fomentar actividades de recuperación; el cuerpo crece y se hace más rápido durante el descanso."
                    ]
                },
                days: {
                    "1": { // DÍA 1
                        focus: "Fuerza Base, Coordinación Ágil y Potencia Anatómicamente Adaptada",
                        duration: "60 Minutos Máximo",
                        structure: "Calentamiento (10 min) + Bloque Principal (38 min) + Estiramiento (8 min) + Recuperación (4 min)",
                        nutrition: {
                            energy: "Carbohidratos de calidad (avena, arroz integral, papa, plátano y frutas) antes de entrenar. Evitar azúcares refinados y mecatos.",
                            protein: "Huevos, pollo, pescado, yogur griego y legumbres sin suplementación artificial.",
                            hydration: "300-400 ml de agua 1h antes, sorbos cada 15 min con pizca de sal marina y limón, agua y fruta fresca al terminar.",
                            snacks: "Pre (30-45 min): Banana con mantequilla de maní o tostada con miel. Post (primeros 30 min): Vaso de leche o yogur con fruta."
                        },
                        ageGroups: {
                            "sub6": {
                                methodology: "Enfoque Multimotor y Lúdico: Desarrollar equilibrio dinámico, coordinación óculo-pédica y juego sin tiempos estrictos.",
                                warmup: [
                                    { name: "Caminata de Oso / Bear Crawl", duration: "45s (2 rondas)", video: "https://www.youtube.com/embed/Ee1BQNI6zN4", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Activación de hombros, muñecas y core. Mantener rodillas a 5 cm del suelo sin tocarlo.", target: "Hombros y Core" },
                                    { name: "Círculos de Cadera y Brazos", duration: "45s (2 rondas)", video: "https://www.youtube.com/embed/lzR7tzI1JUI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Movilidad articular para hombros y pelvis preparando los giros y saltos.", target: "Movilidad Articular" },
                                    { name: "Trote con Elevación de Rodillas", duration: "45s (2 rondas)", video: "https://www.youtube.com/embed/zDMUQ63YdbE", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Elevación de frecuencia cardíaca y activación del psoas de manera suave.", target: "Cardiovascular" },
                                    { name: "Saltos de Tijera / Jumping Jacks", duration: "45s (2 rondas)", video: "https://www.youtube.com/embed/c4DAnQ6DtF8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Coordinación general de brazos y piernas, aumentando temperatura.", target: "Coordinación" }
                                ],
                                plyo: [
                                    { name: "Juego Salto de la Rana / Frog Jumps", sets: "3 series de 6 saltos", rest: "Descanso 60s", video: "https://www.youtube.com/embed/Brkz-7w8gsY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Colocar marcas en el piso (hojas o juguetes) para saltar de una a otra imitando ranas.", target: "Potencia de Piernas" }
                                ],
                                strength: [
                                    { name: "Sentadillas de Gorila / Gorilla Squats", sets: "3 series de 8 repeticiones", tempo: "Libre lúdico", video: "https://www.youtube.com/embed/2aMn_J6Lip0", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Tocar el piso con las manos entre las piernas y ponerse de pie.", target: "Cuádriceps y Glúteos" },
                                    { name: "Puente de Glúteo / Glute Bridge", sets: "3 series de 8 repeticiones", tempo: "Sostener 2s arriba", video: "https://www.youtube.com/embed/wPM8icPu6H8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Acostados boca arriba, elevar la cadera apretando glúteos y contar hasta 2.", target: "Cadena Posterior" }
                                ],
                                cardio: {
                                    name: "Juego del Semáforo en Casa",
                                    format: "6 minutos continuos interactivos",
                                    video: "https://www.youtube.com/embed/HWCHautmxrU", instagram: "https://www.instagram.com/pipearenas.fit/reels/",
                                    desc: "Verde = Trote rápido en el sitio. Rojo = Estatua congelada. Fomenta atención y aceleración."
                                },
                                stretch: [
                                    { name: "Estiramiento de Cuádriceps de Pie", duration: "20-30s por pierna", video: "https://www.youtube.com/embed/aNXGOpP37CY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Tirar del tobillo hacia el glúteo manteniendo rodillas juntas." },
                                    { name: "Posición del Niño / Child's Pose", duration: "30s", video: "https://www.youtube.com/embed/2MJGg-dUKh0", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Rodillas al piso, brazos extendidos al frente, glúteos a los talones." }
                                ],
                                recovery: {
                                    name: "Respiración Parasimpática (Bajar pulsaciones)",
                                    desc: "Acostarse boca arriba con piernas elevadas en pared o silla. Inhalar 4s inflando abdomen, sostener 4s, exhalar en 6s por 3 minutos."
                                }
                            },
                            "7to12": {
                                methodology: "Ventana de Aprendizaje Motor: Dominio del peso corporal, patrón de salto seguro, agilidad y técnica estricta con motivación.",
                                warmup: [
                                    { name: "Caminata de Oso / Bear Crawl", duration: "45s trabajo x 15s descanso", video: "https://www.youtube.com/embed/Ee1BQNI6zN4", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Activación neuromuscular de tren superior y core manteniendo rodillas a 5 cm del suelo.", target: "Tren Superior y Core" },
                                    { name: "Estocadas Dinámicas con Torsión", duration: "45s trabajo x 15s descanso", video: "https://www.youtube.com/embed/tHE4oh0U0ik", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Movilidad de cadera y estabilización de rodilla al dar el paso al frente.", target: "Cadera y Rodilla" },
                                    { name: "Trote con Rodillas Altas / High Knees", duration: "45s trabajo x 15s descanso", video: "https://www.youtube.com/embed/zDMUQ63YdbE", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Elevación de frecuencia cardíaca y activación del psoas ilíaco.", target: "Activación Psoas" },
                                    { name: "Saltos de Tijera / Jumping Jacks", duration: "45s trabajo x 15s descanso", video: "https://www.youtube.com/embed/c4DAnQ6DtF8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Coordinación general e incremento térmico muscular.", target: "Temperatura y Ritmo" }
                                ],
                                plyo: [
                                    { name: "Saltos Horizontales Continuos / Broad Jumps", sets: "3 series de 6 repeticiones", rest: "Descanso 60s", video: "https://www.youtube.com/embed/7Du1KbwCdUk", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Aterrizar suavemente como un gato flexionando rodillas a 90° sin hacer ruido.", target: "Potencia Horizontal" },
                                    { name: "Escalera de Agilidad Imaginaria - Paso Lateral", sets: "3 series de 20 segundos", rest: "Descanso 60s", video: "https://www.youtube.com/embed/PdSEGR2KuEk", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Paso lateral veloz a máxima frecuencia de pies simulando línea imaginaria.", target: "Frecuencia de Apoyo" }
                                ],
                                strength: [
                                    { name: "Sentadillas / Air Squats", sets: "3 series de 10 a 12 repeticiones", tempo: "Tempo 2-1-1-0 (2s bajada, 1s pausa abajo, 1s subida)", video: "https://www.youtube.com/embed/aclHkVaku9U", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Control estricto en la fase excéntrica con pecho erguido.", target: "Cuádriceps y Glúteos" },
                                    { name: "Flexiones de Pecho Modificadas (Rodillas)", sets: "3 series de 8 a 10 repeticiones", tempo: "Tempo 3-1-1-0 (3s bajando con control)", video: "https://www.youtube.com/embed/jWxvty2KROs", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Fuerza de empuje para controlar el manubrio de la bicicleta.", target: "Pectoral y Tríceps" },
                                    { name: "Supermanes / Superman Holds", sets: "3 series de 10 reps (2s arriba)", tempo: "Isometría 2s", video: "https://www.youtube.com/embed/cc6UVRS7PW4", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Fortalece la zona lumbar y cadena posterior para resistir la posición sobre la bici.", target: "Zona Lumbar" }
                                ],
                                cardio: {
                                    name: "Protocolo 20/20 - Escaladores y Sprints Fijos",
                                    format: "8 rondas (5 min 20 s total) • 20s esfuerzo máximo x 20s descanso",
                                    video: "https://www.youtube.com/embed/kLh-uczlPLg", instagram: "https://www.instagram.com/pipearenas.fit/reels/",
                                    desc: "Rondas 1,3,5,7: Mountain Climbers. Rondas 2,4,6,8: Fast Feet in Place (sprints fijos)."
                                },
                                stretch: [
                                    { name: "Estiramiento de Cuádriceps de Pie", duration: "30s por lado", video: "https://www.youtube.com/embed/aNXGOpP37CY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Talón al glúteo, rodillas alineadas." },
                                    { name: "Estiramiento de Isquiotibiales Sentado", duration: "30s", video: "https://www.youtube.com/embed/aJvfeuu71gw", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Pecho hacia los muslos con la espalda recta." },
                                    { name: "Posición del Niño / Child's Pose", duration: "30s", video: "https://www.youtube.com/embed/2MJGg-dUKh0", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Relaja espalda baja y hombros." },
                                    { name: "Estiramiento de Pectorales en Pared", duration: "30s por lado", video: "https://www.youtube.com/embed/crnw1IKWNZY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Brazo a 90° en la pared y rotar torso hacia afuera." }
                                ],
                                recovery: {
                                    name: "Protocolo Respiración 4-4-6 + Visualización de Partidor",
                                    desc: "Bajar pulsaciones con respiración diafragmática 4-4-6 por 3 minutos. Luego visualizar el llamado oficial: 'Ok riders, random start... watch the gate' y la salida perfecta."
                                }
                            },
                            "13to17": {
                                methodology: "Desarrollo de Potencia y Control Neuromuscular: Tiempos de ejecución y tempos estrictos con transferencia de fuerza al gate start.",
                                warmup: [
                                    { name: "Caminata de Oruga / Inchworms", duration: "45s trabajo x 15s descanso", video: "https://www.youtube.com/embed/7jeW4v_oaes", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Estiramiento dinámico isquiotibial y transición a plancha abdominal.", target: "Isquiotibiales y Core" },
                                    { name: "Estocadas Dinámicas con Torsión", duration: "45s trabajo x 15s descanso", video: "https://www.youtube.com/embed/tHE4oh0U0ik", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Movilidad de cadera y activación de glúteo medio.", target: "Glúteos y Caderas" },
                                    { name: "High Knees con Aceleración", duration: "45s trabajo x 15s descanso", video: "https://www.youtube.com/embed/zDMUQ63YdbE", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Activación profunda del sistema nervioso central.", target: "Sistema Nervioso" }
                                ],
                                plyo: [
                                    { name: "Saltos al Cajón o Escalón / Box Jumps", sets: "4 series de 6 repeticiones", rest: "Descanso 60s", video: "https://www.youtube.com/embed/hxldG9FX4j4", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Máxima altura, extensión total de cadera en el aire y aterrizaje suave con rodillas flexionadas.", target: "Potencia Vertical" },
                                    { name: "Desplazamientos Laterales en 'Z' / Z-Pattern", sets: "4 series de 15 segundos", rest: "Descanso 60s", video: "https://www.youtube.com/embed/PdSEGR2KuEk", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "3 cambios de dirección explosivos simulando entrada a peraltes.", target: "Agilidad y Frenado" }
                                ],
                                strength: [
                                    { name: "Sentadilla Búlgara / Bulgarian Split Squat", sets: "3 series de 10 por pierna", tempo: "Tempo 3-1-X-1 (3s bajada, 1s pausa, subida explosiva X, 1s arriba)", video: "https://www.youtube.com/embed/2C-uNgKwPLE", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Fuerza unilateral imprescindible para la potencia del primer pedalazo.", target: "Fuerza Unilateral" },
                                    { name: "Flexiones de Pecho Estrictas / Push-ups", sets: "3 series de 10 a 12 repeticiones", tempo: "Tempo 3-1-X-0 (Fase excéntrica lenta de 3s)", video: "https://www.youtube.com/embed/IODxDxX7oi4", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Estabilidad escapular para halar y empujar el manubrio.", target: "Pectoral y Deltoides" },
                                    { name: "Sentadilla Isométrica contra la Pared / Wall Sit", sets: "3 series de 40 segundos", tempo: "Isometría a 90°", video: "https://www.youtube.com/embed/aclHkVaku9U", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Fuerza de sostén cuádriceps para curvas y recta de salida.", target: "Resistencia Cuádriceps" },
                                    { name: "Plancha con Toque de Hombro / Shoulder Taps", sets: "3 series de 20 toques totales", tempo: "Control anti-rotación", video: "https://www.youtube.com/embed/eyeuugrpLYA", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Evitar el balanceo de cadera; core de hierro para transmisión de potencia.", target: "Core Anti-Rotación" }
                                ],
                                cardio: {
                                    name: "Tabata Modificado 30/15 BMX",
                                    format: "8 rondas (6 min total) • 30s esfuerzo máximo x 15s descanso",
                                    video: "https://www.youtube.com/embed/dZgVxmf6jkA", instagram: "https://www.instagram.com/pipearenas.fit/reels/",
                                    desc: "Rondas 1, 3, 5, 7: Burpees sin flexión / Squat Thrusts. Rondas 2, 4, 6, 8: Skipping Alto Explosivo / High Knee Sprints."
                                },
                                stretch: [
                                    { name: "Estiramiento de Cuádriceps de Pie", duration: "30s por lado", video: "https://www.youtube.com/embed/aNXGOpP37CY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Tirar del empeine hacia el glúteo manteniendo pelvis neutra." },
                                    { name: "Estiramiento de Isquiotibiales Sentado", duration: "30s", video: "https://www.youtube.com/embed/aJvfeuu71gw", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Piernas extendidas, aproximar abdomen a muslos." },
                                    { name: "Posición del Niño / Child's Pose", duration: "30s", video: "https://www.youtube.com/embed/2MJGg-dUKh0", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Descompresión lumbar vital para ciclistas." },
                                    { name: "Estiramiento de Pectorales en Pared", duration: "30s por lado", video: "https://www.youtube.com/embed/crnw1IKWNZY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Previene la postura redondeada de hombros." },
                                    { name: "Estiramiento de Gemelos en Pared", duration: "30s por lado", video: "https://www.youtube.com/embed/qPd73snQfUs", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Talón totalmente apoyado en el piso empujando la pared." }
                                ],
                                recovery: {
                                    name: "Respiración 4-4-6 + Imagery de Salida de Partidor",
                                    desc: "3 minutos de respiración diafragmática. Luego visualizar la cadencia de la voz oficial, el sonido de los pistones cayendo y la transferencia explosiva en la primera recta."
                                }
                            }
                        }
                    },
                    "2": { // DÍA 2
                        focus: "Estabilidad del Core, Reacción Explosiva (Simulación de Partidor) y Equilibrio Dinámico",
                        duration: "60 Minutos Máximo",
                        structure: "Calentamiento (10 min) + Bloque Principal (38 min) + Estiramiento (8 min) + Visualización (4 min)",
                        nutrition: {
                            energy: "Micronutrientes y energía sostenida. El sistema nervioso central consume glucosa constante para reflejos felinos.",
                            protein: "Proteínas limpias y legumbres para evitar fatiga celular.",
                            hydration: "Hidratación constante con electrolitos naturales (sal y limón) para velocidad de conducción nerviosa.",
                            snacks: "Desayuno del campeón: arepa con huevo, tazón de avena o tostadas con queso antes de salir."
                        },
                        ageGroups: {
                            "sub6": {
                                methodology: "Neuro-diversión: Estímulos visuales y auditivos para reflejo motor en el suelo y cambios de ritmo.",
                                warmup: [
                                    { name: "Giro de Tronco con Pivote", duration: "45s (2 rondas)", video: "https://www.youtube.com/embed/h6XyzlM8m24", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Liberar tensión lumbar preparatoria para el movimiento de pump.", target: "Columna y Lumbar" },
                                    { name: "Caminata de Cangrejo Invertida", duration: "45s (2 rondas)", video: "https://www.youtube.com/embed/ZodvhSMy6rk", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Activación de glúteos y apertura de hombros mirando al techo.", target: "Glúteos y Hombros" }
                                ],
                                plyo: [
                                    { name: "Juego Simón Dice Explosivo / Simon Says", sets: "4 series de 1 minuto", rest: "Descanso 60s", video: "https://www.youtube.com/embed/OatchVmdl3s", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "El entrenador dice: ¡Salto! (saltan alto), ¡Piso! (tocan suelo), ¡Estatua en un pie! (equilibrio).", target: "Reacción Auditiva" }
                                ],
                                strength: [
                                    { name: "Caminata de Cangrejo / Crab Walk", sets: "3 series de 30 segundos", tempo: "Continuo", video: "https://www.youtube.com/embed/ZodvhSMy6rk", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Moverse adelante y atrás manteniendo la cadera arriba.", target: "Fuerza Postural" },
                                    { name: "El Bicho Muerto / Dead Bug", sets: "3 series de 10 repeticiones", tempo: "Lento", video: "https://www.youtube.com/embed/DqLL45uk2Tk", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Acostados boca arriba, mover brazos y piernas al aire en coordinación como insecto invertido.", target: "Coordinación Abdominal" }
                                ],
                                cardio: {
                                    name: "La Pista de Obstáculos Imaginaria",
                                    format: "3 rondas de 2 minutos",
                                    video: "https://www.youtube.com/embed/HWCHautmxrU", instagram: "https://www.instagram.com/pipearenas.fit/reels/",
                                    desc: "Correr en el puesto; cuando se grita '¡Salto!' saltan un obstáculo imaginario; cuando se dice '¡Túnel!' caminan como patos."
                                },
                                stretch: [
                                    { name: "Estiramiento del Psoas Ilíaco / Caballero", duration: "30s por lado", video: "https://www.youtube.com/embed/ktgtEWGhFd8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Una rodilla en piso, empujar suavemente cadera al frente." },
                                    { name: "Torsión Espinal Supina", duration: "30s por lado", video: "https://www.youtube.com/embed/ktgtEWGhFd8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Acostado boca arriba, rodilla al pecho y cruzar al lado opuesto." }
                                ],
                                recovery: {
                                    name: "Imagery Infantil del Cohete",
                                    desc: "Imaginar que son un cohete llenándose de gasolina (aire) y apagando los motores poco a poco hasta quedar inmóviles."
                                }
                            },
                            "7to12": {
                                methodology: "Ventana de Aprendizaje Motor: Reflejos acústicos al aplauso simulando la campana del partidor y equilibrio monopodal.",
                                warmup: [
                                    { name: "Giro de Tronco con Pivote", duration: "45s", video: "https://www.youtube.com/embed/h6XyzlM8m24", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Liberar tensión lumbar preparatoria para el pump.", target: "Zona Lumbar" },
                                    { name: "Frankenstein Kicks / Toque de Punta Alterno", duration: "45s", video: "https://www.youtube.com/embed/aJvfeuu71gw", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Activa flexores de cadera y prepara la pierna para el pedaleo.", target: "Flexores de Cadera" },
                                    { name: "Balanceo de Pierna Adelante y Atrás / Leg Swings", duration: "45s (mitad por pierna)", video: "https://www.youtube.com/embed/naW8u72lOzI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Lubricación coxofemoral profunda.", target: "Articulación Coxofemoral" },
                                    { name: "Trote en el Puesto con Cambios de Ritmo", duration: "45s", video: "https://www.youtube.com/embed/v7rjHmZRs28", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "3s rápido x 5s suave despertando el sistema nervioso.", target: "Alerta Nerviosa" }
                                ],
                                plyo: [
                                    { name: "Salto del Patinador / Skater Jumps", sets: "3 series de 12 saltos (6 por lado)", rest: "Descanso 60s", video: "https://www.youtube.com/embed/qM5jviFhw9U", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Saltar lateralmente de un pie al otro buscando distancia y manteniendo el equilibrio 1s al aterrizar.", target: "Estabilidad Lateral" },
                                    { name: "Piques de Reacción Auditiva / Reaction Sprints", sets: "4 repeticiones", rest: "Descanso 60s", video: "https://www.youtube.com/embed/OatchVmdl3s", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Iniciar acostados boca abajo. Al aplauso o '¡Ya!', levantarse de un salto y hacer sprint en el sitio 5s.", target: "Tiempo de Reacción" }
                                ],
                                strength: [
                                    { name: "Plancha Frontal / Forearm Plank", sets: "3 series de 30 a 40 segundos", tempo: "Isometría", video: "https://www.youtube.com/embed/ASdvN_XEl_c", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Espalda recta, apretando glúteos para no arquear la zona lumbar.", target: "Core Frontal" },
                                    { name: "Puente de Glúteo a Una Pierna / Single-Leg Bridge", sets: "3 series de 8 reps por pierna", tempo: "Tempo 2-2-1-0 (Subir, 2s arriba, 2s bajada)", video: "https://www.youtube.com/embed/wPM8icPu6H8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Aislar la cadera para compensar desbalances entre piernas.", target: "Glúteo Mayor" },
                                    { name: "Sentadilla Lateral / Side Lunges", sets: "3 series de 8 reps por lado", tempo: "Controlado", video: "https://www.youtube.com/embed/rvqLVxYqEvo", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Construye fuerza estabilizadora para tomar peraltes a alta velocidad.", target: "Aductores y Peraltes" }
                                ],
                                cardio: {
                                    name: "Protocolo 15/30 - Medios Burpees",
                                    format: "10 rondas (7.5 min total) • 15s trabajo máximo x 30s descanso pasivo",
                                    video: "https://www.youtube.com/embed/dZgVxmf6jkA", instagram: "https://www.instagram.com/pipearenas.fit/reels/",
                                    desc: "Medios Burpees (sin flexión de pecho, volver rápido a posición de pie). La meta es la velocidad de pies al recoger rodillas al pecho."
                                },
                                stretch: [
                                    { name: "Estiramiento del Psoas Ilíaco / Caballero", duration: "30s por lado", video: "https://www.youtube.com/embed/ktgtEWGhFd8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Vital para evitar dolores lumbares en ciclistas." },
                                    { name: "El Perro Boca Abajo / Downward Dog", duration: "40s", video: "https://www.youtube.com/embed/Y0GDgQqt-bA", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Presionar talones al suelo; relaja pantorrillas y espalda completa." },
                                    { name: "Torsión Espinal Supina", duration: "30s por lado", video: "https://www.youtube.com/embed/ktgtEWGhFd8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Movilidad toracolumbar." },
                                    { name: "Estiramiento de Glúteo Sentado (Figura 4)", duration: "30s por lado", video: "https://www.youtube.com/embed/aJvfeuu71gw", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Cruzar tobillo sobre rodilla y presionar pecho." },
                                    { name: "Estiramiento de Cuello / Neck Release", duration: "20s por lado", video: "https://www.youtube.com/embed/6Tr3GLfySYo", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Relajar el trapecio tensionado por el peso del casco integral." }
                                ],
                                recovery: {
                                    name: "Visualización Guiada del Partidor",
                                    desc: "Cerrar ojos y escuchar internamente los comandos del partidor: 'Riders ready, watch the gate... BEEP', sintiendo el empuje en el manubrio."
                                }
                            },
                            "13to17": {
                                methodology: "Exigencia Técnica y Biomecánica: Control del valgo de rodilla en caídas y estabilidad del core bajo fatiga severa.",
                                warmup: [
                                    { name: "Giro de Tronco con Pivote", duration: "45s", video: "https://www.youtube.com/embed/h6XyzlM8m24", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Liberación de la fascia toracolumbar.", target: "Columna" },
                                    { name: "Toque de Punta de Pie Alterno", duration: "45s", video: "https://www.youtube.com/embed/4rkvMQUtJ9U", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Activación isométrica y dinámica de isquiotibiales.", target: "Isquiotibiales" },
                                    { name: "Balanceo de Pierna Adelante y Atrás", duration: "45s", video: "https://www.youtube.com/embed/naW8u72lOzI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Rango articular de cadera previo a aceleraciones.", target: "Cadera" },
                                    { name: "Trote con Cambios de Ritmo", duration: "45s", video: "https://www.youtube.com/embed/zDMUQ63YdbE", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Aceleraciones explosivas de 3 segundos.", target: "SNC" }
                                ],
                                plyo: [
                                    { name: "Salto de Longitud a Caída en un Pie / Single-Leg Stick", sets: "4 series de 6 saltos (3 der, 3 izq)", rest: "Descanso 60s", video: "https://www.youtube.com/embed/mKbYaSu1FA8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Absorber el impacto sin que la rodilla colapse hacia adentro (evitar valgo de rodilla).", target: "Absorción y Estabilidad" },
                                    { name: "Piques desde Rodillas / Kneeling Sprints (Gate Sim)", sets: "4 repeticiones", rest: "Descanso 60s", video: "https://www.youtube.com/embed/OatchVmdl3s", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "De rodillas en el piso; a la señal, llevar pie al frente explosivo y skipping alto 6s a muerte.", target: "Salida del Partidor" }
                                ],
                                strength: [
                                    { name: "Peso Muerto Rumano a Una Pierna / Single-Leg RDL", sets: "3 series de 10 por pierna", tempo: "Tempo 4-1-1-1 (4s bajada, control total del equilibrio)", video: "https://www.youtube.com/embed/2C-uNgKwPLE", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Sentir el estiramiento profundo del isquiotibial y estabilidad de tobillo.", target: "Cadena Posterior Unilateral" },
                                    { name: "Plancha Lateral con Elevación / Side Plank Dips", sets: "3 series de 12 repeticiones por lado", tempo: "Tempo 2-1-1-1 (Bajar cadera en 2s, subir fuerte)", video: "https://www.youtube.com/embed/ASdvN_XEl_c", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Fuerza oblicua y pélvica para resistir fuerzas centrífugas en peraltes.", target: "Oblicuos y Cadera" },
                                    { name: "Hollow Body Hold (Isometría Abdominal)", sets: "3 series de 30 a 45 segundos", tempo: "Isometría estricta", video: "https://www.youtube.com/embed/DqLL45uk2Tk", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Acostado boca arriba, piernas y hombros elevados a 10 cm, zona lumbar aplastada contra el suelo.", target: "Core Gimnástico" },
                                    { name: "Desplantes Inversos Explosivos / Reverse Lunges", sets: "3 series de 10 repeticiones por pierna", tempo: "Tempo 2-1-X-0 (Paso atrás en 2s, subida explosiva)", video: "https://www.youtube.com/embed/tHE4oh0U0ik", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Empuje vertical con la pierna delantera simulando pedalazo.", target: "Extensión de Cadera" }
                                ],
                                cardio: {
                                    name: "Simulador de Vuelta Completa - 'BMX Track EMOM'",
                                    format: "EMOM 8 Minutos (Every Minute on the Minute)",
                                    video: "https://www.youtube.com/embed/YHVrLfVjgwQ", instagram: "https://www.instagram.com/pipearenas.fit/reels/",
                                    desc: "Minutos Impares (1, 3, 5, 7 - Rectas y Saltos): 12 Tuck Jumps al pecho. Minutos Pares (2, 4, 6, 8 - Peraltes y Remate): 30s de Quick Feet a máxima velocidad."
                                },
                                stretch: [
                                    { name: "Estiramiento del Psoas Ilíaco / Caballero", duration: "30s por pierna", video: "https://www.youtube.com/embed/ktgtEWGhFd8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Evita inclinación pélvica anterior por exceso de pedaleo." },
                                    { name: "El Perro Boca Abajo / Downward Dog", duration: "40s", video: "https://www.youtube.com/embed/Y0GDgQqt-bA", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Elongación de gemelos y descompresión de columna." },
                                    { name: "Torsión Espinal Supina", duration: "30s por lado", video: "https://www.youtube.com/embed/ktgtEWGhFd8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Restablece movilidad rotacional de la columna." },
                                    { name: "Estiramiento de Glúteo Sentado (Figura 4)", duration: "30s por lado", video: "https://www.youtube.com/embed/aJvfeuu71gw", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Apertura del piramidal y rotadores externos de cadera." },
                                    { name: "Estiramiento de Cuello / Neck Release", duration: "20s por lado", video: "https://www.youtube.com/embed/6Tr3GLfySYo", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Descargar trapecios y cervicales post-impacto." }
                                ],
                                recovery: {
                                    name: "Protocolo de Imagery Neuromuscular Avanzado",
                                    desc: "Visualizar el partidor, sentir el primer pedalazo, el pump en el primer obstáculo y cruzar la línea de meta. Activa las mismas redes neuronales que la acción física."
                                }
                            }
                        }
                    },
                    "3": { // DÍA 3
                        focus: "Resistencia a la Fatiga (Tolerancia Láctica), Fuerza del Tren Superior y Stiffness de Tobillo",
                        duration: "60 Minutos Máximo",
                        structure: "Calentamiento (10 min) + Bloque Principal (38 min) + Estiramiento (8 min) + Automasaje (4 min)",
                        nutrition: {
                            energy: "Carga de glucógeno pre-pista (pasta integral, arroz, papa al horno) el viernes para depósitos a tope el sábado en pista.",
                            protein: "Calcio y Vitamina D para consolidar el chasis óseo tras impactos.",
                            hydration: "Omega 3 (atún, salmón, linaza o chía) para desinflamación celular y reducción de DOMS.",
                            snacks: "Colación post-entreno con lácteo/fruta y descanso activo el fin de semana si no hay competencia."
                        },
                        ageGroups: {
                            "sub6": {
                                methodology: "Enfoque Lúdico y Fuerza Asistida: Salto de conejo, carretilla con ayuda de padres y carreras de relevos.",
                                warmup: [
                                    { name: "Rotación Torácica en Cuadrupedia", duration: "45s", video: "https://www.youtube.com/embed/lzR7tzI1JUI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Libera la espalda media, crucial para halar el manubrio.", target: "Espalda Media" },
                                    { name: "Saltos de Foca / Seal Jacks", duration: "45s", video: "https://www.youtube.com/embed/c4DAnQ6DtF8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Abrir y cerrar brazos al frente calentando hombros y pecho.", target: "Pectoral y Hombros" },
                                    { name: "Sentadilla del Cosaco / Cossack Squats", duration: "45s", video: "https://www.youtube.com/embed/tpczTeSkHz0", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Desplazamiento lateral profundo movilizando aductores.", target: "Aductores" },
                                    { name: "Círculos de Tobillo y Muñecas", duration: "45s", video: "https://www.youtube.com/embed/lzR7tzI1JUI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Preparación de puntos de contacto directo con puños y pedales.", target: "Muñecas y Tobillos" },
                                    { name: "Trote en Zig-Zag Imaginario", duration: "45s", video: "https://www.youtube.com/embed/PdSEGR2KuEk", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Activación cardiovascular con cambios sutiles de dirección.", target: "Cambio de Dirección" }
                                ],
                                plyo: [
                                    { name: "Saltos de Conejo Rápido / Quick Bunny Hops", sets: "4 series de 30 segundos", rest: "Descanso 60s", video: "https://www.youtube.com/embed/1eSXxyBJYXY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Pies juntos, saltando adelante y atrás sobre una línea imaginaria lo más rápido posible.", target: "Rigidez de Tobillos" }
                                ],
                                strength: [
                                    { name: "La Carretilla / Wheelbarrow Walk", sets: "3 series de 6 a 8 pasos", tempo: "Asistido", video: "https://www.youtube.com/embed/umtTnKXkqc8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Los padres sostienen las piernas, el niño camina con las manos. Excelente para hombros y core.", target: "Fuerza de Hombros" },
                                    { name: "Levantarse del Suelo Rápido / Get-ups", sets: "3 series de 5 repeticiones", tempo: "Explosivo", video: "https://www.youtube.com/embed/dZgVxmf6jkA", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Acostarse boca arriba y buscar la manera más rápida de ponerse de pie a la señal.", target: "Agilidad y Coordinación" }
                                ],
                                cardio: {
                                    name: "Carrera de Relevos de Juguetes",
                                    format: "3 rondas de 2 minutos",
                                    video: "https://www.youtube.com/embed/HWCHautmxrU", instagram: "https://www.instagram.com/pipearenas.fit/reels/",
                                    desc: "5 juguetes en un extremo. Correr, agarrar uno, volver y depositarlo. Descanso hasta recuperar aliento."
                                },
                                stretch: [
                                    { name: "Estiramiento de Antebrazos (Flexor & Extensor)", duration: "30s por brazo", video: "https://www.youtube.com/embed/W9dGaNQ5uzQ", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Palmas arriba y abajo jalando dedos. Previene el arm pump." },
                                    { name: "Gato-Camello / Cat-Cow Stretch", duration: "10 transiciones lentas", video: "https://www.youtube.com/embed/LIVJZZyZ2qM", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Arquear y hundir espalda en cuadrupedia." },
                                    { name: "Estiramiento de Aductores (Mariposa)", duration: "45s", video: "https://www.youtube.com/embed/cfJcO7gi3zw", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Plantas de los pies juntas, presionar rodillas al suelo." }
                                ],
                                recovery: {
                                    name: "Automasaje y Relajación Miofascial",
                                    desc: "Con los pulgares, dar masaje profundo en la planta de los pies (fascia plantar) y amasar suavemente gemelos."
                                }
                            },
                            "7to12": {
                                methodology: "Atletas en Consolidación Técnica: Tobillos firmes como resorte (stiffness) para transferir potencia sin disipar energía.",
                                warmup: [
                                    { name: "Rotación Torácica en Cuadrupedia", duration: "45s", video: "https://www.youtube.com/embed/lzR7tzI1JUI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Crucial para liberar la espalda media al halar el manubrio.", target: "Tórax y Escápulas" },
                                    { name: "Saltos de Foca / Seal Jacks", duration: "45s", video: "https://www.youtube.com/embed/c4DAnQ6DtF8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Brazos paralelos al suelo para calentar pectorales y deltoides.", target: "Hombros" },
                                    { name: "Sentadilla del Cosaco / Cossack Squats", duration: "45s", video: "https://www.youtube.com/embed/tpczTeSkHz0", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Moviliza aductores para el control de la bicicleta con las rodillas.", target: "Aductores" },
                                    { name: "Círculos de Tobillo y Muñecas", duration: "45s", video: "https://www.youtube.com/embed/lzR7tzI1JUI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Lubricación de pedales y puños.", target: "Articulaciones de Apoyo" },
                                    { name: "Trote en Zig-Zag Imaginario", duration: "45s", video: "https://www.youtube.com/embed/PdSEGR2KuEk", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Agilidad en cambios de línea en pista.", target: "Agilidad" }
                                ],
                                plyo: [
                                    { name: "Saltos de Pogo / Pogo Jumps", sets: "3 series de 15 saltos", rest: "Descanso 60s", video: "https://www.youtube.com/embed/1eSXxyBJYXY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Saltar verticalmente con la fuerza de gemelos y tobillos, manteniendo rodillas casi bloqueadas (efecto resorte).", target: "Stiffness Tobillo" },
                                    { name: "Saltos Laterales sobre Objeto / Lateral Hurdle Hops", sets: "3 series de 10 saltos", rest: "Descanso 60s", video: "https://www.youtube.com/embed/qM5jviFhw9U", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Saltos explosivos cruzando un tenis o almohada pequeña.", target: "Potencia Lateral" }
                                ],
                                strength: [
                                    { name: "Fondos en Silla para Tríceps / Chair Dips", sets: "3 series de 8 a 10 reps", tempo: "Tempo 2-1-1-0 (Bajar 2s, 1s abajo, 1s arriba)", video: "https://www.youtube.com/embed/4ua3MzaU0QU", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Desarrolla la fuerza para empujar la bicicleta hacia abajo en saltos y amortiguar.", target: "Tríceps y Empuje" },
                                    { name: "Zancadas con Salto / Lunge Jump Switch (Jumping Lunges)", sets: "3 series de 12 reps alternas", tempo: "Explosivo", video: "https://www.youtube.com/embed/MrCJtyLTucI?start=42", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Fuerza explosiva individual para cada pierna en aceleración.", target: "Potencia de Piernas" },
                                    { name: "Caminata de Oso en Reversa / Reverse Bear Crawl", sets: "3 series de 20 segundos", tempo: "Continuo", video: "https://www.youtube.com/embed/Ee1BQNI6zN4", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Fortalece la cadena anterior del brazo y hombro posterior.", target: "Tren Superior Posterior" }
                                ],
                                cardio: {
                                    name: "Protocolo 30/30 - High Knees y Speed Skaters",
                                    format: "8 rondas (8 min total) • 30s trabajo máximo x 30s descanso",
                                    video: "https://www.youtube.com/embed/qM5jviFhw9U", instagram: "https://www.instagram.com/pipearenas.fit/reels/",
                                    desc: "Rondas Impares: Rodillas al Pecho en el sitio. Rondas Pares: Patinadores Rápidos (Speed Skaters)."
                                },
                                stretch: [
                                    { name: "Estiramiento de Antebrazos (Flexor & Extensor)", duration: "30s por lado", video: "https://www.youtube.com/embed/W9dGaNQ5uzQ", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Previene la fatiga extrema en antebrazos ('arm pump')." },
                                    { name: "Gato-Camello / Cat-Cow Stretch", duration: "10 transiciones", video: "https://www.youtube.com/embed/LIVJZZyZ2qM", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Movilidad de la columna dorsal y lumbar." },
                                    { name: "Estiramiento de Aductores (Mariposa)", duration: "45s", video: "https://www.youtube.com/embed/cfJcO7gi3zw", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Plantas juntas, rodillas hacia el suelo." },
                                    { name: "Estiramiento del Sóleo (Pantorrilla Baja)", duration: "30s por pierna", video: "https://www.youtube.com/embed/qPd73snQfUs", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Igual al de gemelos pero flexionando la rodilla de atrás para estirar cerca al tendón de Aquiles." },
                                    { name: "Apertura de Pecho y Hombro / Standing Chest Opener", duration: "30s", video: "https://www.youtube.com/embed/crnw1IKWNZY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Manos entrelazadas detrás de la espalda, sacar pecho y elevar brazos." }
                                ],
                                recovery: {
                                    name: "Automasaje y Relajación Miofascial",
                                    desc: "Masaje profundo con pulgares en fascia plantar y gemelos para restaurar elasticidad de los tendones de Aquiles."
                                }
                            },
                            "13to17": {
                                methodology: "Exigencia Élite Juvenil: Reflejo miotático en Drop Jumps, fuerza vertical en Pike Push-ups y tolerancia láctica en 'La Última Recta'.",
                                warmup: [
                                    { name: "Rotación Torácica en Cuadrupedia", duration: "45s (mitad por lado)", video: "https://www.youtube.com/embed/lzR7tzI1JUI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Movilidad escapular y torácica.", target: "Espalda Media" },
                                    { name: "Saltos de Foca / Seal Jacks", duration: "45s", video: "https://www.youtube.com/embed/c4DAnQ6DtF8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Activación del manguito rotador y pectorales.", target: "Pectoral" },
                                    { name: "Sentadilla del Cosaco / Cossack Squats", duration: "45s", video: "https://www.youtube.com/embed/tpczTeSkHz0", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Apertura de cadera y aductores.", target: "Aductores" },
                                    { name: "Círculos de Tobillo y Muñecas", duration: "45s", video: "https://www.youtube.com/embed/lzR7tzI1JUI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Articulaciones de contacto directo.", target: "Muñecas y Tobillos" },
                                    { name: "Trote en Zig-Zag Imaginario", duration: "45s", video: "https://www.youtube.com/embed/PdSEGR2KuEk", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Coordinación y agilidad.", target: "Cardio SNC" }
                                ],
                                plyo: [
                                    { name: "Salto desde Caída (Drop Jump) / Drop to Jump", sets: "4 series de 5 a 6 repeticiones", rest: "Descanso 60s", video: "https://www.youtube.com/embed/jNXXwTbFo-Q", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Subirse a un escalón bajo o silla muy firme, dejarse caer (sin saltar), y al tocar el suelo explotar inmediatamente hacia arriba. Clave biomecánica: No dejar hundir los talones al tocar el piso para desarrollar rigidez tendinosa.", target: "Reflejo Miotático & Potencia Vertical" },
                                    { name: "Saltos de Pogo Reactivos / Reactive Pogo Jumps", sets: "4 series de 20 saltos buscando mínimo tiempo de contacto con el suelo", rest: "Descanso 60s", video: "https://www.youtube.com/embed/1eSXxyBJYXY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "4 series de 20 saltos buscando mínimo tiempo de contacto con el suelo. Saltar verticalmente utilizando solo los gemelos y tobillos, manteniendo las rodillas casi extendidas (como un resorte). En el BMX, un tobillo firme transfiere mejor la potencia al pedal.", target: "Stiffness Tobillo & Potencia Reactiva" }
                                ],
                                strength: [
                                    { name: "Flexiones en V (Pica) / Pike Push-ups", sets: "3 series de 8 a 10 reps", tempo: "Tempo 3-1-1-0 (3s bajada de coronilla)", video: "https://www.youtube.com/embed/89-8waE2XKI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Desarrolla fuerza específica en hombros y deltoides para Manuals y saltos dobles.", target: "Deltoides y Manuals" },
                                    { name: "Zancadas con Salto Continuo / Continuous Lunge Jump Switch", sets: "3 series de 16 reps (8 por pierna)", tempo: "Amortiguación y rebote sin pausa", video: "https://www.youtube.com/embed/MrCJtyLTucI?start=42", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Fase de vuelo máxima para simular esfuerzo anaeróbico en rectas de pista.", target: "Potencia Aláctica" },
                                    { name: "Elevación de Pantorrilla a Una Pierna / Calf Raises", sets: "3 series de 15 reps por pierna", tempo: "Tempo 3-1-X-1 (3s bajada en escalón, pausa 1s, subida explosiva)", video: "https://www.youtube.com/embed/qPd73snQfUs", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Apoyados en borde de escalón. Fuerza tendinosa para la biela.", target: "Gemelos y Sóleo" },
                                    { name: "Plancha con Arrastre / Plank Pull-Through", sets: "3 series de 12 repeticiones", tempo: "Anti-rotación estricta", video: "https://www.youtube.com/embed/ASdvN_XEl_c", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "En plancha alta, arrastrar maleta pesada o mancuerna por debajo del cuerpo sin mover la cadera.", target: "Core Antirrotacional" }
                                ],
                                cardio: {
                                    name: "Tolerancia Láctica 'La Última Recta' (Protocolo 40/20)",
                                    format: "6 rondas (6 min total) • 40s esfuerzo máximo x 20s descanso",
                                    video: "https://www.youtube.com/embed/dZgVxmf6jkA", instagram: "https://www.instagram.com/pipearenas.fit/reels/",
                                    desc: "Rondas 1 y 4: Sprawls (tirarse a plancha y volver a pararse veloz). Rondas 2 y 5: Abdominales de Bicicleta Rápidos. Rondas 3 y 6: Sentadillas con Salto Rápido."
                                },
                                stretch: [
                                    { name: "Estiramiento de Antebrazos (Flexor & Extensor)", duration: "30s por lado", video: "https://www.youtube.com/embed/W9dGaNQ5uzQ", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Jalar dedos hacia atrás y abajo. Vital para prevenir Arm Pump.", target: "Antebrazos" },
                                    { name: "Gato-Camello / Cat-Cow Stretch", duration: "10 transiciones", video: "https://www.youtube.com/embed/LIVJZZyZ2qM", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Descompresión torácica.", target: "Columna" },
                                    { name: "Estiramiento de Aductores (Mariposa)", duration: "45s", video: "https://www.youtube.com/embed/cfJcO7gi3zw", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Relajación de aductores.", target: "Cadera" },
                                    { name: "Estiramiento del Sóleo (Pantorrilla Baja)", duration: "30s por pierna", video: "https://www.youtube.com/embed/qPd73snQfUs", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Estiramiento profundo del tendón de Aquiles.", target: "Sóleo" },
                                    { name: "Apertura de Pecho y Hombro / Standing Chest Opener", duration: "30s", video: "https://www.youtube.com/embed/crnw1IKWNZY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Contrarresta la postura encorvada del ciclista.", target: "Pectoral" }
                                ],
                                recovery: {
                                    name: "Automasaje y Liberación Miofascial con Foam Roller",
                                    desc: "Si tienen Foam Roller o pelota de tenis, pasar lentamente por isquiotibiales y glúteos, respirando hondo con inhalaciones de 4 segundos para calmar el sistema nervioso."
                                }
                            }
                        }
                    }
                }
            },
            "2": { // SEMANA 2
                name: "Semana 2 - Potencia Dirigida, Reacción Acústica y Transferencia a Pista",
                dailyTips: {
                    "1": [
                        "Técnica sobre Velocidad: Especialmente en la fuerza con tempos, vigilar que los jóvenes no sacrifiquen postura por terminar rápido.",
                        "Feedback Positivo en Pequeños: Si pierden el equilibrio, recuérdales que su cerebro está aprendiendo nuevas rutas motrices.",
                        "Carbohidratos Complejos: Priorizar avena, papa, plátano y arroz. Evitar azúcares que causan picos de insulina y fatiga rápida."
                    ],
                    "2": [
                        "Higiene Postural Escolar: Levantarse cada 45 minutos en el colegio a estirar piernas para no acortar el psoas ilíaco.",
                        "Gestión de la Frustración: 'El equilibrio no se tiene, se construye equivocándose.'",
                        "Sueño y Melatonina: Apagar pantallas 1 hora antes de dormir; en sueño profundo es donde los atletas se vuelven veloces."
                    ],
                    "3": [
                        "Foco Biomecánico: Stiffness (rigidez del tobillo) transfiere el 100% de la fuerza al plato sin disipación.",
                        "Tolerancia Láctica: En los últimos 30 metros de carrera gana quien soporta la acidez muscular sin perder técnica.",
                        "Supercompensación: Aumentar la densidad de carbohidratos en la cena previa al fin de semana en pista."
                    ]
                },
                days: {
                    "1": { // SEMANA 2 - DÍA 1
                        focus: "Pliometría, Agilidad y Fuerza Estricta con Tempos",
                        duration: "60 Minutos Máximo",
                        structure: "Calentamiento (10 min) + Bloque Principal (38 min) + Estiramiento (8 min) + Recuperación (4 min)",
                        nutrition: {
                            energy: "Combustible de pista: carbohidratos complejos y proteína natural (huevo, pollo, legumbres).",
                            protein: "Comida real que construye tendones y masa muscular elástica sin suplementos.",
                            hydration: "Hidratación estructural 2 horas antes y reposición con fruta rica en agua (sandía o naranja).",
                            snacks: "Snack ligero rico en potasio y glucosa antes de la sesión."
                        },
                        ageGroups: {
                            "sub6": {
                                methodology: "Enfoque Lúdico y Fuerza del Tren Superior con Juegos de Osos y Gorilas.",
                                warmup: [
                                    { name: "Trote con Rodillas Altas / High Knees", duration: "45s", video: "https://www.youtube.com/embed/zDMUQ63YdbE", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Activa el psoas y eleva la frecuencia cardíaca de forma divertida.", target: "Cardiovascular" },
                                    { name: "Rotación de Brazos Adelante y Atrás", duration: "45s", video: "https://www.youtube.com/embed/lzR7tzI1JUI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Calienta los manguitos rotadores, clave para el pull en la salida.", target: "Manguito Rotador" },
                                    { name: "Caminata de Oruga / Inchworms", duration: "45s", video: "https://www.youtube.com/embed/7jeW4v_oaes", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Desde de pie, caminar con las manos hasta posición de plancha y volver.", target: "Isquiotibiales y Core" },
                                    { name: "Saltos de Tijera / Jumping Jacks", duration: "45s", video: "https://www.youtube.com/embed/c4DAnQ6DtF8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Coordinación y temperatura corporal.", target: "Ritmo" },
                                    { name: "Estocadas Dinámicas con Torsión (Desplantes con Giro)", duration: "45s", video: "https://www.youtube.com/embed/tHE4oh0U0ik", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Movilidad de cadera y activación del core.", target: "Cadera" }
                                ],
                                plyo: [
                                    { name: "Saltos de Rana / Frog Jumps", sets: "4 series de 6 saltos", rest: "Descanso 60s", video: "https://www.youtube.com/embed/Brkz-7w8gsY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Colocar marcas en el suelo (hojas o cojines) para que salten de una a otra.", target: "Pliometría Lúdica" }
                                ],
                                strength: [
                                    { name: "Caminata de Oso / Bear Crawl", sets: "3 series de 30 segundos", tempo: "Continuo", video: "https://www.youtube.com/embed/Ee1BQNI6zN4", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Fomenta la fuerza del tren superior jugando a ser osos.", target: "Fuerza Tren Superior" },
                                    { name: "Sentadilla de Gorila / Gorilla Squats", sets: "3 series de 8 repeticiones", tempo: "Libre", video: "https://www.youtube.com/embed/2aMn_J6Lip0", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Tocar el piso con las manos entre las piernas y ponerse de pie.", target: "Piernas" }
                                ],
                                cardio: {
                                    name: "Semáforo Loco en Casa",
                                    format: "5 minutos continuos",
                                    video: "https://www.youtube.com/embed/HWCHautmxrU", instagram: "https://www.instagram.com/pipearenas.fit/reels/",
                                    desc: "Verde = Correr rápido en el sitio. Amarillo = Caminar. Rojo = Congelarse como estatua."
                                },
                                stretch: [
                                    { name: "Estiramiento de Cuádriceps de Pie", duration: "30s", video: "https://www.youtube.com/embed/aNXGOpP37CY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Talón al glúteo, rodillas juntas." },
                                    { name: "Posición del Niño / Child's Pose", duration: "30s", video: "https://www.youtube.com/embed/2MJGg-dUKh0", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Relaja la espalda baja." }
                                ],
                                recovery: {
                                    name: "Respiración Diafragmática (4-4-6)",
                                    desc: "Inhalar por la nariz inflando el abdomen (4s), sostener (4s) y exhalar muy lento por la boca (6s). Reduce el cortisol de inmediato."
                                }
                            },
                            "7to12": {
                                methodology: "Desarrollo Motor: Salto horizontal con aterrizaje ninja (silencioso) y saltos laterales skater.",
                                warmup: [
                                    { name: "Trote con Rodillas Altas / High Knees", duration: "45s", video: "https://www.youtube.com/embed/zDMUQ63YdbE", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Activa el psoas y eleva la frecuencia cardíaca.", target: "Psoas" },
                                    { name: "Rotación de Brazos / Arm Circles", duration: "45s", video: "https://www.youtube.com/embed/lzR7tzI1JUI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Calienta los manguitos rotadores para halar el manubrio.", target: "Hombros" },
                                    { name: "Caminata de Oruga / Inchworms", duration: "45s", video: "https://www.youtube.com/embed/7jeW4v_oaes", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Caminar con las manos hasta plancha y regresar.", target: "Isquiotibiales" },
                                    { name: "Saltos de Tijera / Jumping Jacks", duration: "45s", video: "https://www.youtube.com/embed/c4DAnQ6DtF8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Coordinación y temperatura.", target: "Cardio" },
                                    { name: "Estocadas Dinámicas con Torsión (Desplantes con Giro)", duration: "45s", video: "https://www.youtube.com/embed/tHE4oh0U0ik", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Movilidad de cadera y torsión de tronco.", target: "Caderas" }
                                ],
                                plyo: [
                                    { name: "Saltos de Longitud / Broad Jumps Ninja", sets: "4 series de 5 repeticiones", rest: "Descanso 60s", video: "https://www.youtube.com/embed/7Du1KbwCdUk", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Saltar adelante lo más lejos posible, aterrizando en sentadilla profunda como ninjas (sin hacer ruido).", target: "Absorción y Potencia" },
                                    { name: "Saltos Laterales a un Pie / Lateral Skater Hops", sets: "3 series de 10 saltos (5 por pierna)", rest: "Descanso 60s", video: "https://www.youtube.com/embed/qM5jviFhw9U", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Buscando equilibrio monopodal al caer.", target: "Equilibrio Monopodal" }
                                ],
                                strength: [
                                    { name: "Sentadillas Clásicas / Air Squats", sets: "3 series de 12 repeticiones", tempo: "Tempo 2-1-1-0 (Bajan en 2s, pausa 1s, suben en 1s)", video: "https://www.youtube.com/embed/aclHkVaku9U", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Fuerza base con postura erguida.", target: "Cuádriceps" },
                                    { name: "Flexiones con Rodillas / Knee Push-ups", sets: "3 series de 8 a 10 reps", tempo: "Tempo 2-1-1-0", video: "https://www.youtube.com/embed/jWxvty2KROs", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Control pectoral y escapular.", target: "Pectoral" },
                                    { name: "Superman en el Suelo / Superman Holds", sets: "3 series de 10 reps (2s arriba)", tempo: "Isometría 2s", video: "https://www.youtube.com/embed/cc6UVRS7PW4", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Sosteniendo 2 segundos arriba. Fortalece la zona lumbar.", target: "Zona Lumbar" }
                                ],
                                cardio: {
                                    name: "Intervalos 20/20 Mountain Climbers",
                                    format: "8 rondas (5 min 20 s total) • 20s esfuerzo máximo x 20s recuperación total",
                                    video: "https://www.youtube.com/embed/kLh-uczlPLg", instagram: "https://www.instagram.com/pipearenas.fit/reels/",
                                    desc: "Escaladores Rápidos / Mountain Climbers a máxima cadencia simulando el pique en pista."
                                },
                                stretch: [
                                    { name: "Estiramiento de Cuádriceps de Pie", duration: "30s por lado", video: "https://www.youtube.com/embed/aNXGOpP37CY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Talón al glúteo, rodillas juntas." },
                                    { name: "Perro Boca Abajo / Downward Dog", duration: "30s", video: "https://www.youtube.com/embed/Y0GDgQqt-bA", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Posición de V invertida empujando talones al piso." },
                                    { name: "Posición del Niño / Child's Pose", duration: "30s", video: "https://www.youtube.com/embed/2MJGg-dUKh0", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Relaja la espalda baja." },
                                    { name: "Estiramiento de Pectoral en Pared", duration: "30s por lado", video: "https://www.youtube.com/embed/crnw1IKWNZY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Brazo a 90° en la pared, girar el torso hacia afuera." }
                                ],
                                recovery: {
                                    name: "Respiración Diafragmática (4-4-6)",
                                    desc: "Acostados boca arriba, inhalar 4s inflando abdomen, sostener 4s, exhalar en 6s muy lento para activar el sistema parasimpático."
                                }
                            },
                            "13to17": {
                                methodology: "Potencia Dirigida - Etapa de Perfeccionamiento: Box Jumps a máxima explosión, Pogo Jumps y flexiones estrictas al fallo técnico.",
                                warmup: [
                                    { name: "Trote con Rodillas Altas / High Knees", duration: "45s", video: "https://www.youtube.com/embed/zDMUQ63YdbE", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Activa el psoas y eleva la frecuencia cardíaca.", target: "Psoas" },
                                    { name: "Rotación de Brazos / Arm Circles", duration: "45s", video: "https://www.youtube.com/embed/lzR7tzI1JUI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Manguitos rotadores para el 'pull' en el partidor.", target: "Hombros" },
                                    { name: "Caminata de Oruga / Inchworms", duration: "45s", video: "https://www.youtube.com/embed/7jeW4v_oaes", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Movilidad posterior y estabilización de muñecas.", target: "Cadena Posterior" },
                                    { name: "Saltos de Tijera / Jumping Jacks", duration: "45s", video: "https://www.youtube.com/embed/c4DAnQ6DtF8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Temperatura y ritmo neuromuscular.", target: "Coordinación" },
                                    { name: "Estocadas Dinámicas con Torsión (Desplantes con Giro)", duration: "45s", video: "https://www.youtube.com/embed/tHE4oh0U0ik", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Movilidad de cadera y activación rotacional del core.", target: "Core Rotacional" }
                                ],
                                plyo: [
                                    { name: "Saltos al Cajón (o escalón alto) / Box Jumps", sets: "4 series de 6 repeticiones", rest: "Descanso 60s", video: "https://www.youtube.com/embed/hxldG9FX4j4", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Máxima explosividad hacia arriba, extensión completa de cadera en el aire.", target: "Extensión Explosiva" },
                                    { name: "Saltos Reactivos de Tobillo / Pogo Jumps", sets: "4 series de 15 saltos", rest: "Descanso 60s", video: "https://www.youtube.com/embed/1eSXxyBJYXY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Saltos rápidos con rodillas rectas simulando el rebote elástico de un resorte.", target: "Stiffness de Tobillo" }
                                ],
                                strength: [
                                    { name: "Sentadilla Búlgara / Bulgarian Split Squat", sets: "3 series de 10 por pierna", tempo: "Tempo 3-1-X-1 (3s bajada, 1s pausa, subida explosiva, 1s arriba)", video: "https://www.youtube.com/embed/2C-uNgKwPLE", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Construcción de potencia simétrica en cada pierna para el pedaleo.", target: "Fuerza Unilateral" },
                                    { name: "Flexiones Estrictas / Strict Push-ups", sets: "3 series al fallo técnico", tempo: "Tempo 3-1-X-0 (3s bajando con control, subida fuerte)", video: "https://www.youtube.com/embed/IODxDxX7oi4", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Hasta perder la forma técnica. Aumenta la firmeza en brazos y torso.", target: "Tren Superior" },
                                    { name: "Plancha Abdominal Dinámica / Plank Shoulder Taps", sets: "3 series de 20 toques", tempo: "Anti-rotación estricta", video: "https://www.youtube.com/embed/eyeuugrpLYA", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Toques a los hombros intentando no rotar la cadera.", target: "Core Antirrotacional" }
                                ],
                                cardio: {
                                    name: "Tabata Modificado 30/15 BMX",
                                    format: "6 rondas (4 min 30 s total) • 30s esfuerzo máximo x 15s descanso",
                                    video: "https://www.youtube.com/embed/dZgVxmf6jkA", instagram: "https://www.instagram.com/pipearenas.fit/reels/",
                                    desc: "Rondas Impares: Burpees sin flexión / Sprawls. Rondas Pares: Sprints en el sitio / Fast Feet (a ras de suelo simulando cadencia alta de pedaleo)."
                                },
                                stretch: [
                                    { name: "Estiramiento de Cuádriceps de Pie", duration: "30s", video: "https://www.youtube.com/embed/aNXGOpP37CY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Talón al glúteo, respirando profundo." },
                                    { name: "Perro Boca Abajo / Downward Dog", duration: "30s", video: "https://www.youtube.com/embed/Y0GDgQqt-bA", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Talones empujando al suelo estirando gemelos e isquiotibiales." },
                                    { name: "Posición del Niño / Child's Pose", duration: "30s", video: "https://www.youtube.com/embed/2MJGg-dUKh0", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Relaja la espalda baja, fundamental en BMX." },
                                    { name: "Estiramiento de Pectoral en Pared", duration: "30s por lado", video: "https://www.youtube.com/embed/crnw1IKWNZY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Brazo a 90° en la pared, previene la postura encorvada." }
                                ],
                                recovery: {
                                    name: "Respiración Diafragmática (4-4-6)",
                                    desc: "Inhalar por la nariz inflando el abdomen (4s), sostener (4s) y exhalar muy lento por la boca (6s). Reduce cortisol e inicia la recuperación."
                                }
                            }
                        }
                    },
                    "2": { // SEMANA 2 - DÍA 2
                        focus: "Cadena Posterior, Estabilidad Pélvica y Reacción Acústica (Gate Start)",
                        duration: "60 Minutos Máximo",
                        structure: "Calentamiento (10 min) + Bloque Principal (38 min) + Estiramiento (8 min) + Visualización (4 min)",
                        nutrition: {
                            energy: "Grasas saludables (aguacate, nueces, almendras) para mielinización y velocidad de impulsos nerviosos.",
                            protein: "Hierro (carnes rojas magras, lentejas, espinacas) para prevención de fatiga anaeróbica.",
                            hydration: "Acompañar fuentes de hierro vegetal con Vitamina C (naranja o mandarina natural).",
                            snacks: "La regla del desayuno: nunca entrenar en ayunas; garantizar glucosa cerebral para reflejos inmediatos."
                        },
                        ageGroups: {
                            "sub6": {
                                methodology: "Neuro-diversión: Reacción auditiva '¡Salto!', '¡Piso!', '¡Estatua!' y pista de obstáculos imaginaria.",
                                warmup: [
                                    { name: "Giro de Tronco con Pivote", duration: "45s", video: "https://www.youtube.com/embed/h6XyzlM8m24", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Liberar tensión lumbar preparatoria para el movimiento de pump.", target: "Espalda Baja" },
                                    { name: "Frankenstein Kicks / Toque de Punta Alterno", duration: "45s", video: "https://www.youtube.com/embed/aJvfeuu71gw", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Activa isquiotibiales y prepara extensión de rodilla.", target: "Isquiotibiales" },
                                    { name: "Balanceo de Pierna Adelante y Atrás", duration: "45s", video: "https://www.youtube.com/embed/naW8u72lOzI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Lubricación de la articulación coxofemoral.", target: "Cadera" },
                                    { name: "Caminata de Cangrejo Invertida", duration: "45s", video: "https://www.youtube.com/embed/ZodvhSMy6rk", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Activación de glúteos y apertura de hombros.", target: "Glúteos" },
                                    { name: "Trote con Cambios de Ritmo", duration: "45s", video: "https://www.youtube.com/embed/zDMUQ63YdbE", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "3s máxima velocidad x 5s suave despierta el SNC.", target: "SNC" }
                                ],
                                plyo: [
                                    { name: "Juego 'Simón Dice Explosivo' / Simon Says", sets: "4 series de 1 minuto", rest: "Descanso 60s", video: "https://www.youtube.com/embed/OatchVmdl3s", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Entrenador dice: '¡Salto!' (saltan alto), '¡Piso!' (tocan suelo), '¡Estatua en un pie!' (equilibrio).", target: "Reacción Auditiva" }
                                ],
                                strength: [
                                    { name: "El Bicho Muerto / Dead Bug", sets: "3 series de 10 repeticiones", tempo: "Coordinado", video: "https://www.youtube.com/embed/DqLL45uk2Tk", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Boca arriba, mover brazos y piernas al aire coordinadamente.", target: "Core" },
                                    { name: "Puente Mágico / Glute Bridge", sets: "3 series de 8 repeticiones", tempo: "Contar 3s arriba", video: "https://www.youtube.com/embed/wPM8icPu6H8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Subir la cadera y contar hasta 3 antes de bajar.", target: "Glúteos" }
                                ],
                                cardio: {
                                    name: "Pista de Obstáculos Imaginaria",
                                    format: "3 rondas de 2 minutos",
                                    video: "https://www.youtube.com/embed/HWCHautmxrU", instagram: "https://www.instagram.com/pipearenas.fit/reels/",
                                    desc: "Correr esquivando objetos; cuando el entrenador grita '¡Túnel!' caminan agachados; '¡Doble!' saltan alto."
                                },
                                stretch: [
                                    { name: "Estiramiento del Psoas Ilíaco / Caballero", duration: "30s", video: "https://www.youtube.com/embed/ktgtEWGhFd8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Empujar cadera suavemente hacia adelante sin arquear espalda." },
                                    { name: "Torsión Espinal Supina", duration: "30s", video: "https://www.youtube.com/embed/ktgtEWGhFd8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Rodilla hacia el pecho cruzando hacia el piso del lado opuesto." },
                                    { name: "Estiramiento de Glúteo Sentado (Figura 4)", duration: "30s", video: "https://www.youtube.com/embed/aJvfeuu71gw", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Cruzar tobillo derecho sobre rodilla izquierda y presionar pecho." },
                                    { name: "Estiramiento de Cuello / Neck Release", duration: "20s", video: "https://www.youtube.com/embed/6Tr3GLfySYo", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Inclinar cabeza hacia el hombro relajando el trapecio." }
                                ],
                                recovery: {
                                    name: "Imagery Pediátrico del Cohete",
                                    desc: "Imaginar que son un cohete llenándose de gasolina (aire) y apagando los motores poco a poco."
                                }
                            },
                            "7to12": {
                                methodology: "Ventana de Aprendizaje Motor Ideal: Piques de reacción auditiva al aplauso simulando 'Watch the gate... BEEP'.",
                                warmup: [
                                    { name: "Giro de Tronco con Pivote", duration: "45s", video: "https://www.youtube.com/embed/h6XyzlM8m24", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Liberar tensión lumbar preparatoria para el pump.", target: "Lumbar" },
                                    { name: "Frankenstein Kicks / Toque de Punta Alterno", duration: "45s", video: "https://www.youtube.com/embed/aJvfeuu71gw", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Activa los isquiotibiales y prepara la extensión de rodilla.", target: "Isquiotibiales" },
                                    { name: "Balanceo de Pierna Adelante y Atrás", duration: "45s", video: "https://www.youtube.com/embed/naW8u72lOzI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Lubricación coxofemoral.", target: "Cadera" },
                                    { name: "Caminata de Cangrejo Invertida", duration: "45s", video: "https://www.youtube.com/embed/ZodvhSMy6rk", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Activación de glúteos y apertura de hombros.", target: "Glúteos" },
                                    { name: "Trote con Cambios de Ritmo", duration: "45s", video: "https://www.youtube.com/embed/zDMUQ63YdbE", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "3s velocidad máxima x 5s suave despierta el SNC.", target: "SNC" }
                                ],
                                plyo: [
                                    { name: "Piques de Reacción Auditiva / Reaction Sprints", sets: "4 repeticiones", rest: "Descanso 60s", video: "https://www.youtube.com/embed/OatchVmdl3s", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Acostados boca abajo. Al aplauso, se levantan de un salto y hacen un sprint en el sitio por 5s a muerte.", target: "Reacción Auditiva" },
                                    { name: "Salto del Patinador / Skater Jumps", sets: "3 series de 12 saltos (6 por lado)", rest: "Descanso 60s", video: "https://www.youtube.com/embed/qM5jviFhw9U", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Saltar lateralmente buscando distancia y manteniendo el equilibrio 1s al aterrizar.", target: "Equilibrio Dinámico" }
                                ],
                                strength: [
                                    { name: "Plancha Frontal / Forearm Plank", sets: "3 series de 30 a 40 segundos", tempo: "Isometría", video: "https://www.youtube.com/embed/ASdvN_XEl_c", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Espalda recta, apretando glúteos para no arquear la zona lumbar.", target: "Estabilidad Pélvica" },
                                    { name: "Puente de Glúteo a Una Pierna / Single-Leg Bridge", sets: "3 series de 8 reps por pierna", tempo: "Tempo 2-2-1-0 (Subir normal, 2s arriba, bajar en 2s)", video: "https://www.youtube.com/embed/wPM8icPu6H8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Aislar glúteos y estabilizar pelvis.", target: "Glúteo Mayor" },
                                    { name: "Sentadilla Lateral / Side Lunges", sets: "3 series de 8 reps por lado", tempo: "Controlado", video: "https://www.youtube.com/embed/rvqLVxYqEvo", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Construye fuerza estabilizadora para tomar peraltes a alta velocidad.", target: "Aductores" }
                                ],
                                cardio: {
                                    name: "Protocolo 15/30 Medios Burpees",
                                    format: "10 rondas (7.5 min total) • 15s trabajo máximo x 30s descanso pasivo",
                                    video: "https://www.youtube.com/embed/dZgVxmf6jkA", instagram: "https://www.instagram.com/pipearenas.fit/reels/",
                                    desc: "Medios Burpees (sin flexión de pecho, volver rápido a posición de pie). La meta es la velocidad de los pies al recoger rodillas al pecho."
                                },
                                stretch: [
                                    { name: "Estiramiento del Psoas Ilíaco / Caballero", duration: "30s", video: "https://www.youtube.com/embed/ktgtEWGhFd8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Vital para evitar dolores lumbares en ciclistas." },
                                    { name: "Torsión Espinal Supina", duration: "30s", video: "https://www.youtube.com/embed/ktgtEWGhFd8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Llevar rodilla hacia el pecho y cruzar al lado opuesto." },
                                    { name: "Estiramiento de Glúteo Sentado (Figura 4)", duration: "30s", video: "https://www.youtube.com/embed/aJvfeuu71gw", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Presionar pecho hacia piernas con espalda recta." },
                                    { name: "Estiramiento de Cuello / Neck Release", duration: "20s", video: "https://www.youtube.com/embed/6Tr3GLfySYo", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Relaja el trapecio tensionado por el casco integral." }
                                ],
                                recovery: {
                                    name: "Imagery de Partidor y Reacción de Voz Oficial",
                                    desc: "Escuchar mentalmente la cadencia de la voz oficial, el sonido de los pistones cayendo y sentir la fuerza exacta en el primer pedalazo."
                                }
                            },
                            "13to17": {
                                methodology: "Potencia y Absorción - Exigencia Técnica Total: Broad Jump a Single-Leg Stick evitando valgo de rodilla y salidas explosivas desde rodillas.",
                                warmup: [
                                    { name: "Giro de Tronco con Pivote", duration: "45s", video: "https://www.youtube.com/embed/h6XyzlM8m24", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Liberar tensión lumbar preparatoria para el pump.", target: "Espalda Baja" },
                                    { name: "Toque de Punta de Pie Alterno", duration: "45s", video: "https://www.youtube.com/embed/4rkvMQUtJ9U", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Activa isquiotibiales y rodilla.", target: "Isquiotibiales" },
                                    { name: "Balanceo de Pierna Adelante y Atrás", duration: "45s", video: "https://www.youtube.com/embed/naW8u72lOzI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Lubricación coxofemoral profunda.", target: "Cadera" },
                                    { name: "Caminata de Cangrejo Invertida", duration: "45s", video: "https://www.youtube.com/embed/ZodvhSMy6rk", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Activación glútea y apertura torácica.", target: "Glúteos" },
                                    { name: "Trote con Cambios de Ritmo", duration: "45s", video: "https://www.youtube.com/embed/zDMUQ63YdbE", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Aceleraciones explosivas del SNC.", target: "SNC" }
                                ],
                                plyo: [
                                    { name: "Broad Jump to Single-Leg Stick", sets: "4 series de 6 saltos (3 der, 3 izq)", rest: "Descanso 60s", video: "https://www.youtube.com/embed/7Du1KbwCdUk", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Absorber el impacto sin que la rodilla colapse hacia adentro (evitar valgo de rodilla).", target: "Absorción y Control de Rodilla" },
                                    { name: "Salida desde Rodillas / Kneeling Sprints (Gate Sim)", sets: "4 repeticiones", rest: "Descanso 60s", video: "https://www.youtube.com/embed/OatchVmdl3s", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "De rodillas en el piso; a la señal, llevar pie al frente explosivo, pararse y skipping alto a máxima velocidad por 6 segundos.", target: "Salida Explosiva de Partidor" }
                                ],
                                strength: [
                                    { name: "Peso Muerto Rumano a Una Pierna / Single-Leg RDL", sets: "3 series de 10 por pierna", tempo: "Tempo 4-1-1-1 (Bajar en 4s sintiendo el estiramiento del isquiotibial)", video: "https://www.youtube.com/embed/2C-uNgKwPLE", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Control total del equilibrio innegociable.", target: "Cadena Posterior" },
                                    { name: "Desplantes Inversos Explosivos / Explosive Reverse Lunges", sets: "3 series de 10 por pierna", tempo: "Tempo 2-1-X-0 (Paso atrás en 2s, pausa 1s, subida explosiva)", video: "https://www.youtube.com/embed/tHE4oh0U0ik", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Empujar explosivamente con la pierna delantera.", target: "Potencia Cuádriceps" },
                                    { name: "Hollow Body Hold (Isometría Abdominal)", sets: "3 series de 40 segundos", tempo: "Isometría", video: "https://www.youtube.com/embed/DqLL45uk2Tk", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Piernas y hombros elevados a 10 cm del suelo, zona lumbar aplastada contra el piso.", target: "Core Gimnástico" },
                                    { name: "Plancha Lateral con Elevación / Side Plank Dips", sets: "3 series de 12 por lado", tempo: "Tempo controlado", video: "https://www.youtube.com/embed/ASdvN_XEl_c", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Bajar cadera suave y subir fuerte.", target: "Oblicuos" }
                                ],
                                cardio: {
                                    name: "BMX Track EMOM (Every Minute on the Minute)",
                                    format: "EMOM 8 Minutos • El tiempo sobrante es descanso",
                                    video: "https://www.youtube.com/embed/YHVrLfVjgwQ", instagram: "https://www.instagram.com/pipearenas.fit/reels/",
                                    desc: "Minutos Impares (1, 3, 5, 7 - Rectas y Saltos): 12 Tuck Jumps al pecho. Minutos Pares (2, 4, 6, 8 - Peraltes y Remate): 30s de Quick Feet a máxima velocidad."
                                },
                                stretch: [
                                    { name: "Estiramiento del Psoas Ilíaco / Caballero", duration: "30s", video: "https://www.youtube.com/embed/ktgtEWGhFd8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Vital para evitar dolores lumbares en ciclistas." },
                                    { name: "Torsión Espinal Supina", duration: "30s", video: "https://www.youtube.com/embed/ktgtEWGhFd8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Acostado boca arriba, rodilla al pecho y cruzar al piso opuesto." },
                                    { name: "Estiramiento de Glúteo Sentado (Figura 4)", duration: "30s", video: "https://www.youtube.com/embed/aJvfeuu71gw", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Cruzar tobillo sobre rodilla y presionar pecho." },
                                    { name: "Estiramiento de Cuello / Neck Release", duration: "20s", video: "https://www.youtube.com/embed/6Tr3GLfySYo", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Relajar el trapecio tensionado por el casco integral." }
                                ],
                                recovery: {
                                    name: "Visualización Guiada del Partidor",
                                    desc: "Escuchar la cadencia de la voz oficial, el sonido de los pistones cayendo, y sentir la transferencia de fuerza exacta en el primer pedalazo estimulando redes neuronales."
                                }
                            }
                        }
                    },
                    "3": { // SEMANA 2 - DÍA 3
                        focus: "Tolerancia Láctica (Última Recta), Fuerza de Empuje/Jalón y Stiffness de Tobillo",
                        duration: "60 Minutos Máximo",
                        structure: "Calentamiento (10 min) + Bloque Principal (38 min) + Estiramiento (8 min) + Automasaje (4 min)",
                        nutrition: {
                            energy: "En el BMX, la carrera se define en los últimos 30 metros. Quien soporta la acidez muscular sin perder técnica, se lleva el podio.",
                            protein: "Regeneración ósea con Calcio y Vitamina D (el chasis del deportista) activada con 15 minutos de sol.",
                            hydration: "Omega 3 para desinflamación celular y micro-roturas fibrilares.",
                            snacks: "Carga pre-pista: aumentar carbohidratos en la cena de la víspera (pasta integral, arroz, papa al horno)."
                        },
                        ageGroups: {
                            "sub6": {
                                methodology: "Rigidez Lúdica de Tobillos, Fuerza en Manos y Carrera de Relevos.",
                                warmup: [
                                    { name: "Rotación Torácica en Cuadrupedia", duration: "45s", video: "https://www.youtube.com/embed/lzR7tzI1JUI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Crucial para liberar la espalda media para halar el manubrio.", target: "Espalda Media" },
                                    { name: "Saltos de Foca / Seal Jacks", duration: "45s", video: "https://www.youtube.com/embed/c4DAnQ6DtF8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Abrir y cerrar brazos extendidos al frente (no arriba).", target: "Hombros" },
                                    { name: "Sentadilla del Cosaco / Cossack Squats", duration: "45s", video: "https://www.youtube.com/embed/tpczTeSkHz0", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Desplazamiento lateral profundo movilizando aductores.", target: "Aductores" },
                                    { name: "Círculos de Tobillos y Muñecas", duration: "45s", video: "https://www.youtube.com/embed/lzR7tzI1JUI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Articulaciones de contacto crítico (pedales y puños).", target: "Muñecas y Tobillos" },
                                    { name: "Trote en Zig-Zag Imaginario", duration: "45s", video: "https://www.youtube.com/embed/PdSEGR2KuEk", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Activación cardiovascular con cambios suaves de dirección.", target: "Cambio de Dirección" }
                                ],
                                plyo: [
                                    { name: "Saltos de Conejo Rápido / Quick Bunny Hops", sets: "4 series de 30 segundos", rest: "Descanso 60s", video: "https://www.youtube.com/embed/1eSXxyBJYXY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Saltar con pies juntos adelante y atrás sobre una línea imaginaria lo más rápido posible.", target: "Stiffness Tobillo" }
                                ],
                                strength: [
                                    { name: "La Carretilla / Wheelbarrow Walk", sets: "3 series de 8 pasos", tempo: "Asistido", video: "https://www.youtube.com/embed/umtTnKXkqc8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "El adulto sostiene las piernas; desarrolla fuerza fundamental en muñecas y hombros.", target: "Hombros y Muñecas" },
                                    { name: "Levantarse del Suelo / Get-ups", sets: "3 series de 5 repeticiones", tempo: "Rápido y creativo", video: "https://www.youtube.com/embed/dZgVxmf6jkA", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Acostarse y pararse lo más rápido posible usando creatividad motriz.", target: "Agilidad" }
                                ],
                                cardio: {
                                    name: "Carrera de Relevos de Juguetes",
                                    format: "3 rondas de 2 minutos",
                                    video: "https://www.youtube.com/embed/HWCHautmxrU", instagram: "https://www.instagram.com/pipearenas.fit/reels/",
                                    desc: "5 juguetes en un extremo. Correr, agarrar uno, volver y depositarlo. Descanso hasta recuperar aliento."
                                },
                                stretch: [
                                    { name: "Estiramiento de Antebrazos", duration: "30s por lado", video: "https://www.youtube.com/embed/W9dGaNQ5uzQ", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Previene el Arm Pump (antebrazos de piedra)." },
                                    { name: "Gato-Camello / Cat-Cow Stretch", duration: "10 transiciones", video: "https://www.youtube.com/embed/LIVJZZyZ2qM", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Arquear y hundir espalda en cuadrupedia." },
                                    { name: "Estiramiento de Aductores (Mariposa)", duration: "45s", video: "https://www.youtube.com/embed/cfJcO7gi3zw", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Plantas juntas, presionar rodillas al suelo." },
                                    { name: "Estiramiento del Sóleo / Soleus Stretch", duration: "30s", video: "https://www.youtube.com/embed/qPd73snQfUs", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Flexionando rodilla de pierna trasera para estirar cerca al tendón de Aquiles." },
                                    { name: "Apertura de Pecho / Chest Opener", duration: "30s", video: "https://www.youtube.com/embed/crnw1IKWNZY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Manos entrelazadas detrás de la espalda, sacar pecho y elevar brazos." }
                                ],
                                recovery: {
                                    name: "Automasaje y Liberación Miofascial",
                                    desc: "Dar masaje profundo con pulgares en la planta de los pies (fascia plantar) y amasar gemelos."
                                }
                            },
                            "7to12": {
                                methodology: "Fase Clave para Infantiles de 11-12 Años: Consolidando la técnica de salto y stiffness para transferir toda la potencia al plato.",
                                warmup: [
                                    { name: "Rotación Torácica en Cuadrupedia", duration: "45s", video: "https://www.youtube.com/embed/lzR7tzI1JUI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Libera la espalda media permitiendo movimiento fluido.", target: "Espalda Media" },
                                    { name: "Saltos de Foca / Seal Jacks", duration: "45s", video: "https://www.youtube.com/embed/c4DAnQ6DtF8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Brazos paralelos al suelo para calentar deltoides.", target: "Hombros" },
                                    { name: "Sentadilla del Cosaco / Cossack Squats", duration: "45s", video: "https://www.youtube.com/embed/tpczTeSkHz0", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Desplazamiento lateral profundo movilizando aductores.", target: "Aductores" },
                                    { name: "Círculos de Tobillo y Muñecas", duration: "45s", video: "https://www.youtube.com/embed/lzR7tzI1JUI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Puntos de contacto directo con la bicicleta.", target: "Tobillos y Muñecas" },
                                    { name: "Trote en Zig-Zag Imaginario", duration: "45s", video: "https://www.youtube.com/embed/PdSEGR2KuEk", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Activación cardiovascular.", target: "Agilidad" }
                                ],
                                plyo: [
                                    { name: "Saltos de Pogo / Pogo Jumps", sets: "3 series de 15 saltos", rest: "Descanso 60s", video: "https://www.youtube.com/embed/1eSXxyBJYXY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Saltar verticalmente utilizando solo gemelos y tobillos, rodillas casi bloqueadas.", target: "Efecto Resorte" },
                                    { name: "Saltos Laterales sobre Objeto / Lateral Hurdle Hops", sets: "3 series de 10 saltos", rest: "Descanso 60s", video: "https://www.youtube.com/embed/qM5jviFhw9U", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Saltos explosivos cruzando un tenis o cono.", target: "Potencia Lateral" }
                                ],
                                strength: [
                                    { name: "Fondos en Silla para Tríceps / Chair Dips", sets: "3 series de 8 a 10 reps", tempo: "Tempo 2-1-1-0 (Control de bajada en 2s)", video: "https://www.youtube.com/embed/4ua3MzaU0QU", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Desarrolla la fuerza para empujar la bicicleta hacia abajo en saltos.", target: "Tríceps y Empuje" },
                                    { name: "Tijeras Pliométricas / Lunge Jump Switch", sets: "3 series de 12 (alternando piernas)", tempo: "Explosivo continuo", video: "https://www.youtube.com/embed/MrCJtyLTucI?start=42", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Fuerza explosiva individual de pedaleo.", target: "Potencia de Piernas" },
                                    { name: "Caminata de Oso en Reversa / Reverse Bear Crawl", sets: "3 series de 20 segundos", tempo: "Continuo", video: "https://www.youtube.com/embed/Ee1BQNI6zN4", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Fortalece la cadena anterior del brazo y el core estabilizador.", target: "Hombros y Core" }
                                ],
                                cardio: {
                                    name: "Protocolo 30/30 Tolerancia Láctica",
                                    format: "8 rondas (8 min total) • 30s trabajo x 30s descanso",
                                    video: "https://www.youtube.com/embed/qM5jviFhw9U", instagram: "https://www.instagram.com/pipearenas.fit/reels/",
                                    desc: "Rondas Impares: Rodillas al Pecho en el sitio / High Knees. Rondas Pares: Patinadores Rápidos / Speed Skaters."
                                },
                                stretch: [
                                    { name: "Estiramiento de Antebrazos", duration: "30s por lado", video: "https://www.youtube.com/embed/W9dGaNQ5uzQ", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Evita el endurecimiento del antebrazo (arm pump)." },
                                    { name: "Gato-Camello / Cat-Cow Stretch", duration: "10 transiciones", video: "https://www.youtube.com/embed/LIVJZZyZ2qM", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Arquear y curvar espalda en cuadrupedia." },
                                    { name: "Estiramiento de Aductores (Mariposa)", duration: "45s", video: "https://www.youtube.com/embed/cfJcO7gi3zw", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Presionar rodillas al suelo con los codos." },
                                    { name: "Estiramiento del Sóleo / Soleus Stretch", duration: "30s", video: "https://www.youtube.com/embed/qPd73snQfUs", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Flexionando rodilla trasera para estirar cerca al tendón de Aquiles." },
                                    { name: "Apertura de Pecho / Chest Opener", duration: "30s", video: "https://www.youtube.com/embed/crnw1IKWNZY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Manos entrelazadas detrás de la espalda, sacar pecho y elevar brazos." }
                                ],
                                recovery: {
                                    name: "Automasaje y Liberación Miofascial",
                                    desc: "Masaje profundo en fascia plantar y gemelos para restaurar simetría después de los saltos."
                                }
                            },
                            "13to17": {
                                methodology: "Exigencia Élite para Juveniles de 15+ Años: Drop Jumps con mínimo tiempo de contacto (reflejo miotático) y Protocolo 40/20 de dolor láctico.",
                                warmup: [
                                    { name: "Rotación Torácica en Cuadrupedia", duration: "45s", video: "https://www.youtube.com/embed/lzR7tzI1JUI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Movilidad escapular y torácica.", target: "Espalda Media" },
                                    { name: "Saltos de Foca / Seal Jacks", duration: "45s", video: "https://www.youtube.com/embed/c4DAnQ6DtF8", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Abrir y cerrar brazos paralelos al suelo para calentar pectorales y deltoides.", target: "Deltoides y Pectoral" },
                                    { name: "Sentadilla del Cosaco / Cossack Squats", duration: "45s", video: "https://www.youtube.com/embed/tpczTeSkHz0", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Desplazamiento lateral profundo movilizando aductores.", target: "Aductores" },
                                    { name: "Círculos de Tobillo y Muñecas", duration: "45s", video: "https://www.youtube.com/embed/lzR7tzI1JUI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Preparación de puntos de contacto crítico (pedales y puños).", target: "Muñecas y Tobillos" },
                                    { name: "Trote en Zig-Zag Imaginario", duration: "45s", video: "https://www.youtube.com/embed/PdSEGR2KuEk", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Activación cardiovascular con cambios suaves de dirección.", target: "Cardio" }
                                ],
                                plyo: [
                                    { name: "Salto desde Caída (Drop Jump) / Drop to Jump", sets: "4 series de 5 a 6 repeticiones", rest: "Descanso 60s", video: "https://www.youtube.com/embed/jNXXwTbFo-Q", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Subirse a un escalón bajo o silla muy firme, dejarse caer (sin saltar), y al tocar el suelo explotar inmediatamente hacia arriba. Clave biomecánica: No dejar hundir los talones al tocar el piso para desarrollar rigidez tendinosa.", target: "Reflejo Miotático & Potencia Vertical" },
                                    { name: "Saltos de Pogo Reactivos / Reactive Pogo Jumps", sets: "4 series de 20 saltos buscando mínimo tiempo de contacto con el suelo", rest: "Descanso 60s", video: "https://www.youtube.com/embed/1eSXxyBJYXY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "4 series de 20 saltos buscando mínimo tiempo de contacto con el suelo. Saltar verticalmente utilizando solo los gemelos y tobillos, manteniendo las rodillas casi extendidas (como un resorte). En el BMX, un tobillo firme transfiere mejor la potencia al pedal.", target: "Stiffness Tobillo & Potencia Reactiva" }
                                ],
                                strength: [
                                    { name: "Flexiones en V (Pica) / Pike Push-ups", sets: "3 series de 8 a 10 reps", tempo: "Tempo 3-1-1-0 (Bajar coronilla en 3s formando triángulo con manos)", video: "https://www.youtube.com/embed/89-8waE2XKI", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Aísla deltoides anteriores, cruciales para el tirón de la llanta delantera en Manuals.", target: "Fuerza de Manuals" },
                                    { name: "Tijeras con Salto Continuo / Continuous Lunge Jump Switch", sets: "3 series de 16 reps (8 por pierna)", tempo: "Fase de vuelo máxima, amortiguación inmediata y rebote sin pausa", video: "https://www.youtube.com/embed/MrCJtyLTucI?start=42", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Capacidad de aplicar fuerza en piernas quemadas.", target: "Potencia y Ácido Láctico" },
                                    { name: "Elevación de Pantorrilla a Una Pierna / Calf Raises", sets: "3 series de 15 reps por pierna", tempo: "Tempo 3-1-X-1 (Bajar lento en 3s, estirar 1s, subir explosivo, apretar 1s)", video: "https://www.youtube.com/embed/qPd73snQfUs", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "En escalón. Transmisión de potencia directa al pedal.", target: "Gemelo y Sóleo" },
                                    { name: "Plancha con Arrastre / Plank Drag", sets: "3 series de 12 repeticiones", tempo: "Anti-rotación estricta", video: "https://www.youtube.com/embed/ASdvN_XEl_c", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "En plancha, arrastrar maleta pesada por debajo del cuerpo de un lado al otro sin mover la cadera.", target: "Core Antirrotacional" }
                                ],
                                cardio: {
                                    name: "Tolerancia Láctica 'La Última Recta' (Protocolo 40/20 - Umbral de Dolor)",
                                    format: "6 rondas (6 min total) • 40s esfuerzo máximo sostenido x 20s descanso total",
                                    video: "https://www.youtube.com/embed/dZgVxmf6jkA", instagram: "https://www.instagram.com/pipearenas.fit/reels/",
                                    desc: "¡Aquí se define la carrera! Rondas 1 y 4: Sprawls (tirarse a plancha y pararse rápido). Rondas 2 y 5: Abdominales de Bicicleta Rápidos. Rondas 3 y 6: Sentadillas con Salto Rápido."
                                },
                                stretch: [
                                    { name: "Estiramiento de Antebrazos / Forearm Stretch", duration: "30s por lado", video: "https://www.youtube.com/embed/W9dGaNQ5uzQ", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Brazo estirado al frente, jalar dedos atrás y abajo. Evita el Arm Pump.", target: "Antebrazo" },
                                    { name: "Gato-Camello / Cat-Cow Stretch", duration: "10 transiciones lentas", video: "https://www.youtube.com/embed/LIVJZZyZ2qM", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Descompresión torácica.", target: "Columna" },
                                    { name: "Estiramiento de Aductores (Mariposa)", duration: "45s", video: "https://www.youtube.com/embed/cfJcO7gi3zw", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Plantas juntas, presionar rodillas al suelo.", target: "Cadera" },
                                    { name: "Estiramiento del Sóleo / Soleus Stretch", duration: "30s por pierna", video: "https://www.youtube.com/embed/qPd73snQfUs", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Flexionando rodilla de la pierna trasera para estirar cerca al tendón de Aquiles.", target: "Sóleo" },
                                    { name: "Apertura de Pecho y Hombro / Chest Opener", duration: "30s", video: "https://www.youtube.com/embed/crnw1IKWNZY", instagram: "https://www.instagram.com/pipearenas.fit/reels/", desc: "Manos entrelazadas detrás de la espalda, sacar pecho y elevar brazos.", target: "Pectoral" }
                                ],
                                recovery: {
                                    name: "Automasaje y Liberación Miofascial con Foam Roller",
                                    desc: "Pasar lentamente el Foam Roller o pelota de tenis por isquiotibiales y glúteos respirando hondo (4s inhalación) para indicarle al cerebro que el peligro ha terminado."
                                }
                            }
                        }
                    }
                }
            }
        };

/**
 * Retorna la justificación técnica y pedagógica oficial del PDF para cada bloque
 */
function getBlockInsight(blockKey, week, day, ageGroup) {
    const d = parseInt(day || 1, 10);
    const w = parseInt(week || 1, 10);

    if (blockKey === 'warmup') {
        return "Trabajo fluido. 45 segundos por ejercicio, 15 segundos de transición (2 rondas). Calentamiento dinámico y activación neuromuscular sin fatiga previa.";
    }
    if (blockKey === 'plyo') {
        if (d === 1) {
            return "Descanso de 60 segundos entre series. Enfoque: Calidad del salto, aterrizaje suave y desaceleración controlada. En el BMX, la potencia se genera al empujar y la técnica al absorber.";
        } else if (d === 2) {
            return "Descanso de 60 segundos entre series. Enfoque: Velocidad de respuesta ante un estímulo (auditivo o visual, simulando el comando del partidor 'Riders Ready, Watch the Gate').";
        } else {
            return "Descanso de 60 segundos entre series. En el BMX, un tobillo firme transfiere mejor la potencia al pedal. Si el tobillo es blando absorbe la fuerza y la pierde; si es firme como un resorte ('stiffness'), transfiere toda la potencia al plato de la biela.";
        }
    }
    if (blockKey === 'strength') {
        return "Nomenclatura del Tempo: [Bajada / Pausa abajo / Subida / Pausa arriba]. En el entrenamiento de fuerza, la fase de bajada lenta (3 segundos) protege las articulaciones y desarrolla fuerza tendinosa.";
    }
    if (blockKey === 'cardio') {
        if (d === 3) {
            return "La Última Recta: Hoy simulamos la recta final de la pista: ese momento donde las piernas queman, pero hay que mantener la técnica, el agarre firme al manubrio y el pedaleo redondo.";
        }
        return "Simulación de carrera en pista y tolerancia láctica: sprints explosivos con recuperación anaeróbica aláctica y láctica. Mantener técnica bajo fatiga extrema.";
    }
    if (blockKey === 'stretch') {
        return "Ubicación: POST-ENTRENAMIENTO. Estirar profundamente antes de entrenar reduce la potencia contráctil del músculo. Después de la rutina, ayuda a devolver la longitud al tejido, reduce el tono muscular y mejora la flexibilidad. Sostener 20-30s sin rebotar.";
    }
    if (blockKey === 'recovery') {
        return "Protocolo de Visualización Guiada (Imagery) y Respiración 4-4-6: Visualizar el partidor, la caída de la reja ('Ok riders, random start...'), la primera recta y la técnica activa las mismas rutas neuronales que el movimiento físico.";
    }
    return "";
}
