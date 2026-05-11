import type { CreateBranchFormData } from '@/modules/branches/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput } from '@/core/components/form-fields/form-input';
import { FormInputNumber } from '@/core/components/form-fields/form-input-number';
import { Button } from '@/core/components/ui/button';
import { FieldGroup } from '@/core/components/ui/field';
import { Spinner } from '@/core/components/ui/spinner';
import { createBranchFormSchema } from '@/modules/branches/schemas';

export function CreateBranchForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: BranchFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(createBranchFormSchema),
    defaultValues: {
      name: '',
      maintenanceThreshold: 35,
      maintenanceWarningOffset: 7,
      ...defaultValues,
    },
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;

  const maintenanceThreshold = form.watch('maintenanceThreshold');

  return (
    <form id="branch-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="name"
          label={t('branches:fields.name')}
          placeholder={t('branches:forms.placeholders.name')}
          disabled={isSubmitting}
          required
        />

        <FormInputNumber
          control={form.control}
          name="maintenanceThreshold"
          label={t('branches:fields.maintenanceThreshold')}
          disabled={isSubmitting}
          min={0}
          step={1}
          required
        />
        <FormInputNumber
          control={form.control}
          name="maintenanceWarningOffset"
          label={t('branches:fields.maintenanceWarningOffset')}
          disabled={isSubmitting}
          min={0}
          max={maintenanceThreshold}
          step={1}
          required
        />

        <div className="flex justify-end gap-2 pt-2">
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {t('actions.cancel')}
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Spinner />}
            {submitLabel ?? t('actions.save')}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export type BranchFormProps = {
  defaultValues?: Partial<CreateBranchFormData>;
  onSubmit: (data: CreateBranchFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
};
