import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowRightIcon,
  BoxCheckIcon,
  CalendarPrimIcon,
  DownIcon,
  RequestIcon,
  TickCircleIcon,
  TrashXIcon,
  UpIcon,
} from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import React from 'react'
import RequestsTable from '@/components/shared/Requests/RequestTable'

const statsData = [
  {
    id: 1,
    title: 'Pending Requests',
    value: '32',
    percentage: '4.5',
    isPositive: true,
    iconBgColor: 'bg-blue-50',
    icon: <RequestIcon />,
  },
  {
    id: 2,
    title: 'Approved Requests',
    value: '120',
    percentage: '4.5',
    isPositive: false,
    iconBgColor: 'bg-green-50',
    icon: <TickCircleIcon />,
  },
  {
    id: 3,
    title: 'Declined Requests',
    value: '45',
    percentage: '4.5',
    isPositive: false,
    iconBgColor: 'bg-red-50',
    icon: <TrashXIcon />,
  },
  {
    id: 4,
    title: 'Fulfilled Orders',
    value: '89',
    percentage: '4.5',
    isPositive: true,
    iconBgColor: 'bg-purple-50',
    icon: <BoxCheckIcon />,
  },
]

const StatsCard = ({ title, value, percentage, isPositive, icon }) => {
  return (
    <div className=" flex bg-white border border-gray-200 rounded-2xl">
      <div className="gap-1.5 m-4">
        <div className="w-[205px] h-5 font-normal text-sm leading-[140%] text-[#676D75] self-stretch">
          {title}
        </div>
        <label className="w-[26px] h-7 font-semibold text-xl leading-[140%] capitalize text-[#252525]">
          {value}
        </label>
        <div className="flex gap-1">
          {isPositive ? <UpIcon size={14} /> : <DownIcon size={14} />}
          <span
            className={`w-[30px] h-[17px] font-medium text-xs leading-[140%] ${isPositive ? 'text-[#1C8546]' : 'text-[#CA1D1D]'}`}
          >
            {percentage}%
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center w-12 -mr-6">{icon}</div>
    </div>
  )
}

const FilterChip = ({ label, value, onRemove }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-2xl">
      <span className="text-sm text-gray-600 font-normal">{label}</span>
      <span className="text-sm text-black font-medium">{value}</span>
      <button
        onClick={onRemove}
        className="flex cursor-pointer items-center justify-center w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

function RouteComponent() {
  const [activeFilters, setActiveFilters] = React.useState([
    { id: 1, label: 'Employer', value: 'Ola International, Nestle' },
    { id: 2, label: 'Region', value: 'Asia' },
    { id: 3, label: 'Device Type', value: 'Mobile Phones, Tablets' },
  ])

  const handleRemoveFilter = (filterId) => {
    setActiveFilters(activeFilters.filter((filter) => filter.id !== filterId))
  }

  return (
    <div className="w-full space-y-8">
      <div>
        <div className="grid grid-cols-4 gap-3">
          {statsData.map((stat) => (
            <StatsCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              percentage={stat.percentage}
              isPositive={stat.isPositive}
              icon={stat.icon}
              iconBgColor={stat.iconBgColor}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="py-[9px] ">
          <label className=" font-semibold text-xl leading-[140%] capitalize text-black flex-none grow">
            Request
          </label>
        </div>
        <Button
          variant={'default'}
          className="box-border flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-[129px] h-[46px] bg-linear-to-b from-[#F8971D] to-[#EE3124] rounded-3xl"
        >
          <label className="w-[97px] h-[22px] font-medium text-base leading-[140%] capitalize text-white">
            Add Request
          </label>
        </Button>
      </div>
      <div className="space-y-4">
        <div className="">
          <label className="w-[61px] h-7 font-semibold text-xl leading-[140%] capitalize text-black">
            Filters
          </label>
        </div>
        <div>
          <div className="mb-2">
            <label className="w-[1112px] h-5 font-medium text-sm leading-[140%] text-black flex-none flex-grow">
              Date Range
            </label>
          </div>
          <div>
            <div className="flex w-full items-center gap-4">
              <div className="h-11 border  cursor-pointer flex justify-center items-center gap-2.5 bg-white rounded-lg w-full">
                <CalendarPrimIcon />
                <span className="w-[83px] h-5 font-medium text-sm leading-[140%] text-[#252525]">
                  24-10-2024
                </span>
                <ArrowRightIcon size={14} />
                <span className="w-[83px] h-5 font-medium text-sm leading-[140%] text-[#252525]">
                  24-10-2024
                </span>
              </div>
              <div className="h-11 border cursor-pointer flex justify-center items-center gap-2.5 bg-white rounded-lg w-full">
                <CalendarPrimIcon />

                <ArrowRightIcon size={14} />
                <span className="w-[83px] h-5 font-medium text-sm leading-[140%] text-[#252525]">
                  24-10-2024
                </span>
              </div>
              <div className="h-11 border px-4 py-3 cursor-pointer flex justify-between items-center gap-2.5 bg-white rounded-lg w-full">
                <span className="w-11 h-5 font-medium text-sm leading-[140%] text-[#252525]">
                  Status
                </span>

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0003 13.9995C9.41693 13.9995 8.83359 13.7745 8.39193 13.3329L2.95859 7.89954C2.71693 7.65788 2.71693 7.25788 2.95859 7.01621C3.20026 6.77454 3.60026 6.77454 3.84193 7.01621L9.27526 12.4495C9.67526 12.8495 10.3253 12.8495 10.7253 12.4495L16.1586 7.01621C16.4003 6.77454 16.8003 6.77454 17.0419 7.01621C17.2836 7.25788 17.2836 7.65788 17.0419 7.89954L11.6086 13.3329C11.1669 13.7745 10.5836 13.9995 10.0003 13.9995Z"
                    fill="#252525"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[248px] h-7 font-semibold text-xl leading-[140%] capitalize text-black">
          Loan Amount Range (KES)
        </div>
        <div className="space-y-2">
          <div className="flex">
            <div className="w-[552px] h-5 font-medium text-sm leading-[140%] text-black flex-none grow">
              Min amount
            </div>
            <div className="w-[552px] h-5 font-medium text-sm leading-[140%] text-black flex-none grow">
              Max amount
            </div>
          </div>
          <div className="flex w-2/3 items-center gap-4">
            <input
              type="number"
              className="box-border flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-[360px] h-11 bg-white border border-[#E8ECF4] rounded-xl flex-none flex-grow"
            />
            <input
              type="number"
              className="box-border flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-[360px] h-11 bg-white border border-[#E8ECF4] rounded-xl flex-none flex-grow"
            />
          </div>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            {activeFilters.map((filter) => (
              <FilterChip
                key={filter.id}
                label={filter.label}
                value={filter.value}
                onRemove={() => handleRemoveFilter(filter.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <RequestsTable />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_protected/_request/request')({
  component: RouteComponent,
})
