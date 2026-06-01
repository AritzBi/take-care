export default {
  key: 'mindfulness',
  label: 'Mindfulness / Atención Consciente',
  category: 'espiritual',

  definition: 'El mindfulness puede concebirse como una forma de atención consciente al momento presente, caracterizada por una actitud de observación sin juicios, reactiva ni evaluativa, y con una disposición abierta. Esta conciencia se desarrolla mediante una manera específica de atender a la experiencia inmediata. (Kabat-Zinn, 2015)',

  question: '¿Practicas meditación o atención consciente, aunque sea de forma breve? Incluye mindfulness formal o atención plena en actividades cotidianas.',

  responses: {
    si: {
      heading: '¡Zorionak!',
      text: 'Nos alegra saber que incorporas la meditación o la práctica de mindfulness en tu día a día. Dedicar tiempo a la atención consciente te permite conectar con el momento presente, escuchar tus señales internas y relacionarte con tus experiencias de una manera más calmada y no enjuiciadora. Seguir cultivando esta práctica puede ayudarte a gestionar mejor el estrés y a cuidar tu bienestar emocional, especialmente en contextos de alta demanda como la docencia.',
      learnMore: 'La investigación indica que la práctica de la atención consciente o mindfulness tiene efectos positivos sobre el bienestar global y contribuye a afrontar de manera más eficaz las demandas del día a día.',
    },
    no: {
      heading: 'Vaya…',
      text: 'Puede que ahora mismo no practiques la atención consciente o mindfulness, y eso es totalmente comprensible. Aun así, prestar atención a lo que ocurre dentro de ti es una parte importante del bienestar global. Empezar no implica hacerlo "bien" ni de forma perfecta, sino simplemente detenerse de vez en cuando y observar con curiosidad lo que está pasando.',
      learnMore: 'La investigación indica que la práctica de la atención consciente o mindfulness tiene efectos positivos sobre el bienestar global y contribuye a afrontar de manera más eficaz las demandas del día a día.',
    },
    unsure: {
      heading: 'Es completamente normal',
      text: 'La práctica de la atención consciente o mindfulness puede adoptar muchas formas y no siempre resulta fácil identificar si la estamos practicando o en qué medida. Nos alegra que te interese conocer y explorar mejor esta parte del autocuidado y el bienestar personal.',
      learnMore: 'La investigación indica que la práctica de la atención consciente o mindfulness tiene efectos positivos sobre el bienestar global y contribuye a afrontar de manera más eficaz las demandas del día a día.',
    },
  },

  evidence: {
    intro: 'La literatura científica respalda ampliamente la eficacia del mindfulness:',
    bullets: [
      'Las prácticas de mindfulness se asocian con el fortalecimiento de procesos cognitivos como la memoria, la capacidad cognitiva y la regulación de las respuestas emocionales (Tejada-Simón y Lodhi, 2022).',
      'La meditación se relaciona con una menor presencia de síntomas mentales, emocionales y físicos vinculados al estrés, el agotamiento y los sentimientos de desesperanza.',
      'Incluso intervenciones breves pueden influir en múltiples resultados de salud, incluso tras una sola sesión de tan solo 5 minutos (Howarth et al., 2019).',
    ],
  },

  tips: {
    intro: 'Integrar micro-pausas conscientes de 30–60 segundos a lo largo del día ayuda a regular el estrés en tiempo real:',
    images: ['assets/images/slide089_1.png', 'assets/images/slide089.png', 'assets/images/slide089_2.png'],
    items: [
      'Lávate los dientes prestando atención a las sensaciones y movimientos.',
      'Durante la ducha, nota el contacto del agua con el cuerpo.',
      'Al conducir o caminar, sé consciente de la respiración y del entorno.',
      'Antes de empezar una tarea, detente brevemente para conectar con el cuerpo y la respiración.',
      'Recuerda que no es necesario dedicar mucho tiempo: unos pocos minutos al día, de forma regular, ya pueden marcar la diferencia.',
      'En el campus de Bilbao de la Universidad de Deusto se practica mindfulness de 14h a 15h en la capilla.',
    ],
    links: [
      {
        label: 'Para la mañana (5 min) — Empezar el día con calma y claridad mental',
        url: 'https://www.youtube.com/watch?v=FAk0K00j1ps',
      },
      {
        label: 'Para cualquier momento del día (6 min) — Pausa consciente y reducción del estrés',
        url: 'https://www.youtube.com/watch?v=0sjVoX5ASwg',
      },
      {
        label: 'Para la noche (10 min) — Mindfulness para un sueño reparador',
        url: 'https://www.youtube.com/watch?v=fcsFdEqOeCI',
      },
    ],
  },
};
