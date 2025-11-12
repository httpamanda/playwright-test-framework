const { test, expect } = require("@playwright/test");

test.only("Browser Activity Playwright", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill("lealamanda1998@gmail.com");
  await page.locator("#userPassword").fill("Senha@123");
  await page.locator("#login").click();
  // network idle = once all the network connections are successfully made
  // playwright has warned that the next line is deprecated
  await page.waitForLoadState("networkidle");
  // alternative way to wait for an element to be visible:
  // await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

  // in playwright we don't use assert but expect
  expect(titles).toContain("ADIDAS ORIGINAL");
  if (titles.indexOf("ADIDAS ORIGINAL") !== -1) {
    // click on the add to cart button of the product
    const addToCartButton = page.locator(".btn.w-10.rounded");
    await addToCartButton.nth(1).click();
    console.log("Product added to the cart");
  }

  const cart = page.locator("[routerlink*='cart']");
  await cart.click();
  // verify the product is visible in the cart
  await expect(page.getByText("ADIDAS ORIGINAL")).toBeVisible();
  console.log("Product is visible in the cart");

  // is necessary to wait for the checkout button to be visible before clicking it because it is async
  const checkOutButton = page.getByText("Checkout");
  await checkOutButton.click();
  const CVV = page.locator("//input[@type='text']").nth(1);
  await CVV.fill("123");
  const nameCard = page.locator("//input[@type='text']").nth(2);
  await nameCard.fill("Amanda Leal");
  const cupom = page.locator("//input[@type='text']").nth(3);
  await cupom.fill("rahulshettyacademy");
  // until here the code is working fine
  const applyCupom = page.locator("btn btn-primary mt-1");
  await applyCupom.click();
  const country = page.locator("//input[@placeholder='Select Country']");

  await country.type("bra", { delay: 100 });
  const dropDown = page.locator(".ta-results list-group");
  const option = page.locator("ta-item list-group-item").first();
  await option.click();
  const placeHolder = page.locator("btnn action__submit");
  await option.click();
  await page.getByText("Thankyou for the order.").isVisible();
  console.log("Order completed successfully");
});
