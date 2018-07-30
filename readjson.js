let fs = require("fs");
let SortedMap = require("collections/sorted-map");
let DateUtils = require("./lib/date_utils");
console.log("\n *STARTING* \n");
let dateMap = new SortedMap();

function logValue(key) {
    var value = dateMap.has(key) ? dateMap.get(key) : 0;
    console.log(key + " => " + value);
}

var filename;
var contents;
// Get content from file
for (var i = 0; i < 3700; i = i + 100) {
    filename = "user-files/" + "users-" + i + ".json";
    try {
        contents = fs.readFileSync(filename);
    } catch (e) {
        break;
    }
    // Define to JSON type
    var jsonContent = JSON.parse(contents);

    for (var index in jsonContent) {
        var item = jsonContent[index];
        var registerDate = new Date(item.createdTimestamp);
        var registerDateOnlyDay = DateUtils.getFormattedDate(registerDate);
        if (dateMap.has(registerDateOnlyDay)) {
            dateMap.set(registerDateOnlyDay, dateMap.get(registerDateOnlyDay) + 1);
        } else {
            dateMap.set(registerDateOnlyDay, 1);
        }
    }
}
console.log("\n *TOTAL:* " + dateMap.values().sum());
var sortedKeys = dateMap.keys().sorted();
var firstDate = new Date(sortedKeys[0]);
var lastDate = new Date(sortedKeys[sortedKeys.length - 1]);
var allDays = DateUtils.getDateArray(firstDate, lastDate).map(DateUtils.getFormattedDate);
allDays.forEach(logValue);
console.log("\n *EXIT* \n");
