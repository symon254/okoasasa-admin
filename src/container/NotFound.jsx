import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default function NotFound({
  title = 'Ooops! Product not found',
  description = "The Product you are looking for doesn't exist",
  actionLabel = 'Back to Home',
  actionHref = '/',
  onAction,
}) {
  const ActionButton = ({ className = '', isMobile = false }) => {
    const buttonClass =
      'flex items-center justify-center gap-2.5 rounded-3xl border border-[#F8971D] px-4 py-3 text-base font-medium capitalize leading-[140%] text-white'

    if (onAction) {
      return (
        <Button
          type="button"
          variant="gradient"
          onClick={onAction}
          className={cn(
            `${buttonClass} ${className}`,
            `flex items-center justify-center gap-2 w-full h-[46px] px-4 py-3`,
            `bg-linear-to-b from-[#F8971D] to-[#EE3124] rounded-3xl`,
            `text-white font-medium text-base leading-[140%] capitalize shadow-sm hover:opacity-90 transition-all font-["Public_Sans"]`,
          )}
          style={{
            width: isMobile ? '100%' : '344px',
          }}
        >
          {actionLabel}
        </Button>
      )
    }

    return (
      <Link to={actionHref} className={isMobile ? 'w-full' : undefined}>
        <button
          className={`${buttonClass} ${className} ${isMobile ? 'w-full' : ''}`}
          style={{
            width: isMobile ? '100%' : '344px',
            background: 'linear-gradient(180deg, #F8971D 0%, #EE3124 100%)',
          }}
        >
          {actionLabel}
        </button>
      </Link>
    )
  }

  return (
    <div
      className="flex min-h-full flex-col bg-white"
      style={{
        fontFamily:
          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
      }}
    >
      <main className="flex flex-1 flex-col items-center">
        {/* Responsive 404 Illustration */}
        <div className="mb-[1.6rem]">
          <img
            src="/NotFound.png"
            alt="404 Error - Product not Found"
            className="h-[223px] w-[334px] lg:h-[433px] lg:w-[650px]"
          />
        </div>

        {/* Responsive Error Message */}
        <div className="flex w-full flex-col items-center gap-4 px-5">
          <div className="flex flex-col items-start gap-3">
            <h1 className="w-full text-center text-lg lg:text-4xl font-medium lg:font-semibold capitalize leading-[140%] text-[#1A2E35]">
              {title}
            </h1>
            <p className="w-full text-center text-sm lg:text-[22px] font-medium capitalize leading-[140%] text-[#A0A4AC]">
              {description}
            </p>
          </div>

          {/* Show one button for desktop and another for mobile */}
          <ActionButton className="mt-2 hidden lg:block" />
        </div>
      </main>
    </div>
  )
}
