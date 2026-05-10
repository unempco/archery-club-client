import type { DateFormat } from '@/core/constants/dates';
import type { FormField } from '@/core/types/components';
import type { FieldValues } from 'react-hook-form';

import { Controller } from 'react-hook-form';

import { DatePicker } from '@/core/components/ui/date-picker';
import { Field, FieldError, FieldLabel } from '@/core/components/ui/field';

export function FormDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  required,
  dateFormat,
}: FormDatePickerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel required={required}>{label}</FieldLabel>
          <DatePicker
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            dateFormat={dateFormat}
            disabled={disabled}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export type FormDatePickerProps<T extends FieldValues> = FormField<T> & {
  dateFormat?: DateFormat;
};
