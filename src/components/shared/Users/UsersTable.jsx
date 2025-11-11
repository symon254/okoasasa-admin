// UsersTable.jsx
import { useState, useEffect } from 'react'
import { Search, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  EditPenIcon,
  ExportIcon,
  GridIcon,
  ListCheckIcon,
  RefreshIcon,
  TrashRedIcon,
  PauseIcon,
} from '@/assets/icons'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import EditUserDialog from './EditUser'
import DeactivateUserDialog from './DeactivateUser'
import DeleteUserDialog from './DeleteUser'

// Table Row Component
const TableRow = ({
  user,
  isSelected,
  onSelectChange,
  onDeleteClick,
  onEditClick,
  onDeactivateClick,
  visibleColumns,
}) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-50 text-green-600'
      case 'In Active':
        return 'bg-red-50 text-red-600'
      default:
        return 'bg-gray-50 text-gray-600'
    }
  }

  const getRoleStyle = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-50 text-purple-600'
      case 'Manager':
        return 'bg-blue-50 text-blue-600'
      case 'Employee':
        return 'bg-gray-50 text-gray-600'
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
      {visibleColumns.id && (
        <td className="px-4 py-4 text-sm text-black font-medium">#{user.id}</td>
      )}
      {visibleColumns.name && (
        <td className="px-4 py-4 text-sm text-gray-900 font-medium">
          {user.name}
        </td>
      )}
      {visibleColumns.email && (
        <td className="px-4 py-4 text-sm text-gray-600">{user.email}</td>
      )}
      {visibleColumns.role && (
        <td className="px-4 py-4">
          <span
            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getRoleStyle(user.role)}`}
          >
            {user.role}
          </span>
        </td>
      )}
      {visibleColumns.department && (
        <td className="px-4 py-4 text-sm text-gray-600">{user.department}</td>
      )}
      {visibleColumns.lastActive && (
        <td className="px-4 py-4 text-sm text-gray-600">{user.lastActive}</td>
      )}
      {visibleColumns.status && (
        <td className="px-4 py-4">
          <span
            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(user.status)}`}
          >
            {user.status}
          </span>
        </td>
      )}
      {visibleColumns.action && (
        <td className="px-4 py-4">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => onEditClick(user)}
              variant="ghost"
              size="icon"
              className="w-8 h-8 bg-green-100/15 hover:bg-green-50"
            >
              <EditPenIcon className="w-4 h-4 text-green-600" />
            </Button>
            <Button
              onClick={() => onDeleteClick(user)}
              variant="ghost"
              size="icon"
              className="w-8 h-8 bg-red-100/15 hover:bg-red-50"
            >
              <TrashRedIcon className="w-4 h-4 text-red-500" />
            </Button>
            <Button
              onClick={() => onDeactivateClick(user)}
              variant="ghost"
              size="icon"
              className="w-8 h-8 bg-orange-100/15 hover:bg-orange-50"
            >
              <PauseIcon className="w-4 h-4 text-orange-500" />
            </Button>
          </div>
        </td>
      )}
    </tr>
  )
}

