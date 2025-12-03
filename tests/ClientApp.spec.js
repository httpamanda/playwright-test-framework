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

  await page.pause();

  // in playwright we don't use assert but expect
  // expect(titles).toContain("ADIDAS ORIGINAL");
  // if (titles.indexOf("ADIDAS ORIGINAL") !== -1) {
  //   // click on the add to cart button of the product
  //   const addToCartButton = page.locator(".btn.w-10.rounded");
  //   await addToCartButton.nth(1).click();
  //   console.log("Product added to the cart");
  // }


  // const CVV = page.locator("//input[@type='text']").nth(1);
  // await CVV.fill("123");
  // const nameCard = page.locator("//input[@type='text']").nth(2);
  // await nameCard.fill("Amanda Leal");
  // const cupom = page.locator("//input[@type='text']").nth(3);
  // await cupom.fill("rahulshettyacademy");
  // until here the code is working fine
  // const applyCupom = page.locator("btn btn-primary mt-1");
  // await applyCupom.click();
  // const country = page.locator("//input[@placeholder='Select Country']");

  // await country.type("bra", { delay: 100 });
  // const dropDown = page.locator(".ta-results list-group");
  // const option = page.locator("ta-item list-group-item").first();
  // await option.click();
  // const placeHolder = page.locator("btnn action__submit");
  // await option.click();
  // await page.getByText("Thankyou for the order.").isVisible();
  // console.log("Order completed successfully");
});
