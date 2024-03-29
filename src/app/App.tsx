import { useEffect, type FC } from 'react'
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme'
import { classNames } from 'shared/libs/classNames/classNames'
import { Suspense } from 'react'
import { AppRouter } from './providers/router'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInited, userActions } from 'entities/User'

const App: FC = () => {
  const { theme } = useTheme()
  const dispatch = useDispatch()
  const userInited = useSelector(getUserInited)

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <div className="container-l">
            <div className="page">
              {userInited && <AppRouter />}
            </div>
          </div>
        </div>
        <Sidebar />
      </Suspense>
    </div>
  )
}

export { App }
