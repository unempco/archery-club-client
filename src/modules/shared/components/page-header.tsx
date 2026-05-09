import { ArrowLeftIcon } from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';

import { Button } from '@/core/components/ui/button';
import { Typography } from '@/core/components/ui/typography';
import { cn } from '@/core/lib/utils';

export function PageHeader({
  title,
  titleVariant = 'h1',
  itemId,
  className,
  backTo,
  afterTitleSlot,
  children,
  ...restOfProps
}: PageHeaderProps) {
  return (
    <div className={cn('flex justify-between', className)} {...restOfProps}>
      <div className="flex items-center gap-2">
        {backTo && (
          <Button
            asChild
            variant="secondary"
            size="icon"
            className="animate-in fade-in duration-300"
          >
            <Link to={backTo}>
              <ArrowLeftIcon />
            </Link>
          </Button>
        )}
        <Typography
          variant={titleVariant}
          as="h1"
          className="animate-in fade-in slide-in-from-left-5 duration-300"
        >
          {title}
        </Typography>
        {itemId && (
          <Typography
            variant={titleVariant}
            as="span"
            className="font-normal text-muted-foreground"
          >
            {`#${itemId}`}
          </Typography>
        )}
        {afterTitleSlot && (
          <div className="animate-in fade-in duration-300">
            {afterTitleSlot}
          </div>
        )}
      </div>

      {children && (
        <div
          className={cn(
            'flex gap-2',
            'animate-in fade-in slide-in-from-right-5 duration-300',
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export type PageHeaderProps = React.ComponentProps<'div'> & {
  title: string;
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4';
  itemId?: string | number;
  backTo?: string;
  afterTitleSlot?: React.ReactNode;
  children?: React.ReactNode;
};
