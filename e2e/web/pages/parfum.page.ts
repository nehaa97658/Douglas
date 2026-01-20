import { Page } from "@playwright/test";
import { BasePage } from "../../utils/basePage.page";

export class ParfumPage extends BasePage{

    constructor(page: Page){
        super(page);
    }

    get filterHeader(){
        return this.page.locator(".slideout-menu h3");
    }

    get filterModalCloseBtn(){
        return this.page.locator(".slideout-menu").locator("//button[@data-testid='close-button']");
    }

    get productParent(){
        return this.page.locator('.product-grid-column');
    }

    get productBrandName(){
        return this.page.locator('//span[contains(@id, "product-tile-image-title")]');
    }

    get productPrice(){
        return this.page.locator('//span[@data-testid= "price-type-discount-color"]');
    }

    async filterCategory(categoryName: string){
        return this.page.locator(".quick-filter-menu").getByRole("button", {name: `${categoryName}`});
    }
    
    async filterSubcategory(subcategoryName: string){
        return this.page.locator(".slideout-menu a").getByLabel(`${subcategoryName}`,{exact: true});
    }

    async applyFilter(categoryName:string, subcategoryName: string){
        await this.page.reload();
        await this.assertVisible(await this.filterCategory(categoryName));
        await this.click(await this.filterCategory(categoryName));
        await this.assertVisible(this.filterHeader);
        await this.assertHasText(this.filterHeader, categoryName);
        await this.assertVisible(await this.filterSubcategory(subcategoryName));
        await this.click(await this.filterSubcategory(subcategoryName));
        await this.page.waitForURL('**:relevance:**',{waitUntil: 'load'});
        await this.assertVisible(this.filterHeader);
        await this.assertHasText(this.filterHeader, categoryName);
    }

    async showResults(){
        await this.page.reload();
        const count = await this.productParent.count();
        for (let i = 0; i < count; i++){
            const name = await this.getText(this.productBrandName.nth(i));
            const price = await this.getText(this.productPrice.nth(i));
            console.log(`${name} | ${price}`);
        }
    }
}