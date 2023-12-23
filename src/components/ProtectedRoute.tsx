import { ViewStateContext } from "contexts/ViewStateContext";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { RouteNames } from "router";

export function ProtectedRoute() {
  const {
    viewState: { user: authorizedUser },
  } = useContext(ViewStateContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authorizedUser) {
      navigate(RouteNames.LOGIN);
    }
  }, [authorizedUser]);

  return <Outlet />;
}
