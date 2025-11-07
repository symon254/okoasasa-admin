import React from 'react'
import * as Dg from '@/components/ui/dialog.jsx'
import * as At from '@/components/ui/alert-dialog.jsx'
import {
  Loader2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle,
  X,
  AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useStateContext } from '@/context/state-context'
import { Input } from '@/components/ui/input'
import { SuccessIcon } from '@/assets/icons'
import { Link } from '@tanstack/react-router'

export const Dialog = React.forwardRef(
  (
    {
      title,
      description,
      open = false,
      onOpenChange,
      contentClassName,
      children,
      closeIcon,
      image,
      DialogHeaderClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <Dg.Dialog
        ref={ref}
        modal={true}
        open={open}
        defaultOpen={open}
        onOpenChange={onOpenChange}
        {...props}
      >
        <Dg.DialogContent
          closeIcon={closeIcon}
          className={cn('max-w-3xl', contentClassName)}
        >
          {image}
          <Dg.DialogHeader className={DialogHeaderClassName}>
            <Dg.DialogTitle className="-mt-2">{title}</Dg.DialogTitle>
            <Dg.DialogDescription>{description}</Dg.DialogDescription>
          </Dg.DialogHeader>
          {children}
        </Dg.DialogContent>
      </Dg.Dialog>
    )
  },
)

