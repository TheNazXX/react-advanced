import { type FC, type ReactNode, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'shared/ui'
import { TypeButton } from 'shared/ui/Button/Button'

interface BugButtonProps {
  className?: string
  children?: ReactNode
}

export const BugButton: FC<BugButtonProps> = ({ className }) => {
  const { t } = useTranslation()

  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    if (error) throw new Error()
  }, [error])

  const onError = (): void => { setError(true) }

  return (
    <Button className={className} typeBtn={TypeButton.PRIMARY} onClick={onError}>
      {
        t('BugButton')
      }
    </Button>
  )
}
