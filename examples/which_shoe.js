"use strict";

// npm install gm
const gm = require("gm").subClass({ imageMagick: true });
const leonardo = require("sap-leonardo");

const IMG_PATH = "./testdata/";
const IMG_SHOE1 = "chucks-153310_640.png";
const IMG_SHOE2 = "hiking-shoes-3074971_640.png";
const IMG_SHOE_TEST = "converse-2069209_640.jpg";

// set the API_KEY in the console, e.g. export API_KEY=abc123
const multiInstanceImageSegmentation = new leonardo.MultiInstanceImageSegmentation(process.env.API_KEY);
const imageFeatureExtraction = new leonardo.ImageFeatureExtraction(process.env.API_KEY);
const similarityScoring = new leonardo.SimilarityScoring(process.env.API_KEY);
var vector0, vector1, vector2;
multiInstanceImageSegmentation.instanceSegmentor(IMG_PATH + IMG_SHOE_TEST)
  .then((body) => body.predictions[0].results[0].bbox)
  .then((bbox) => {
    const width = bbox.x2 - bbox.x1;
    const height = bbox.y2 - bbox.y1;
    gm(IMG_PATH + IMG_SHOE_TEST)
      .crop(width, height, bbox.x1, bbox.y1)
      .write("croped.jpg", function (err) {
        if (err) {
          throw err;
        }
      });
  })
  .then(() => imageFeatureExtraction.featureExtraction(IMG_PATH + IMG_SHOE1))
  .then((body) => {
    vector1 = body.predictions[0].featureVectors;
  })
  .then(() => imageFeatureExtraction.featureExtraction(IMG_PATH + IMG_SHOE2))
  .then((body) => {
    vector2 = body.predictions[0].featureVectors;
  })
  .then(() => imageFeatureExtraction.featureExtraction("croped.jpg"))
  .then((body) => {
    vector0 = body.predictions[0].featureVectors;
  })
  .then(() => {

    const data =
    {
      "0": [
        {
          "id": "which_shoe",
          "vector": vector0
        },
        {
          "id": "shoe_1",
          "vector": vector1
        },
        {
          "id": "shoe_2",
          "vector": vector2
        }
      ]
    };
    const options = JSON.stringify({ numSimilarVectors: 2 });
    return similarityScoring.similarityScoring(null, JSON.stringify(data), options);
  })
  .then((body) => {
    const firstPrediction = body.predictions[0];
    const firstSimilarVector = firstPrediction.similarVectors[0];
    const secondSimilarVector = firstPrediction.similarVectors[1];
    console.log(
      "result:", firstPrediction.id + ":",
      firstSimilarVector.id + "=" + firstSimilarVector.score,
      secondSimilarVector.id + "=" + secondSimilarVector.score
    );
    // result: which_shoe: shoe_1=0.7352935851635458 shoe_2=0.7072068060448491
  })
  .catch((err) => { console.error(err); });
