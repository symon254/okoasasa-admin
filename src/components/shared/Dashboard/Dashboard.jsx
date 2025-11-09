import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  ArrowDownRight,
  ArrowUpRight,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  HandCoins,
  DollarSign,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { cn } from '@/lib/utils'
import {} from 'lucide-react'
import DynamicChart from './Charts/Dyanamic'
import DonutChart from './Charts/Donut'
// import { useDashboardStats } from '@/lib/queries/dashboard'

// Mock Data matching your screenshot exactly
const stats = {
  pendingRequests: { value: 32, change: 4.5, trendingUp: true },
  approvedRequests: { value: 120, change: -4.5, trendingUp: false },
  declinedRequests: { value: 45, change: -4.5, trendingUp: false },
  fulfilledOrders: { value: 95, change: 4.5, trendingUp: true },
  activeLoans: { value: 210, change: -4.5, trendingUp: false },
  completedLoans: { value: 158, change: 4.5, trendingUp: true },
}

const loanVolumeData = [
  { name: 'TSC', value: 520000 },
  { name: 'NPS', value: 680000 },
  { name: 'Nestle', value: 420000 },
  { name: 'MoH', value: 180000 },
  { name: 'Kenya RA', value: 320000 },
  { name: 'HFS', value: 480000 },
]

const devicesSoldData = [
  { name: 'Phones', value: 20, color: '#f59e0b' },
  { name: 'Laptops', value: 30, color: '#8b5cf6' },
  { name: 'Tablets', value: 50, color: '#06b6d4' },
  { name: 'Routers', value: 20, color: '#3b82f6' },
]

const requestsTrendData = [
  { month: 'Jan', requests: 320 },
  { month: 'Feb', requests: 480 },
  { month: 'Mar', requests: 380 },
  { month: 'Apr', requests: 620 },
  { month: 'May', requests: 540 },
  { month: 'Jun', requests: 680 },
]

