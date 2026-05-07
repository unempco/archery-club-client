export const ApiPermissions = {
  Dummies: {
    CREATE: 'Dummies.Write',
    READ: 'Dummies.Read',
    UPDATE: 'Dummies.Modify',
    DELETE: 'Dummies.Delete',
  },
  Branches: {
    CREATE: 'Branches.Write',
    READ: 'Branches.Read',
    UPDATE: 'Branches.Modify',
    DELETE: 'Branches.Delete',
  },
  Cycles: {
    CREATE: 'Cycles.Write',
    READ: 'Cycles.Read',
    UPDATE: 'Cycles.Modify',
    DELETE: 'Cycles.Delete',
  },
  Groups: {
    CREATE: 'Groups.Write',
    READ: 'Groups.Read',
    UPDATE: 'Groups.Modify',
    DELETE: 'Groups.Delete',
  },
  Sessions: {
    CREATE: 'Sessions.Write',
    READ: 'Sessions.Read',
    UPDATE: 'Sessions.Modify',
    DELETE: 'Sessions.Delete',
  },
  MaintenanceLogs: {
    CREATE: 'MaintenanceLogs.Write',
    READ: 'MaintenanceLogs.Read',
    UPDATE: 'MaintenanceLogs.Modify',
    DELETE: 'MaintenanceLogs.Delete',
  },
  Targets: {
    CREATE: 'Targets.Write',
    READ: 'Targets.Read',
    UPDATE: 'Targets.Modify',
    DELETE: 'Targets.Delete',
  },
  Users: {
    CREATE: 'Users.Write',
    READ: 'Users.Read',
    UPDATE: 'Users.Modify',
    DELETE: 'Users.Delete',
  },
  Roles: {
    CREATE: 'Roles.Write',
    READ: 'Roles.Read',
    UPDATE: 'Roles.Modify',
    DELETE: 'Roles.Delete',
  },
} as const;
