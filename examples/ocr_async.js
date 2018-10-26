"use strict";

// this is the same example as the ocr.js example, using async and await

const leonardo = require("sap-leonardo");
async function runOcr() {
  // set the API_KEY in the console, e.g. export API_KEY=abc123
  try {
    const ocr = new leonardo.OCR(process.env.API_KEY);
    var body = await ocr.ocr("./testdata/ocr/english_1000.png");
    console.log("result:", body.predictions[0].substring(0, 38));
    // result: Training Service for Optical Character
  }
  catch (err) {
    console.error(err);
  }
}

runOcr();
