import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  CalendarIcon,
  CancelIcon,
  DollarRoundedIcon,
  DownloadFileIcon,
  EyeIcon,
  FileKYCIcon,
  PercIcon,
  SendIcon,
  SendMsgIcon,
  TickIcon,
} from '@/assets/icons'
import { InfoIcon } from 'lucide-react'
import React from 'react'
export const Route = createFileRoute('/_protected/_request/request/$requestId')({
  component: RouteComponent,
})

const devicesData = [
  {
    id: 1,
    name: 'iPhone 14 Pro',
    sku: 'IPH14P-256-GLD',
    price: 'Ksh 125,000.00',
    deliveryOption: 'Home Delivery',
    condition: 'Brand New',
    image: '/product.png',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23',
    sku: 'SAM-S23-128-BLK',
    price: 'Ksh 85,000.00',
    deliveryOption: 'Pickup Point',
    condition: 'Brand New',
    image: '/product.png',
  },
  {
    id: 3,
    name: 'iPhone 13',
    sku: 'IPH13-128-BLU',
    price: 'Ksh 95,000.00',
    deliveryOption: 'Home Delivery',
    condition: 'Refurbished',
    image: '/product.png',
  },
  {
    id: 4,
    name: 'Google Pixel 7',
    sku: 'GPX7-256-WHT',
    price: 'Ksh 72,000.00',
    deliveryOption: 'Home Delivery',
    condition: 'Brand New',
    image: '/product.png',
  },
  {
    id: 5,
    name: 'OnePlus 11',
    sku: 'OPL11-256-GRN',
    price: 'Ksh 68,000.00',
    deliveryOption: 'Pickup Point',
    condition: 'Brand New',
    image: '/product.png',
  },
  {
    id: 6,
    name: 'Xiaomi 13 Pro',
    sku: 'XIA13P-512-BLK',
    price: 'Ksh 78,000.00',
    deliveryOption: 'Home Delivery',
    condition: 'Brand New',
    image: '/product.png',
  },
  {
    id: 7,
    name: 'iPhone 12',
    sku: 'IPH12-64-RED',
    price: 'Ksh 65,000.00',
    deliveryOption: 'Pickup Point',
    condition: 'Refurbished',
    image: '/product.png',
  },
]
const documents = [
  {
    id: 1,
    name: 'ID Card (Front)',
    uploadedDate: '2024-01-15',
    status: 'verified',
  },
  {
    id: 2,
    name: 'ID Card (Back)',
    uploadedDate: '2024-01-15',
    status: 'verified',
  },
  {
    id: 3,
    name: 'Payslip',
    uploadedDate: '2024-01-15',
    status: 'pending',
  },
  {
    id: 4,
    name: 'Payslip',
    uploadedDate: '2024-01-15',
    status: 'pending',
  },
  {
    id: 5,
    name: 'Payslip',
    uploadedDate: '2024-01-15',
    status: 'pending',
  },
]

const salaryData = [
  {
    id: 1,
    label: 'Monthly Salary',
    value: 'Ksh 120,000.00',
    valueColor: 'text-green-600',
  },
  {
    id: 2,
    label: 'Monthly Deductions',
    value: 'Ksh 25,000.00',
    valueColor: 'text-red-500',
  },
  {
    id: 3,
    label: 'Net Salary',
    value: 'Ksh 95,000.00',
    valueColor: 'text-green-600',
  },
  {
    id: 4,
    label: 'Credit Score',
    value: '750',
    valueColor: 'text-green-600',
  },
]

// Loan Details Data
const loanDetailsData = [
  {
    id: 1,
    label: 'Recommendation',
    badge: 'Approved',
  },
  {
    id: 2,
    label: 'Proposed Principal',
    value: 'Ksh 2,500,000.00',
    valueColor: 'text-black',
  },
  {
    id: 3,
    label: 'Approved Principal',
    value: 'Ksh 2,200,000.00',
    valueColor: 'text-green-600',
  },
  {
    id: 4,
    label: 'Loan Tenure',
    value: '24 Months',
    valueColor: 'text-black',
  },
]

