"use strict";

const leonardo = require("sap-leonardo");

// set the API_KEY in the console, e.g. export API_KEY=abc123
var productimageclassification = new leonardo.ProductImageClassification(process.env.API_KEY);
productimageclassification.inferenceSync("./testdata/data-transfer-3199547_640.jpg")
  .then((body) => {
    var firstResult = body.predictions[0].results[0];
    console.log("result:", firstResult.label, firstResult.score);
    // result: USB flash drives & accessories 0.919727
  })
  .catch((err) => { console.error(err); });
