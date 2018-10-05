"use strict";

const leonardo = require('sap-leonardo');

// set the API_KEY in the console, e.g. export API_KEY=abc123
var similarityScoring = new leonardo.SimilarityScoring(process.env.API_KEY);
const data =
{
  "0": [
    {
      "id": "vector_0",
      "vector": [
        0.28340766699907016,
        0.9207926435655764,
        0.26789935106091334
      ]
    },
    {
      "id": "vector_1",
      "vector": [
        0.45833237104751445,
        0.32694129428557406,
        0.8764997717518421
      ]
    },
    {
      "id": "vector_2",
      "vector": [
        0.3556300142239819,
        0.5045324288959441,
        0.7577918039699381
      ]
    }
  ]
};

const options = JSON.stringify({ "numSimilarVectors": 2 });
similarityScoring.similarityScoring(null, JSON.stringify(data), options)
  .then((body) => {
    console.log(
      "result:",
      body.predictions[0].id,
      body.predictions[0].similarVectors[0].id,
      body.predictions[0].similarVectors[0].score
    );

    // result: vector_0 vector_2 0.786171751770592
  })
  .catch((err) => { console.error(err); });
