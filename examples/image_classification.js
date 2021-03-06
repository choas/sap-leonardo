"use strict";

const leonardo = require("sap-leonardo");

// set the API_KEY in the console, e.g. export API_KEY=abc123
var imageclassification = new leonardo.Imageclassification(process.env.API_KEY);
imageclassification.classification("./testdata/elephant-114543_640.jpg")
  .then((body) => {
    var firstResult = body.predictions[0].results[0];
    console.log("result:", firstResult.label, firstResult.score);
    // result: tusker 0.7052137851715088
  })
  .catch((err) => { console.error(err); });
