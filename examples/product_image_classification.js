"use strict";

const leonardo = require('sap-leonardo');

// set the API_KEY in the console, e.g. export API_KEY=abc123
var productimageclassification = new leonardo.ProductImageClassification(process.env.API_KEY);
productimageclassification.inferenceSync("./testdata/keyboard-70506_640.jpg")
  .then((body) => {
    var firstResult = body.predictions[0].results[0];
    console.log("result:", firstResult.label, firstResult.score);
    // result: computer keyboard, keypad 0.4066023826599121
  })
  .catch((err) => { console.error(err); });
