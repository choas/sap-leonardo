"use strict";

const leonardo = require('sap-leonardo');

// set the API_KEY in the console, e.g. export API_KEY=abc123
const faceDetection = new leonardo.FaceDetection(process.env.API_KEY);
faceDetection.faceDetection("./testdata/man-3365368_640.jpg")
  .then((body) => {
    console.log("result:", body.predictions[0].numberOfFaces, "faces");
    // result: 4 faces
  })
  .catch((err) => { console.error(err); });
