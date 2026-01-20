import { test as base, expect } from "@playwright/test";
import { PageObjectManager } from "../web/pages/poManager.page";

type PageObjects = {
    poManager : PageObjectManager;
};

export const test = base.extend<PageObjects>({

    poManager : async ({page}, use) =>{  
        const manager = new PageObjectManager(page);
        await use(manager);
    }
});

export {expect};