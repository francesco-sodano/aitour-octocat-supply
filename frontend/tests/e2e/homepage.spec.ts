import { test, expect } from '@playwright/test';

/**
 * Homepage E2E tests
 *
 * Covers:
 * - Homepage loads with correct title and hero heading
 * - Key navigation links are present and accessible
 * - "Explore Products" CTA navigates to the product catalog
 */

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads with the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/OctoCAT/i);
  });

  test('displays the hero heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Smart Cat Tech');
  });

  test('displays navigation links for Products and About', async ({ page }) => {
    await expect(page.getByRole('navigation').getByRole('link', { name: /products/i })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: /about/i })).toBeVisible();
  });

  test('"Explore Products" button navigates to the product catalog', async ({ page }) => {
    await page.getByRole('button', { name: /explore products/i }).click();
    await expect(page).toHaveURL(/\/products/);
  });
});
