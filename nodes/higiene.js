export default {
  key: 'higiene',
  label: 'Higiene y Cuidado Personal',
  category: 'fisico',

  definition: 'La higiene personal puede definirse como una práctica que contribuye a mantener la salud y prevenir enfermedades, especialmente a través de la limpieza personal. Es darle al cuerpo la atención y limpieza para que funcione sin riesgo de enfermedades. (Satish Kumar et al., 2020)',

  question: 'Seguramente sientas que mantienes unos hábitos adecuados de higiene y cuidado personal físico en tu día a día. PERO… ¿has notado momentos de dejadez física por cansancio o sobrecarga?',

  responses: {
    si: {
      heading: '¡Zorionak!',
      text: 'Nos alegra saber que cuidas esta parte tan importante del autocuidado físico. Mantener hábitos de higiene y cuidado personal es una base fundamental para sostener tu bienestar en el día a día. Sigue así, incluso en los momentos de más carga.',
      learnMore: 'La investigación muestra que mantener rutinas básicas de cuidado corporal no solo tiene beneficios físicos, sino también psicológicos.',
    },
    no: {
      heading: 'Vaya…',
      text: 'La higiene y cuidado personal son una parte muy importante del autocuidado físico. Mantener estos hábitos es una base fundamental para sostener tu bienestar en el día a día, incluso en los momentos de más carga.',
      learnMore: 'La investigación muestra que mantener rutinas básicas de cuidado corporal no solo tiene beneficios físicos, sino también psicológicos.',
    },
    unsure: {
      heading: 'Es normal',
      text: 'La higiene y cuidado físico contempla un montón de factores que pueden ser difíciles de identificar. Nos alegra que estés interesada/o en conocerlos. Mantener estos hábitos es una base fundamental para sostener tu bienestar en el día a día.',
      learnMore: 'La investigación muestra que mantener rutinas básicas de cuidado corporal no solo tiene beneficios físicos, sino también psicológicos.',
    },
  },

  evidence: {
    intro: 'La evidencia científica respalda la importancia de la higiene personal:',
    bullets: [
      'Una buena higiene y aseo personal es la principal barrera contra numerosas enfermedades transmisibles e infecciones, incluyendo las fecales-orales y respiratorias (Satish Kumar et al., 2020; UNICEF).',
      'Cuando las personas conocen bien las formas de mantener la higiene personal, contribuyen significativamente a promover la buena salud y el bienestar, tanto físico como psicológico (Kapur, 2023).',
      'Las rutinas de higiene mejoran los rasgos generales de la personalidad y las condiciones de vida (Kapur, 2023).',
    ],
  },

  tips: {
    intro: 'Las rutinas físicas básicas funcionan como señales externas de autocuidado. Algunos de los principales hábitos de higiene son:',
    items: [
      'Bañarse o ducharse diariamente.',
      'Cuidar la higiene dental.',
      'Cuidar el cabello.',
      'Lavarse los pies adecuadamente, incluyendo el cuidado de las uñas.',
      'Lavarse las manos frecuentemente — especialmente después de tocar animales, toser o estornudar, o estar cerca de alguien enfermo.',
      'Lavado de ropa regular.',
      'Mantener limpios los espacios o ambientes en los que se convive.',
      'Cuidar la preparación de los alimentos.',
    ],
    links: [],
  },
};
