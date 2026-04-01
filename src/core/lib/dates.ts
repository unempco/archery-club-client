import dayjs from 'dayjs';

import { defaultProjectLocale, localeData } from '@/layout/constants/locales';

import 'dayjs/locale/es';

import customParseFormat from 'dayjs/plugin/customParseFormat';

import projectConfig from '@/project.config';

dayjs.extend(customParseFormat);

export function formatDate(
  d?: Date | string,
  dateFormat: string = projectConfig.time.dateFormat,
  language: string = localeData[defaultProjectLocale].langKey,
): string {
  if (typeof d === 'string')
    return dayjs(new Date(d)).locale(language).format(dateFormat);

  if (d instanceof Date && isDateValid(d))
    return dayjs(d).locale(language).format(dateFormat);

  return '';
}

export function isDateValid(d?: Date | string) {
  const date = d instanceof Date ? d : new Date(d || '');

  return !isNaN(date.getTime());
}

export function getYear(d?: Date | string): string | undefined {
  return isDateValid(d) ? new Date(d!).getFullYear().toString() : undefined;
}