const recentRequests = [
  {
    id: '#REQ-20458',
    date: 'Oct 12, 2025',
    name: 'Jane Mwangi',
    employer: 'Teachers Service...',
    device: 'Samsung Galaxy...',
    amount: '38,500 KES',
    status: 'Pending',
    statusColor: 'bg-yellow-100 text-yellow-800',
  },
  {
    id: '#REQ-20458',
    date: 'Oct 12, 2025',
    name: 'Jane Mwangi',
    employer: 'Teachers Service...',
    device: 'Samsung Galaxy...',
    amount: '38,500 KES',
    status: 'Approved',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    id: '#REQ-20458',
    date: 'Oct 12, 2025',
    name: 'Jane Mwangi',
    employer: 'Teachers Service...',
    device: 'Samsung Galaxy...',
    amount: '38,500 KES',
    status: 'Fulfilled',
    statusColor: 'bg-blue-100 text-blue-800',
  },
  {
    id: '#REQ-20458',
    date: 'Oct 12, 2025',
    name: 'Jane Mwangi',
    employer: 'Teachers Service...',
    device: 'Samsung Galaxy...',
    amount: '38,500 KES',
    status: 'Declined',
    statusColor: 'bg-red-100 text-red-800',
  },
]

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <Card
    className={cn(
      'w-full h-[105px] bg-white border border-[#E8ECF4] rounded-xl',
      'shadow-none hover:shadow-md transition-shadow duration-200',
      'flex items-center justify-between',
      'p-4 gap-3',
      'flex-none order-0 flex-grow',
    )}
  >
    <CardContent className="p-0 flex items-center justify-between w-full">
      {/* Left: Text Content */}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600 leading-tight">
          {title}
        </p>
        <p className="text-2xl font-bold text-gray-900 mt-1.5 leading-none">
          {value}
        </p>
        <div className="flex items-center mt-2">
          {change > 0 ? (
            <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-600 mr-1" />
          )}
          <span
            className={`text-sm font-medium ${
              change > 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {Math.abs(change)}%
          </span>
        </div>
      </div>

      {/* Right: Icon Circle */}
      <div
        className={`w-12 h-12 rounded-full ${color} flex items-center justify-center flex-shrink-0`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
    </CardContent>
  </Card>
)

export default function Dashboard() {
  // const { data: apiResponse, isLoading } = useDashboardStats()
  // console.log("API Response in Dashboard Component:", apiResponse);
  // const data = apiResponse?.data
  // const stats = data?.rows || []
  return (
    <div className="min-h-screen ">
      {/* Header */}

      <div className=" mx-auto">
        {/* Statistics Grid */}

        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">
            Statistics
          </h2>

          {/* First Row */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            <StatCard
              title="Pending Requests"
              value="32"
              change={4.5}
              icon={() => (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 8v4l3 3" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              )}
            />
            <StatCard
              title="Approved Requests"
              value="120"
              change={-4.5}
              icon={() => (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              )}
            />
            <StatCard
              title="Declined Requests"
              value="45"
              change={-4.5}
              icon={() => (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              )}
            />
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
            <StatCard
              title="Fulfilled Orders"
              value="95"
              change={4.5}
              icon={() => (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              )}
            />
            <StatCard
              title="Active Loans"
              value="210"
              change={-4.5}
              icon={() => (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2z" />
                  <path d="M12 6v6l4 2" />
                </svg>
              )}
            />
            <StatCard
              title="Completed Loans"
              value="158"
              change={4.5}
              icon={() => (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              )}
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Charts</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. Loan Volume - Bar Chart */}
            <DynamicChart
              type="bar"
              data={loanVolumeData}
              dataKey="value"
              title="Loan Volume"
              color="#f97316"
              badges={[
                { label: 'Employer', color: '#1f2937', variant: 'solid' }, // dark badge
                { label: 'Region', variant: 'outline' },
              ]}
              formatter={(value) => `KES ${value.toLocaleString()}`}
            />

            {/* 2. Devices Sold - Donut Chart (LEGEND ON RIGHT, 102k INSIDE) */}
            <DonutChart
              data={devicesSoldData}
              total="102k"
              title="Devices Sold"
              subtitle="Devices Sold"
            />

            {/* Requests Trend - Line Chart (NOW WORKS!) */}
            <DynamicChart
              type="line"
              data={requestsTrendData}
              dataKey="requests"
              xAxisKey="month" // This was missing!
              title="Requests Trend"
              color="#3b82f6"
              badges={[
                { label: 'Week', color: '#fb923c' },
                { label: 'Months', variant: 'outline' },
              ]}
            />
          </div>
        </div>

        {/* Recent Requests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Requests
            </h2>
            <Button variant="link" className="text-orange-600">
              View All
            </Button>
          </div>
          <Card className="bg-white rounded-xl shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left text-md font-medium text-gray-900 px-6 py-4">
                        Request ID
                      </th>
                      <th className="text-left text-md font-medium text-gray-900 px-6 py-4">
                        Created Date
                      </th>
                      <th className="text-left text-md font-medium text-gray-900 px-6 py-4">
                        Name
                      </th>
                      <th className="text-left text-md font-medium text-gray-900 px-6 py-4">
                        Employer
                      </th>
                      <th className="text-left text-md font-medium text-gray-900 px-6 py-4">
                        Device
                      </th>
                      <th className="text-left text-md font-medium text-gray-900 px-6 py-4">
                        Loan Amount
                      </th>
                      <th className="text-left text-md font-medium text-gray-900 px-6 py-4">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRequests.map((req, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className=" px-6 py-4 text-sm font-public-sans text-gray-900">
                          {req.id}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-900">
                          {req.date}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {req.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 truncate max-w-40">
                          {req.employer}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 truncate max-w-40">
                          {req.device}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {req.amount}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant="secondary"
                            className={`px-3 py-1 text-xs font-medium rounded-full ${req.statusColor}`}
                          >
                            {req.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
