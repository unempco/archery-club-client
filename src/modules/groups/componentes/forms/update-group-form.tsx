import type { UpdateGroupFormData } from '@/modules/groups/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput } from '@/core/components/form-fields/form-input';
import { FormInputNumber } from '@/core/components/form-fields/form-input-number';
import { FormSelect } from '@/core/components/form-fields/form-select';
import { Button } from '@/core/components/ui/button';
import { FieldGroup } from '@/core/components/ui/field';
import { Spinner } from '@/core/components/ui/spinner';
import { ItemStatus } from '@/core/constants/misc';
import { convertCase } from '@/core/lib/utils';
import { updateGroupFormSchema } from '@/modules/groups/schemas';

export function UpdateGroupForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: GroupFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(updateGroupFormSchema),
    defaultValues: {
      ...defaultValues,
      status: convertCase(
        defaultValues?.status ?? ItemStatus.ACTIVE,
      ) as UpdateGroupFormData['status'],
    },
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;
  const statusOptions = [ItemStatus.ACTIVE, ItemStatus.INACTIVE].map((s) => ({
    value: s,
    label: t(`constants.status.${s}`),
  }));

  return (
    <form id="group-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="name"
          label={t('groups:attribs.name')}
          placeholder={t('groups:forms.placeholders.name')}
          disabled={isSubmitting}
        />
        <FormSelect
          control={form.control}
          name="status"
          label={t('groups:attribs.status')}
          placeholder={t('groups:forms.placeholders.status')}
          options={statusOptions}
        />
        <FormInput
          control={form.control}
          name="startTime"
          label={t('groups:attribs.startTime')}
          type="time"
        />
        <FormInputNumber
          control={form.control}
          name="durationMinutes"
          label={t('groups:attribs.duration')}
          min={0}
          max={24 * 60}
          step={15}
          unit="min"
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

export type GroupFormProps = {
  defaultValues: UpdateGroupFormData; // undefined = create, populated = update
  onSubmit: (data: UpdateGroupFormData) => void;
  onCancel?: () => void; // optional — useful in modals
  isLoading?: boolean;
  submitLabel?: string; // override "Save" if needed
};