// Bottom Colored Cards Data
const coloredCardsData = [
  {
    id: 1,
    label: 'Loan-to-Income Ratio',
    value: '115.8%',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    iconBgColor: 'bg-green-100',
    icon: <PercIcon />,
  },
  {
    id: 2,
    label: 'Monthly EMI',
    value: 'Ksh 110,000.00',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    iconBgColor: 'bg-blue-100',
    icon: <CalendarIcon />,
  },
  {
    id: 3,
    label: 'Interest Amount',
    value: 'Ksh 440,000.00',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    iconBgColor: 'bg-purple-100',
    icon: <DollarRoundedIcon />,
  },
]

const timelineData = [
  {
    id: 1,
    title: 'Request submitted',
    author: 'by System',
    timestamp: '2024-01-15 09:30 AM',
    iconBgColor: 'bg-blue-100',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 6V12L16 14"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'KYC documents uploaded',
    author: 'by John Doe',
    timestamp: '2024-01-15 09:45 AM',
    iconBgColor: 'bg-green-100',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 15V3M12 3L7 8M12 3L17 8"
          stroke="#10B981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 17L2 19C2 20.1046 2.89543 21 4 21L20 21C21.1046 21 22 20.1046 22 19L22 17"
          stroke="#10B981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Documents verified',
    author: 'by John Doe (KYC Officer)',
    timestamp: '2024-01-15 11:20 AM',
    iconBgColor: 'bg-yellow-100',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="2" />
        <path
          d="M12 8V12"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="16" r="1" fill="#F59E0B" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Credit review completed',
    author: 'by Sarah Mwangi (Credit Officer)',
    timestamp: '2024-01-15 02:15 PM',
    iconBgColor: 'bg-yellow-100',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="2" />
        <path
          d="M12 8V12"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="16" r="1" fill="#F59E0B" />
      </svg>
    ),
  },
]

const DeviceCard = ({ device }) => {
  const conditionStyles = {
    'Brand New': 'bg-[#DBEAFE] text-[#1E40AF]',
    Refurbished: 'bg-[#FEF3C7] text-[#92400E]',
    Used: 'bg-[#E5E7EB] text-[#374151]',
  }

  return (
    <div className="border p-3 flex justify-between space-x-4 rounded-2xl hover:shadow-md transition-shadow">
      <div className="items-center ml-5 flex justify-center">
        <div className="w-[79px] h-[79px] rounded-2xl">
          <img
            src={device.image}
            alt={device.name}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
      <div className="flex-1 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="h-[46px]">
            <p className="font-normal text-sm leading-[140%] flex items-center text-[#6B7280]">
              Device Name
            </p>
            <p className="font-medium text-base leading-[140%] flex items-center text-[#111827]">
              {device.name}
            </p>
          </div>
          <div className="h-[46px]">
            <p className="font-normal text-sm leading-[140%] flex items-center text-[#6B7280]">
              SKU
            </p>
            <p className="font-medium text-base leading-[140%] flex items-center text-[#111827]">
              {device.sku}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-[46px]">
            <p className="font-normal text-sm leading-[140%] flex items-center text-[#6B7280]">
              Price
            </p>
            <p className="font-medium text-base leading-[140%] flex items-center text-[#111827]">
              {device.price}
            </p>
          </div>
          <div className="h-[46px]">
            <p className="font-normal text-sm leading-[140%] flex items-center text-[#6B7280]">
              Delivery Option
            </p>
            <p className="font-medium text-base leading-[140%] flex items-center text-[#111827]">
              {device.deliveryOption}
            </p>
          </div>
        </div>
        <div className="h-[52px] gap-1">
          <div className="h-5">
            <p className="font-normal text-sm leading-[140%] flex items-center text-[#6B7280]">
              Condition
            </p>
          </div>
          <div
            className={`inline-flex flex-row items-center text-center px-3 py-1 h-7 rounded-full ${conditionStyles[device.condition]}`}
          >
            <p className="text-center h-5 font-bold text-xs leading-5 flex items-center">
              {device.condition}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const CardContainer = ({ title, description, children, className = '' }) => {
  return (
    <div className={`p-6 bg-white border rounded-2xl ${className}`}>
      <div>
        <label className="font-semibold text-2xl leading-[140%] capitalize text-black block">
          {title}
        </label>
        {description && <div>{description}</div>}
      </div>
      <div className="w-full my-4 h-px bg-[#E8ECF4]"></div>
      <div>{children}</div>
    </div>
  )
}

const KPICard = ({ label, value, valueColor = 'text-black', badge = null }) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-sm">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      {badge ? (
        <span className="flex flex-row justify-center items-center px-3 py-2 gap-2 w-[79px] h-6 bg-[#1C8546]/8 rounded-full text-sm font-medium text-[#1C8546]">
          {' '}
          <label className="w-[55px] h-[17px] flex items-center font-semibold text-xs leading-[140%] capitalize text-[#1C8546]">
            {' '}
            {badge}
          </label>
        </span>
      ) : (
        <p className={`text-2xl font-semibold ${valueColor}`}>{value}</p>
      )}
    </div>
  )
}

