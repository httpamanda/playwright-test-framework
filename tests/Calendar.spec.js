const { test, expect } = require('@playwright/test');

test.only('Calendar validations', async ({ page }) => {

    const calendar = page.locator(".react-calendar__navigation__label");
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber, date, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click(); // opens the calendar
    await calendar.click(); // clicks on months
    await calendar.click(); // clicks on years   
    await page.getByRole('button', { name: year }).click(); // selects year
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click(); // selects month and gives Number -1 because index starts from 0
    await page.locator("//abbr[text()='" + date + "']").click(); // selects date

    // assertion to verify if the date selected is correct
    const inputs = page.locator('.react-date-picker__inputGroup__input'); // no need for await because this is not an action

    for (let i=0; i<expectedList.length; i++) {  
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
    }
    
})
