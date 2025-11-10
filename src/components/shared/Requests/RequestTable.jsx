import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../CustomButton'
import {
  EditPenIcon,
  ExportIcon,
  EyeSecIcon,
  GridIcon,
  ListCheckIcon,
  RefreshIcon,
  TrashIconWhite,
  TrashRedIcon,
} from '@/assets/icons'
import EditRequestDialog from './EditRequestDialog'

// Table Row Component
const TableRow = ({
  request,
  isSelected,
  onSelectChange,
  onDeleteClick,
  onEditClick,
}) => {
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
          <Button 
            onClick={() => onEditClick(request)}
            className="flex flex-row justify-center items-center p-2 gap-2.5 w-[31.24px] h-[34px] bg-green-100/15 rounded-[10px] hover:bg-green-50 transition-colors"
          >
            <EditPenIcon className="w-4 h-4 text-green-600" />
          </Button>
          <Button 
            onClick={() => onDeleteClick(request)}
            className="flex flex-row justify-center items-center p-2 gap-2.5 w-[31.24px] h-[34px] bg-red-100/15 rounded-[10px] hover:bg-red-50 transition-colors"
          >
            <TrashRedIcon className="w-4 h-4 text-red-500" />
          </Button>
          <Link
            to="/request/$requestId"
            params={{ requestId: request.requestId }}
            className="flex flex-row justify-center items-center p-2 gap-2.5 w-[31.24px] h-[34px] bg-orange-100/15 rounded-[10px] hover:bg-orange-50 transition-colors cursor-pointer"
          >
            <EyeSecIcon className="w-4 h-4 text-orange-500" />
          </Link>
        </div>
      </td>
    </tr>
  )
}

