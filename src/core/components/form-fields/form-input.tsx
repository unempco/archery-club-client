import type { FormField } from '@/core/types/components';
import type { FieldValues } from 'react-hook-form';

import { Controller } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/core/components/ui/field';
import { Input } from '@/core/components/ui/input';

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  placeholder,
  disabled,
  required,
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel required={required}>{label}</FieldLabel>
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            onChange={
              type === 'number'
                ? (e) => field.onChange(e.target.valueAsNumber)
                : field.onChange
            }
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export type FormInputProps<T extends FieldValues> = FormField<T> & {
  type?: React.HTMLInputTypeAttribute;
};
