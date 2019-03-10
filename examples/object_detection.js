"use strict";

const leonardo = require("sap-leonardo");

// set the API_KEY in the console, e.g. export API_KEY=abc123
const objectDetection = new leonardo.ObjectDetection(process.env.API_KEY);
objectDetection.objectDetection("./testdata/elephant-114543_640.jpg")
  .then((body) => {
    console.log(JSON.stringify(body, null, "  "));
  })
  .catch((err) => { console.error(err); });
