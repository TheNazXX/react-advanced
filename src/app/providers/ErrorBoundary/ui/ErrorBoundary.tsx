import { ErrorPage } from 'pages/ErrorPage'
import { Component, type ErrorInfo, type ReactNode } from 'react'
import { withTranslation } from 'react-i18next'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor (props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError (): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch (error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo)
  }

  render (): ReactNode {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return <ErrorPage />
    }

    return <>{children}</>
  }
}

export default withTranslation()(ErrorBoundary)
