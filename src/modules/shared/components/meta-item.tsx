import type { Icon } from '@phosphor-icons/react';

export function MetaItem({ icon: Icon, label, value }: MetaItemProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon
        size={14}
        weight="duotone"
        className="shrink-0 text-muted-foreground"
      />
      <span className="text-muted-foreground">{label}</span>
      <span className="ml-auto font-medium tabular-nums text-foreground">
        {value}
      </span>
    </div>
  );
}

export type MetaItemProps = {
  icon: Icon;
  label: string;
  value: React.ReactNode;
};
