import React, { useState, useRef, useEffect } from 'react'
import { Search, Paperclip, Link2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

const MessagingInterface = () => {
  const [selectedConversation, setSelectedConversation] = useState(0)
  const [activeFilter, setActiveFilter] = useState('all')
  const [messageInput, setMessageInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef(null)

  // Dummy conversation data
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      message: 'Thank you for the quick response!',
      time: '2 min ago',
      avatar: 'SJ',
      status: 'active',
      unread: 0,
      resolved: false,
      online: true,
      messages: [
        {
          sender: 'customer',
          text: 'Hello, I would like to inquire about my loan status',
          time: '10:30 AM',
        },
        {
          sender: 'agent',
          text: 'Hello Sarah! I can help you with that. Let me check your loan application status.',
          time: '10:32 AM',
        },
        {
          sender: 'agent',
          text: 'Your loan application has been approved and the funds will be disbursed within 24 hours.',
          time: '10:33 AM',
        },
        {
          sender: 'customer',
          text: 'Thank you for the quick response!',
          time: '10:35 AM',
        },
      ],
    },
    {
      id: 2,
      name: 'Michael Omond',
      message: 'I need help with my loan application',
      time: '15 min ago',
      avatar: 'MO',
      status: 'active',
      unread: 3,
      resolved: false,
      online: true,
      messages: [
        {
          sender: 'customer',
          text: 'I need help with my loan application',
          time: '9:45 AM',
        },
        {
          sender: 'agent',
          text: 'Of course! What specific help do you need?',
          time: '9:47 AM',
        },
      ],
    },
    {
      id: 3,
      name: 'Grace Wanjiku',
      message: 'Payment received successfully',
      time: '1 hour ago',
      avatar: 'GW',
      status: 'resolved',
      unread: 0,
      resolved: false,
      messages: [
        {
          sender: 'customer',
          text: 'I just made a payment. Can you confirm?',
          time: '8:30 AM',
        },
        {
          sender: 'agent',
          text: 'Payment received successfully',
          time: '8:32 AM',
        },
      ],
    },
    {
      id: 4,
      name: 'David Kiman',
      message: 'When will my loan be approved?',
      time: '2 hours ago',
      avatar: 'DK',
      status: 'active',
      unread: 1,
      resolved: false,
      online: true,
      messages: [
        {
          sender: 'customer',
          text: 'When will my loan be approved?',
          time: '8:00 AM',
        },
      ],
    },
    {
      id: 5,
      name: 'Lucy Akiny',
      message: 'Thank you for your assistance',
      time: '3 hours ago',
      avatar: 'LA',
      status: 'resolved',
      unread: 0,
      resolved: true,
      online: false,
      messages: [
        {
          sender: 'customer',
          text: 'I have a question about fees',
          time: '7:00 AM',
        },
        {
          sender: 'agent',
          text: 'Let me explain the fee structure...',
          time: '7:05 AM',
        },
        {
          sender: 'customer',
          text: 'Thank you for your assistance',
          time: '7:10 AM',
        },
      ],
    },
    {
      id: 6,
      name: 'James Mwangi',
      message: 'I have a question about repayment',
      time: '5 hours ago',
      avatar: 'JM',
      status: 'active',
      unread: 2,
      resolved: false,
      online: true,
      messages: [
        {
          sender: 'customer',
          text: 'I have a question about repayment',
          time: '5:00 AM',
        },
      ],
    },
    {
      id: 7,
      name: 'Mary Njer',
      message: 'Documents uploaded successfully',
      time: '1 day ago',
      avatar: 'MN',
      status: 'resolved',
      unread: 0,
      resolved: true,
      online: false,
      messages: [
        {
          sender: 'customer',
          text: 'I need to upload documents',
          time: 'Yesterday',
        },
        {
          sender: 'agent',
          text: 'Documents uploaded successfully',
          time: 'Yesterday',
        },
      ],
    },
    {
      id: 8,
      name: 'Peter Otienc',
      message: 'Can I extend my loan period?',
      time: '1 day ago',
      avatar: 'PO',
      status: 'active',
      unread: 0,
      resolved: false,
      online: true,
      messages: [
        {
          sender: 'customer',
          text: 'Can I extend my loan period?',
          time: 'Yesterday',
        },
      ],
    },
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversations, selectedConversation])

  const getFilteredConversations = () => {
    let filtered = conversations

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (conv) =>
          conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          conv.message.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply status filter
    if (activeFilter === 'active') {
      filtered = filtered.filter(
        (conv) => conv.status === 'active' && !conv.resolved,
      )
    } else if (activeFilter === 'resolved') {
      filtered = filtered.filter((conv) => conv.resolved)
    }

    return filtered
  }

  const filteredConversations = getFilteredConversations()

  const activeConversation = conversations[selectedConversation]
  const activeCount = conversations.filter(
    (c) => c.status === 'active' && !c.resolved,
  ).length
  const resolvedCount = conversations.filter((c) => c.resolved).length

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const updatedConversations = [...conversations]
      updatedConversations[selectedConversation].messages.push({
        sender: 'agent',
        text: messageInput,
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      })
      setConversations(updatedConversations)
      setMessageInput('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleResolveConversation = () => {
    const updatedConversations = [...conversations]
    updatedConversations[selectedConversation].resolved =
      !updatedConversations[selectedConversation].resolved
    updatedConversations[selectedConversation].status = updatedConversations[
      selectedConversation
    ].resolved
      ? 'resolved'
      : 'active'
    setConversations(updatedConversations)
  }

  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-yellow-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-teal-500',
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <div className="flex h-screen bg-gray-50 scrollbar-hide">
      {/* Left Sidebar - Conversations List */}
      <div className="w-96 bg-white border-r border-gray-200 flex scrollbar-hide flex-col">
        {/* Search Bar */}
        <div className="p-4  border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Conversation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b p-2 pb-4 space-x-2 border-gray-200">
          <button
            onClick={() => setActiveFilter('all')}
            className={`py-2 px-3 text-sm w-[111px] cursor-pointer font-semibold transition-colors rounded-full ${
              activeFilter === 'all'
                ? 'bg-linear-to-b from-[#F8971D] to-[#EE3124] text-white'
                : 'text-gray-600 hover:text-gray-800 bg-brand-bg-2'
            }`}
          >
            All ({conversations.length})
          </button>
          <button
            onClick={() => setActiveFilter('active')}
            className={`py-2 px-3 text-sm w-[111px] cursor-pointer font-semibold transition-colors rounded-full ${
              activeFilter === 'active'
                ? 'bg-linear-to-b from-[#F8971D] to-[#EE3124] text-white'
                : 'text-gray-600 hover:text-gray-800 bg-brand-bg-2'
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setActiveFilter('resolved')}
            className={`py-2 px-3 text-sm w-[111px] cursor-pointer font-semibold transition-colors rounded-full ${
              activeFilter === 'resolved'
                ? 'bg-linear-to-b from-[#F8971D] to-[#EE3124] text-white'
                : 'text-gray-600 hover:text-gray-800 bg-brand-bg-2'
            }`}
          >
            Resolved ({resolvedCount})
          </button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 pb-2 overflow-y-auto scrollbar-hide">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() =>
                setSelectedConversation(
                  conversations.findIndex((c) => c.id === conv.id),
                )
              }
              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                conversations[selectedConversation].id === conv.id
                  ? 'bg-orange-50 border-l-4 border-b-primary border-l-primary'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative inline-block">
                  <div
                    className={`w-12 h-12 rounded-full ${getAvatarColor(conv.name)} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}
                  >
                    {conv.avatar}
                  </div>

                  {/* Add this green dot for online users */}
                  {conv.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-[2.5px] border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm text-gray-900 truncate">
                      {conv.name}
                    </h3>
                    <span className="text-xs text-gray-500 shrink-0">
                      {conv.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {conv.message}
                  </p>
                  {conv.resolved && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="flex flex-row items-center px-2 py-0.5 gap-1 bg-green-50 rounded-full text-xs text-green-600 font-medium">
                        ✓ Resolved
                      </span>
                    </div>
                  )}
                </div>
                {conv.unread > 0 && (
                  <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {conv.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col h-screen scrollbar-hide overflow-hidden">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center scrollbar-hide justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full ${getAvatarColor(activeConversation.name)} flex items-center justify-center text-white font-semibold`}
            >
              {activeConversation.avatar}
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">
                {activeConversation.name}
              </h2>
              <p className="text-sm text-gray-500">
                {activeConversation.resolved
                  ? 'Resolved'
                  : 'Active conversation'}
              </p>
            </div>
          </div>
          <button
            onClick={toggleResolveConversation}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeConversation.resolved
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {activeConversation.resolved ? 'Reopen' : '✓ Mark as Resolved'}
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide bg-gray-50">
          {activeConversation.messages.map((msg, index) => (
            <div key={index} className="flex flex-col">
              {msg.sender === 'agent' ? (
                <div className="flex justify-end">
                  <div className="flex flex-col">
                    <div className={`flex items-start gap-2 mb-1 `}>
                      <span className="text-xs text-gray-400">{msg.time}</span>
                      <span className="text-xs text-gray-500 font-medium">
                        {msg.sender === 'customer'
                          ? activeConversation.name
                          : 'You'}
                      </span>
                    </div>
                    <div
                      className={`max-w-2xl rounded-2xl px-4 py-3 ${
                        msg.sender === 'customer'
                          ? 'bg-white border border-gray-200 text-gray-900'
                          : 'bg-linear-to-r from-orange-500 to-red-500 text-white'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className={`flex flex-col ${msg.sender === 'agent' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`flex items-start gap-2 mb-1 ${msg.sender === 'agent' ? 'flex-row-reverse' : ''}`}
                  >
                    <span className="text-xs text-gray-500 font-medium">
                      {msg.sender === 'customer'
                        ? activeConversation.name
                        : 'You'}
                    </span>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                  <div
                    className={`max-w-2xl rounded-2xl px-4 py-3 ${
                      msg.sender === 'customer'
                        ? 'bg-white border border-gray-200 text-gray-900'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Area */}
        <div className="bg-white border-t border-gray-200 p-4 shrink-0">
          <div className="flex items-start gap-3">
            <button className="p-3 mt-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-3 mt-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Link2 className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Write a message here"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-400 mt-1">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!messageInput.trim()}
              className="p-3 bg-linear-to-r from-orange-500 to-red-500 hover:opacity-90 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessagingInterface
