import { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";
import * as dotenv from 'dotenv';
dotenv.config();

export class BasePage{
    page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async navigateToURL(url?: string){
        const targetURL = process.env.BASE_URL!
        if (!targetURL){
            throw new Error("No URL provided and Base URL is not set, Please configure .env file");
        }
        await this.page.goto(targetURL);
        await this.page.waitForLoadState('load');
    }

    async click(element: Locator){
        await element.waitFor({state: "visible"});
        await element.click(); 
    }

    async dblclick(element: Locator){
        await element.waitFor({state: "visible"});
        await element.dblclick(); 
    }

    async check(element: Locator){
        await element.waitFor({state: "visible"});
        await element.check(); 
    }

     async hover(element: Locator){
        await element.waitFor({state: "visible"});
        await element.hover(); 
    }

    async assertAttached(element: Locator){
        await element.waitFor({state: 'attached', timeout: 60000});
        expect(element).toBeAttached();
    }

    async assertVisible(element: Locator){
        await element.waitFor({state: 'visible', timeout: 60000});
        expect(element).toBeVisible();
    }

    async assertHasText(element: Locator, text: string){
        await element.waitFor({state: 'visible', timeout: 60000});
        expect(element).toHaveText(text);
    }

    async getText(element: Locator){
        await element.waitFor({state: 'visible', timeout: 60000});
        return await element.innerText();
    }
}