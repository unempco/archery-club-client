import type { UpdateTargetFormData } from '@/modules/targets/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput } from '@/core/components/form-fields/form-input';
import { FormSelect } from '@/core/components/form-fields/form-select';
import { Button } from '@/core/components/ui/button';
import { FieldGroup } from '@/core/components/ui/field';
import { Spinner } from '@/core/components/ui/spinner';
import { convertCase } from '@/core/lib/utils';
import { TargetStatus, targetStatuses } from '@/modules/targets/constants';
import { updateTargetFormSchema } from '@/modules/targets/schemas';

export function UpdateTargetForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: TargetFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(updateTargetFormSchema),
    defaultValues: {
      ...defaultValues,
      status: convertCase(
        defaultValues?.status ?? TargetStatus.ACTIVE,
      ) as UpdateTargetFormData['status'],
    },
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;
  const statusOptions = targetStatuses.map((s) => ({
    value: s,
    label: t(`targets:constants.status.${s}`),
  }));

  return (
    <form id="target-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="name"
          label={t('targets:fields.name')}
          placeholder={t('targets:forms.placeholders.name')}
          disabled={isSubmitting}
        />
        <FormSelect
          control={form.control}
          name="status"
          label={t('targets:fields.status')}
          placeholder={t('targets:forms.placeholders.status')}
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

export type TargetFormProps = {
  defaultValues: UpdateTargetFormData; // undefined = create, populated = update
  onSubmit: (data: UpdateTargetFormData) => void;
  onCancel?: () => void; // optional — useful in modals
  isLoading?: boolean;
  submitLabel?: string; // override "Save" if needed
};
