import '../../utils/hooks'
import { test } from '../../utils/fixture'
import jsonData from '../../testData/filterData.json'

for(const json of jsonData){
    test(`Filtering and printing result for this combination = ${json.filter1.filterCateogory} - ${json.filter1.filterSubcategory}`, async({poManager})=>{
        const po = poManager;
        await po.homePage.selectMenu("Parfum");
        await po.parfumPage.applyFilter(json.filter1.filterCateogory, json.filter1.filterSubcategory);
        await po.parfumPage.applyFilter(json.filter2.filterCateogory, json.filter2.filterSubcategory);
        await po.parfumPage.applyFilter(json.filter3.filterCateogory, json.filter3.filterSubcategory);
        await po.parfumPage.showResults();
    })
}