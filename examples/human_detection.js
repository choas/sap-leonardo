"use strict";

const leonardo = require("sap-leonardo");

// set the API_KEY in the console, e.g. export API_KEY=abc123
const humanDetection = new leonardo.HumanDetection(process.env.API_KEY);
humanDetection.humanDetection("./testdata/man-3365368_640.jpg")
  .then((body) => {
    console.log("result:", body.num_detections, "humans");
    // result: 4 humans
  })
  .catch((err) => { console.error(err); });
