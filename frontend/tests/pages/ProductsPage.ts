import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly searchInput: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { level: 1, name: 'Products' });
    this.searchInput = page.getByLabel('Search products');
    this.emptyState = page.getByRole('status');
  }

  async goto() {
    await this.page.goto('/products');
    await expect(this.heading).toBeVisible();
  }

  async search(term: string) {
    await this.searchInput.fill(term);
  }

  async expectProductVisible(name: string) {
    await expect(this.page.getByRole('heading', { name, level: 3 })).toBeVisible();
  }

  async expectNoProductsFound() {
    await expect(this.emptyState).toContainText('No products found');
  }
}
