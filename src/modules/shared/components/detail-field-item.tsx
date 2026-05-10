import { cn } from '@/core/lib/utils';

export function DetailFieldItem({
  icon: Icon,
  label,
  value,
  className,
  ...restOfProps
}: DetailFieldItemProps) {
  return (
    <div
      className={cn('flex items-center gap-1 text-sm', className)}
      {...restOfProps}
    >
      <Icon
        weight="duotone"
        className="shrink-0 text-muted-foreground size-3.5"
      />
      <span className="text-muted-foreground">{label}</span>
      <span className="ml-auto font-medium tabular-nums text-foreground">
        {value}
      </span>
    </div>
  );
}

export type DetailFieldItemProps = React.ComponentProps<'div'> & {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
};
