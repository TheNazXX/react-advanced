import { type FC } from 'react'
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme'
import { classNames } from 'shared/libs/classNames/classNames'
import { Suspense, useState } from 'react'

import { AppRouter } from './providers/router'
import { Navbar } from 'widgets/Navbar'

import { Sidebar } from 'widgets/Sidebar'
import './styles/index.scss'

const App: FC = () => {
  const { theme } = useTheme()

  const [collapsedSidebar, setCollapsedSidebar] = useState(false)

  const toggleSidebar = (): void => {
    setCollapsedSidebar(state => !state)
  }

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar toggleSidebar={toggleSidebar}/>

        <div className="content-page">
          <div className="container">
            <AppRouter />
          </div>
        </div>

        <Sidebar collapsed={collapsedSidebar} toggleSidebar={toggleSidebar} />
      </Suspense>
    </div>
  )
}

export { App }
