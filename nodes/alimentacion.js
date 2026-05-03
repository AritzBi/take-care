export default {
  key: 'alimentacion',
  label: 'Alimentación',
  category: 'fisico',

  definition: 'La alimentación saludable puede adoptar muchas formas, pero debe basarse siempre en cuatro principios fundamentales: adecuación, equilibrio, moderación y diversidad. (OMS, 2026)',

  question: 'No siempre es fácil llevar a cabo una alimentación saludable. ¿Crees que en tu día a día llevas una dieta equilibrada?',

  responses: {
    si: {
      heading: '¡Zorionak!',
      text: 'Nos alegra saber que cuidas esta parte tan importante del autocuidado físico. Llevar a cabo una alimentación saludable y equilibrada es fundamental para sostener tu bienestar en el día a día. ¡Sigue así!',
      learnMore: 'La investigación muestra que la alimentación tiene una influencia determinante en la salud y el bienestar.',
    },
    no: {
      heading: 'Vaya…',
      text: 'La alimentación es una parte muy importante del autocuidado físico. Mantener hábitos de alimentación saludable tiene beneficios importantes para la salud de las personas.',
      learnMore: 'La investigación muestra que mantener una alimentación saludable no solo tiene beneficios físicos, sino también psicológicos.',
    },
    unsure: {
      heading: 'Es normal',
      text: 'Saber qué es exactamente lo que se entiende por alimentación saludable no es sencillo. Nos alegra que estés interesada/o en conocerlos. Una alimentación saludable consiste en comer completo, equilibrado, suficiente y variado.',
      learnMore: 'La investigación muestra que mantener una alimentación saludable no solo tiene beneficios físicos, sino también psicológicos.',
    },
  },

  evidence: {
    intro: 'La evidencia científica muestra consistentemente que:',
    images: ['assets/images/slide016.png'],
    bullets: [
      'Mejores patrones dietéticos se asocian con mayor calidad de vida en dominios físicos, emocionales y sociales, tanto en adultos como en niños y adolescentes (Godos et al., 2025).',
      'Dietas de tipo mediterráneo o similares muestran menor probabilidad de depresión, y en algunos casos también menos ansiedad y estrés (Kris-Etherton et al., 2020).',
      'Una dieta de buena calidad se asocia con menos estrés y depresión y mejor calidad de vida, especialmente en mujeres (Kim et al., 2023).',
      'Seguir patrones saludables reduce claramente el riesgo de cardiopatía, diabetes tipo 2 y cáncer (Peilu Wang et al., 2023).',
    ],
  },

  tips: {
    intro: 'Para que una alimentación se considere saludable, debe cumplir con cuatro condiciones:',
    items: [
      'Completa: debe aportar todos los nutrientes que necesita el organismo (hidratos de carbono, grasas, proteínas, vitaminas, minerales y agua).',
      'Equilibrada: los nutrientes deben guardar una proporción adecuada entre sí.',
      'Suficiente: la cantidad de alimentos debe ser la justa para mantener el peso dentro de los rangos de normalidad.',
      'Variada: debe incluir diferentes alimentos de cada grupo para asegurar que recibimos todos los micronutrientes necesarios.',
    ],
    links: [],
  },
};
