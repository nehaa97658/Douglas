import { Page } from "@playwright/test";
import { BasePage } from "../../utils/basePage.page";

export class HomePage extends BasePage{

    constructor(page: Page){
        super(page);
    }

    get consentModal(){
        return this.page.locator("div#usercentrics-root");
    }

    get sliderMenu(){
        return this.page.locator("nav.navigation-main");
    }

    async navigationMenuItem(itemName: string){
        return this.page.locator(".navigation-main li").getByRole('link', {name: `${itemName}`});
    }

    async handleCookieConsent(){
        await this.assertAttached(this.consentModal);
        await this.click(this.consentModal.getByRole("button", {name: 'NUR UNBEDINGT ERFORDERLICH'}));
    }

    async selectMenu(itemName: string){
        await this.hover(await this.navigationMenuItem(itemName));
        await this.click(await this.navigationMenuItem(itemName));
        itemName = itemName.toLowerCase();
        await this.page.waitForURL(`**/${itemName}/**`, {timeout: 120000});
        await this.page.reload({waitUntil: 'load'});
    }
    
}