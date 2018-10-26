"use strict";

const leonardo = require("sap-leonardo");

// set the API_KEY in the console, e.g. export API_KEY=abc123
var imageFeatureExtraction = new leonardo.ImageFeatureExtraction(process.env.API_KEY);
imageFeatureExtraction.featureExtraction("./testdata/chucks-153310_640.png")
  .then((body) => {
    console.log("result:", body.predictions[0].featureVectors.length, 'vectors');
    // result: 2048 vectors
  })
  .catch((err) => { console.error(err); });
