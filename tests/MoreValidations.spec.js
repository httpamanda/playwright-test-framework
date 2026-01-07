const { test, expect } = require('@playwright/test')

test("Popup Validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // Browser navigation commands
    await page.goBack(); // Navigate back to the previous page
    await page.goForward(); // Navigate forward to the next page
    await page.reload(); // Reload the current page


    // Hide and Show Textbox
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    // Alert Popup
    await page.locator("#confirmbtn").click();
    page.on('dialog', dialog => dialog.accept()); // method on listens to events, first parameter is event name, second is callback function. accept clicks OK button in the popup and dismiss clicks Cancel button

    // Mouse Hover 
    await page.locator("#mousehover").hover();

    // Iframe handling
    const framesPage = page.frameLocator("#courses-iframe");
    framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);

})