import { BaseComponent } from './BaseComponent';
import { expect, step } from '@playwright/test';

export class CartList extends BaseComponent {
  constructor(page) {
    super(page);
    this.cartListLocator = page.getByRole('list').nth(1);
    this.notCoffeeMessage = page.getByText('No coffee, go add some.');
  }
  coffeeItem(name) {
    return this.cartListLocator.getByRole('listitem').filter({ hasText: name });
  }

  coffeeListItemNameCell(name) {
    return this.coffeeItem(name).locator('div').nth(0);
  }

  coffeeListItemUnitCell(name) {
    return this.coffeeItem(name).locator('div').nth(1);
  }

  coffeeListItemTotalCostCell(name) {
    return this.coffeeItem(name).locator('div').nth(3);
  }

  coffeeListItemRemoveAllButton(name) {
    return this.page.getByLabel(`Remove all ${name}`);
  }

  coffeeListItemRemoveOneButton(name) {
    return this.page.getByLabel(`Remove one ${name}`).nth(1);
  }

  coffeeListItemAddOneButton(name) {
    return this.page.getByLabel(`Add one ${name}`).nth(1);
  }
  async clickCoffeeListItemRemoveAllButton(name) {
    await step(`Click 'Remove All' button for ${name} list item`, async () => {
      await this.coffeeListItemRemoveAllButton(name).click();
    });
  }

  async clickCoffeeListItemRemoveOneButton(name) {
    await step(`Click 'Remove One' button for ${name} list item`, async () => {
      await this.coffeeListItemRemoveOneButton(name).click();
    });
  }

  async clickCoffeeListItemAddOneButton(name) {
    await step(`Click 'Add One' button for ${name} list item`, async () => {
      await this.coffeeListItemAddOneButton(name).click();
    });
  }

  async assertCoffeeItemIsVisible(name) {
    await step(`Assert the ${name} list item is visible`, async () => {
      await expect(this.coffeeItem(name)).toBeVisible();
    });
  }

  async assertCoffeeItemIsHidden(name) {
    await step(`Assert the ${name} coffee item is hidden`, async () => {
      await expect(this.coffeeItem(name)).toBeHidden();
    });
  }

  async assertCoffeeNameContainsCorrectText(name) {
    await step(`Assert the ${name} coffee item name is visible`, async () => {
      await expect(this.coffeeListItemNameCell(name)).toBeVisible();
    });
  }

  async assertCoffeeUnitContainsCorrectText(name, text) {
    await step(`Assert the ${name} units has correct amount`, async () => {
      await expect(this.coffeeListItemUnitCell(name)).toContainText(text);
    });
  }

  async assertCoffeeTotalCostContainsCorrectText(name, text) {
    await step(`Assert the ${name} total cost has correct amount`, async () => {
      await expect(this.coffeeListItemTotalCostCell(name)).toContainText(text);
    });
  }

  async assertNoCoffeeMessageIsVisible() {
    await step(`Assert 'No coffee' message is visible`, async () => {
      await expect(this.notCoffeeMessage).toBeVisible();
    });
  }
}
