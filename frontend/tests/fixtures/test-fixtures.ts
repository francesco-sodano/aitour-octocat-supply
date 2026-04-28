import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';

type Fixtures = {
  homePage: HomePage;
  productsPage: ProductsPage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
});

export { expect } from '@playwright/test';
