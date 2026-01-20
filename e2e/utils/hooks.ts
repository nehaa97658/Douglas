import { test } from "./fixture";

test.beforeEach(async ({poManager}) => {
    const po = poManager;
    await po.basePage.navigateToURL();
    await po.homePage.handleCookieConsent();
})