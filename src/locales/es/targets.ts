export const targets = {
  name: 'Dianas',
  name_one: 'Diana',
  name_other: 'Dianas',
  fields: {
    usageCount: 'Veces usado',
    branch: 'Locación',
    retiredAt: 'Retirado en',
  },
  actions: {
    viewLogs: 'Ver registros',
  },
  constants: {
    status: {
      retired: 'Retirado',
      underMaintenance: 'En mantenimiento',
    },
  },
  messages: {},
  filters: {},
  dialogs: {
    create: {
      title: 'Añadir diana',
    },
    update: {
      title: 'Editar diana',
    },
  },
  forms: {
    placeholders: {
      name: 'Ej. "DIA-001"',
      branch: 'Seleccionan una locación',
    },
  },
};
