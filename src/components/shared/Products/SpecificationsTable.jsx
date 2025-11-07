import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'

export function SpecificationsTable({
  specifications = {},
  descriptionHtml = '',
  descriptionText = '',
  benefits = [],
}) {
  const specificationEntries = Object.entries(specifications ?? {})
  const hasSpecifications = specificationEntries.length > 0
  const normalizedDescriptionHtml = descriptionHtml?.trim()
  const normalizedDescriptionText = descriptionText?.trim()
  const normalizedBenefits = Array.isArray(benefits)
    ? benefits.filter(
        (benefit) => typeof benefit === 'string' && benefit.trim().length > 0,
      )
    : []
  const descriptionParagraphs =
    !normalizedDescriptionHtml && normalizedDescriptionText
      ? normalizedDescriptionText
          .split('\n')
          .map((paragraph) => paragraph.trim())
          .filter(Boolean)
      : []

  return (
    <Tabs
      defaultValue="specifications"
      className="flex w-full flex-col items-start gap-6 md:max-w-[730px] md:gap-10"
    >
      {/* Tabs Navigation */}
      <TabsList className="flex h-auto w-full items-center gap-0 rounded-none bg-transparent p-0 md:max-w-[630px]">
        <TabsTrigger
          value="specifications"
          className="group flex flex-1 flex-col items-center gap-2 rounded-none border-0 bg-transparent p-0 shadow-none ring-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none md:gap-3"
        >
          <div className="self-stretch text-center text-base font-normal capitalize leading-[140%]  group-data-[state=active]:font-bold group-data-[state=active]:text-[#252525] md:text-2xl">
            Specifications
          </div>
          <div className="h-[2px] self-stretch bg-[#E8ECF4] group-data-[state=active]:h-1 group-data-[state=active]:bg-[linear-gradient(180deg,#F8971D_0%,#EE3124_100%)]" />
        </TabsTrigger>

        <TabsTrigger
          value="description"
          className="group flex flex-1 flex-col items-center gap-2 rounded-none border-0 bg-transparent p-0 shadow-none ring-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none md:gap-3"
        >
          <div className="self-stretch text-center text-base font-normal capitalize leading-[140%]  group-data-[state=active]:font-bold group-data-[state=active]:text-[#252525] md:text-2xl">
            Description
          </div>
          <div className="h-[2px] self-stretch bg-[#E8ECF4] group-data-[state=active]:h-1 group-data-[state=active]:bg-[linear-gradient(180deg,#F8971D_0%,#EE3124_100%)]" />
        </TabsTrigger>

        <TabsTrigger
          value="benefits"
          className="group flex flex-1 flex-col items-center gap-2 rounded-none border-0 bg-transparent p-0 shadow-none ring-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none md:gap-3"
        >
          <div className="self-stretch text-center text-base font-normal capitalize leading-[140%]  group-data-[state=active]:font-bold group-data-[state=active]:text-[#252525] md:text-2xl">
            Benefits
          </div>
          <div className="h-[2px] self-stretch bg-[#E8ECF4] group-data-[state=active]:h-1 group-data-[state=active]:bg-[linear-gradient(180deg,#F8971D_0%,#EE3124_100%)]" />
        </TabsTrigger>
      </TabsList>

      {/* Specifications Content */}
      <TabsContent value="specifications" className="mt-0 w-full">
        <Card className="flex flex-col items-start self-stretch gap-0 border-none p-0 shadow-none">
          {hasSpecifications ? (
            specificationEntries.map(([key, value], index) => {
              const isFirst = index === 0
              const isLast = index === specificationEntries.length - 1

              return (
                <div key={key} className="flex items-center self-stretch">
                  <div
                    className={`flex w-28 items-center gap-2.5 border border-[#E8ECF4] bg-[#F9FAFB] p-3 md:w-[277px] md:p-4 ${
                      isFirst ? 'rounded-tl-xl md:rounded-tl-2xl' : ''
                    } ${isLast ? 'rounded-bl-xl md:rounded-bl-2xl' : ''}`}
                  >
                    <div className="text-sm font-bold capitalize leading-[140%] text-[#252525] md:text-xl">
                      {key}
                    </div>
                  </div>

                  <div
                    className={`flex flex-1 items-center gap-2.5 self-stretch border border-[#E8ECF4] p-3 md:p-4 ${
                      isFirst ? 'rounded-tr-xl md:rounded-tr-2xl' : ''
                    } ${isLast ? 'rounded-br-xl md:rounded-br-2xl' : ''}`}
                  >
                    <div className="text-sm font-normal leading-[140%] text-[#252525] md:text-lg">
                      {value}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="w-full rounded-2xl border border-dashed border-[#E8ECF4] bg-[#F9FAFB] px-4 py-6 text-center text-sm text-[#676D75] md:text-base">
              Specifications will be shared soon.
            </div>
          )}
        </Card>
      </TabsContent>

      {/* Description Content */}
      <TabsContent value="description" className="mt-0 w-full">
        <div className="self-stretch py-4 md:py-6">
          {normalizedDescriptionHtml ? (
            <div
              className="prose prose-sm max-w-none text-[#676D75] md:prose-base"
              dangerouslySetInnerHTML={{ __html: normalizedDescriptionHtml }}
            />
          ) : descriptionParagraphs.length > 0 ? (
            <div className="space-y-3">
              {descriptionParagraphs.map((paragraph, index) => (
                <p
                  key={`${paragraph}-${index}`}
                  className="text-sm font-normal leading-[140%] text-[#676D75] md:text-base md:font-medium"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-sm font-normal leading-[140%] text-[#A0A4AC] md:text-base">
              Detailed description will be updated soon.
            </p>
          )}
        </div>
      </TabsContent>

      {/* Benefits Content */}
      <TabsContent value="benefits" className="mt-0 w-full">
        <div className="self-stretch py-4 md:py-6">
          {normalizedBenefits.length > 0 ? (
            <ul className="list-disc space-y-2 pl-5 md:pl-6">
              {normalizedBenefits.map((benefit, index) => (
                <li
                  key={`${benefit}-${index}`}
                  className="text-sm font-normal leading-[140%] text-[#676D75] md:text-base"
                >
                  {benefit}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm font-normal leading-[140%] text-[#A0A4AC] md:text-base">
              Benefit highlights are coming soon.
            </p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}
