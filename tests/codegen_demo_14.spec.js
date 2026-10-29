import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.locator('form input[name="name"]').click();
  await page.locator('form input[name="name"]').fill('Jay');
  await page.locator('form input[name="name"]').press('Tab');
  await page.locator('input[name="email"]').fill('jay@gmail.com');
  await page.locator('input[name="email"]').press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('Jay123');
  await page.getByRole('textbox', { name: 'Password' }).press('Tab');
  await page.getByRole('checkbox', { name: 'Check me out if you Love' }).check();
  await page.getByLabel('Gender').selectOption('Female');
  await page.getByText('Student', { exact: true }).click();
  await page.locator('input[name="bday"]').fill('2026-06-25');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('× Success! The Form has been').click();
  await expect(page.getByText('× Success! The Form has been')).toBeVisible();
});