import { useEffect, type FC } from 'react'
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme'
import { classNames } from 'shared/libs/classNames/classNames'
import { Suspense } from 'react'

import { AppRouter } from './providers/router'
import { Navbar } from 'widgets/Navbar'

import { Sidebar } from 'widgets/Sidebar'

import 'animate.css'
import { useDispatch } from 'react-redux'
import { userActions } from 'entities/User'



const App: FC = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <div className="container-l">
            <AppRouter />
          </div>
        </div>
        <Sidebar />
      </Suspense>
    </div>
  )
}

export { App }