export const AlertDialog = React.forwardRef(({ ...props }, ref) => {
  const { alert } = useStateContext()
  const [confirmationInput, setConfirmationInput] = React.useState('')
  const [isConfirmationValid, setIsConfirmationValid] = React.useState(false)

  // Reset confirmation input when dialog opens/closes
  React.useEffect(() => {
    if (!alert.open) {
      setConfirmationInput('')
      setIsConfirmationValid(false)
    }
  }, [alert.open])

  // Check if confirmation input matches required text
  React.useEffect(() => {
    if (alert.requiresConfirmation && alert.confirmationMatch) {
      setIsConfirmationValid(
        confirmationInput.toLowerCase().trim() ===
          alert.confirmationMatch.toLowerCase().trim(),
      )
    } else {
      setIsConfirmationValid(true)
    }
  }, [confirmationInput, alert.requiresConfirmation, alert.confirmationMatch])

  // Handle action with confirmation check
  const handleAction = () => {
    if (alert.requiresConfirmation && !isConfirmationValid) {
      return
    }
    alert.onAction()
  }

  // Get appropriate icon based on alert style
  const getAlertIcon = () => {
    switch (alert.actionStyle) {
      case 'destructive':
        return (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
        )
      case 'success':
        return (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        )
      case 'warning':
        return (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20">
            <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        )
      case 'info':
      case 'default':
      case 'primary':
        return (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
            <Info className="h-6 w-6 text-primary" />
          </div>
        )
      default:
        return (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <HelpCircle className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </div>
        )
    }
  }

  return (
    <At.AlertDialog
      modal={true}
      open={alert.open}
      defaultOpen={alert.open}
      onOpenChange={alert.closeConfirmation}
      {...props}
    >
      <At.AlertDialogContent className="sm:max-w-md overflow-hidden p-0">
        <div className="bg-white dark:bg-gray-950">
          {/* Icon Section */}
          <div className="px-6 pt-6 pb-2 text-center">{getAlertIcon()}</div>

          {/* Content Section */}
          <div className="px-6 pb-4">
            <At.AlertDialogHeader className="text-center space-y-2">
              <At.AlertDialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                {alert.title}
              </At.AlertDialogTitle>
              <At.AlertDialogDescription className="text-sm text-gray-600 dark:text-gray-400">
                {alert.description}
              </At.AlertDialogDescription>
            </At.AlertDialogHeader>

            {/* Confirmation Input Section */}
            {alert.requiresConfirmation && (
              <div className="mt-4 space-y-3">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {alert.confirmationText}
                </div>
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder={alert.confirmationPlaceholder}
                    value={confirmationInput}
                    onChange={(e) => setConfirmationInput(e.target.value)}
                    className={cn(
                      'text-center font-mono',
                      isConfirmationValid
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                        : confirmationInput.length > 0
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                          : '',
                    )}
                  />
                  {alert.confirmationMatch && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      {/* Type:{' '}
                      <span className="font-mono font-semibold">
                        {alert.confirmationMatch}
                      </span> */}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Button Section */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
            <At.AlertDialogFooter className="flex gap-3 justify-center">
              <At.AlertDialogCancel
                className={cn(
                  'inline-flex items-center justify-center',
                  'px-4 py-2 min-w-[80px] h-9',
                  'text-sm font-medium rounded-md',
                  'border border-gray-300 dark:border-gray-600',
                  'bg-white dark:bg-gray-800',
                  'text-gray-700 dark:text-gray-300',
                  'hover:bg-gray-50 dark:hover:bg-gray-700',
                  'focus:outline-none focus:ring-2 focus:ring-gray-500',
                  'transition-colors duration-150',
                )}
                onClick={alert.onCancel}
              >
                {alert.cancelLabel}
              </At.AlertDialogCancel>

              <At.AlertDialogAction
                className={cn(
                  'inline-flex items-center justify-center',
                  'px-4 py-2 min-w-[80px] h-9',
                  'text-sm font-medium rounded-md',
                  'focus:outline-none focus:ring-2',
                  'transition-colors duration-150',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  alert.actionStyle === 'destructive'
                    ? 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
                    : alert.actionStyle === 'success'
                      ? 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
                      : alert.actionStyle === 'warning'
                        ? 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500'
                        : 'bg-primary hover:bg-primary/90 text-white focus:ring-primary/80',
                )}
                disabled={
                  alert.loading ||
                  (alert.requiresConfirmation && !isConfirmationValid)
                }
                onClick={handleAction}
              >
                {alert.loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  alert.actionLabel
                )}
              </At.AlertDialogAction>
            </At.AlertDialogFooter>
          </div>
        </div>
      </At.AlertDialogContent>
    </At.AlertDialog>
  )
})

export const CreateDialog = ({ align = 'left', title, icon, children }) => {
  return (
    <fieldset className="w-full rounded-lg border bg-card text-card-foreground shadow hover:shadow-md p-4">
      <legend align={align} className="-ml-1 px-2 text-lg font-medium">
        <div className="flex items-center gap-2">
          {icon && <span className="text-muted-foreground">{icon}</span>}
          {title}
        </div>
      </legend>
      {children}
    </fieldset>
  )
}

export const AlertDialogCustom = ({
  open = false,
  onOpenChange,
  variant = 'error',
  title,
  message,
  amount,
  currency = 'KES',
  period,
  additionalMessage,
  cancelLabel = 'Cancel',
  actionLabel = 'Proceed',
  onCancel,
  onAction,
  icon,
  showDecorations = true,
  showCloseButton = true,
}) => {
  // Get icon and colors based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          icon: SuccessIcon,
        }
      case 'error':
        return {
          icon: AlertCircle,
          bgGradient: 'from-red-500 to-red-600',
          textColor: 'text-red-600',
          buttonGradient: 'from-orange-500 to-orange-600',
          buttonHover: 'hover:from-orange-600 hover:to-orange-700',
          borderColor: 'border-orange-500',
          textButtonColor: 'text-orange-500',
          hoverBg: 'hover:bg-orange-50',
          ringColor: 'focus:ring-orange-500',
        }
      case 'warning':
        return {
          icon: AlertTriangle,
          bgGradient: 'from-yellow-400 to-yellow-500',
          textColor: 'text-yellow-600',
          buttonGradient: 'from-orange-500 to-orange-600',
          buttonHover: 'hover:from-orange-600 hover:to-orange-700',
          borderColor: 'border-orange-500',
          textButtonColor: 'text-orange-500',
          hoverBg: 'hover:bg-orange-50',
          ringColor: 'focus:ring-orange-500',
        }
      case 'info':
        return {
          icon: Info,
          bgGradient: 'from-blue-400 to-blue-500',
          textColor: 'text-blue-600',
          buttonGradient: 'from-orange-500 to-orange-600',
          buttonHover: 'hover:from-orange-600 hover:to-orange-700',
          borderColor: 'border-orange-500',
          textButtonColor: 'text-orange-500',
          hoverBg: 'hover:bg-orange-50',
          ringColor: 'focus:ring-orange-500',
        }
      default:
        return {
          icon: Info,
          bgGradient: 'from-gray-400 to-gray-500',
          textColor: 'text-gray-600',
          buttonGradient: 'from-orange-500 to-orange-600',
          buttonHover: 'hover:from-orange-600 hover:to-orange-700',
          borderColor: 'border-orange-500',
          textButtonColor: 'text-orange-500',
          hoverBg: 'hover:bg-orange-50',
          ringColor: 'focus:ring-orange-500',
        }
    }
  }

  const styles = getVariantStyles()
  const Icon = styles.icon

  return (
    <At.AlertDialog className={'p-6'} open={open} onOpenChange={onOpenChange}>
      <At.AlertDialogContent className="flex flex-col justify-center items-center p-[30px] gap-6 w-[500px] h-[537.11px] bg-white rounded-3xl sm:max-w-md overflow-hidden">
        {' '}
        {/* Close button */}
        <div className="flex flex-row justify-end items-center gap-2.5 w-[440px] h-6 order-0 self-stretch flex-none">
          {showCloseButton && (
            <button
              onClick={() => onOpenChange?.(false)}
              className="cursor-pointer absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none z-10"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>
          )}
        </div>
        <div className="bg-white dark:bg-gray-950">
          {/* Icon Section with decorative elements */}
          <div className="flex flex-col justify-center items-center pl-4 pr-[41px] gap-2.5 w-[440px] h-[176.11px] order-1 self-stretch flex-none">
            {/* Icon */}
            <div className="">{icon}</div>
          </div>

          {/* Content Section */}
          <div className="mt-6">
            <At.AlertDialogHeader>
              <At.AlertDialogTitle className="w-[440px] h-[39px] font-semibold text-[28px] leading-[140%] text-center capitalize text-[#252525] order-0 self-stretch flex-none">
                {title}
              </At.AlertDialogTitle>

              <At.AlertDialogDescription className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                {message && <div>{message}</div>}

                {amount && (
                  <div className="w-[440px] mt-2 h-11 font-medium text-base leading-[140%] text-center text-[#676D75] order-1 self-stretch flex-none">
                    You qualify for a loan of{' '}
                    <span className={cn('font-semibold', styles.textColor)}>
                      {currency} {amount.toLocaleString()}
                    </span>
                    {period && `, payable within ${period}`}.
                  </div>
                )}

                {additionalMessage && (
                  <div className="w-[440px] h-11 font-medium text-base leading-[140%] text-center text-[#676D75] order-0 self-stretch flex-none">
                    {additionalMessage}
                  </div>
                )}
              </At.AlertDialogDescription>
            </At.AlertDialogHeader>
          </div>

          {/* Button Section */}
          <div className=" mt-6  flex gap-6 w-[440px] h-6">
            <button
              onClick={onCancel}
              className={cn(
                'flex-1 px-6 py-3 rounded-full',
                'text-sm font-semibold',
                'border-2',
                styles.borderColor,
                styles.textButtonColor,
                'bg-white',
                styles.hoverBg,
                'transition-colors duration-150',
                'focus:outline-none focus:ring-2',
                styles.ringColor,
                'focus:ring-offset-2',
              )}
            >
              {cancelLabel}
            </button>

            <button
              onClick={onAction}
              className={cn(
                'flex-1 px-6 py-3 rounded-full',
                'text-sm font-semibold',
                'bg-gradient-to-r',
                styles.buttonGradient,
                'text-white',
                styles.buttonHover,
                'shadow-lg hover:shadow-xl',
                'transition-all duration-150',
                'focus:outline-none focus:ring-2',
                styles.ringColor,
                'focus:ring-offset-2',
              )}
            >
              {actionLabel}
            </button>
          </div>
        </div>
      </At.AlertDialogContent>
    </At.AlertDialog>
  )
}