// Filter Chip Component
const FilterChip = ({ label, value, onRemove, onEdit }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-2xl">
      <span className="text-sm text-gray-600 font-normal">{label}</span>
      <span className="text-sm text-black font-medium">{value}</span>
      <button
        onClick={onEdit}
        className="flex cursor-pointer items-center justify-center w-4 h-4 text-orange-500 hover:text-orange-600 transition-colors"
        aria-label={`Edit ${label} filter`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.0833 1.75C11.275 1.55833 11.525 1.45833 11.8333 1.45833C12.1417 1.45833 12.3917 1.55833 12.5833 1.75C12.775 1.94167 12.875 2.19167 12.875 2.5C12.875 2.80833 12.775 3.05833 12.5833 3.25L5.08333 10.75L2.125 11.375L2.75 8.41667L11.0833 1.75Z"
            fill="currentColor"
          />
        </svg>
      </button>
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

// Loading Skeleton Component
const TableSkeleton = ({ visibleColumns }) => {
  const skeletonRows = 6

  return (
    <>
      {Array.from({ length: skeletonRows }).map((_, index) => (
        <tr key={index} className="border-b border-gray-100 animate-pulse">
          <td className="px-4 py-4">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
          </td>
          {visibleColumns.id && (
            <td className="px-4 py-4">
              <div className="h-4 bg-gray-200 rounded w-8"></div>
            </td>
          )}
          {visibleColumns.name && (
            <td className="px-4 py-4">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </td>
          )}
          {visibleColumns.email && (
            <td className="px-4 py-4">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </td>
          )}
          {visibleColumns.role && (
            <td className="px-4 py-4">
              <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            </td>
          )}
          {visibleColumns.department && (
            <td className="px-4 py-4">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </td>
          )}
          {visibleColumns.lastActive && (
            <td className="px-4 py-4">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </td>
          )}
          {visibleColumns.status && (
            <td className="px-4 py-4">
              <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            </td>
          )}
          {visibleColumns.action && (
            <td className="px-4 py-4">
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-[10px]"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-[10px]"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-[10px]"></div>
              </div>
            </td>
          )}
        </tr>
      ))}
    </>
  )
}

// Export Dropdown Component
const ExportDropdown = ({ onExport, selectedRows, totalRows }) => {
  const [showExportDropdown, setShowExportDropdown] = useState(false)

  const handleExport = (format) => {
    onExport(format)
    setShowExportDropdown(false)
  }

  return (
    <Popover open={showExportDropdown} onOpenChange={setShowExportDropdown}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex h-[42px] items-center gap-2.5 px-4 py-2.5 text-md font-medium text-orange-600 border border-orange-500 rounded-3xl hover:bg-orange-50 transition-colors"
        >
          Export
          <ExportIcon size={24} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end" sideOffset={8}>
        <div className="space-y-1">
          <button
            onClick={() => handleExport('csv')}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Export as CSV
          </button>
          <button
            onClick={() => handleExport('excel')}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Export as Excel
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Export as PDF
          </button>
          <button
            onClick={() => handleExport('print')}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Print
          </button>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="px-3 py-1 text-xs text-gray-500">
            {selectedRows.length > 0
              ? `Exporting ${selectedRows.length} selected rows`
              : `Exporting all ${totalRows} rows`}
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Search Component
const SearchComponent = ({
  onSearch,
  searchType = 'manual',
  currentSearchTerm,
}) => {
  const [searchTerm, setSearchTerm] = useState(currentSearchTerm || '')
  const [isSearching, setIsSearching] = useState(false)

  // Update local state when prop changes
  useEffect(() => {
    setSearchTerm(currentSearchTerm || '')
  }, [currentSearchTerm])

  const handleSearch = async (term = searchTerm) => {
    if (!term.trim()) {
      // If empty term, clear search immediately
      onSearch('')
      return
    }

    setIsSearching(true)

    if (searchType === 'api') {
      // API search - make API call
      try {
        await onSearch(term)
      } catch (error) {
        console.error('Search failed:', error)
      }
    } else {
      // Manual search - filter locally
      onSearch(term)
    }

    setIsSearching(false)
  }

  const handleClear = () => {
    setSearchTerm('')
    onSearch('') // Clear search
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)

    // Auto-search when clearing manually (when value becomes empty)
    if (value === '') {
      handleSearch('')
    }
  }

  return (
    <div className="box-border flex flex-row items-center px-4 py-3 gap-2.5 w-[292px] h-11 bg-white border border-[#E8ECF4] rounded-[52px] flex-none grow relative">
      <div className="flex flex-row items-center p-0 gap-2.5 w-full h-5 flex-none grow">
        <Search className="w-5 h-5 text-[#676D75] flex-none" />
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="w-full h-5 font-medium text-sm leading-[140%] text-[#252525] placeholder:text-[#A0A4AC] bg-transparent border-0 focus:outline-none focus:ring-0 flex-none grow"
        />

        {/* Loading spinner when searching */}
        {isSearching && (
          <div className="w-4 h-4 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
        )}

        {/* Clear button when there's text */}
        {searchTerm && !isSearching && (
          <button
            onClick={handleClear}
            className="flex items-center justify-center w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}

// Main UsersTable Component
const UsersTable = ({ newUsers = [] }) => {
  const [selectedRows, setSelectedRows] = useState([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [userToEdit, setUserToEdit] = useState(null)
  const [userToDeactivate, setUserToDeactivate] = useState(null)
  const [showColumnDropdown, setShowColumnDropdown] = useState(false)
  const [showFiltersDropdown, setShowFiltersDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Search state
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType] = useState('manual') // 'manual' or 'api'
  const [allUsers, setAllUsers] = useState([]) // Store all original data
  const [filteredUsers, setFilteredUsers] = useState([]) // Store filtered data

  // State for visible columns
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    name: true,
    email: true,
    role: true,
    department: true,
    lastActive: true,
    status: true,
    action: true,
  })

  // State for filters
  const [tempFilters, setTempFilters] = useState({
    role: '',
    status: '',
    department: '',
  })

  const [activeFilters, setActiveFilters] = useState([])

  // Column configuration with labels
  const columnConfig = {
    id: { label: 'ID', default: true },
    name: { label: 'Name', default: true },
    email: { label: 'Email', default: true },
    role: { label: 'Role', default: true },
    department: { label: 'Department', default: true },
    lastActive: { label: 'Last Active', default: true },
    status: { label: 'Status', default: true },
    action: { label: 'Action', default: true },
  }

  // Extended mock user data with more entries for pagination testing
  const mockData = [
    {
      id: 1,
      name: "Jane Mwangi",
      email: "jane.mwangi@obiaks.com",
      role: "Admin",
      department: "IT",
      lastActive: "Jan 15, 2024",
      status: "Active"
    },
    {
      id: 2,
      name: "John Kamau",
      email: "john.kamau@obiaks.com",
      role: "Employee",
      department: "Finance",
      lastActive: "Jan 15, 2024",
      status: "In Active"
    },
    {
      id: 3,
      name: "Sarah Wanjiku",
      email: "sarah.wanjiku@obiaks.com",
      role: "Manager",
      department: "HR",
      lastActive: "Jan 15, 2024",
      status: "In Active"
    },
    {
      id: 4,
      name: "Peter Omondi",
      email: "peter.omondi@obiaks.com",
      role: "Employee",
      department: "Operations",
      lastActive: "Jan 15, 2024",
      status: "In Active"
    },
    {
      id: 5,
      name: "Mary Akinyi",
      email: "mary.akinyi@obiaks.com",
      role: "Manager",
      department: "Marketing",
      lastActive: "Jan 15, 2024",
      status: "In Active"
    },
    {
      id: 6,
      name: "David Njoroge",
      email: "david.njoroge@obiaks.com",
      role: "Admin",
      department: "IT",
      lastActive: "Jan 15, 2024",
      status: "Active"
    },
    // Additional users for pagination testing
    ...Array.from({ length: 25 }, (_, i) => {
      const roles = ['Admin', 'Manager', 'Employee'];
      const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales'];
      const statuses = ['Active', 'In Active'];
      const firstNames = ['Alice', 'Bob', 'Carol', 'Daniel', 'Eve', 'Frank', 'Grace', 'Henry', 'Irene', 'Jack'];
      const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
      
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const role = roles[Math.floor(Math.random() * roles.length)];
      const department = departments[Math.floor(Math.random() * departments.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      return {
        id: i + 7,
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@obiaks.com`,
        role: role,
        department: department,
        lastActive: `Jan ${Math.floor(Math.random() * 15) + 1}, 2024`,
        status: status
      };
    })
  ]

  // Simulate data fetching
  useEffect(() => {
    fetchData()
  }, [])

  // Update when new users are added
  useEffect(() => {
    if (newUsers.length > 0) {
      setAllUsers(prev => [...newUsers, ...prev])
      setFilteredUsers(prev => [...newUsers, ...prev])
      setCurrentPage(1) // Reset to first page when new users are added
    }
  }, [newUsers])

  const fetchData = async (filters = {}) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Combine new users with mock data
    let filteredData = [...newUsers, ...mockData]
    
    // Apply filters to data
    if (filters.role) {
      filteredData = filteredData.filter(
        (user) => user.role === filters.role,
      )
    }
    if (filters.status) {
      filteredData = filteredData.filter(
        (user) => user.status === filters.status,
      )
    }
    if (filters.department) {
      filteredData = filteredData.filter(
        (user) => user.department === filters.department,
      )
    }

    setAllUsers(filteredData)
    setFilteredUsers(filteredData)
    setIsLoading(false)
  }

  // Search functionality
  const handleSearch = async (term) => {
    setSearchTerm(term)

    if (searchType === 'api') {
      // API search - make actual API call
      await fetchDataWithSearch(term)
    } else {
      // Manual search - filter the existing data
      if (!term.trim()) {
        // If search is cleared, show all data
        setFilteredUsers(allUsers)
      } else {
        // Apply search filter
        const searchLower = term.toLowerCase()
        const filtered = allUsers.filter(user => 
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.role.toLowerCase().includes(searchLower) ||
          user.department.toLowerCase().includes(searchLower)
        )
        setFilteredUsers(filtered)
      }
    }

    // Only reset to page 1 if we're actually performing a search (not just clearing)
    if (term.trim()) {
      setCurrentPage(1)
    }
  }

  // API search function (if using API search)
  const fetchDataWithSearch = async (searchTerm) => {
    setIsLoading(true)

    try {
      // Simulate API call with search term
      await new Promise(resolve => setTimeout(resolve, 1000))

      // For demo, we'll use the same mock data but filtered
      const combinedData = [...newUsers, ...mockData]
      const searchLower = searchTerm.toLowerCase()
      const filtered = combinedData.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.role.toLowerCase().includes(searchLower) ||
        user.department.toLowerCase().includes(searchLower)
      )
      setAllUsers(filtered)
      setFilteredUsers(filtered)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Export functionality
  const handleExport = (format) => {
    const dataToExport = selectedRows.length > 0 
      ? filteredUsers.filter((_, index) => selectedRows.includes(index))
      : filteredUsers

    const headers = Object.entries(columnConfig)
      .filter(([key]) => visibleColumns[key])
      .map(([, config]) => config.label)

    const rows = dataToExport.map(user => 
      Object.entries(columnConfig)
        .filter(([key]) => visibleColumns[key])
        .map(([key]) => user[key] || '')
    )

    switch (format) {
      case 'csv':
        exportToCSV(headers, rows)
        break
      case 'excel':
        exportToExcel(headers, rows)
        break
      case 'pdf':
        exportToPDF(headers, rows)
        break
      case 'print':
        printTable(headers, rows)
        break
    }
  }

  const exportToCSV = (headers, rows) => {
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(field => `"${field}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `users_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToExcel = (headers, rows) => {
    // For a real implementation, you might want to use a library like xlsx
    // This is a simplified version that creates a CSV with .xls extension
    const excelContent = [
      headers.join('\t'),
      ...rows.map(row => row.join('\t'))
    ].join('\n')

    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `users_${new Date().toISOString().split('T')[0]}.xls`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToPDF = (headers, rows) => {
    // For a real implementation, use a library like jspdf or pdfmake
    // This is a simplified version that opens print dialog
    printTable(headers, rows)
  }

  const printTable = (headers, rows) => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>Users Export</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
          </style>
        </head>
        <body>
          <h1>Users Export - ${new Date().toLocaleDateString()}</h1>
          <table>
            <thead>
              <tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  // Pagination calculations with search filtering
  const totalItems = filteredUsers.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredUsers.slice(startIndex, endIndex)

  // Pagination controls
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  // Toggle column visibility
  const toggleColumn = (columnKey) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }))
  }

  // Show all columns
  const showAllColumns = () => {
    const allVisible = Object.keys(visibleColumns).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {})
    setVisibleColumns(allVisible)
  }

  // Update temp filters
  const updateTempFilter = (key, value) => {
    setTempFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Apply all filters
  const applyAllFilters = async () => {
    const newActiveFilters = []
    const filtersToApply = {}

    if (tempFilters.role) {
      newActiveFilters.push({
        id: 'role',
        label: 'Role',
        value: tempFilters.role,
      })
      filtersToApply.role = tempFilters.role
    }

    if (tempFilters.status) {
      newActiveFilters.push({
        id: 'status',
        label: 'Status',
        value: tempFilters.status,
      })
      filtersToApply.status = tempFilters.status
    }

    if (tempFilters.department) {
      newActiveFilters.push({
        id: 'department',
        label: 'Department',
        value: tempFilters.department,
      })
      filtersToApply.department = tempFilters.department
    }

    setActiveFilters(newActiveFilters)
    setShowFiltersDropdown(false)
    setCurrentPage(1) // Reset to first page when filters change

    // Fetch data with applied filters
    await fetchData(filtersToApply)
  }

  // Clear all filters and refresh data
  const clearAllFilters = async () => {
    setTempFilters({
      role: '',
      status: '',
      department: '',
    })
    setActiveFilters([])
    setShowFiltersDropdown(false)
    // Don't reset current page when clearing filters
    // setCurrentPage(1)

    // Refresh data without filters
    await fetchData()
  }

  // Refresh data (clears filters and search but keeps current page)
  const handleRefresh = async () => {
    setSearchTerm('') // Clear search term
    await clearAllFilters()
    // Keep the current page when refreshing
  }

  // Remove individual filter
  const removeFilter = async (filterId) => {
    const newActiveFilters = activeFilters.filter(
      (filter) => filter.id !== filterId,
    )
    setActiveFilters(newActiveFilters)

    // Update temp filters
    const updatedTempFilters = { ...tempFilters }
    switch (filterId) {
      case 'role':
        updatedTempFilters.role = ''
        break
      case 'status':
        updatedTempFilters.status = ''
        break
      case 'department':
        updatedTempFilters.department = ''
        break
    }
    setTempFilters(updatedTempFilters)
    // Don't reset current page when removing individual filters
    // setCurrentPage(1)

    // Refetch data with updated filters
    const filtersToApply = {}
    newActiveFilters.forEach((filter) => {
      if (filter.id === 'role') filtersToApply.role = updatedTempFilters.role
      if (filter.id === 'status') filtersToApply.status = updatedTempFilters.status
      if (filter.id === 'department') filtersToApply.department = updatedTempFilters.department
    })

    await fetchData(filtersToApply)
  }

  // Edit individual filter
  const editFilter = () => {
    setShowFiltersDropdown(true)
  }

  // Handle edit button click
  const handleEditClick = (user) => {
    setUserToEdit(user)
    setShowEditDialog(true)
  }

  // Handle save edited user
  const handleSaveEdit = (updatedUser) => {
    setAllUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      ),
    )
    setFilteredUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      ),
    )
    setShowEditDialog(false)
    setUserToEdit(null)
  }

  // Handle delete button click
  const handleDeleteClick = (user) => {
    setUserToDelete(user)
    setShowDeleteDialog(true)
  }

  // Confirm delete action
  const confirmDelete = () => {
    if (userToDelete) {
      setAllUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userToDelete.id),
      )
      setFilteredUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userToDelete.id),
      )
      const userIndex = filteredUsers.findIndex(
        (user) => user.id === userToDelete.id,
      )
      if (userIndex !== -1 && selectedRows.includes(userIndex)) {
        setSelectedRows((prev) =>
          prev.filter((index) => index !== userIndex),
        )
      }
    }
    setShowDeleteDialog(false)
    setUserToDelete(null)
  }

  // Handle deactivate button click
  const handleDeactivateClick = (user) => {
    setUserToDeactivate(user)
    setShowDeactivateDialog(true)
  }

  // Confirm deactivate action
  const confirmDeactivate = () => {
    if (userToDeactivate) {
      const updatedUser = {
        ...userToDeactivate,
        status: userToDeactivate.status === 'Active' ? 'In Active' : 'Active'
      }

      setAllUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userToDeactivate.id ? updatedUser : user,
        ),
      )
      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userToDeactivate.id ? updatedUser : user,
        ),
      )
    }
    setShowDeactivateDialog(false)
    setUserToDeactivate(null)
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentItems.map((_, index) => startIndex + index))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (index) => {
    const absoluteIndex = startIndex + index
    if (selectedRows.includes(absoluteIndex)) {
      setSelectedRows(selectedRows.filter((i) => i !== absoluteIndex))
    } else {
      setSelectedRows([...selectedRows, absoluteIndex])
    }
  }

  const isAllSelected = 
    currentItems.length > 0 && 
    currentItems.every((_, index) => selectedRows.includes(startIndex + index))

  return (
    <>
      {/* Active Filters Display */}
      {(activeFilters.length > 0 || searchTerm) && (
        <div className="px-6 py-3 -mt-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">
              Active Filters:
            </span>
            {activeFilters.map((filter) => (
              <FilterChip
                key={filter.id}
                label={filter.label}
                value={filter.value}
                onRemove={() => removeFilter(filter.id)}
                onEdit={() => editFilter(filter.id)}
              />
            ))}
            {searchTerm && (
              <FilterChip
                label="Search"
                value={searchTerm}
                onRemove={() => handleSearch('')}
                onEdit={() => document.querySelector('input[type="text"]')?.focus()}
              />
            )}
            <button
              onClick={clearAllFilters}
              className="text-sm text-orange-600 hover:text-orange-700 font-medium ml-2"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden pt-6 pb-10 px-4 relative">
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
              <span className="w-[100px] h-5 font-normal text-sm leading-[140%] flex items-center text-center text-[#252525]">
                Select All ({selectedRows.length || filteredUsers.length})
              </span>
            </div>

            {/* Search Component */}
            <SearchComponent 
              onSearch={handleSearch}
              searchType={searchType}
              currentSearchTerm={searchTerm}
            />
          </div>

          <div className="flex items-center gap-3">
            <ExportDropdown 
              onExport={handleExport} 
              selectedRows={selectedRows}
              totalRows={filteredUsers.length}
            />

            {/* Filters Dropdown Button using ShadCN Popover */}
            <Popover
              open={showFiltersDropdown}
              onOpenChange={setShowFiltersDropdown}
            >
              <PopoverTrigger asChild>
                <Button className="flex flex-row justify-center items-center p-3 gap-1.5 w-[42px] h-[42px] bg-linear-to-b from-[#F8971D] to-[#EE3124] rounded-full text-white hover:opacity-90 transition-colors flex-none">
                  <ListCheckIcon size={18} />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-80 p-0 border border-gray-200 rounded-lg shadow-2xl"
                align="end"
                sideOffset={8}
              >
                <div className="flex flex-col max-h-96">
                  {/* Header with better padding */}
                  <div className="px-6 py-4 border-b border-gray-100 flex-shrink-0">
                    <h3 className="text-base font-semibold text-gray-900">
                      Filters
                    </h3>
                  </div>

                  {/* Scrollable Content with better padding */}
                  <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                    {/* Role Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Role
                      </label>
                      <select
                        value={tempFilters.role}
                        onChange={(e) =>
                          updateTempFilter('role', e.target.value)
                        }
                        className="w-full h-11 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="">All Roles</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Employee">Employee</option>
                      </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Status
                      </label>
                      <select
                        value={tempFilters.status}
                        onChange={(e) =>
                          updateTempFilter('status', e.target.value)
                        }
                        className="w-full h-11 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="">All Status</option>
                        <option value="Active">Active</option>
                        <option value="In Active">In Active</option>
                      </select>
                    </div>

                    {/* Department Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Department
                      </label>
                      <select
                        value={tempFilters.department}
                        onChange={(e) =>
                          updateTempFilter('department', e.target.value)
                        }
                        className="w-full h-11 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="">All Departments</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Operations">Operations</option>
                        <option value="Sales">Sales</option>
                      </select>
                    </div>
                  </div>

                  {/* Action Buttons with better padding */}
                  <div className="px-6 py-4 border-t border-gray-100 flex gap-3 flex-shrink-0">
                    <button
                      onClick={() => {
                        clearAllFilters()
                        setShowFiltersDropdown(false)
                      }}
                      className="flex-1 text-sm font-medium py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => {
                        applyAllFilters()
                        setShowFiltersDropdown(false)
                      }}
                      className="flex-1 text-sm font-medium py-3 bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors text-white"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Column Visibility Dropdown Button using ShadCN Popover */}
            <Popover
              open={showColumnDropdown}
              onOpenChange={setShowColumnDropdown}
            >
              <PopoverTrigger asChild>
                <Button className="flex flex-row justify-center items-center p-3 gap-1.5 w-[42px] h-[42px] bg-[#F9FAFB] rounded-full text-gray-600 hover:bg-gray-200 transition-colors flex-none">
                  <GridIcon size={18} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0" align="end" sideOffset={8}>
                <div className="py-2">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-medium text-gray-900">
                      Show/Hide Columns
                    </h3>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {Object.entries(columnConfig).map(([key, config]) => (
                      <label
                        key={key}
                        className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={visibleColumns[key]}
                          onChange={() => toggleColumn(key)}
                          className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          {config.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button
                      onClick={showAllColumns}
                      className="w-full text-xs text-orange-600 hover:text-orange-700 font-medium py-1 text-center"
                    >
                      Show All
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Refresh Button with Loading State */}
            <Button
              onClick={handleRefresh}
              disabled={isLoading}
              className={`flex flex-row justify-center items-center p-3 gap-1.5 w-12 h-12 bg-[#F9FAFB] rounded-full text-gray-600 hover:bg-gray-200 transition-colors flex-none ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
              ) : (
                <RefreshIcon size={24} />
              )}
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
                {visibleColumns.id && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                )}
                {visibleColumns.name && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                )}
                {visibleColumns.email && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                )}
                {visibleColumns.role && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                )}
                {visibleColumns.department && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Department
                  </th>
                )}
                {visibleColumns.lastActive && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Last Active
                  </th>
                )}
                {visibleColumns.status && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                )}
                {visibleColumns.action && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <TableSkeleton visibleColumns={visibleColumns} />
              ) : currentItems.length > 0 ? (
                currentItems.map((user, index) => (
                  <TableRow
                    key={user.id}
                    user={user}
                    isSelected={selectedRows.includes(startIndex + index)}
                    onSelectChange={() => handleSelectRow(index)}
                    onDeleteClick={handleDeleteClick}
                    onEditClick={handleEditClick}
                    onDeactivateClick={handleDeactivateClick}
                    visibleColumns={visibleColumns}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={
                      Object.keys(visibleColumns).filter(
                        (key) => visibleColumns[key],
                      ).length + 1
                    }
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    {searchTerm 
                      ? `No users found matching "${searchTerm}".` 
                      : 'No users found matching the current filters.'
                    }
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
            {searchTerm && ` (filtered from ${allUsers.length} total entries)`}
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && goToPage(page)}
                disabled={page === '...'}
                className={`w-8 h-8 flex items-center justify-center rounded-lg font-medium text-sm transition-colors ${
                  page === currentPage
                    ? 'bg-orange-500 text-white'
                    : page === '...'
                    ? 'text-gray-400 cursor-default'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button 
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <EditUserDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        user={userToEdit}
        onSave={handleSaveEdit}
      />

      <DeactivateUserDialog
        open={showDeactivateDialog}
        onOpenChange={setShowDeactivateDialog}
        user={userToDeactivate}
        onConfirm={confirmDeactivate}
      />

      <DeleteUserDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        user={userToDelete}
        onConfirm={confirmDelete}
      />
    </>
  )
}

export default UsersTable