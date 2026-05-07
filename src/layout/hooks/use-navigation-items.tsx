import type { NavigationGroup, NavigationItem } from '@/layout/types';

import {
  BookmarksIcon,
  ChartPieIcon,
  GearIcon,
  InfoIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function useNavigationItems(): UseNavigationItemsReturn {
  const { t } = useTranslation();

  return {
    main: [
      {
        label: t('layout:navigation.tools'),
        items: [
          {
            title: t('layout:navigation.dashboard'),
            url: '/app/dashboard',
            icon: ChartPieIcon,
          },
          {
            title: t('dummies:name'),
            url: '/app/dummies',
            icon: BookmarksIcon,
            permissions: ApiPermissions.Dummies.READ,
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
