const { test, expect } = require("@playwright/test");

test("Client App login", async ({ page }) => {
  const email = "lealamanda1998@gmail.com";
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("Senha@123");
  await page.getByRole("button", { name: "Login" }).click();
  // network idle = once all the network connections are successfully made
  // playwright has warned that the next line is deprecated
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  await page.locator(".card-body").filter({hasText: productName}).getByRole("button", {name: "Add To Cart"}).click();

  // OPEN CART
  await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click(); // there are many Cart texts on the page, so we narrow it down by specifying the role listitem

  // checking if the product if visible in the cart
  await page.locator("div li").first().waitFor();
  await expect(page.getByText(productName)).toBeVisible();

  await page.getByRole("button", { name: "Checkout" }).click();

  // HOW TO HANDLE DROPDOWNS
  // added delay here because it prevents this step from failing if the
  // application server is slow due to heavy traffic
  await page.getByPlaceholder("Select Country").pressSequentially("bra", { delay: 150 });
  await page.getByRole("button", { name: "Brazil" }).click();


  await page.getByText('CVV Code').locator('..').getByRole('textbox').fill('123');
  await page.getByText('Name on Card').locator('..').getByRole('textbox').fill('My name');
  await page.getByText('Apply Coupon').locator('..').getByRole('textbox').fill('rahulshettyacademy');
  await page.getByRole("button", { name: "Apply Coupon" }).click();
  await expect(page.locator(".mt-1.ng-star-inserted")).toHaveText("* Coupon Applied");
  await page.locator("text=Place Order").click();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);

  // GO TO ORDERS PAGE  
  await page.getByRole("button", { name: "ORDERS" }).click();
  await page.locator("tbody").waitFor();

  // scan each row of the table
  const rows = await page.locator("tbody tr");

  // for each row, check the order id
  for (let i = 0; i < await rows.count(); ++i) {
    // instead of using page.locator, we use rows locator to go through each row and not the whole page  
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();

  
  // await page.pause()

});