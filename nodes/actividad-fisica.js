export default {
  key: 'actividad-fisica',
  label: 'Actividad Física',
  category: 'fisico',

  definition: 'Cualquier movimiento corporal producido por los músculos esqueléticos que exija un gasto de energía. Abarca desde las tareas cotidianas y el trabajo hasta el ejercicio y el deporte, es decir, todo movimiento voluntario que rompe el estado de reposo y activa el metabolismo.',

  question: 'No siempre es fácil llevar a cabo una rutina de actividad física. ¿Crees que en tu día a día la llevas?',

  responses: {
    si: {
      heading: '¡Zorionak!',
      text: 'Nos alegra saber que cuidas esta parte tan importante del autocuidado físico. Llevar a cabo una actividad física adecuada para la edad y condición de cada uno es fundamental para sostener tu bienestar en el día a día. ¡Sigue así!',
      learnMore: 'La investigación muestra que la realización de actividad física tiene una influencia determinante en la salud y el bienestar.',
    },
    no: {
      heading: 'Vaya…',
      text: 'La realización de actividad física es una parte muy importante del autocuidado físico. Mantener hábitos donde se incluye tiene beneficios importantes para la salud de las personas.',
      learnMore: 'La investigación muestra que mantenerse activo físicamente no solo tiene beneficios físicos, sino también psicológicos.',
    },
    unsure: {
      heading: 'Es normal',
      text: 'Hoy en día llevamos una vida bastante sedentaria y no somos conscientes de hasta qué punto es recomendable que nos activemos. Nos alegra que estés interesada/o en conocerlos. Según la OMS, la actividad física es cualquier movimiento corporal que exija un gasto de energía superior al estado de reposo.',
      learnMore: 'La investigación muestra que mantenerse activo físicamente no solo tiene beneficios físicos, sino también psicológicos.',
    },
  },

  evidence: {
    intro: 'La actividad física regular aporta beneficios amplios: reduce el riesgo de muchas enfermedades, mejora la salud mental y aumenta la calidad y esperanza de vida. Los efectos aparecen incluso con niveles moderados de ejercicio y en todas las edades.',
    images: ['assets/images/slide028_1.png', 'assets/images/slide028.png'],
    bullets: [
      'Menor riesgo de enfermedad cardiovascular, diabetes tipo 2, cáncer de mama y colon, osteoporosis y síndrome metabólico (Aditya Mahindru et al., 2023; Malm et al., 2019).',
      'El ejercicio reduce síntomas de depresión, ansiedad y estrés, mejora el estado de ánimo, el sueño y la calidad de vida (Aditya Mahindru et al., 2023).',
      'También mejora autoestima, imagen corporal, sentido de competencia y apoyo social (Rhiannon et al., 2024).',
      'Cualquier nivel de actividad es mejor que el sedentarismo; los beneficios aumentan al subir la cantidad, especialmente para ánimo y ansiedad (Kalfin et al., 2024; Malm et al., 2019).',
    ],
  },

  tips: {
    intro: 'Pequeños cambios en el día a día pueden marcar la diferencia:',
    images: ['assets/images/slide028_2.png', 'assets/images/slide029.png'],
    items: [
      'Realiza diferentes ráfagas de movimiento breves de 5 a 10 minutos (ejemplo: subir escaleras).',
      'Por cada media hora sentado, levántate y estírate o camina durante 2 minutos.',
      'En la medida de lo posible, camina para desplazarte.',
      'Busca y apúntate a alguna actividad que te guste e implique movimiento (bailar, caminar, deporte).',
      'Socializa a través de la actividad física — el compromiso social mejora la constancia (ejemplo: queda con un amigo para caminar en vez de para tomar un café).',
      'Incluye la actividad física cuando planifiques tu día.',
      'Comienza planteándote objetivos razonables y elige actividades de intensidad, volumen y frecuencia acorde a tu condición.',
    ],
    links: [
      {
        label: 'Guía para planificar y empezar con actividad física (Gencat / Comunidad de Madrid)',
        url: 'https://scientiasalut.gencat.cat/bitstream/handle/11351/6831.2/guia_ajuda_per_fer_mes_activitat_fisica_quatre_passos_2024_cas.pdf?sequence=10&isAllowed=y',
      },
    ],
  },
};
