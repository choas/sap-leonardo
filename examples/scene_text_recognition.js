"use strict";

const leonardo = require("sap-leonardo");

// set the API_KEY in the console, e.g. export API_KEY=abc123
var sceneTextRecognition = new leonardo.SceneTextRecognition(process.env.API_KEY);
sceneTextRecognition.sceneTextRecognition("./testdata/stop-634941_640.jpg")
  .then((body) => {
    console.log("result:", body.predictions[0].results[0].text);
    // result: stoP
  })
  .catch((err) => { console.error(err); });
