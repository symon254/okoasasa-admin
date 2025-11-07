import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function ProtectedNotFound() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-5 py-8 text-foreground">
      {/* 404 Illustration */}
      <div className="mb-8 flex w-full max-w-[650px] items-center justify-center">
        <img
          src="/404.png"
          alt="404 Error - Page not Found"
          className="h-auto w-full max-w-[334px] lg:max-w-[650px]"
        />
      </div>

      {/* Error Message */}
      <div className="flex w-full max-w-[650px] flex-col items-center gap-4 text-center">
        <h1 className="text-lg font-medium capitalize leading-[140%] text-[#1A2E35] lg:text-4xl lg:font-semibold">
          Ooops! Page not found
        </h1>
        <p className="text-sm font-medium leading-[140%] text-[#A0A4AC] lg:text-[22px]">
          The page you're looking for doesn't exist or you don't have access
        </p>

        {/* Back to Dashboard Button */}
        <Link to="/" className="w-full lg:w-auto">
          <Button
            variant="gradient"
            className={cn(
              `flex items-center justify-center gap-2 w-full h-[46px] px-4 py-3`,
              `bg-linear-to-b from-[#F8971D] to-[#EE3124] rounded-3xl`,
              `text-white font-medium text-base leading-[140%] capitalize shadow-sm hover:opacity-90 transition-all font-["Public_Sans"]`,
            )}
          >
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  )
}
