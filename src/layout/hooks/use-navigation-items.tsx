import type { NavigationGroup, NavigationItem } from '@/layout/types';

import {
  BuildingOfficeIcon,
  ChartDonutIcon,
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
        label: t('layout:navItems.tools'),
        items: [
          {
            title: t('layout:navItems.dashboard'),
            url: '/app/dashboard',
            icon: ChartDonutIcon,
          },
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
            title: t('targets:name'),
            url: '/app/targets',
            icon: TargetIcon,
            permissions: [ApiPermissions.Targets.READ],
          },
        ],
      },
      {
        label: t('layout:navItems.admin'),
        items: [
          {
            title: t('users:name'),
            url: '/app/users',
            icon: UsersIcon,
          },
          {
            title: t('roles:name'),
            url: '/app/roles',
            icon: SealCheckIcon,
          },
        ],
      },
    ],
    secondary: [
      {
        title: t('layout:navItems.settings'),
        url: '/app/settings',
        icon: GearIcon,
      },
      {
        title: t('layout:navItems.getHelp'),
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