const TimelineItem = ({
  icon,
  iconBgColor,
  title,
  author,
  timestamp,
  isLast = false,
}) => {
  return (
    <div className="flex gap-4 relative pb-5">
      {/* Icon with connecting line */}
      <div className="relative flex flex-col items-center">
        <div
          className={`w-10 h-10 flex items-center justify-center ${iconBgColor} rounded-full shrink-0 relative z-10`}
        >
          {icon}
        </div>
        {/* Vertical line - starts below icon with gap */}
        {!isLast && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-[calc(100%-40px)] bg-gray-200"></div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pt-1.5">
        <h4 className="text-base font-medium text-black mb-1">{title}</h4>
        <p className="text-sm text-gray-500 mb-0.5">{author}</p>
        <p className="text-xs text-gray-400">{timestamp}</p>
      </div>
    </div>
  )
}

const ColoredKPICard = ({
  label,
  value,
  bgColor,
  textColor,
  iconBgColor,
  icon,
}) => {
  return (
    <div
      className={`p-6 ${bgColor} rounded-sm flex items-center justify-between`}
    >
      <div>
        <p className={`text-sm ${textColor} mb-1`}>{label}</p>
        <p className="text-3xl font-semibold text-black">{value}</p>
      </div>
      <div
        className={`w-12 h-12 flex items-center justify-center ${iconBgColor} rounded-full`}
      >
        {icon}
      </div>
    </div>
  )
}

const CustomerDeviceTab = () => (
  <div className="flex justify-between space-x-8  items-stretch">
    <div className="w-full space-y-6 flex-1">
      <CardContainer title="Customer Details">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 space-y-1.5">
              <p className="w-[238px] h-5 font-normal text-sm leading-[140%] flex items-center text-[#6B7280] self-stretch">
                Full Name
              </p>
              <p className="w-[238px] h-[22px] font-medium text-base leading-[140%] flex items-center text-[#111827] self-stretch">
                John Doe
              </p>
            </div>
            <div className="h-12 space-y-1.5">
              <p className="w-[238px] h-5 font-normal text-sm leading-[140%] flex items-center text-[#6B7280] self-stretch">
                ID Number
              </p>
              <p className="w-[238px] h-[22px] font-medium text-base leading-[140%] flex items-center text-[#111827] self-stretch">
                123456
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 space-y-1.5">
              <p className="w-[238px] h-5 font-normal text-sm leading-[140%] flex items-center text-[#6B7280] self-stretch">
                Full Name
              </p>
              <p className="w-[238px] h-[22px] font-medium text-base leading-[140%] flex items-center text-[#111827] self-stretch">
                John Doe
              </p>
            </div>
            <div className="h-12 space-y-1.5">
              <p className="w-[238px] h-5 font-normal text-sm leading-[140%] flex items-center text-[#6B7280] self-stretch">
                ID Number
              </p>
              <p className="w-[238px] h-[22px] font-medium text-base leading-[140%] flex items-center text-[#111827] self-stretch">
                123456
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 space-y-1.5">
              <p className="w-[238px] h-5 font-normal text-sm leading-[140%] flex items-center text-[#6B7280] self-stretch">
                Employer
              </p>
              <p className="w-[238px] h-[22px] font-medium text-base leading-[140%] flex items-center text-[#111827] self-stretch">
                Safaricom PLC
              </p>
            </div>
            <div className="h-12 space-y-1.5">
              <p className="w-[238px] h-5 font-normal text-sm leading-[140%] flex items-center text-[#6B7280] self-stretch">
                Employment Type
              </p>
              <p className="w-[238px] h-[22px] font-medium text-base leading-[140%] flex items-center text-[#111827] self-stretch">
                Permanent
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 space-y-1.5">
              <p className="w-[238px] h-5 font-normal text-sm leading-[140%] flex items-center text-[#6B7280] self-stretch">
                Phone Number
              </p>
              <p className="w-[238px] h-[22px] font-medium text-base leading-[140%] flex items-center text-[#111827] self-stretch">
                +254 712 345 678
              </p>
            </div>
            <div className="h-12 space-y-1.5">
              <p className="w-[238px] h-5 font-normal text-sm leading-[140%] flex items-center text-[#6B7280] self-stretch">
                Email
              </p>
              <p className="w-[238px] h-[22px] font-medium text-base leading-[140%] flex items-center text-[#111827] self-stretch">
                john.kamau@email.com
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 space-y-1.5">
              <p className="w-[238px] h-5 font-normal text-sm leading-[140%] flex items-center text-[#6B7280] self-stretch">
                Employee number
              </p>
              <p className="w-[238px] h-[22px] font-medium text-base leading-[140%] flex items-center text-[#111827] self-stretch">
                +254 712 345 678
              </p>
            </div>
            <div className="h-12 space-y-1.5">
              <p className="w-[238px] h-5 font-normal text-sm leading-[140%] flex items-center text-[#6B7280] self-stretch">
                Address
              </p>
              <p className="w-[238px] h-[22px] font-medium text-base leading-[140%] flex items-center text-[#111827] self-stretch">
                123 Kenyatta Avenue, Nairobi
              </p>
            </div>
          </div>
        </div>
      </CardContainer>
      <CardContainer title=" Shipping Details">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 space-y-1.5">
              <p className="w-[238px] h-5 font-normal text-sm leading-[140%] flex items-center text-[#6B7280] self-stretch">
                Delivery Type:
              </p>
              <p className="w-[238px] h-[22px] font-medium text-base leading-[140%] flex items-center text-[#111827] self-stretch">
                Doorstep Delivery
              </p>
            </div>
            <div className="h-12 space-y-1.5">
              <p className="w-[238px] h-5 font-normal text-sm leading-[140%] flex items-center text-[#6B7280] self-stretch">
                Drop Location
              </p>
              <p className="w-[238px] h-[22px] font-medium text-base leading-[140%] flex items-center text-[#111827] self-stretch">
                12345678
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 space-y-1.5">
              <p className="w-[238px] h-5 font-normal text-sm leading-[140%] flex items-center text-[#6B7280] self-stretch">
                Shipping Method
              </p>
              <p className="w-[238px] h-[22px] font-medium text-base leading-[140%] flex items-center text-[#111827] self-stretch">
                Standard
              </p>
            </div>
            <div className="h-12 space-y-1.5">
              <p className="w-[238px] h-5 font-normal text-sm leading-[140%] flex items-center text-[#6B7280] self-stretch">
                Delivery Date
              </p>
              <p className="w-[238px] h-[22px] font-medium text-base leading-[140%] flex items-center text-[#111827] self-stretch">
                Within 3 Business Days
              </p>
            </div>
          </div>
        </div>
      </CardContainer>
    </div>
    <div className="w-full flex-1 flex flex-col sticky top-0">
      <CardContainer className="flex flex-col" title="Device Details">
        <div className="space-y-4 overflow-y-auto scrollbar-hide max-h-[calc(96.5vh-200px)]">
          {devicesData.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      </CardContainer>
    </div>
  </div>
)

const KYCDocumentsTab = () => (
  <div className="my-8">
    <CardContainer title="KYC Documents">
      <div className="w-full p-6 rounded-2xl border max-h-[336px] scrollbar-hide overflow-y-auto divide-y divide-gray-200">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between py-6 px-2 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* Document Icon */}
              <div className="w-12 h-12 flex items-center justify-center bg-orange-50 rounded-lg">
                <FileKYCIcon />
              </div>

              {/* Document Info */}
              <div className="flex flex-col">
                <p className="font-medium text-base text-[#252525]">
                  {doc.name}
                </p>
                <p className="font-normal text-sm text-[#9CA3AF]">
                  Uploaded on {doc.uploadedDate}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Status Badge */}
              {doc.status === 'verified' ? (
                <span className="flex flex-row justify-center items-center px-3 py-2 gap-2 w-[69px] h-6 bg-[#1C8546]/8 rounded-full text-sm font-medium text-[#1C8546]">
                  <label className="w-[45px] h-[17px] flex items-center font-semibold text-xs leading-[140%] capitalize text-[#1C8546]">
                    Verified
                  </label>
                </span>
              ) : (
                <Button className="flex flex-row justify-center items-center px-3 py-2 gap-2 w-[65px] h-6 bg-[#2A53FE]/8 rounded-full text-sm font-medium text-[#2A53FE] border-0 hover:bg-[#2A53FE]/12 transition-colors">
                  <label className="w-[41px] cursor-pointer h-[17px] flex items-center font-semibold text-xs leading-[140%] capitalize text-[#2A53FE]">
                    Upload
                  </label>
                </Button>
              )}

              {/* View Icon */}
              <Button className="flex flex-row justify-center items-center p-3 gap-1.5 w-12 h-12 bg-[#F9FAFB] rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                <EyeIcon />
              </Button>

              {/* Download Icon */}
              <Button className="flex flex-row justify-center items-center p-3 gap-1.5 w-12 h-12 bg-[#F9FAFB] rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                <DownloadFileIcon />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </CardContainer>
  </div>
)

