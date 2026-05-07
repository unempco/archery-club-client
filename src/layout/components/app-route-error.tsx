import {
  ArrowCounterClockwiseIcon,
  ArrowLeftIcon,
  WarningDiamondIcon,
  WifiSlashIcon,
} from '@phosphor-icons/react';
import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/core/components/ui/badge';
import { Button } from '@/core/components/ui/button';
import { NotOkResponseError } from '@/core/errors';

interface RouteErrorProps {
  error?: unknown;
  reset?: () => void;
}

const isDev = import.meta.env.DEV;

export function AppRouteError({ error, reset }: RouteErrorProps) {
  const { t } = useTranslation(['statusCodes', 'layout']);
  const router = useRouter();

  const isNotOkError = error instanceof NotOkResponseError;
  const isNotFound = !error; // used as notFoundComponent (no error prop)

  // Resolve status code: from API error, or 404 for not-found
  const status: number | undefined = isNotOkError
    ? error.status
    : isNotFound
      ? 404
      : undefined;

  // Resolve title & detail
  const title = isNotOkError
    ? error.title
    : isNotFound
      ? t(`${status}.short`, {
          ns: 'statusCodes',
          defaultValue: t('layout:errors.notFound'),
        })
      : t('layout:errors.unexpectedError');

  const detail = isNotOkError
    ? error.detail
    : isNotFound
      ? t(`${status}.large`, {
          ns: 'statusCodes',
          defaultValue: t('layout:errors.notFoundDetail'),
        })
      : t('layout:errors.unexpectedErrorDetail');

  const statusLabel = status
    ? t(`${status}.short`, { ns: 'statusCodes', defaultValue: String(status) })
    : undefined;

  // Generic JS error message (non-API)
  const genericMessage =
    !isNotOkError && !isNotFound && error instanceof Error
      ? error.message
      : undefined;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      {/* Icon */}
      <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        {isNotFound ? (
          <WifiSlashIcon className="size-8" weight="duotone" />
        ) : (
          <WarningDiamondIcon className="size-8" weight="duotone" />
        )}
      </div>

      {/* Status badge */}
      {status && (
        <Badge variant="destructive" className="mb-3 uppercase tracking-widest">
          {status}&nbsp;·&nbsp;{statusLabel}
        </Badge>
      )}

      {/* Title */}
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h1>

      {/* Detail */}
      <p className="mb-8 max-w-md text-sm text-muted-foreground">{detail}</p>

      {/* Dev-only details */}
      {isDev && (
        <details className="mb-8 w-full max-w-xl rounded-2xl border border-border bg-card text-left text-xs">
          <summary className="cursor-pointer select-none px-4 py-2 font-mono font-semibold text-muted-foreground hover:text-foreground">
            🛠 Dev details
          </summary>
          <div className="space-y-3 p-4 font-mono">
            {isNotOkError && (
              <>
                {error.type && <DevRow label="type" value={error.type} />}
                {error.instance && (
                  <DevRow label="instance" value={error.instance} />
                )}
              </>
            )}
            {genericMessage && (
              <DevRow label="message" value={genericMessage} />
            )}
            {error instanceof Error && error.stack && (
              <div>
                <span className="mb-1 block text-muted-foreground">stack</span>
                <pre className="overflow-x-auto whitespace-pre-wrap break-all text-foreground/80">
                  {error.stack}
                </pre>
              </div>
            )}
          </div>
        </details>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="outline" onClick={() => router.history.back()}>
          <ArrowLeftIcon />
          {t('layout:errors.goBack')}
        </Button>

        {reset && (
          <Button onClick={reset}>
            <ArrowCounterClockwiseIcon />
            {t('layout:errors.tryAgain')}
          </Button>
        )}
      </div>
    </div>
  );
}

function DevRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="w-20 shrink-0 text-muted-foreground">{label}</span>
      <span className="break-all text-foreground/80">{value}</span>
    </div>
  );
}
