import type { NavigationGroup, NavigationItem } from '@/layout/types';

import {
  BuildingOfficeIcon,
  ChartDonutIcon,
  ClipboardTextIcon,
  ClockCountdownIcon,
  GearIcon,
  InfoIcon,
  KanbanIcon,
  SealCheckIcon,
  TargetIcon,
  UsersIcon,
  UsersThreeIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function useNavigationItems(): UseNavigationItemsReturn {
  const { t } = useTranslation();

  return {
    main: [
      {
        items: [
          {
            title: t('layout:navigation.dashboard'),
            url: '/app/dashboard',
            icon: ChartDonutIcon,
          },
        ],
      },
      {
        label: t('layout:navigation.business'),
        items: [
          {
            title: t('branches:name'),
            url: '/app/branches',
            icon: BuildingOfficeIcon,
            permissions: [ApiPermissions.Branches.READ],
          },
          {
            title: t('cycles:name'),
            url: '/app/cycles',
            icon: KanbanIcon,
            permissions: [ApiPermissions.Cycles.READ],
          },
          {
            title: t('groups:name'),
            url: '/app/groups',
            icon: UsersThreeIcon,
            permissions: [ApiPermissions.Groups.READ],
          },
          {
            title: t('sessions:name'),
            url: '/app/sessions',
            icon: ClockCountdownIcon,
            permissions: [ApiPermissions.Sessions.READ],
          },
        ],
      },
      {
        label: t('layout:navigation.equipment'),
        items: [
          {
            title: t('targets:name'),
            url: '/app/targets',
            icon: TargetIcon,
            permissions: [ApiPermissions.Targets.READ],
          },
          {
            title: t('maintenanceLogs:name'),
            url: '/app/maintenance-logs',
            icon: ClipboardTextIcon,
            permissions: [ApiPermissions.MaintenanceLogs.READ],
          },
        ],
      },
      {
        label: t('layout:navigation.admin'),
        items: [
          {
            title: t('users:name'),
            url: '/app/users',
            icon: UsersIcon,
            permissions: [ApiPermissions.Users.READ],
          },
          {
            title: t('roles:name'),
            url: '/app/roles',
            icon: SealCheckIcon,
            permissions: [ApiPermissions.Roles.READ],
          },
        ],
      },
    ],
    secondary: [
      {
        title: t('layout:navigation.settings'),
        url: '/app/settings',
        icon: GearIcon,
      },
      {
        title: t('layout:navigation.getHelp'),
        url: '/app/about',
        icon: InfoIcon,
      },
    ],
  };
}

export type UseNavigationItemsReturn = {
  main: NavigationGroup[];
  secondary: NavigationItem[];
};
