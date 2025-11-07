import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { ChevronRight, Home } from 'lucide-react'
import { HomeIcon } from '@/assets/icons'

const PATH_LABELS = {
  '/': 'Home',
  '/products': 'Products',
  '/products/categories': 'Categories',
  '/products/cart': 'My Cart',
  '/checkout': 'Checkout',
  '/loans': 'Loan Dashboard',
  '/loans/apply': 'Apply',
  '/loans/faq': 'Loan FAQ',
  '/account': 'My Account',
  '/account/orders': 'Orders',
  '/account/order_table': 'All Orders',

  '/account/settings': 'Settings',
  '/support': 'Support',
}

const formatSegment = (segment) => {
  const decoded = decodeURIComponent(segment)

  if (!decoded) return ''
  if (/^\d+$/.test(decoded)) return `#${decoded}`

  return decoded
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

const buildTrailFromPath = (pathname) => {
  if (!pathname || pathname === '/') {
    return [
      {
        id: 'home',
        path: '/',
        label: PATH_LABELS['/'] ?? 'Home',
        isCurrent: true,
        icon: HomeIcon,
      },
    ]
  }

  const segments = pathname.split('/').filter(Boolean)
  const crumbs = []
  let currentPath = ''

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const label = PATH_LABELS[currentPath] ?? formatSegment(segment)
    const isCurrent = index === segments.length - 1

    crumbs.push({
      id: currentPath,
      path: currentPath,
      label,
      isCurrent,
    })
  })

  return [
    {
      id: 'home',
      path: '/',
      label: PATH_LABELS['/'] ?? 'Home',
      isCurrent: false,
      icon: HomeIcon,
    },
    ...crumbs,
  ]
}

export const BreadCrumbs = ({ title, description, items, className }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const crumbs = React.useMemo(() => {
    if (Array.isArray(items) && items.length > 0) {
      return items.map((item, index) => ({
        id: item.id ?? item.path ?? item.href ?? `crumb-${index}`,
        path: item.path ?? item.href ?? null,
        label:
          item.label ?? formatSegment(String(item.path ?? item.href ?? '')),
        isCurrent: item.isCurrent ?? index === items.length - 1,
        icon: item.icon,
        onClick: item.onClick,
      }))
    }

    return buildTrailFromPath(location.pathname)
  }, [items, location.pathname])

  const handleNavigate = React.useCallback(
    (crumb) => {
      if (crumb.isCurrent) return
      if (typeof crumb.onClick === 'function') {
        crumb.onClick()
        return
      }

      if (!crumb.path) return

      try {
        navigate({ to: crumb.path })
      } catch (error) {
        console.error('Breadcrumb navigation failed', error)
      }
    },
    [navigate],
  )

  if (!crumbs.length) return null

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <Breadcrumb>
        <BreadcrumbList className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-brand-mid-gray sm:gap-2 sm:text-xs md:text-sm">
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1
            const Icon = crumb.icon ?? (crumb.path === '/' ? HomeIcon : null)

            return (
              <React.Fragment key={crumb.id}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="inline-flex max-w-[200px] items-center gap-2 rounded-2xl px-2 py-1 text-xs font-medium capitalize text-brand-black sm:max-w-none sm:px-3 sm:py-1.5 sm:text-sm md:text-base">
                      {Icon && <Icon className="size-5 sm:size-6" aria-hidden="true" />}
                      <span className="truncate">{crumb.label}</span>
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <button
                        type="button"
                        onClick={() => handleNavigate(crumb)}
                        className="inline-flex max-w-[200px] items-center gap-2 rounded-2xl px-2 py-1 text-xs font-medium capitalize text-brand-mid-gray transition-colors hover:bg-brand-bg-2 hover:text-brand-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary-start sm:max-w-none sm:px-3 sm:py-1.5 sm:text-sm md:text-base"
                      >
                        {Icon && (
                          <Icon className="size-5 md:size-6" aria-hidden="true" />
                        )}
                        <span className="truncate">{crumb.label}</span>
                      </button>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                {!isLast && (
                  <BreadcrumbSeparator className="text-brand-mid-gray">
                    <ChevronRight className="size-4 sm:size-5 md:size-6" aria-hidden="true" />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>

      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h1 className="text-2xl font-semibold text-brand-black sm:text-3xl">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-sm text-brand-mid-gray sm:text-base">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
