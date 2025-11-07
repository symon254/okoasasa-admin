import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination'

const buildPageList = (currentPage, totalPages) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = [1]
  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)

  if (start > 2) {
    pages.push('start-ellipsis')
  }

  for (let page = start; page <= end; page += 1) {
    pages.push(page)
  }

  if (end < totalPages - 1) {
    pages.push('end-ellipsis')
  }

  pages.push(totalPages)
  return pages
}

export function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null
  }

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return
    }
    onPageChange?.(page)
  }

  const pages = buildPageList(currentPage, totalPages)

  return (
    <div className="flex items-center gap-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="ghost"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
              className="cursor-pointer h-10 w-10 rounded-2xl border border-[#E8ECF4] bg-white transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5 text-[#252525] md:h-6 md:w-6" />
            </Button>
          </PaginationItem>

          {pages.map((page, index) =>
            typeof page === 'number' ? (
              <PaginationItem key={page}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => goToPage(page)}
                  className={`h-10 w-10 rounded-2xl border cursor-pointer ${
                    currentPage === page
                      ? 'border-[#F8971D] bg-gradient-to-b from-[rgba(248,151,29,0.12)] to-[rgba(238,49,36,0.12)]'
                      : 'border-[#E8ECF4] bg-white hover:bg-gray-50 transition-colors'
                  }`}
                >
                  <span
                    className={`text-center text-base font-semibold leading-normal ${
                      currentPage === page
                        ? 'bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-transparent'
                        : 'text-[#252525]'
                    }`}
                  >
                    {page}
                  </span>
                </Button>
              </PaginationItem>
            ) : (
              <PaginationItem
                key={`${page}-${index}`}
                className="hidden md:inline-flex"
              >
                <PaginationEllipsis className="text-center text-base font-semibold leading-normal text-[#252525]" />
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <Button
              variant="ghost"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
              className="cursor-pointer h-10 w-10 rounded-2xl border border-[#E8ECF4] bg-white transition-opacity hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5 text-[#252525] md:h-6 md:w-6" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
