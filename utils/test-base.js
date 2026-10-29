//Fixture : function  or helper
//avoid json parser
// const  jsonData         = JSON.parse(JSON.stringify(require('../test-data/placeorder_TestData.json')));
const base = require('@playwright/test');

//customise test behaviour
exports.customtest = base.test.extend({
    testDataForOrder: {
        username: "anshika@gmail.com",
        password: "Iamking@000",
        productName: "ZARA COAT 3"
    }
});