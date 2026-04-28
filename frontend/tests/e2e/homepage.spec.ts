import { test, expect } from '../fixtures/test-fixtures';

/**
 * Homepage load E2E tests
 *
 * Covers:
 * - Homepage renders its key content
 * - Navigation links are accessible
 * - "Explore Products" CTA navigates to the product catalog
 */

test.describe('Homepage', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('loads with the main heading visible', async ({ homePage }) => {
    await test.step('verify main heading contains brand name', async () => {
      await expect(homePage.heading).toContainText('Smart Cat Tech');
    });
  });

  test('displays all primary navigation links', async ({ homePage }) => {
    await test.step('Home link is present', async () => {
      await expect(homePage.navHomeLink.first()).toBeVisible();
    });

    await test.step('Products link is present', async () => {
      await expect(homePage.navProductsLink.first()).toBeVisible();
    });

    await test.step('About us link is present', async () => {
      await expect(homePage.navAboutLink.first()).toBeVisible();
    });
  });

  test('shows the three product category sections', async ({ homePage }) => {
    await test.step('Smart Monitoring section is present', async () => {
      await expect(homePage.smartMonitoringHeading).toBeVisible();
    });

    await test.step('Interactive Entertainment section is present', async () => {
      await expect(homePage.interactiveEntertainmentHeading).toBeVisible();
    });

    await test.step('Comfort & Wellness section is present', async () => {
      await expect(homePage.comfortWellnessHeading).toBeVisible();
    });
  });

  test('"Explore Products" button navigates to the product catalog', async ({ homePage }) => {
    await test.step('click Explore Products and verify URL', async () => {
      await homePage.clickExploreProducts();
      await expect(homePage.page).toHaveURL(/\/products/);
    });
  });
});
