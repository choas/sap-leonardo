"use strict";

const leonardo = require("sap-leonardo");

// set the API_KEY in the console, e.g. export API_KEY=abc123
var imageclassification = new leonardo.Imageclassification(process.env.API_KEY);
var productimageclassification = new leonardo.ProductImageClassification(process.env.API_KEY);
imageclassification.classification("./testdata/data-transfer-3199547_640.jpg")
  .then((body) => {
    var firstResult = body.predictions[0].results[0];
    var percent = Math.round(firstResult.score * 10000) / 100;
    console.log("        image classification:", percent + "%", firstResult.label);
    //         image classification: 39.77% cellular telephone, cellular phone, cellphone, cell, mobile phone

    productimageclassification.inferenceSync("./testdata/data-transfer-3199547_640.jpg")
      .then((body) => {
        var firstResult = body.predictions[0].results[0];
        var percent = Math.round(firstResult.score * 10000) / 100;
        console.log("product image classification:", percent + "%", firstResult.label);
        // product image classification: 91.97% USB flash drives & accessories
      });
  })
  .catch((err) => { console.error(err); });
