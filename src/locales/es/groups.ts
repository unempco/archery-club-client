export const groups = {
  name: 'Grupos',
  name_one: 'Grupo',
  name_other: 'Grupos',
  fields: {
    weekday: 'Día de la semana',
    startTime: 'Hora de inicio',
    duration: 'Duración (minutos)',
    cycle: 'Ciclo',
  },
  actions: {},
  constants: {
    weekdays: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ],
  },
  messages: {},
  filters: {},
  forms: {
    add: {
      title: 'Crear Grupo',
    },
    edit: {
      title: 'Editar Grupo',
    },
    placeholders: {
      name: 'Ej. "Grupo A"',
      cycle: 'Selecciona un ciclo',
    },
  },
};