// Main Table Component
const RequestsTable = ({ minAmount, maxAmount, statusFilter,dateRange,
  singleDate  }) => {
  const navigate = useNavigate()
  const [selectedRows, setSelectedRows] = useState([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [itemToEdit, setItemToEdit] = useState(null)
  const [requests, setRequests] = useState([
    {
      id: '#REQ-20458',
      requestId: 'REQ-001',
      createdDate: 'Oct 12, 2025',
      name: 'Jane Mwangi',
      employer: 'Teachers Service...',
      device: 'Samsung Galaxy...',
      loanAmount: '38,500',
      loanAmountNumeric: 38500,
      status: 'Pending',
    },
    {
      id: '#REQ-20459',
      requestId: 'REQ-002',
      createdDate: 'Oct 12, 2025',
      name: 'John Kamau',
      employer: 'Teachers Service...',
      device: 'Samsung Galaxy...',
      loanAmount: '42,000',
      loanAmountNumeric: 42000,
      status: 'Approved',
    },
    {
      id: '#REQ-20460',
      requestId: 'REQ-003',
      createdDate: 'Oct 12, 2025',
      name: 'Mary Wanjiku',
      employer: 'Teachers Service...',
      device: 'Samsung Galaxy...',
      loanAmount: '25,000',
      loanAmountNumeric: 25000,
      status: 'Approved',
    },
    {
      id: '#REQ-20461',
      requestId: 'REQ-004',
      createdDate: 'Oct 12, 2025',
      name: 'Peter Omondi',
      employer: 'Teachers Service...',
      device: 'Samsung Galaxy...',
      loanAmount: '55,000',
      loanAmountNumeric: 55000,
      status: 'Fulfilled',
    },
    {
      id: '#REQ-20462',
      requestId: 'REQ-005',
      createdDate: 'Oct 12, 2025',
      name: 'Sarah Achieng',
      employer: 'Teachers Service...',
      device: 'Samsung Galaxy...',
      loanAmount: '15,000',
      loanAmountNumeric: 15000,
      status: 'Declined',
    },
    {
      id: '#REQ-20463',
      requestId: 'REQ-006',
      createdDate: 'Oct 12, 2025',
      name: 'David Kipchoge',
      employer: 'Teachers Service...',
      device: 'Samsung Galaxy...',
      loanAmount: '60,000',
      loanAmountNumeric: 60000,
      status: 'Declined',
    },
  ])

  // Filter requests based on criteria
  const filteredRequests = requests.filter((request) => {
    if (
      minAmount !== null &&
      minAmount !== '' &&
      request.loanAmountNumeric < parseFloat(minAmount)
    ) {
      return false
    }
    if (
      maxAmount !== null &&
      maxAmount !== '' &&
      request.loanAmountNumeric > parseFloat(maxAmount)
    ) {
      return false
    }
    if (statusFilter && request.status !== statusFilter) {
      return false
    }

     // Date range filtering
    if (dateRange.startDate && dateRange.endDate) {
      const requestDate = new Date(request.createdDate)
      const startDate = new Date(dateRange.startDate)
      const endDate = new Date(dateRange.endDate)
      
      if (requestDate < startDate || requestDate > endDate) {
        return false
      }
    }
    
    // Single date filtering
    if (singleDate) {
      const requestDate = new Date(request.createdDate).toDateString()
      const filterDate = new Date(singleDate).toDateString()
      
      if (requestDate !== filterDate) {
        return false
      }
    }
    return true
  })

  // Handle edit button click
  const handleEditClick = (request) => {
    setItemToEdit(request)
    setShowEditDialog(true)
  }

  // Handle save edited request
  const handleSaveEdit = (updatedRequest) => {
    setRequests(prevRequests =>
      prevRequests.map(request =>
        request.requestId === updatedRequest.requestId ? updatedRequest : request
      )
    )
    setShowEditDialog(false)
    setItemToEdit(null)
  }

  // Handle delete button click
  const handleDeleteClick = (request) => {
    setItemToDelete(request)
    setShowDeleteDialog(true)
  }

  // Confirm delete action
  const confirmDelete = () => {
    if (itemToDelete) {
      setRequests(prevRequests => 
        prevRequests.filter(request => request.requestId !== itemToDelete.requestId)
      )
      const requestIndex = filteredRequests.findIndex(
        req => req.requestId === itemToDelete.requestId
      )
      if (requestIndex !== -1 && selectedRows.includes(requestIndex)) {
        setSelectedRows(prev => prev.filter(index => index !== requestIndex))
      }
    }
    setShowDeleteDialog(false)
    setItemToDelete(null)
  }

  // Cancel delete action
  const cancelDelete = () => {
    setShowDeleteDialog(false)
    setItemToDelete(null)
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(filteredRequests.map((_, index) => index))
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
      params: { requestId },
    })
  }

  const isAllSelected =
    selectedRows.length === filteredRequests.length &&
    filteredRequests.length > 0

  return (
    <>
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
                Select All ({filteredRequests.length})
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
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request, index) => (
                  <TableRow
                    key={request.requestId}
                    request={request}
                    isSelected={selectedRows.includes(index)}
                    onSelectChange={() => handleSelectRow(index)}
                    onDeleteClick={handleDeleteClick}
                    onEditClick={handleEditClick}
                    onViewClick={handleViewRequest}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                    No requests found matching the current filters.
                  </td>
                </tr>
              )}
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

      {/* Edit Request Dialog */}
      <EditRequestDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        request={itemToEdit}
        onSave={handleSaveEdit}
      />

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && itemToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#F8971D] to-[#EE3124] rounded-full flex items-center justify-center mb-4">
              <TrashIconWhite className="w-8 h-8" fill="white" />
            </div>

            <h2 className="text-xl font-bold mb-2 text-gray-900">
              Delete Request?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete the request "
              {itemToDelete.name}" ({itemToDelete.id})? This action cannot be undone.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={confirmDelete}
                className="flex items-center justify-center gap-2 w-full h-[46px] px-4 py-3 
                  bg-gradient-to-b from-[#F8971D] to-[#EE3124] rounded-3xl 
                  text-white font-medium text-base shadow-sm hover:opacity-90 transition-all"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="flex items-center justify-center gap-2 w-full h-[46px] px-4 py-3 
                  border border-[#F8971D] text-[#F8971D] rounded-[24px] 
                  font-medium text-base hover:bg-[#F8971D]/10 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RequestsTable