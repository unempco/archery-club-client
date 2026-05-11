import { useTranslation } from 'react-i18next';

import { PageHeader } from '@/modules/shared/components/page-header';

export function SessionsHeader({ titleVariant }: SessionsHeaderProps) {
  const { t } = useTranslation();

  return <PageHeader title={t('sessions:name')} titleVariant={titleVariant} />;
}

export type SessionsHeaderProps = {
  titleVariant?: 'h1' | 'h2' | 'h3';
};
