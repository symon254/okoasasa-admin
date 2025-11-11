import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import React from 'react'
import APIKeysBody from '@/components/shared/settings/ApiKeyTab'
import NotificationsBody from '@/components/shared/settings/NotificationTab'

export const Route = createFileRoute('/_protected/settings/')({
  component: RouteComponent,
})

// Zod validation schema
const generalSettingsSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  timezone: z.string().min(1, 'Please select a timezone'),
  currency: z.string().min(1, 'Please select a currency'),
  language: z.string().min(1, 'Please select a language'),
  dateFormat: z.string().min(1, 'Please select a date format'),
  twoFactorAuth: z.boolean(),
  auditLogging: z.boolean(),
  emailNotifications: z.boolean(),
})

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

const GeneralSettingsTab = () => {
  const form = useForm({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      companyName: 'OKOA SASA',
      timezone: 'Africa/Nairobi (EAT)',
      currency: 'KES - Kenyan Shilling',
      language: 'English',
      dateFormat: 'DD/MM/YYYY',
      twoFactorAuth: true,
      auditLogging: true,
      emailNotifications: true,
    },
  })

  const onSubmit = (data) => {
    console.log('Form submitted:', data)
    // Handle form submission here
  }

  const handleCancel = () => {
    form.reset()
  }

  return (
    <Form {...form}>
      <CardContent
        title="General Settings"
        description="Configure basic system settings and preferences"
      >
        <div className="space-y-8">
          {/* Company Information Section */}
          <div className="space-y-4 border rounded-2xl p-4">
            <h3 className="font-['Public_Sans'] font-medium text-base leading-[140%] text-black">
              Company Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#252525]">
                      Company Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="OKOA SASA"
                        className="h-12 bg-[#F9FAFB] border-[#E8ECF4] rounded-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#252525]">
                      Time zone
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 w-full bg-[#F9FAFB] border-[#E8ECF4] rounded-lg">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Africa/Nairobi (EAT)">
                          Africa/Nairobi (EAT)
                        </SelectItem>
                        <SelectItem value="Africa/Lagos (WAT)">
                          Africa/Lagos (WAT)
                        </SelectItem>
                        <SelectItem value="Africa/Cairo (EET)">
                          Africa/Cairo (EET)
                        </SelectItem>
                        <SelectItem value="Europe/London (GMT)">
                          Europe/London (GMT)
                        </SelectItem>
                        <SelectItem value="America/New_York (EST)">
                          America/New York (EST)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Localization Section */}
          <div className="space-y-4 border rounded-2xl p-4">
            <h3 className="font-['Public_Sans'] font-medium text-base leading-[140%] text-black">
              Localization
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#252525]">
                      Currency
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 bg-[#F9FAFB] border-[#E8ECF4] rounded-lg">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="KES - Kenyan Shilling">
                          KES - Kenyan Shilling
                        </SelectItem>
                        <SelectItem value="USD - US Dollar">
                          USD - US Dollar
                        </SelectItem>
                        <SelectItem value="EUR - Euro">EUR - Euro</SelectItem>
                        <SelectItem value="GBP - British Pound">
                          GBP - British Pound
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#252525]">
                      Language
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 bg-[#F9FAFB] border-[#E8ECF4] rounded-lg">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Swahili">Swahili</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateFormat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#252525]">
                      Date Format
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 bg-[#F9FAFB] border-[#E8ECF4] rounded-lg">
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Security Settings Section */}
          <div className="space-y-4 border rounded-2xl p-4">
            <h3 className="font-['Public_Sans'] font-medium text-base leading-[140%] text-black">
              Security Settings
            </h3>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="twoFactorAuth"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between py-4">
                    <div className="space-y-1">
                      <FormLabel className="text-base font-medium text-[#252525]">
                        Two-Factor Authentication
                      </FormLabel>
                      <FormDescription className="text-sm text-[#676D75]">
                        Require 2FA for all admin users
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-[#F8971D] data-[state=checked]:to-[#EE3124]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="auditLogging"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between py-4">
                    <div className="space-y-1">
                      <FormLabel className="text-base font-medium text-[#252525]">
                        Audit Logging
                      </FormLabel>
                      <FormDescription className="text-sm text-[#676D75]">
                        Log all user actions and system events
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-[#F8971D] data-[state=checked]:to-[#EE3124]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emailNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between py-4">
                    <div className="space-y-1">
                      <FormLabel className="text-base font-medium text-[#252525]">
                        Email Notifications
                      </FormLabel>
                      <FormDescription className="text-sm text-[#676D75]">
                        Send system notifications via email
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-[#F8971D] data-[state=checked]:to-[#EE3124]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
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
          onClick={form.handleSubmit(onSubmit)}
          className="flex items-center justify-center gap-2 w-[138px] h-[46px] px-4 py-3 bg-gradient-to-b from-[#F8971D] to-[#EE3124] rounded-3xl text-white font-medium text-base shadow-sm hover:opacity-90 transition-all"
        >
          Save Changes
        </Button>
      </div>
    </Form>
  )
}

const RolePermissionsTab = () => {
  const [permissions, setPermissions] = React.useState({
    agent: {
      view: true,
      edit: true,
      approve: false,
      delete: false,
      export: false,
    },
    creditOfficer: {
      view: true,
      edit: true,
      approve: true,
      delete: false,
      export: true,
    },
    opsLead: {
      view: true,
      edit: true,
      approve: true,
      delete: true,
      export: true,
    },
    finance: {
      view: true,
      edit: true,
      approve: true,
      delete: false,
      export: true,
    },
    admin: {
      view: true,
      edit: true,
      approve: true,
      delete: true,
      export: true,
    },
  })

  const roles = [
    {
      id: 'agent',
      name: 'Agent',
      description: 'Field agents handling customer interactions',
    },
    {
      id: 'creditOfficer',
      name: 'Credit Officer',
      description: 'Credit assessment and loan processing',
    },
    {
      id: 'opsLead',
      name: 'Ops Lead',
      description: 'Operations team leadership',
    },
    {
      id: 'finance',
      name: 'Finance',
      description: 'Financial operations and reporting',
    },
    {
      id: 'admin',
      name: 'Admin',
      description: 'System administration and full access',
    },
  ]

  const permissionTypes = [
    {
      id: 'view',
      label: 'View',
      description: 'Read access to data and reports',
    },
    {
      id: 'edit',
      label: 'Edit',
      description: 'Modify existing records and data',
    },
    {
      id: 'approve',
      label: 'Approve',
      description: 'Approve transactions and requests',
    },
    { id: 'delete', label: 'Delete', description: 'Remove records and data' },
    {
      id: 'export',
      label: 'Export',
      description: 'Export data and generate reports',
    },
  ]

  const togglePermission = (roleId, permissionId) => {
    setPermissions((prev) => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [permissionId]: !prev[roleId][permissionId],
      },
    }))
  }

  const handleSave = () => {
    console.log('Saving permissions:', permissions)
    // Handle save logic here
  }

  const handleCancel = () => {
    // Reset to original state
    setPermissions({
      agent: {
        view: true,
        edit: true,
        approve: false,
        delete: false,
        export: false,
      },
      creditOfficer: {
        view: true,
        edit: true,
        approve: true,
        delete: false,
        export: true,
      },
      opsLead: {
        view: true,
        edit: true,
        approve: true,
        delete: true,
        export: true,
      },
      finance: {
        view: true,
        edit: true,
        approve: true,
        delete: false,
        export: true,
      },
      admin: {
        view: true,
        edit: true,
        approve: true,
        delete: true,
        export: true,
      },
    })
  }

  return (
    <div>
      <CardContent
        title="Role Permissions Matrix"
        description="Configure access permissions for each role in the OKOA SASA system"
      >
        <div className="overflow-x-auto border rounded-2xl p-4">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-['Public_Sans'] font-semibold text-sm text-[#252525]">
                  Role
                </th>
                {permissionTypes.map((perm) => (
                  <th key={perm.id} className="text-center py-4 px-4">
                    <div className="font-['Public_Sans'] font-semibold text-sm text-[#252525]">
                      {perm.label}
                    </div>
                    <div className="font-['Public_Sans'] font-normal text-xs text-[#676D75] mt-1">
                      {perm.description}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => (
                <tr
                  key={role.id}
                  className={
                    index !== roles.length - 1 ? 'border-b border-gray-100' : ''
                  }
                >
                  <td className="py-6 px-4">
                    <div className="font-['Public_Sans'] font-semibold text-base text-[#252525]">
                      {role.name}
                    </div>
                    <div className="font-['Public_Sans'] font-normal text-sm text-[#676D75] mt-1">
                      {role.description}
                    </div>
                  </td>
                  {permissionTypes.map((perm) => (
                    <td key={perm.id} className="text-center py-6 px-4">
                      <div className="flex justify-center">
                        <Switch
                          checked={permissions[role.id][perm.id]}
                          onCheckedChange={() =>
                            togglePermission(role.id, perm.id)
                          }
                          className="data-[state=checked]:bg-linear-to-b data-[state=checked]:from-[#F8971D]  data-[state=checked]:to-[#EE3124]"
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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
const APIKeysTab = () => <div>
  <CardContent
    title="API Keys"
    description="Manage API keys for external integrations and applications">
    <APIKeysBody/>
    </CardContent>
</div>
const NotificationsTab = () => <div><NotificationsBody/></div>

function RouteComponent() {
  const [activeTab, setActiveTab] = React.useState(0)
  const tabs = [
    { label: 'General Settings', component: <GeneralSettingsTab /> },
    { label: 'Role Permissions', component: <RolePermissionsTab /> },
    { label: 'API Keys', component: <APIKeysTab /> },
    { label: 'Notifications', component: <NotificationsTab /> },
  ]

  return (
    <div>
      <div>
        <div className="flex flex-row items-center p-0 w-full h-12 border-b border-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`relative cursor-pointer h-12 flex flex-col items-center justify-center gap-3 flex-1 p-0 transition-colors ${
                activeTab === index ? 'text-[#252525]' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab(index)}
            >
              <span className="font-['Public_Sans'] font-semibold text-lg leading-[140%] text-center capitalize">
                {tab.label}
              </span>
              {activeTab === index && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#F8971D] to-[#EE3124]" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div>{tabs[activeTab].component}</div>
    </div>
  )
}
