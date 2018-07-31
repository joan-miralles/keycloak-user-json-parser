let fs = require("fs");
let SortedMap = require("collections/sorted-map");
let DateUtils = require("./lib/date_utils");
console.log("\n *STARTING* \n");

let dateMap = new SortedMap();
for (let i = 0; i < 3700; i = i + 100) {
    // Get content from file
    let filename = "user-files/" + "users-" + i + ".json";
    let contents;
    try {
        contents = fs.readFileSync(filename);
    } catch (e) {
        break;
    }
    let jsonContent = JSON.parse(contents);

    for (let index in jsonContent) {
        let item = jsonContent[index];
        let registerDate = new Date(item.createdTimestamp);
        let registerDateOnlyDay = DateUtils.getFormattedDate(registerDate);
        if (!dateMap.has(registerDateOnlyDay)) {
            dateMap.set(registerDateOnlyDay, 0);
        }
        dateMap.set(registerDateOnlyDay, dateMap.get(registerDateOnlyDay) + 1);
    }
}
let sortedKeys = dateMap.keys().sorted();
let firstDate = new Date(sortedKeys[0]);
let lastDate = new Date(sortedKeys[sortedKeys.length - 1]);
console.log("\n Data primer usuari: " + firstDate);
console.log("\n Data darrer usuari: " + lastDate);
console.log("\n 17 Juliol: " + dateMap.get('2018-07-17'));
console.log("\n 18 Juliol: " + dateMap.get('2018-07-18'));

let allDaysIn2018 = DateUtils.getDateArray(new Date('2018-01-01'), new Date('2018-07-30')).map(DateUtils.getFormattedDate);
console.log("\n *TOTAL 2018:* " + allDaysIn2018.map(function (key) {
    return dateMap.has(key) ? dateMap.get(key) : 0;
}).sum());
console.log("\n *TOTAL DAYS 2018:* " + allDaysIn2018.length);

console.log("\n *TOTAL EXTRANET:* " + dateMap.values().sum());
console.log("\n *EXIT* \n");
