import type { UpdateBranchFormData } from '@/modules/branches/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput } from '@/core/components/form-fields/form-input';
import { FormInputNumber } from '@/core/components/form-fields/form-input-number';
import { FormSelect } from '@/core/components/form-fields/form-select';
import { Button } from '@/core/components/ui/button';
import { FieldGroup } from '@/core/components/ui/field';
import { Spinner } from '@/core/components/ui/spinner';
import { convertCase } from '@/core/lib/utils';
import { branchStatuses } from '@/modules/branches/constants';
import { updateBranchFormSchema } from '@/modules/branches/schemas';

export function UpdateBranchForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: BranchFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(updateBranchFormSchema),
    defaultValues: {
      ...defaultValues,
      status: convertCase(
        defaultValues?.status ?? branchStatuses[0],
      ) as UpdateBranchFormData['status'],
    },
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;
  const statusOptions = branchStatuses.map((s) => ({
    value: s,
    label: t(`constants.status.${s}`),
  }));

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

        <FormSelect
          control={form.control}
          name="status"
          label={t('branches:fields.status')}
          placeholder={t('branches:forms.placeholders.status')}
          options={statusOptions}
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
          <Button
            type="submit"
            disabled={isSubmitting || !form.formState.isDirty}
          >
            {isSubmitting && <Spinner />}
            {submitLabel ?? t('actions.save')}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export type BranchFormProps = {
  defaultValues: UpdateBranchFormData;
  onSubmit: (data: UpdateBranchFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
};
