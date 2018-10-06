"use strict";

const leonardo = require('sap-leonardo');

// set the API_KEY in the console, e.g. export API_KEY=abc123
const faceFeatureExtraction = new leonardo.FaceFeatureExtraction(process.env.API_KEY);
faceFeatureExtraction.faceFeatureExtraction("./testdata/man-3365368_640.jpg")
  .then((body) => {
    console.log(
      "result:",
      body.predictions[0].numberOfFaces,
      "faces with",
      body.predictions[0].faces[0].face_feature.length,
      "features"
    );
    // result: 4 faces with 128 features
  })
  .catch((err) => { console.error(err); });
