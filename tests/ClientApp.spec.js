const { test, expect } = require("@playwright/test");

test.only("Client App login", async ({ page }) => {
  const email = "lealamanda1998@gmail.com";
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Senha@123");
  await page.locator("#login").click();
  // network idle = once all the network connections are successfully made
  // playwright has warned that the next line is deprecated
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  // alternative way to wait for an element to be visible:
  // await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    // when you enter 'locator' you are telling the code to go through
    // so the code below will look for the items inside the div tag that you used
    // to declare products in the beginning of the code
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      //add to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  // OPEN CART
  await page.locator("[routerlink*='cart']").click();
  // checking if the product if visible in the cart
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  // in playwright we don't use assert but expect
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click();


  // HOW TO HANDLE DROPDOWNS
  // added delay here because it prevents this step from failing if the
  // application server is slow due to heavy traffic
  await page.locator("[placeholder*='Country']").pressSequentially("bra", { delay: 150 }); // it enters  b → (delay 150 ms) → enters r → (delay 150 ms) → enters a
  const dropDown = page.locator(".ta-results");
  await dropDown.waitFor();
  // instead of doing page.locator where you search the whole page
  // alternate to the variable which is where it'll search
  const optionsCount = await dropDown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropDown.locator("button").nth(i).textContent();
    // tripple equal if matches with string
    if (text === " Brazil") {
      await dropDown.locator("button").nth(i).click();
      // break to come out of the loop
      break;
    }
  }
  // checking if the e-mail output matches my e-mail
  expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

  // locator('..') goes back to the parent element
  // getByRole('textbox') finds the input field inside the parent element
  await page.getByText('CVV Code').locator('..').getByRole('textbox').fill('123');
  await page.getByText('Name on Card').locator('..').getByRole('textbox').fill('My name');
  await page.getByText('Apply Coupon').locator('..').getByRole('textbox').fill('rahulshettyacademy');
  await page.locator(".btn.btn-primary").click();
  await expect(page.locator(".mt-1.ng-star-inserted")).toHaveText("* Coupon Applied");
  await page.locator("text=Place Order").click();

  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);

  // GO TO ORDERS PAGE  
  await page.locator("button[routerlink*='myorders']").click();
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