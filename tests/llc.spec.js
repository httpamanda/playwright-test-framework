import { test, expect} from "@playwright/test";

test('Playwright Special locators', async ({ page }) => {
    
    await page.goto(("https://rahulshettyacademy.com/angularpractice/"));


    await page.locator("div[class='form-group'] input[name='name']").fill("Amanda");
    await page.locator("input[name='email']").fill("amanda@email.com");
    await page.getByPlaceholder("Password").fill("Senha@123");
    
    // check() only works because the label is clickable and linked to the input
    await page.getByLabel("Check me out if you Love IceCreams!").check(); // getByLabel only works when there's association between label and input

    // selects the option by using the value attribute
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Employed").check();
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", { name: "Shop"}).click();

    // instead of using the getByText locator, we can use filter to find a specific card
    // this is more efficient when there are multiple similar items on the page
    await page.locator("app-card").filter( { hasText: "Nokia Edge"}).getByRole("button").click(); // here there's no need to specify { name: "Add"} because there's only one button in the card



});