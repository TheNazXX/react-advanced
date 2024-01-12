import { useState, type FC } from 'react'
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme'
import { classNames } from 'shared/libs/classNames/classNames'
import { Suspense } from 'react'
import { Button, Modal } from 'shared/ui'

import { AppRouter } from './providers/router'
import { Navbar } from 'widgets/Navbar'

import { Sidebar } from 'widgets/Sidebar'

import './styles/index.scss'
import { TypeButton } from 'shared/ui/Button/Button'

const App: FC = () => {
  const { theme } = useTheme()

  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <Button typeBtn={TypeButton.PRIMARY} style={{ margin: '0 auto' }} onClick={() => { setOpen(true) }}>123</Button>
        <Modal isOpen={isOpen} onClose={() => { setOpen(false) }}>123</Modal>
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
