import { useAuth } from '@/modules/auth/hooks/use-auth';

export function PermissionGuard({
  children,
  fallback = null,
  requireAll = false,
  ...props
}: PermissionGuardProps) {
  const { hasPermissions, hasRoles } = useAuth();

  const allowed =
    'permissions' in props
      ? hasPermissions(props.permissions, requireAll)
      : hasRoles(props.roles, requireAll);

  if (!allowed) return fallback;

  return children;
}

type PermissionGuardBase = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAll?: boolean;
};

type WithPermissions = PermissionGuardBase & {
  permissions: string | string[];
  roles?: never; // explicitly forbidden when permissions is set
};

type WithRoles = PermissionGuardBase & {
  roles: string | string[];
  permissions?: never; // explicitly forbidden when roles is set
};

export type PermissionGuardProps = WithPermissions | WithRoles;
