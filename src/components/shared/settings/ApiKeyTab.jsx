import React from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Trash2, Edit } from 'lucide-react'

const APIKeysBody = () => {
  const [apiKeys, setApiKeys] = React.useState([
    {
      id: 1,
      name: 'Mobile App API',
      createdDate: '2024-01-01',
      apiKey: 'sk_live_51H7...',
      permissions: ['read:customers', 'write:transactions'],
      lastUsed: '2024-01-14 09:15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Analytics Dashboard',
      createdDate: '2024-01-01',
      apiKey: 'sk_live_51H7...',
      permissions: ['read:customers', 'write:transactions'],
      lastUsed: '2024-01-14 09:15',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Legacy Integration',
      createdDate: '2024-01-01',
      apiKey: 'sk_live_51H7...',
      permissions: ['read:customers', 'write:transactions'],
      lastUsed: '2024-01-14 09:15',
      status: 'In Active'
    }
  ])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const handleDelete = (id) => {
    setApiKeys(prev => prev.filter(key => key.id !== id))
  }

  const handleEdit = (id) => {
    console.log('Edit API key:', id)
  }

  const handleSave = () => {
    console.log('Saving API keys:', apiKeys)
  }

  const handleCancel = () => {
    setApiKeys([
      {
        id: 1,
        name: 'Mobile App API',
        createdDate: '2024-01-01',
        apiKey: 'sk_live_51H7...',
        permissions: ['read:customers', 'write:transactions'],
        lastUsed: '2024-01-14 09:15',
        status: 'Active'
      },
      {
        id: 2,
        name: 'Analytics Dashboard',
        createdDate: '2024-01-01',
        apiKey: 'sk_live_51H7...',
        permissions: ['read:customers', 'write:transactions'],
        lastUsed: '2024-01-14 09:15',
        status: 'Active'
      },
      {
        id: 3,
        name: 'Legacy Integration',
        createdDate: '2024-01-01',
        apiKey: 'sk_live_51H7...',
        permissions: ['read:customers', 'write:transactions'],
        lastUsed: '2024-01-14 09:15',
        status: 'In Active'
      }
    ])
  }

  return (
    <div>
      <div className="my-8 w-full p-6 bg-white border border-gray-200 rounded-2xl">
             
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-['Public_Sans'] font-medium text-sm text-[#676D75]">
                  Name
                </th>
                <th className="text-left py-4 px-4 font-['Public_Sans'] font-medium text-sm text-[#676D75]">
                  API Key
                </th>
                <th className="text-left py-4 px-4 font-['Public_Sans'] font-medium text-sm text-[#676D75]">
                  Permissions
                </th>
                <th className="text-left py-4 px-4 font-['Public_Sans'] font-medium text-sm text-[#676D75]">
                  Last Used
                </th>
                <th className="text-left py-4 px-4 font-['Public_Sans'] font-medium text-sm text-[#676D75]">
                  Status
                </th>
                <th className="text-left py-4 px-4 font-['Public_Sans'] font-medium text-sm text-[#676D75]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((key, index) => (
                <tr 
                  key={key.id}
                  className={`${index !== apiKeys.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50`}
                >
                  <td className="py-4 px-4">
                    <div className="font-['Public_Sans'] font-medium text-sm text-[#252525]">
                      {key.name}
                    </div>
                    <div className="font-['Public_Sans'] font-normal text-xs text-[#676D75] mt-1">
                      Created {key.createdDate}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-sm text-[#252525] bg-gray-50 px-2 py-1 rounded">
                        {key.apiKey}
                      </code>
                      <button
                        onClick={() => copyToClipboard(key.apiKey)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1.5">
                      {key.permissions.map((perm, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-2 py-1 rounded bg-blue-50 text-blue-700 font-['Public_Sans'] text-xs font-medium"
                        >
                          {perm}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-['Public_Sans'] text-sm text-[#252525]">
                      {key.lastUsed}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full font-['Public_Sans'] text-sm font-medium ${
                        key.status === 'Active'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {key.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(key.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                      <button
                        onClick={() => handleEdit(key.id)}
                        className="text-orange-500 hover:text-orange-700 transition-colors p-1"
                        title="Edit"
                      >
                        <Edit size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          onClick={handleCancel}
          variant="outline"
          className="flex items-center justify-center gap-2 w-[138px] h-[46px] px-4 py-3 border border-[#F8971D] text-gray-700 rounded-3xl font-medium text-base hover:bg-gray-50 transition-all"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSave}
          className="flex items-center justify-center gap-2 w-[138px] h-[46px] px-4 py-3 bg-gradient-to-b from-[#F8971D] to-[#EE3124] rounded-3xl text-white font-medium text-base shadow-sm hover:opacity-90 transition-all"
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}

export default APIKeysBody