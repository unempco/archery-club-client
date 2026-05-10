import type { FormField } from '@/core/types/components';
import type { FieldValues } from 'react-hook-form';

import { Controller } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/core/components/ui/field';
import { Textarea } from '@/core/components/ui/textarea';

export function FormTextarea<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  required,
  rows,
}: FormTextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel required={required}>{label}</FieldLabel>
          <Textarea
            {...field}
            rows={rows}
            placeholder={placeholder}
            disabled={disabled}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export type FormTextareaProps<T extends FieldValues> = FormField<T> & {
  rows?: number;
};
