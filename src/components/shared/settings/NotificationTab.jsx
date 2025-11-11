import React from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

const CardContent = ({ title, description, children }) => (
  <div>
    <div className="my-8 w-full p-6 bg-white border border-gray-200 rounded-2xl">
      <div className="space-y-2.5">
        <h2 className="font-['Public_Sans'] font-semibold text-2xl leading-[140%] capitalize text-black">
          {title}
        </h2>
        <p className="font-['Public_Sans'] font-medium text-base leading-[140%] text-[#676D75]">
          {description}
        </p>
      </div>
      <div className="w-full my-4 h-px bg-[#E8ECF4]"></div>
      <div>{children}</div>
    </div>
  </div>
)

const NotificationsBody = () => {
  const [notifications, setNotifications] = React.useState({
    loanApprovals: {
      email: true,
      sms: true,
      push: false,
    },
    overdueLoans: {
      email: true,
      sms: true,
      push: false,
    },
    paymentReceived: {
      email: true,
      sms: true,
      push: false,
    },
    newCustomerRegistration: {
      email: true,
      sms: true,
      push: false,
    },
    systemAlerts: {
      email: true,
      sms: true,
      push: false,
    },
    weeklyReports: {
      email: true,
      sms: true,
      push: false,
    },
  })

  const [globalSettings, setGlobalSettings] = React.useState({
    doNotDisturb: false,
    digestMode: false,
  })

  const notificationCategories = [
    {
      title: 'Loans',
      items: [
        {
          id: 'loanApprovals',
          label: 'Loan Approvals',
          description: 'Notifications when loans require approval',
        },
        {
          id: 'overdueLoans',
          label: 'Overdue Loans',
          description: 'Notifications for overdue loan payments',
        },
      ],
    },
    {
      title: 'Payments',
      items: [
        {
          id: 'paymentReceived',
          label: 'Payment Received',
          description: 'Notifications when payments are received',
        },
      ],
    },
    {
      title: 'Customers',
      items: [
        {
          id: 'newCustomerRegistration',
          label: 'New Customer Registration',
          description: 'Notifications when new customers register',
        },
      ],
    },
    {
      title: 'System',
      items: [
        {
          id: 'systemAlerts',
          label: 'System Alerts',
          description: 'Critical system notifications and alerts',
        },
      ],
    },
    {
      title: 'Reports',
      items: [
        {
          id: 'weeklyReports',
          label: 'Weekly Reports',
          description: 'Weekly summary reports and analytics',
        },
      ],
    },
  ]

  const toggleNotification = (itemId, channel) => {
    setNotifications((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [channel]: !prev[itemId][channel],
      },
    }))
  }

  const toggleGlobalSetting = (setting) => {
    setGlobalSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handleSave = () => {
    console.log('Saving notification settings:', { notifications, globalSettings })
    // Handle save logic here
  }

  const handleCancel = () => {
    // Reset to original state
    setNotifications({
      loanApprovals: {
        email: true,
        sms: true,
        push: false,
      },
      overdueLoans: {
        email: true,
        sms: true,
        push: false,
      },
      paymentReceived: {
        email: true,
        sms: true,
        push: false,
      },
      newCustomerRegistration: {
        email: true,
        sms: true,
        push: false,
      },
      systemAlerts: {
        email: true,
        sms: true,
        push: false,
      },
      weeklyReports: {
        email: true,
        sms: true,
        push: false,
      },
    })
    setGlobalSettings({
      doNotDisturb: false,
      digestMode: false,
    })
  }

  return (
    <div>
      <CardContent
        title="Notification Settings"
        description="Configure how you want to receive notifications for different events"
      >
        <div className="space-y-6">
          {/* Notification Channels Info */}
          <div className="bg-[#FFF8F0] border border-[#F8971D] rounded-lg p-4">
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#F8971D] flex items-center justify-center text-white text-xs font-bold mt-0.5">
                i
              </div>
              <div className="flex-1">
                <h4 className="font-['Public_Sans'] font-semibold text-sm text-[#252525] mb-1">
                  Notification Channels
                </h4>
                <p className="font-['Public_Sans'] font-normal text-sm text-[#676D75]">
                  Configure your preferred notification method. Email notifications are sent to your registered email address, SMS notifications to your phone number, and push notifications appear in your browser or mobile app.
                </p>
              </div>
            </div>
          </div>

          {/* Notification Categories */}
          {notificationCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="border rounded-2xl p-4">
              <h3 className="font-['Public_Sans'] font-semibold text-base text-[#252525] mb-4">
                {category.title}
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 pb-3 border-b border-gray-200">
                  <div className="col-span-1">
                    <p className="font-['Public_Sans'] font-semibold text-sm text-[#252525]">
                      Notification Type
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-['Public_Sans'] font-semibold text-sm text-[#252525]">
                      Email
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-['Public_Sans'] font-semibold text-sm text-[#252525]">
                      SMS
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-['Public_Sans'] font-semibold text-sm text-[#252525]">
                      PUSH
                    </p>
                  </div>
                </div>

                {category.items.map((item) => (
                  <div key={item.id} className="grid grid-cols-4 gap-4 items-center py-2">
                    <div className="col-span-1">
                      <p className="font-['Public_Sans'] font-semibold text-sm text-[#252525]">
                        {item.label}
                      </p>
                      <p className="font-['Public_Sans'] font-normal text-xs text-[#676D75] mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <Switch
                        checked={notifications[item.id].email}
                        onCheckedChange={() => toggleNotification(item.id, 'email')}
                        className="data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-[#F8971D] data-[state=checked]:to-[#EE3124]"
                      />
                    </div>
                    <div className="flex justify-center">
                      <Switch
                        checked={notifications[item.id].sms}
                        onCheckedChange={() => toggleNotification(item.id, 'sms')}
                        className="data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-[#F8971D] data-[state=checked]:to-[#EE3124]"
                      />
                    </div>
                    <div className="flex justify-center">
                      <Switch
                        checked={notifications[item.id].push}
                        onCheckedChange={() => toggleNotification(item.id, 'push')}
                        className="data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-[#F8971D] data-[state=checked]:to-[#EE3124]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Global Settings */}
          <div className="border rounded-2xl p-4">
            <h3 className="font-['Public_Sans'] font-semibold text-base text-[#252525] mb-4">
              Global Settings
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div className="flex-1">
                  <p className="font-['Public_Sans'] font-semibold text-sm text-[#252525]">
                    Do Not Disturb Mode
                  </p>
                  <p className="font-['Public_Sans'] font-normal text-xs text-[#676D75] mt-1">
                    Disable all notifications between 10 PM and 8 AM
                  </p>
                </div>
                <Switch
                  checked={globalSettings.doNotDisturb}
                  onCheckedChange={() => toggleGlobalSetting('doNotDisturb')}
                  className="data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-[#F8971D] data-[state=checked]:to-[#EE3124]"
                />
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex-1">
                  <p className="font-['Public_Sans'] font-semibold text-sm text-[#252525]">
                    Digest Mode
                  </p>
                  <p className="font-['Public_Sans'] font-normal text-xs text-[#676D75] mt-1">
                    Receive daily summary instead of individual notifications
                  </p>
                </div>
                <Switch
                  checked={globalSettings.digestMode}
                  onCheckedChange={() => toggleGlobalSetting('digestMode')}
                  className="data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-[#F8971D] data-[state=checked]:to-[#EE3124]"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>

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

export default NotificationsBody