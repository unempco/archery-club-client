import type { UpdateCycleFormData } from '@/modules/cycles/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput } from '@/core/components/form-fields/form-input';
import { FormSelect } from '@/core/components/form-fields/form-select';
import { Button } from '@/core/components/ui/button';
import { FieldGroup } from '@/core/components/ui/field';
import { Spinner } from '@/core/components/ui/spinner';
import { convertCase } from '@/core/lib/utils';
import { CycleStatus, cycleStatuses } from '@/modules/cycles/constants';
import { updateCycleFormSchema } from '@/modules/cycles/schemas';

export function UpdateCycleForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: CycleFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(updateCycleFormSchema),
    defaultValues: {
      ...defaultValues,
      status: convertCase(
        defaultValues?.status ?? CycleStatus.ACTIVE,
      ) as UpdateCycleFormData['status'],
    },
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;
  const statusOptions = cycleStatuses.map((s) => ({
    value: s,
    label: t(`constants.status.${s}`),
  }));

  return (
    <form id="cycle-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="name"
          label={t('cycles:attribs.name')}
          placeholder={t('cycles:forms.placeholders.name')}
          disabled={isSubmitting}
        />
        <FormSelect
          control={form.control}
          name="status"
          label={t('cycles:attribs.status')}
          placeholder={t('cycles:forms.placeholders.status')}
          options={statusOptions}
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

export type CycleFormProps = {
  defaultValues: UpdateCycleFormData; // undefined = create, populated = update
  onSubmit: (data: UpdateCycleFormData) => void;
  onCancel?: () => void; // optional — useful in modals
  isLoading?: boolean;
  submitLabel?: string; // override "Save" if needed
};
