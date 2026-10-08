import { test, expect, Page } from '@playwright/test';
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

async function login(page: Page, username: string, password: string) {
  await page.locator('#user-name').fill(username);
  await page.locator('#password').fill(password);
  await page.locator('#login-button').click();
}

test('valid login', async ({ page }) => {
  await login(page, 'standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
});

test('invalid login with wrong password', async ({ page }) => {
  await login(page, 'standard_user', 'wrong_password');

  await expect(page.locator('[data-test="error"]'))
    .toContainText(/password/i);
});

test('locked out user', async ({ page }) => {
  await login(page, 'locked_out_user', 'secret_sauce');

  await expect(page.locator('[data-test="error"]'))
    .toContainText(/lock/i);
});
test('add product to cart',async({ page })=>{
  await login(page, 'standard_user', 'secret_sauce');
  await page.locator('#add-to-cart-sauce-labs-backpack').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(
  page.locator('[data-test="inventory-item-name"]')
    .filter({ hasText: 'Sauce Labs Backpack' })
).toHaveText('Sauce Labs Backpack');
  await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$29.99');
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveCount(0);
  
});
test('add 2 products to cart',async({page})=>{
    await login(page,'standard_user','secret_sauce');
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]'))
  .toHaveText('2');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="inventory-item-name"]'))
  .toContainText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
  }
);
test('add 2 products then remove 1',async({page})=>{
     await login(page,'standard_user','secret_sauce');
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]'))
  .toHaveText('2');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="inventory-item-name"]'))
  .toContainText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveCount(0);
    await expect(page.locator('[data-test="inventory-item-name"]'))
  .toContainText('Sauce Labs Bike Light');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
});
test('checkout',async({ page })=>{
  await login(page, 'standard_user', 'secret_sauce');
  await page.locator('#add-to-cart-sauce-labs-backpack').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(
  page.locator('[data-test="inventory-item-name"]')
    .filter({ hasText: 'Sauce Labs Backpack' })
).toHaveText('Sauce Labs Backpack');
  await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$29.99');
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test = "firstName"]').fill('Dimitris');
  await page.locator('[data-test = "lastName"]').fill('Papadopoulos');
  await page.locator('[data-test = "postalCode"]').fill('35100');
  await page.locator('[data-test = "continue"]').click();
  await page.locator('[data-test = "finish"]').click();
  await  expect(page.locator('[data-test = "complete-header"]')).toContainText('Thank you ');


  

});