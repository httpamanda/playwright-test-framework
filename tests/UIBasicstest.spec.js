import { test, expect } from "@playwright/test";

// sintax for a function
test("Browser Context Playwright test", async ({ browser }) => {
  // browser comes before page because there's no page without a browser
  // incase of multiple tabs we need to create a new context for each tab
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  const password = page.locator("#password");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  // failed login
  await userName.fill("rahulshetty");
  await password.fill("learning");
  await signIn.click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
  // sucessful login
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signIn.click();
  // grabs the first title
  // textContent method waits until the element is attached to the DOM (visible on screen)
  console.log(await cardTitles.first().textContent());
  // grab the second title
  console.log(await cardTitles.nth(1).textContent());
  // grab the all titles
  // allTextContents doesn't wait until the element is attached to the DOM so the method can return zero elements
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test("Page Playwright test", async ({ page }) => {
  await page.goto("https://google.com");
  // get tittle - assertion
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");

  //
});

test("UI Controls Playwright test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const password = page.locator("#password");
  const dropDown = page.locator("select.form-control");
  const documentLink = page.locator("a[href*='documents-request']");
  await dropDown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  // assertion
  // returns true or false
  console.log(await page.locator(".radiotextsty").last().isChecked());
  // here await is used before expect because the function toBeChecked is outside the brackets of locator
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  // here await is used after expect because the function isChecked is inside the brackets of locator
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test("Child windows hadl", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("a[href*='documents-request']");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"), // listens for the new page event (pending, rejected, fulfilled)
    documentLink.click(), // opens a new tab
  ]);
  const text = await newPage.locator(".red").textContent();
  console.log(text);
  const arrayText = text.split("@"); // split the text where there's an @
  const domain = arrayText[1].split(" ")[0]; // get the domain only and split the text where there's a space
  // console.log(domain);
  await page.locator("#username").fill(domain); // flip to the first page by using page
  console.log(await page.locator("#username").inputValue());

});