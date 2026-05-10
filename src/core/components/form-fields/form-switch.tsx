import type { FormField } from '@/core/types/components';
import type { FieldValues } from 'react-hook-form';

import { Controller } from 'react-hook-form';

import { Field, FieldLabel } from '@/core/components/ui/field';
import { Switch } from '@/core/components/ui/switch';

export function FormSwitch<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
  required,
}: FormSwitchProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field className="flex-row items-center gap-3">
          <Switch
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={disabled}
          />
          <FieldLabel className="mb-0" required={required}>
            {label}
          </FieldLabel>
        </Field>
      )}
    />
  );
}

export type FormSwitchProps<T extends FieldValues> = Omit<
  FormField<T>,
  'placeholder'
>;
