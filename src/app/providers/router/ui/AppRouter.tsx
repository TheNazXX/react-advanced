import { type FC, Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import {
  type AppRoutesProps,
  routeConfig,
} from "shared/config/routeConfig/routeConfig";
import { Loader } from "shared/ui";
import { RequireAuth } from "./RequireAuth";

export const AppRouter: FC = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = <div className="page-wrapper">{route.element}</div>;

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
        }
      />
    );
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
    </Suspense>
  );
};
