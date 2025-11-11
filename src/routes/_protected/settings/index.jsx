import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import React from 'react'

export const Route = createFileRoute('/_protected/settings/')({
  component: RouteComponent,
})

const CardContent = ({ title, description, children, onSubmit, onClick }) => (
  <div>
    <div className="my-8 w-full p-6 bg-white border border-gray-200 rounded-2xl">
      <div className="space-y-2.5">
        <label className="w-[1064px] h-[34px] font-['Public_Sans'] font-semibold text-2xl leading-[140%] capitalize text-black flex-none order-0 self-stretch flex-grow-0">
          {title}
        </label>
        <p className="w-[1064px] h-[22px] font-['Public_Sans'] font-medium text-base leading-[140%] text-[#676D75] flex-none order-1 self-stretch flex-grow-0">
          {description}
        </p>
      </div>
      <div className="w-full my-4 h-px bg-[#E8ECF4]"></div>
      <div>{children}</div>
    </div>
    <div className="flex gap-3 justify-end">
      <Button
        onClick={onClick}
        variant="outline"
        className="flex items-center justify-center gap-2 w-[138px]  h-[46px] px-4 py-3  border border-primary text-gray-700 rounded-3xl font-medium text-base hover:bg-gray-50 transition-all"
      >
        Cancel
      </Button>
      <Button
        onClick={onSubmit}
        type="submit"
        className="flex items-center justify-center gap-2 w-[138px] h-[46px] px-4 py-3 bg-linear-to-b from-[#F8971D] to-[#EE3124] rounded-3xl text-white font-medium text-base shadow-sm hover:opacity-90 transition-all"
      >
        Save Changes
      </Button>
    </div>
  </div>
)

const CustomerDeviceTab = () => (
  <CardContent
    title="General Settings"
    description="Manage your general account settings and preferences."
  >
    <div>
      <div className="p-4">
        <div className="space-x-4">
          <h3 className="w-[1032px] h-[22px] font-['Public_Sans'] font-medium text-base leading-[140%] text-black flex-none order-0 self-stretch flex-grow-0">
            Company Information
          </h3>
          <div></div>
        </div>
      </div>
    </div>
  </CardContent>
)
const KYCDocumentsTab = () => <div>KYC Documents Content</div>
const CreditReviewTab = () => <div>Credit Review Content</div>
const ActivityTimelineTab = () => <div>Activity Timeline Content</div>
function RouteComponent() {
  const [activeTab, setActiveTab] = React.useState(0)
  const tabs = [
    { label: 'General Settings', component: <CustomerDeviceTab /> },
    { label: 'Role Permissions', component: <KYCDocumentsTab /> },
    { label: 'API Keys', component: <CreditReviewTab /> },
    { label: 'Notifications', component: <ActivityTimelineTab /> },
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
      <div className="">{tabs[activeTab].component}</div>
      {/* <div className="flex gap-3 justify-end">
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2 w-[138px]  h-[46px] px-4 py-3  border border-primary text-gray-700 rounded-3xl font-medium text-base hover:bg-gray-50 transition-all"
        >
          Cancel
        </Button>
        <Button className="flex items-center justify-center gap-2 w-[138px] h-[46px] px-4 py-3 bg-linear-to-b from-[#F8971D] to-[#EE3124] rounded-3xl text-white font-medium text-base shadow-sm hover:opacity-90 transition-all">
          Save Changes
        </Button>
      </div> */}
    </div>
  )
}
