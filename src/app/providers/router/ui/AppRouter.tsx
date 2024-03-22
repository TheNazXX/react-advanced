import { getUserAuthData } from 'entities/User'
import { type FC, Suspense, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Route, Router, Routes } from 'react-router-dom'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { Loader } from 'shared/ui'

export const AppRouter: FC = () => {

  const isAuth = useSelector(getUserAuthData);

  const routes = useMemo(() => {
    return Object.values(routeConfig).filter(route => {

      if(route.authOnly && !isAuth){
      
        return false;
      }

      return route;
    });

  }, [isAuth]);

  return (
    <Suspense fallback={<Loader />}>

    <Routes>
      {routes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={element}
        />
      ))}
    </Routes>
  </Suspense>
  )
}
