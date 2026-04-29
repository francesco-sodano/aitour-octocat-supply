import { test, expect } from '@playwright/test';

/**
 * Homepage E2E tests
 *
 * Covers:
 * - Homepage loads successfully with correct title
 * - Key page elements are visible (hero, navigation, footer)
 * - Navigation links work correctly
 */

test.describe('Homepage', () => {
  test('loads successfully with correct page title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('OctoCAT Supplies');
  });

  test('displays the hero heading and call-to-action', async ({ page }) => {
    await page.goto('/');

    // Verify the main hero heading is visible
    await expect(
      page.getByRole('heading', { level: 1, name: /Smart Cat Tech/i }),
    ).toBeVisible();

    // Verify the call-to-action button is visible
    await expect(
      page.getByRole('button', { name: /Explore Products/i }),
    ).toBeVisible();
  });

  test('displays the navigation bar with key links', async ({ page }) => {
    await page.goto('/');

    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();

    // Verify key navigation links are present
    await expect(nav.getByRole('link', { name: /Home/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /Products/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /About us/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /Login/i })).toBeVisible();
  });

  test('navigates to products page via Explore Products button', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /Explore Products/i }).click();

    await expect(page).toHaveURL(/\/products/);
    await expect(
      page.getByRole('heading', { level: 1, name: /Products/i }),
    ).toBeVisible();
  });
});
