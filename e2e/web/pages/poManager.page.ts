import { Page } from "@playwright/test";
import { HomePage } from "./home.page";
import { ParfumPage } from "./parfum.page";
import { BasePage } from "../../utils/basePage.page";

export class PageObjectManager {
    
    private readonly page: Page;

    private _homePage?: HomePage;
    private _parfumPage?: ParfumPage;
    private _basePage?: BasePage;

    constructor(page: Page){
        this.page = page;
    }

    get basePage(): BasePage {
        if(!this._basePage) {
            this._basePage = new BasePage(this.page);
        }
        return this._basePage;
    }

    get homePage(): HomePage {
        if(!this._homePage) {
            this._homePage = new HomePage(this.page);
        }
        return this._homePage;
    }

    get parfumPage(): ParfumPage {
        if(!this._parfumPage) {
            this._parfumPage = new ParfumPage(this.page);
        }
        return this._parfumPage;
    }

}