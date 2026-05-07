import type { TFunction } from 'i18next';

import { toast } from 'sonner';

import { NotOkResponseError } from '@/core/errors';

export function onMutationError(
  t: TFunction,
  fallbackKey = 'core:messages.unableToHandleAction',
) {
  return (e: Error) => {
    if (e instanceof NotOkResponseError) {
      toast.error(t(`statusCodes:${e.status}.short`), {
        description: t(e.detail),
      });
    } else {
      toast.error(t(fallbackKey));
    }
  };
}