const CreditReviewTab = () => (
  <div className="my-8">
    <CardContainer title="KYC Documents">
      <div className="space-y-8">
        {/* Salary Information Section */}
        <div>
          <h3 className="text-base font-semibold text-black mb-4">
            Salary Information
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {salaryData.map((item) => (
              <KPICard
                key={item.id}
                label={item.label}
                value={item.value}
                valueColor={item.valueColor}
              />
            ))}
          </div>
        </div>

        {/* Loan Details Section */}
        <div>
          <h3 className="text-base font-semibold text-black mb-4">
            Loan Details
          </h3>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {loanDetailsData.map((item) => (
              <KPICard
                key={item.id}
                label={item.label}
                value={item.value}
                valueColor={item.valueColor}
                badge={item.badge}
              />
            ))}
          </div>

          <div className="w-[calc(25%-12px)]">
            <KPICard
              label="Repayable Loan"
              value="Ksh 2,640,000.00"
              valueColor="text-black"
            />
          </div>
        </div>

        <div className="w-full my-4 h-px bg-[#E8ECF4]"></div>

        {/* Bottom Colored Cards Section */}
        <div className="grid grid-cols-3 gap-6 pt-[33px] border-t ">
          {coloredCardsData.map((card) => (
            <ColoredKPICard
              key={card.id}
              label={card.label}
              value={card.value}
              bgColor={card.bgColor}
              textColor={card.textColor}
              iconBgColor={card.iconBgColor}
              icon={card.icon}
            />
          ))}
        </div>
      </div>
    </CardContainer>
  </div>
)

