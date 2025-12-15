import { test, expect} from "@playwright/test";

test('Playwright Special locators', async ({ page }) => {
    
    await page.goto(("https://rahulshettyacademy.com/angularpractice/"));

    // check() only works because the label is clickable and linked to the input
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    // selects the option by using the value attribute
    await page.getByLabel("Gender").selectOption("Female");

});