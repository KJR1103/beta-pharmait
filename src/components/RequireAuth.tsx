import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, AppRole } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

export const RequireAuth = ({
  children,
  roles,
}: {
  children: ReactNode;
  roles?: AppRole[];
}) => {
  const { user, roles: userRoles, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  if (!user) return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  if (roles && !roles.some((r) => userRoles.includes(r))) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
