export default {
  key: 'afrontamiento',
  label: 'Estrategias de Afrontamiento Adaptativas',
  category: 'emocional',

  definition: 'Las estrategias de afrontamiento son el conjunto de esfuerzos cognitivos y conductuales que las personas utilizan para gestionar situaciones estresantes o demandas que se perciben como difíciles de superar. Se pueden clasificar en estrategias centradas en el problema (cuando se trabaja en resolver la situación) y centradas en la emoción (cuando el objetivo está en manejar lo que se siente), e incluyen recursos concretos como la planificación, la resolución de problemas, la aceptación, el uso del humor, la distracción o desconexión, y la búsqueda de apoyo social, entre otras. (Lazarus & Folkman, 1984)',

  question: '¿Crees que eres capaz de utilizar estrategias de afrontamiento positivas ante diferentes situaciones? Esto implica saber parar ante las situaciones que nos generan estrés para elegir las herramientas más apropiadas ante la situación que tenemos delante.',

  responses: {
    si: {
      heading: '¡Zorionak!',
      text: 'Nos alegra saber que eres capaz de gestionar las situaciones de estrés o los problemas del día a día de una forma adecuada, tomando aquellas decisiones o procesos que te permiten resolver el problema sin generar nuevas consecuencias de malestar. Recuerda que una estrategia positiva no es solo la que te permite resolver a corto plazo, sino también la que se sostiene a largo plazo.',
      learnMore: 'La investigación indica que la práctica de estrategias adaptativas se asocia con mejor bienestar, menos síntomas emocionales y mayor resiliencia.',
    },
    no: {
      heading: 'Vaya…',
      text: 'Puede que ahora mismo no sientas que las estrategias que utilizas a la hora de enfrentarte a las situaciones sean las más efectivas. No te preocupes: no siempre estamos en el mejor momento ni resolvemos las situaciones de la misma forma. Reconocerlo es el primer paso para cambiar y plantearse aprender estrategias más positivas para uno mismo. Poco a poco es posible.',
      learnMore: 'La investigación indica que la práctica de estrategias adaptativas se asocia con mejor bienestar, menos síntomas emocionales y mayor resiliencia.',
    },
    unsure: {
      heading: 'Es completamente normal',
      text: 'No siempre es fácil reconocer si las decisiones que tomamos o las respuestas que damos a lo que nos ocurre son las más adecuadas, porque muchas veces no nos detenemos a reflexionar sobre nuestras estrategias de afrontamiento. Nos alegra que te interese conocer y explorar un poco más sobre ello.',
      learnMore: 'La investigación indica que la práctica de estrategias adaptativas se asocia con mejor bienestar, menos síntomas emocionales y mayor resiliencia.',
    },
  },

  evidence: {
    intro: 'La literatura científica respalda de forma consistente el valor de las estrategias de afrontamiento adaptativas (Rolin et al., 2021; Roni Chaaya et al., 2025; Schwarzer et al., 2007; Zell et al., 2024):',
    bullets: [
      'Mayor bienestar y menor depresión cuando se usan estrategias activas, aceptación, reevaluación positiva y apoyo social.',
      'Las estrategias adaptativas (reencuadre, solución de problemas, gratitud) se vinculan con menos estrés; evitar o negar tiende a empeorarlo.',
      'En estudiantes de áreas de salud, las estrategias de planificación, solución de problemas y afrontamiento activo se asociaron con menores niveles de estrés y mejor salud psicológica.',
      'Un meta-análisis muestra que el apoyo social tiene una asociación considerable con un mejor ajuste psicológico (menos depresión, estrés y burnout; mejores resultados educativos y laborales) en distintas edades y culturas.',
      'El apoyo social actúa aumentando la autoeficacia y la resiliencia, generando una mayor sensación de competencia y adaptación en quienes lo ponen en práctica como estilo de afrontamiento.',
    ],
  },

  tips: {
    intro: 'Existen programas especializados para trabajar diferentes estrategias de afrontamiento. Estas intervenciones tienden a aumentar el afrontamiento activo (planificación, solución de problemas, búsqueda de apoyo, reevaluación positiva y autocontrol) y a reducir el estrés y los síntomas emocionales, mejorando el bienestar psicológico cuando se aplican con un diseño adecuado y un seguimiento suficiente.',
    items: [
      'Intervenciones cognitivo-conductuales y psicoeducativas estructuradas (online o presenciales).',
      'Programas de mindfulness y meditación.',
      'Entrenamiento en regulación e inteligencia emocional.',
      'Busca a tu alrededor recursos que puedan ofrecerlos: lugar de trabajo, centros de salud, asociaciones…',
      'Una lectura recomendada para empezar: «La trampa de la felicidad», de Russ Harris.',
    ],
    links: [],
  },
};
