export function validator(
  requirements?: string | string[],
  from?: string[],
  requireAll: boolean = false,
) {
  if (!requirements) return true;
  if (!from) return false;

  if (typeof requirements === 'string')
    return Boolean(from.includes(requirements));

  if (requireAll) return requirements.every((v) => from.includes(v));

  return requirements.some((v) => from.includes(v));
}
