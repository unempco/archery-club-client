import type { Target } from '@/modules/targets/types';

import { TargetIcon } from '@phosphor-icons/react';

import { Card, CardContent, CardHeader } from '@/core/components/ui/card';
import { cn } from '@/core/lib/utils';
import { TargetActions } from '@/modules/targets/components/target-actions';
import { TargetDetail } from '@/modules/targets/components/target-detail';

export function TargetCard({ target, className }: TargetCardProps) {
  return (
    <Card
      className={cn(
        'group relative flex flex-col gap-0 overflow-hidden border transition-shadow duration-200 hover:shadow-md',
        target.isDeleted && 'opacity-60',
        className,
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-3 pt-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/20 bg-muted text-muted-foreground">
            <TargetIcon size={18} weight="duotone" />
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold leading-tight tracking-tight">
              {target.name}
            </p>
            <p className="text-xs text-muted-foreground">ID #{target.id}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <TargetActions target={target} />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 pb-4">
        <TargetDetail target={target} />
      </CardContent>
    </Card>
  );
}

interface TargetCardProps {
  target: Target;
  className?: string;
}
