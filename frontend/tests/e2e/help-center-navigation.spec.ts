import { test, expect } from '@playwright/test';

/**
 * Help Center navigation E2E tests
 *
 * Covers:
 * - Navigation from home page to Help Center via footer link
 * - Help Center page loads correctly with expected content
 */

test.describe('Help Center navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate away from about:blank so localStorage context is available
    await page.goto('/');
  });

  test('Navigate to Help Center from footer link', async ({ page }) => {
    // Given I am on the home page
    await page.goto('/');
    await expect(page.locator('h1:has-text("Smart Cat Tech")')).toBeVisible();

    // When I select the Help Center link in the footer
    await page.click('footer a:has-text("Help Center")');

    // Then I land on the Help Center page
    await expect(page).toHaveURL(/\/help-center/);

    // And I see the Help Center header
    await expect(page.locator('h1:has-text("Help Center")')).toBeVisible();
  });

  test('Help Center page displays expected content', async ({ page }) => {
    // Given I navigate directly to the Help Center page
    await page.goto('/help-center');

    // Then the page title is visible
    await expect(page.locator('h1:has-text("Help Center")')).toBeVisible();

    // And I see the FAQ section
    await expect(page.locator('h2:has-text("Frequently Asked Questions")')).toBeVisible();

    // And I see the Contact Support section
    await expect(page.locator('h2:has-text("Contact Support")')).toBeVisible();

    // And I see support contact information
    await expect(page.locator('text=support@octocatsupply.com')).toBeVisible();
  });
});
