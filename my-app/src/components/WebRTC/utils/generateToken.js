//This is a nodejs script, and requires the following npm packages to run:
//jssha, btoa and command-line-args

//WARNING - Token generation should NEVER be done client side (in a browser for
//example), because then you are exposing your developer key to customers
/*jshint esversion: 6 */

const jsSHA = require('jssha');
const btoa = require('btoa');
const fs = require('fs');
const commandLineArgs = require('command-line-args');
//var tokenGenerated = false;
var vCardFileSpecified = false;

// const optionDefinitions = [{
//     name: 'key',
//     type: String
// }, {
//     name: 'appID',
//     type: String
// }, {
//     name: 'userName',
//     type: String
// }, {
//     name: 'vCardFile',
//     type: String
// }, {
//     name: 'expiresInSecs',
//     type: Number
// }, {
//     name: 'expiresAt',
//     type: String,
//     multiple: true
// }, {
//     name: 'help',
//     alias: 'h',
//     type: String
// }];

// const options = commandLineArgs(optionDefinitions);

// function printHelp() {
//     console.log("\nThis script will generate a provision login token from a developer key" +
//         "\nOptions:" +
//         "\n\t--key           Developer key supplied with the developer account" +
//         "\n\t--appID         ApplicationID supplied with the developer account" +
//         "\n\t--userName      Username to generate a token for" +
//         "\n\t--vCardFile     Path to the XML file containing a vCard for the user" +
//         "\n\t--expiresInSecs Number of seconds the token will be valid can be used instead of expiresAt" +
//         "\n\t--expiresAt     Time at which the token will expire ex: (2055-10-27T10:54:22Z) can be used instead of expiresInSecs" +
//         "\n");
//     process.exit();
// }

// if ((typeof options.help !== 'undefined') || (typeof options.key == 'undefined') || (typeof options.appID == 'undefined') || (typeof options.userName == 'undefined')) {
//     printHelp();
// }

// if (typeof options.vCardFile !== 'undefined') {
//     vCardFileSpecified = true;
// }

// export function checkForVCardFileAndGenerateToken(key, appID, userName, expiresInSeconds) {
//     if (vCardFileSpecified) {
//         fs.readFile(options.vCardFile, 'utf8', function(err, data) {
//             if (err) {
//                 return console.log("error reading vCard file " + err);
//             }
//             console.log("read in the fillowing vCard: " + data);
//             generateToken(key, appID, userName, expiresInSeconds, data);
//         });
//     } else {
//         generateToken(key, appID, userName, expiresInSeconds, "");
//     }
// }

 export function generateToken(key, appID, userName, expiresInSeconds, vCard) {
    var EPOCH_SECONDS = 62167219200;
    var expires = Math.floor(Date.now() / 1000) + expiresInSeconds + EPOCH_SECONDS;
    var shaObj = new jsSHA("SHA-384", "TEXT");
    shaObj.setHMACKey(key, "TEXT");
    var jid = userName + '@' + appID;
    var body = 'provision' + '\x00' + jid + '\x00' + expires + '\x00' + vCard;
    shaObj.update(body);
    var mac = shaObj.getHMAC("HEX");
    var serialized = body + '\0' + mac;
    console.log("\nGenerated Token: \n" + btoa(serialized));
    return serialized
}

// //Date is in the format: "October 13, 2014 11:13:00"
//  export function generateTokenExpiresOnDate(key, appID, userName, date) {
//     var currentDate = new Date(date);
//     var dateInSeconds = Math.floor(currentDate.valueOf() / 1000);
//     var nowInSeconds = Math.floor(Date.now() / 1000);
//     if (dateInSeconds < nowInSeconds) {
//         console.log("Date is before current time, so token will be invalid");
//         var expiresInSeconds = 0;
//     } else {
//         expiresInSeconds = dateInSeconds - nowInSeconds;
//         console.log("Expires in seconds: " + expiresInSeconds);
//     }
//     checkForVCardFileAndGenerateToken(key, appID, userName, expiresInSeconds);
// }

// console.log("\nGenerating token with the following inputs");
// console.log("Key: " + options.key);
// console.log("appID: " + options.appID);
// console.log("userName: " + options.userName);

// if (typeof options.vCardFile !== 'undefined') {
//     console.log("vCardFile: " + options.vCardFile);
// }

// if (typeof options.expiresInSecs !== 'undefined') {
//     console.log("expiresInSecs: " + options.expiresInSecs);
//     checkForVCardFileAndGenerateToken(options.key, options.appID, options.userName, options.expiresInSecs);

// } else if (typeof options.expiresAt !== 'undefined') {
//     console.log("expiresAt: " + options.expiresAt);
//     generateTokenExpiresOnDate(options.key, options.appID, options.userName, options.expiresAt);
// } else {
//     console.log("Error: Neither expiresInSecs or expiresAt parameters passed in");
// }