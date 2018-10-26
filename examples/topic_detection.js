"use strict";

const leonardo = require("sap-leonardo");

// set the API_KEY in the console, e.g. export API_KEY=abc123
const topicDetection = new leonardo.TopicDetection(process.env.API_KEY);
const options = JSON.stringify({ numTopics: 3, numTopicsPerDoc: 2, numKeywordsPerTopic: 15 });
topicDetection.topicDetection("./testdata/topic_detection.zip", options)
  .then((body) => {
    console.log("result:", body.predictions[0].keywords[0][0]);
    // result: pie
  })
  .catch((err) => { console.error(err); });
