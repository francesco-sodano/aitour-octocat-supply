import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly exploreProductsButton: Locator;
  readonly navHomeLink: Locator;
  readonly navProductsLink: Locator;
  readonly navAboutLink: Locator;
  readonly smartMonitoringHeading: Locator;
  readonly interactiveEntertainmentHeading: Locator;
  readonly comfortWellnessHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { level: 1 });
    this.exploreProductsButton = page.getByRole('button', { name: 'Explore Products' });
    this.navHomeLink = page.getByRole('link', { name: 'Home' });
    this.navProductsLink = page.getByRole('link', { name: 'Products' });
    this.navAboutLink = page.getByRole('link', { name: 'About us' });
    this.smartMonitoringHeading = page.getByRole('heading', { name: 'Smart Monitoring' });
    this.interactiveEntertainmentHeading = page.getByRole('heading', {
      name: 'Interactive Entertainment',
    });
    this.comfortWellnessHeading = page.getByRole('heading', { name: 'Comfort & Wellness' });
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.heading).toBeVisible();
  }

  async clickExploreProducts() {
    await this.exploreProductsButton.click();
    await expect(this.page).toHaveURL(/\/products/);
  }
}
