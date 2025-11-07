import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Home, RefreshCw, Copy, Check } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ErrorPage({ error }) {
  const [copied, setCopied] = useState(false)
  const [errorId] = useState(() => Math.random().toString(36).substr(2, 9))

  const errorInfo = {
    id: errorId,
    message: error?.message || 'An unexpected error occurred',
    stack: error?.stack,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
  }

  useEffect(() => {
    console.error('Error Page Rendered:', errorInfo)
  }, [error, errorInfo])

  const handleCopyError = async () => {
    try {
      const errorText = `Error ID: ${errorInfo.id}\nMessage: ${errorInfo.message}\nTimestamp: ${errorInfo.timestamp}\nURL: ${errorInfo.url}${errorInfo.stack ? `\n\nStack Trace:\n${errorInfo.stack}` : ''}`

      await navigator.clipboard.writeText(errorText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.warn('Failed to copy to clipboard:', err)
    }
  }

  const handleReload = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.update())
      })
    }
    window.location.reload()
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground px-4"
      role="alert"
      aria-live="assertive"
    >
      <div className="text-center space-y-8 max-w-2xl w-full">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-destructive/20 rounded-full blur-xl animate-pulse" />
            <div className="relative bg-card border-2 border-destructive/20 rounded-full p-6">
              <AlertTriangle
                className="h-16 w-16 text-destructive"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-destructive to-destructive/80 bg-clip-text text-transparent">
            Oops! Something went wrong
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-lg mx-auto">
            We encountered an unexpected error and our team has been notified
          </p>
        </div>

        <div className="text-left space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-destructive/50">
            <p className="text-sm text-muted-foreground font-medium mb-1">
              Error Message
            </p>
            <p className="text-foreground font-mono text-sm leading-relaxed">
              {errorInfo.message}
            </p>
          </div>

          {errorInfo.stack && (
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors select-none flex items-center gap-2 p-2 rounded-md hover:bg-muted/30">
                <div className="h-1 w-1 bg-muted-foreground rounded-full group-open:rotate-90 transition-transform" />
                <span className="group-open:hidden">
                  Show technical details
                </span>
                <span className="hidden group-open:inline">
                  Hide technical details
                </span>
              </summary>
              <div className="mt-3 bg-background border border-border rounded-lg overflow-hidden">
                <div className="bg-muted/30 px-3 py-2 border-b border-border">
                  <span className="text-xs font-medium text-muted-foreground">
                    Stack Trace
                  </span>
                </div>
                <pre className="text-xs text-muted-foreground overflow-auto max-h-48 p-3 whitespace-pre-wrap font-mono leading-relaxed scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                  {errorInfo.stack}
                </pre>
              </div>
            </details>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
          <Link to="/" className="flex-1">
            <Button
              variant="gradient"
              className="rounded-2xl w-full px-6 py-4 h-auto text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <Home className="h-4 w-4 mr-2" aria-hidden="true" />
              Go Home
            </Button>
          </Link>

          <Button
            onClick={handleReload}
            variant="secondary"
            className="rounded-2xl flex-1 px-6 py-4 h-auto text-base font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border border-border"
          >
            <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
            Try Again
          </Button>
        </div>

        <div className="text-center pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            If this problem persists, please contact our support team with the
            error ID above.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Timestamp: {new Date(errorInfo.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
