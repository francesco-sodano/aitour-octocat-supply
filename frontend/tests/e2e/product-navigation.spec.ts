import { test, expect } from '@playwright/test';

/**
 * Product catalog discovery E2E tests
 * Implements: frontend/tests/features/product-navigation.feature
 *
 * Covers:
 * - Navigation from home page to product catalog
 * - Product search with valid matches
 * - Product search with no matches (empty state)
 */

test.describe('Product catalog discovery', () => {
  test('Navigate from the home page to the product catalog', async ({ page }) => {
    // Given I am on the home page
    await page.goto('/');
    await expect(
      page.getByRole('heading', { level: 1, name: /Smart Cat Tech/i }),
    ).toBeVisible();

    // When I select the Products navigation link
    await page.getByRole('navigation').getByRole('link', { name: /Products/i }).click();

    // Then I land on the product catalog page
    await expect(page).toHaveURL(/\/products/);

    // And I see the catalog header "Products"
    await expect(
      page.getByRole('heading', { level: 1, name: 'Products' }),
    ).toBeVisible();
  });

  test('Search for a product by name', async ({ page }) => {
    // Given I am viewing the product catalog
    await page.goto('/products');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Products' }),
    ).toBeVisible();

    // And the catalog includes "SmartFeeder One"
    await expect(page.getByRole('heading', { name: 'SmartFeeder One' })).toBeVisible();

    // When I search for "SmartFeeder"
    await page.getByLabel('Search products').fill('SmartFeeder');

    // Then the results list shows "SmartFeeder One"
    await expect(page.getByRole('heading', { name: 'SmartFeeder One' })).toBeVisible();

    // And the product description is visible in the results
    await expect(page.getByText(/AI-powered feeder/i).first()).toBeVisible();
  });

  test('Search for a product with no matches', async ({ page }) => {
    // Given I am viewing the product catalog
    await page.goto('/products');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Products' }),
    ).toBeVisible();

    // Wait for initial products to load
    await expect(page.getByLabel('Search products')).toBeVisible();

    // When I search for "Space Tuna"
    await page.getByLabel('Search products').fill('Space Tuna');

    // Then I see the empty state message "No products found"
    const emptyState = page.getByRole('status');
    await expect(emptyState).toContainText('No products found');

    // And I am prompted to adjust the search filters
    await expect(emptyState).toContainText(/clearing.*changing.*search filters/i);
  });
});
