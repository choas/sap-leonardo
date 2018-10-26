"use strict";

const leonardo = require("sap-leonardo");

// set the API_KEY in the console, e.g. export API_KEY=abc123
const ocr = new leonardo.OCR(process.env.API_KEY);
ocr.ocr("./testdata/ocr/english_1000.png")
  .then((body) => {
    console.log("result:", body.predictions[0].substring(0, 38));
    // result: Training Service for Optical Character
  })
  .catch((err) => { console.error(err); });