export const SuccessAlertDialog = ({
  isOpen,
  onClose,
  title = 'Congratulations!',
  loanAmount,
  paybackPeriod,
  maxAmount,
  primaryAction,
  secondaryAction,
  decorativeIcons,
}) => {
  const hasBothButtons = primaryAction && secondaryAction
  const hasSingleButton = primaryAction || secondaryAction

  return (
    <At.AlertDialog open={isOpen} onOpenChange={onClose}>
      <At.AlertDialogContent className="max-w-md w-[90vw] sm:w-full p-0 gap-0 mx-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 cursor-pointer p-1 border border-primary sm:right-4 top-4 sm:top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity z-10"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Icon Section */}
        <div className="flex items-center justify-center pt-6 sm:pt-8 pb-4 sm:pb-6">
          <div className="relative">
            {/* Decorative icons */}
            {decorativeIcons}
          </div>
        </div>

        {/* Content Section */}
        <div className="text-center px-4 sm:px-8 pb-4 sm:pb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            {title}
          </h2>

          <p className="text-gray-600 text-sm mb-3 sm:mb-4 leading-relaxed">
            You qualify for a loan of{' '}
            <span className="text-green-600 font-semibold">{loanAmount}</span>,
            payable within {paybackPeriod}.
          </p>
        </div>

        {/* Action Buttons */}
        <div className={`${hasBothButtons ? 'flex flex-col sm:flex-row' : 'flex flex-col'} gap-3 px-4 sm:px-8 pb-6 sm:pb-8`}>
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className={`flex flex-row justify-center items-center px-4 py-3 gap-2.5 rounded-[24px] border-2 border-orange-500 text-orange-500 font-medium hover:bg-orange-50 transition-colors ${
                hasBothButtons ? 'sm:w-[208px]' : 'w-full'
              } h-[46px] ${hasBothButtons ? 'order-2 sm:order-1' : ''}`}
            >
              {secondaryAction.label}
            </button>
          )}

          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className={`flex flex-row justify-center items-center px-4 py-3 gap-2.5 rounded-[24px] text-white font-medium hover:opacity-90 transition-all ${
                hasBothButtons ? 'sm:w-[208px]' : 'w-full'
              } h-[46px] ${hasBothButtons ? 'order-1 sm:order-2' : ''}`}
              style={{
                background: 'linear-gradient(180deg, #F8971D 0%, #EE3124 100%)',
              }}
            >
              {primaryAction.label}
            </button>
          )}
        </div>
      </At.AlertDialogContent>
    </At.AlertDialog>
  )
}

