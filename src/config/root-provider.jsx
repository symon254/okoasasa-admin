import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Cross2Icon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { ThemeProvider } from '@/context/theme-context'
import { ContextProvider } from '@/context/state-context'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TooltipProvider } from '@/components/ui/tooltip'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: 1000,
      staleTime: 10000, // -> refetches data after 10 seconds
    },
  },
})

export function getContext() {
  return {
    queryClient,
  }
}

export function Provider({ children }) {
  const CloseButton = ({ snackbarKey }) => {
    const { closeSnackbar } = useSnackbar()
    return (
      <button
        aria-label="Close notification"
        className="p-2 hover:opacity-80"
        onClick={() => closeSnackbar(snackbarKey)}
      >
        <Cross2Icon className={cn('h-4 w-4 text-white')} />
      </button>
    )
  }

  return (
    <ContextProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <SnackbarProvider
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              maxSnack={3}
              autoHideDuration={7000}
              preventDuplicate={true}
              action={(key) => <CloseButton snackbarKey={key} />}
            >
              {children}
            </SnackbarProvider>
            <ReactQueryDevtools initialIsOpen={false} />

            {import.meta.env.VITE_API_ENV === 'development' && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ContextProvider>
  )
}
