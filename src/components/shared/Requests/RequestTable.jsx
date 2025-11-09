import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button } from '../CustomButton'
import {
  EditPenIcon,
  ExportIcon,
  EyeSecIcon,
  GridIcon,
  ListCheckIcon,
  RefreshIcon,
  TrashRedIcon,
} from '@/assets/icons'

// Table Row Component
const TableRow = ({ request, isSelected, onSelectChange, onViewClick }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-orange-50 text-orange-600'
      case 'Approved':
        return 'bg-green-50 text-green-600'
      case 'Fulfilled':
        return 'bg-blue-50 text-blue-600'
      case 'Declined':
        return 'bg-red-50 text-red-600'
      default:
        return 'bg-gray-50 text-gray-600'
    }
  }

  return (
    <tr className="border-b rounded-2xl border-gray-100 hover:bg-gray-50">
      <td className="px-4 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelectChange}
          className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
        />
      </td>
      <td className="px-4 py-4 text-sm text-black font-medium">{request.id}</td>
      <td className="px-4 py-4 text-sm text-gray-600">{request.createdDate}</td>
      <td className="px-4 py-4 text-sm text-gray-900">{request.name}</td>
      <td className="px-4 py-4 text-sm text-gray-600">{request.employer}</td>
      <td className="px-4 py-4 text-sm text-gray-600">{request.device}</td>
      <td className="px-4 py-4 text-sm text-gray-900 font-medium">
        {request.loanAmount}
      </td>
      <td className="px-4 py-4">
        <span
          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(request.status)}`}
        >
          {request.status}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <Button className="flex flex-row justify-center items-center p-2 gap-2.5 w-[31.24px] h-[34px] bg-green-100/15 rounded-[10px] hover:bg-green-50 transition-colors">
            <EditPenIcon className="w-4 h-4 text-green-600" />
          </Button>
          <Button className="flex flex-row justify-center items-center p-2 gap-2.5 w-[31.24px] h-[34px] bg-red-100/15 rounded-[10px] hover:bg-red-50 transition-colors">
            <TrashRedIcon className="w-4 h-4 text-red-500" />
          </Button>
          <Button 
            onClick={() => onViewClick(request.requestId)}
            className="flex flex-row justify-center items-center p-2 gap-2.5 w-[31.24px] h-[34px] bg-orange-100/15 rounded-[10px] hover:bg-orange-50 transition-colors cursor-pointer"
          >
            <EyeSecIcon className="w-4 h-4 text-orange-500" />
          </Button>
        </div>
      </td>
    </tr>
  )
}

// Main Table Component
const RequestsTable = () => {
  const navigate = useNavigate()
  const [selectedRows, setSelectedRows] = useState([])

  // Updated dummy data with requestId field
  const requests = [
    {
      id: '#REQ-20458',
      requestId: 'REQ-001', // Add unique requestId for routing
      createdDate: 'Oct 12, 2025',
      name: 'Jane Mwangi',
      employer: 'Teachers Service...',
      device: 'Samsung Galaxy...',
      loanAmount: '38,500 KES',
      status: 'Pending',
    },
    {
      id: '#REQ-20459',
      requestId: 'REQ-002',
      createdDate: 'Oct 12, 2025',
      name: 'John Kamau',
      employer: 'Teachers Service...',
      device: 'Samsung Galaxy...',
      loanAmount: '38,500 KES',
      status: 'Approved',
    },
    {
      id: '#REQ-20460',
      requestId: 'REQ-003',
      createdDate: 'Oct 12, 2025',
      name: 'Mary Wanjiku',
      employer: 'Teachers Service...',
      device: 'Samsung Galaxy...',
      loanAmount: '38,500 KES',
      status: 'Approved',
    },
    {
      id: '#REQ-20461',
      requestId: 'REQ-004',
      createdDate: 'Oct 12, 2025',
      name: 'Peter Omondi',
      employer: 'Teachers Service...',
      device: 'Samsung Galaxy...',
      loanAmount: '38,500 KES',
      status: 'Fulfilled',
    },
    {
      id: '#REQ-20462',
      requestId: 'REQ-005',
      createdDate: 'Oct 12, 2025',
      name: 'Sarah Achieng',
      employer: 'Teachers Service...',
      device: 'Samsung Galaxy...',
      loanAmount: '38,500 KES',
      status: 'Declined',
    },
    {
      id: '#REQ-20463',
      requestId: 'REQ-006',
      createdDate: 'Oct 12, 2025',
      name: 'David Kipchoge',
      employer: 'Teachers Service...',
      device: 'Samsung Galaxy...',
      loanAmount: '38,500 KES',
      status: 'Declined',
    },
  ]

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(requests.map((_, index) => index))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index))
    } else {
      setSelectedRows([...selectedRows, index])
    }
  }

  const handleViewRequest = (requestId) => {
    navigate({ 
      to: '/request/$requestId',
      params: { requestId }
    })
  }

  const isAllSelected =
    selectedRows.length === requests.length && requests.length > 0

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden pt-6 pb-10 px-4">
      {/* Table Header with Actions */}
      <div className="flex items-center justify-between px-6 pt-4 border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAll}
              className="w-[18px] h-[18px] -ml-2.5 cursor-pointer rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            <span className="w-[85px] h-5 font-normal text-sm leading-[140%] flex items-center text-center text-[#252525]">
              Select All ({requests.length})
            </span>
          </div>
          <div className="box-border flex flex-row items-center px-4 py-3 gap-2.5 w-[292px] h-11 bg-white border border-[#E8ECF4] rounded-[52px] flex-none flex-grow relative">
            <div className="flex flex-row items-center p-0 gap-2.5 w-[260px] h-5 flex-none flex-grow">
              <Search className="w-5 h-5 text-[#676D75] flex-none" />
              <input
                type="text"
                placeholder="Search by customer or request id"
                className="w-[230px] h-5 font-medium text-sm leading-[140%] text-[#A0A4AC] placeholder:text-[#A0A4AC] bg-transparent border-0 focus:outline-none focus:ring-0 flex-none flex-grow"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="Outline"
            className="flex h-[42px ] items-center gap-2.5 px-4 py-2.5 text-md font-medium text-orange-600 border border-orange-500 rounded-3xl hover:bg-orange-50 transition-colors"
          >
            Export
            <ExportIcon size={24} />
          </Button>
          <Button className="box-border flex flex-row justify-center items-center p-3 gap-1.5 w-[42px] h-[42px] bg-linear-to-b from-[#F8971D] to-[#EE3124] rounded-full text-white hover:opacity-90 transition-opacity flex-none">
            <ListCheckIcon size={18} />
          </Button>
          <Button className="flex flex-row justify-center items-center p-3 gap-1.5 w-[42px] h-[42px] bg-[#F9FAFB] rounded-full text-gray-600 hover:bg-gray-200 transition-colors flex-none">
            <GridIcon size={18} />
          </Button>
          <Button className="flex flex-row justify-center items-center p-3 gap-1.5 w-12 h-12 bg-[#F9FAFB] rounded-full text-gray-600 hover:bg-gray-200 transition-colors flex-none">
            <RefreshIcon size={24} />
          </Button>
        </div>
      </div>
      <div className="w-full my-4 h-0 border-t border-gray-200 flex-none self-stretch"></div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="w-[18px] h-[18px] cursor-pointer rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Request ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Created Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Employer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Device
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Loan Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <TableRow
                key={index}
                request={request}
                isSelected={selectedRows.includes(index)}
                onSelectChange={() => handleSelectRow(index)}
                onViewClick={handleViewRequest}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 px-6 py-4 border-t border-gray-100">
        <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-lg font-medium text-sm">
          1
        </button>
        <span className="text-sm text-gray-400">...</span>
        <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm">
          9
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm">
          10
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default RequestsTable