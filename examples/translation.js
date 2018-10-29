"use strict";

const leonardo = require("sap-leonardo");

// set the API_KEY in the console, e.g. export API_KEY=abc123
var translation = new leonardo.Translation(process.env.API_KEY);

const text_english = "This service translates text from a source language into several target languages.";
const request = {
  sourceLanguage: "en",
  targetLanguages: ["de"],
  units: [
    {
      value: text_english,
      key: "TEXT_ENGLISH"
    }
  ]
};
translation.translation(request)
  .then((body) => {
    console.log("result:", body.units[0].translations[0].value);
    // result: Dieser Service übersetzt Text aus einer Quellsprache in mehrere Zielsprachen.
  })
  .catch((err) => { console.error(err); });
