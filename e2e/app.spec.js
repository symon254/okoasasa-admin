import { test, expect } from '@playwright/test'

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/')

  // Check if the React logo is visible
  await expect(page.locator('img[alt="logo"]')).toBeVisible()

  // Check if the main text is present
  await expect(page.locator('text=Learn React')).toBeVisible()
  await expect(page.locator('text=Learn TanStack')).toBeVisible()
})

test('navigation menu works', async ({ page }) => {
  await page.goto('/')

  // Open the menu
  await page.click('button[aria-label="Open menu"]')

  // Check if navigation items are visible
  await expect(page.locator('text=TanStack Table')).toBeVisible()
  await expect(page.locator('text=Store')).toBeVisible()
  await expect(page.locator('text=TanStack Query')).toBeVisible()

  // Navigate to Table demo
  await page.click('text=TanStack Table')
  await expect(page.url()).toContain('/demo/table')
})

test('table demo functionality', async ({ page }) => {
  await page.goto('/demo/table')

  // Check if the table is rendered
  await expect(page.locator('table')).toBeVisible()

  // Check if search input is present
  await expect(
    page.locator('input[placeholder="Search all columns..."]'),
  ).toBeVisible()

  // Test search functionality
  await page.fill('input[placeholder="Search all columns..."]', 'test')

  // Check pagination controls
  await expect(page.locator('text=Page')).toBeVisible()
})

test('store demo functionality', async ({ page }) => {
  await page.goto('/demo/store')

  // Check if input fields are present
  const firstNameInput = page.locator('input').first()
  const lastNameInput = page.locator('input').nth(1)

  await expect(firstNameInput).toBeVisible()
  await expect(lastNameInput).toBeVisible()

  // Test store reactivity
  await firstNameInput.fill('John')
  await lastNameInput.fill('Doe')

  // Check if full name is updated
  await expect(page.locator('text=John Doe')).toBeVisible()
})

test('tanstack query demo', async ({ page }) => {
  await page.goto('/demo/tanstack-query')

  // Check if the demo content is loaded
  await expect(
    page.locator('text=TanStack Query Simple Promise Handling'),
  ).toBeVisible()

  // Check if the mock data is displayed
  await expect(page.locator('text=Alice')).toBeVisible()
  await expect(page.locator('text=Bob')).toBeVisible()
  await expect(page.locator('text=Charlie')).toBeVisible()
})
