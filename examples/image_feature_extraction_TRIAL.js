"use strict";

const leonardo = require("sap-leonardo");

// set the BEARER_TOKEN in the console, e.g. export BEARER_TOKEN="Bearer abc123"
var imageFeatureExtraction = new leonardo.ImageFeatureExtraction(null, process.env.BEARER_TOKEN, "https://mlftrial-image-feature-extractor.cfapps.eu10.hana.ondemand.com/api/v2/image/feature-extraction");
imageFeatureExtraction.featureExtraction(process.argv[2], process.argv.length > 3 ? process.argv[3] : null, process.argv.length > 4 ? process.argv[4] : null)
  .then((body) => {
    console.log(JSON.stringify(body.predictions[0].featureVectors));
  })
  .catch((err) => { console.error(err); });
