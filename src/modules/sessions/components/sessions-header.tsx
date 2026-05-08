import { useTranslation } from 'react-i18next';

import { PageHeader } from '@/modules/shared/components/page-header';

export function SessionsHeader() {
  const { t } = useTranslation();

  return <PageHeader title={t('sessions:name')} />;
}