export const ErrorAlertDialog = ({
  isOpen,
  onClose,
  title = 'Alert!',
  message,
  primaryAction,
  secondaryAction,
  secLink,
  primLink
}) => {
  const hasBothButtons = primaryAction && secondaryAction
  const hasSingleButton = primaryAction || secondaryAction

  return (
    <At.AlertDialog className={''} open={isOpen} onOpenChange={onClose}>
      <At.AlertDialogContent className="max-w-md w-[90vw] sm:w-full rounded-4xl p-0 gap-0 mx-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 sm:right-4 cursor-pointer p-1 border border-primary top-4 sm:top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity z-10"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Icon Section */}
        <div className="flex items-center justify-center pt-6 sm:pt-10 pb-4 sm:pb-6">
          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-red-500 flex items-center justify-center">
            <AlertCircle
              className="w-8 h-8 sm:w-14 sm:h-14 text-white"
              strokeWidth={3}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="text-center px-4 sm:px-8 pb-4 sm:pb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            {title}
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed">{message}</p>
        </div>

        {/* Action Buttons */}
        <div className={`${hasBothButtons ? 'flex flex-col sm:flex-row' : 'flex flex-col'} gap-3 px-4 sm:px-8 pb-6 sm:pb-8`}>
          {secondaryAction && (
            <Link to={secLink} className={hasBothButtons ? 'sm:w-[208px]' : 'w-full'}>
              <button
                onClick={secondaryAction.onClick}
                className={`flex flex-row justify-center items-center px-4 py-3 gap-2.5 rounded-3xl border-2 border-orange-500 text-orange-500 font-medium hover:bg-orange-50 transition-colors ${
                  hasBothButtons ? 'sm:w-[208px]' : 'w-full'
                } h-[46px] ${hasBothButtons ? 'order-2 sm:order-1' : ''}`}
              >
                {secondaryAction.label}
              </button>
            </Link>
          )}

          {primaryAction && (
            <Link to={primLink} className={hasBothButtons ? 'sm:w-[208px]' : 'w-full'}>
              <button
                onClick={primaryAction.onClick}
                className={`flex flex-row justify-center items-center px-4 py-3 gap-2.5 rounded-[24px] text-white font-medium hover:opacity-90 transition-all ${
                  hasBothButtons ? 'sm:w-[208px]' : 'w-full'
                } h-[46px] ${hasBothButtons ? 'order-1 sm:order-2' : ''}`}
                style={{
                  background:
                    'linear-gradient(180deg, #F8971D 0%, #EE3124 100%)',
                }}
              >
                {primaryAction.label}
              </button>
            </Link>
          )}
        </div>
      </At.AlertDialogContent>
    </At.AlertDialog>
  )
}