const ActivityTimelineTab = () => (
  <div className="my-6">
    <CardContainer title="Activity Timeline">
      <div className="p-6 bg-white border border-gray-100 rounded-sm">
        {timelineData.map((item, index) => (
          <TimelineItem
            key={item.id}
            icon={item.icon}
            iconBgColor={item.iconBgColor}
            title={item.title}
            author={item.author}
            timestamp={item.timestamp}
            isLast={index === timelineData.length - 1}
          />
        ))}
      </div>
    </CardContainer>
  </div>
)

function RouteComponent() {
  const [activeTab, setActiveTab] = React.useState(0)
  // const form = useForm({})

  const tabs = [
    { label: 'Customer & Device', component: <CustomerDeviceTab /> },
    { label: 'KYC Documents', component: <KYCDocumentsTab /> },
    { label: 'Credit Review', component: <CreditReviewTab /> },
    { label: 'Activity Timeline', component: <ActivityTimelineTab /> },
  ]

  return (
    <div className="space-y-8 w-full">
      <div className="flex   justify-between ">
        <div className="flex gap-4 w-full p-[9px]">
          <div>
            <label className="w-[83px] h-7 font-semibold text-xl leading-[140%] capitalize text-black">
              REQ-001
            </label>
          </div>
          <div className="flex flex-row justify-center items-center px-3 py-2 gap-2 w-[71px] h-6 bg-orange-500/8 rounded-full">
            <p className="w-[47px] h-[17px] font-semibold text-xs leading-[140%] flex items-center capitalize text-[#F47120]">
              pending
            </p>
          </div>
        </div>
        <div>
          <Button
            variant="default"
            size="sm"
            className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-[207px] h-[46px] bg-linear-to-b from-[#F8971D] to-[#EE3124] rounded-3xl"
          >
            <SendIcon size={24} />
            Send to Safaricom
          </Button>
        </div>
      </div>
      <div className="flex justify-between h-[39px]">
        <div className="flex w-full gap-3">
          <Button
            variant="Outline"
            className="flex border border-primary flex-row items-center text-primary px-4 py-2 gap-2 w-[127px] h-[39px] rounded-3xl"
          >
            <TickIcon size={24} />
            Approve
          </Button>
          <Button
            variant="Outline"
            className="flex border  flex-row items-center text-black px-4 py-2 gap-2 w-[127px] h-[39px] rounded-3xl"
          >
            <InfoIcon size={24} />
            Approve
          </Button>
        </div>
        <div>
          <Button
            variant="Outline"
            className="flex border border-primary flex-row items-center text-primary px-4 py-2 gap-2 w-[127px] h-[39px] rounded-3xl"
          >
            <CancelIcon size={24} />
            Decline
          </Button>
        </div>
      </div>
      <div>
        <div className="flex flex-row items-center p-0 w-full h-12 border-b border-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`relative h-12 flex flex-col items-center justify-center gap-3 flex-1 p-0 transition-colors ${
                activeTab === index ? 'text-[#252525]' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab(index)}
            >
              <span className="h-[34px] font-semibold text-2xl leading-[140%] text-center capitalize flex-none self-stretch">
                {tab.label}
              </span>
              {activeTab === index && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-orange-500" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div>{tabs[activeTab].component}</div>
      <div className="border bg-white rounded-2xl p-6 w-full">
        <div className="h-[34px] mb-4">
          <label className="w-[1064px] h-[34px] font-semibold text-2xl leading-[140%] capitalize text-[#070707] self-stretch">
            Message Templates
          </label>
        </div>

        <div className="h-[26px] flex gap-2">
          <div className="flex cursor-pointer hover:bg-gray-100 flex-row justify-center items-center px-[13px] py-[5px] w-auto h-[26px] border border-gray-300 rounded-full">
            <p className="font-normal text-xs leading-[140%] flex items-center text-center text-[#4B5563]">
              Welcome Message
            </p>
          </div>
          <div className="flex cursor-pointer hover:bg-gray-100 flex-row justify-center items-center px-[13px] py-[5px] w-auto h-[26px] border border-gray-300 rounded-full">
            <p className="font-normal text-xs leading-[140%] flex items-center text-center text-[#4B5563]">
              Request Additional Info
            </p>
          </div>
          <div className="flex cursor-pointer hover:bg-gray-100 flex-row justify-center items-center px-[13px] py-[5px] w-auto h-[26px] border border-gray-300 rounded-full">
            <p className="font-normal text-xs leading-[140%] flex items-center text-center text-[#4B5563]">
              Loan Approved
            </p>
          </div>
          <div className="flex cursor-pointer hover:bg-gray-100 flex-row justify-center items-center px-[13px] py-[5px] w-auto h-[26px] border border-gray-300 rounded-full">
            <p className="font-normal text-xs leading-[140%] flex items-center text-center text-[#4B5563]">
              Loan Declined
            </p>
          </div>
        </div>

        <div className="w-full my-4 h-px bg-[#E8ECF4]"></div>

        {/* Recent Messages Section */}
        <div className="py-6 px-4">
          <div className="mb-6">
            <h3 className="font-semibold text-lg text-[#070707] mb-3">
              Recent Messages
            </h3>
          </div>
          <div>
            {/* Message 1 */}
            <div className="flex justify-end">
              <div className="flex flex-col justify-between px-3 py-2 gap-1 w-[465px] h-20 bg-orange-500/12 rounded-lg">
                <div className="font-normal w-[256px] text-base leading-[140%] flex items-center text-[#252525]">
                  Welcome to OKOA SASA! Your request is being processed.
                </div>
                <div className="flex justify-end">
                  <label className="font-normal text-xs leading-[140%] text-[#676D75]">
                    2024-01-15 09:30 AM
                  </label>
                </div>
              </div>
            </div>
            {/* Message 2*/}
            <div className="flex justify-start">
              <div className="flex flex-col justify-between px-3 py-2 gap-1 w-[465px] h-20 bg-brand-bg-2 rounded-lg">
                <div className="font-normal w-[256px] text-base leading-[140%] flex items-center text-[#252525]">
                  Thank you. When will I get feedback?
                </div>
                <div className="flex justify-end">
                  <label className="font-normal text-xs leading-[140%] text-[#676D75]">
                    2024-01-15 10:15 AM
                  </label>
                </div>
              </div>
            </div>
            {/* Message 3 */}
            <div className="flex justify-end">
              <div className="flex flex-col justify-between px-3 py-2 gap-1 w-[465px] h-20 bg-orange-500/12 rounded-lg">
                <div className="font-normal w-[256px] text-base leading-[140%] flex items-center text-[#252525]">
                  We will review your application within 24 hours.
                </div>
                <div className="flex justify-end">
                  <label className="font-normal text-xs leading-[140%] text-[#676D75]">
                    2024-01-15 10:20 AM
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center p-4 bg-brand-bg-2 rounded-2xl gap-3 w-full">
          <input
            type="text"
            placeholder="Write a message here"
            className="flex-1 h-11 px-4 bg-white border border-gray-200 rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:border-orange-500"
          />
          <Button
            size="md"
            className="flex items-center justify-center w-11 h-11 bg-linear-to-b from-[#F8971D] to-[#EE3124] rounded-lg hover:opacity-90 transition-opacity"
          >
            <SendMsgIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  )
}

