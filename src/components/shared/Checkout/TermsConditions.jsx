import React, { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { useStateContext } from '@/context/state-context'

export default function TermsConditionPage({
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
}) {
  const { saveCheckoutFormData, getCheckoutFormData } = useStateContext()

  // Use step 5 for Terms & Conditions
  const savedData = getCheckoutFormData(5)

  const [isAccepted, setIsAccepted] = useState(savedData?.isAccepted || false)
  const [ipAddress, setIpAddress] = useState('')

  // Get client IP address on component mount
  useEffect(() => {
    const getClientIP = async () => {
      try {
        //  Try to get IP from a public API
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        setIpAddress(data.ip)
      } catch (error) {
        console.warn('Could not fetch public IP', error)
      }
    }

    getClientIP()
  }, [])

  // Get proper user agent string
  const getUserAgent = () => {
    return navigator.userAgent
  }

  // Save data when isAccepted changes
  useEffect(() => {
    const userConsents = [
      {
        consentType: 'TermsAndConditions',
        isConsentGiven: isAccepted,
        ip_address: ipAddress,
        userAgent: getUserAgent(),
      },
      {
        consentType: 'PrivacyPolicy',
        isConsentGiven: isAccepted,
        ip_address: ipAddress,
        userAgent: getUserAgent(),
      },
    ]

    saveCheckoutFormData(5, {
      isAccepted,
      apiPayload: {
        userConsents,
      },
    })
  }, [isAccepted, ipAddress, saveCheckoutFormData])

  // Also load saved data on component mount
  useEffect(() => {
    if (savedData?.isAccepted !== undefined) {
      setIsAccepted(savedData.isAccepted)
    }
  }, [savedData])

  const handleTextClick = (e) => {
    if (e.target.tagName === 'A') {
      return
    }
    setIsAccepted(!isAccepted)
  }

  const onSubmit = () => {
    // Prepare the consent data matching the example format
    const userConsents = [
      {
        consentType: 'TermsAndConditions',
        isConsentGiven: isAccepted,
        consentVersion: '1',
        consentedAt: new Date().toISOString(),
        ip_address: ipAddress,
        userAgent: getUserAgent(),
      },
      {
        consentType: 'PrivacyPolicy',
        isConsentGiven: isAccepted,
        consentVersion: '1',
        consentedAt: new Date().toISOString(),
        ip_address: ipAddress,
        userAgent: getUserAgent(),
      },
    ]

    console.log('User Consents:', userConsents)

    // Save to context
    saveCheckoutFormData(5, {
      isAccepted,
      apiPayload: {
        userConsents,
      },
    })

    // Proceed to next step
    onNext()
  }

  return (
    <div className="flex flex-col items-center justify-center p-0 sm:p-0 gap-6">
      {/* Main Content Container */}
      <div className="bg-white w-full border h-auto rounded-4xl p-4 sm:p-6">
        <div className="w-full h-auto">
          {/* Header */}
          <div className="space-y-2 mb-4 sm:mb-0">
            <h1 className="w-full text-xl sm:text-2xl font-semibold leading-[1.4] capitalize text-[#252525]">
              Terms & Conditions
            </h1>
            <p className="w-full text-sm sm:text-base font-medium leading-[1.4] text-[#676D75]">
              Review our terms and conditions before proceeding
            </p>
          </div>

          <div className="h-px bg-gray-300 my-4 sm:my-6"></div>

          {/* Checkbox Section */}
          <div className="mb-0">
            <div className="flex flex-row items-start sm:items-center p-0 gap-3 w-full h-auto sm:h-[34px]">
              <Checkbox
                id="terms"
                checked={isAccepted}
                onCheckedChange={setIsAccepted}
                className="flex flex-col justify-center items-center w-6 h-6 sm:w-[34px] sm:h-[34px] border-2 border-[#E8ECF4] rounded-lg sm:rounded-xl p-0 gap-2.5 mt-1 sm:mt-0"
              />
              <label
                htmlFor="terms"
                className="w-full flex flex-wrap items-center text-center text-base sm:text-lg font-medium leading-[1.4] capitalize text-[#0D0B26] cursor-pointer select-none"
                onClick={handleTextClick}
              >
                <span className="mr-1">I Accept</span>
                <Link
                  to="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-900 transition-colors mx-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  Terms & Conditions
                </Link>
                <span className="mx-1">And</span>
                <Link
                  to="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-900 transition-colors mx-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>

          {/* Spacer for desktop to maintain height */}
          <div className="hidden sm:block h-4"></div>
        </div>
      </div>

      {/* Buttons Container - Completely Outside */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 w-full max-w-full">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isFirstStep}
          className="flex justify-center items-center px-4 py-3 w-full sm:w-[193px] h-[46px] rounded-3xl border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-medium disabled:opacity-50"
        >
          <p className="text-base font-medium leading-[1.4] capitalize">
            Back{' '}
          </p>
        </Button>
        <Button
          disabled={!isAccepted || isLastStep}
          onClick={onSubmit}
          className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-48 h-[46px] bg-gradient-to-b from-[#F8971D] to-[#EE3124] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-3xl"
        >
          <p className="text-base font-medium leading-[1.4] capitalize text-white">
            Next: Checkout Option
          </p>
        </Button>
      </div>
    </div>
  )
}
