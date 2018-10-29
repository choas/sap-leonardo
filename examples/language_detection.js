"use strict";

const leonardo = require("sap-leonardo");

// set the API_KEY in the console, e.g. export API_KEY=abc123
const languageDetection = new leonardo.LanguageDetection(process.env.API_KEY);
  const textEnglish = "This service translates text from a source language into several target languages.";
    languageDetection.language(textEnglish).then((body) => {
    console.log("result:", body.langStr, "detected");
    // result: English decteted
  })
  .catch((err) => { console.error(err); });
