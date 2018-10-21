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
//
async function _crop(bbox) {
  const width = bbox.x2 - bbox.x1;
  const height = bbox.y2 - bbox.y1;
  console.log('crop start');
  await gm(IMG_PATH + IMG_SHOE_TEST)
    .crop(width, height, bbox.x1, bbox.y1)
    .write("croped.jpg", function (err) {
      if (err) {
        throw err;
      }
    });
  console.log('crop done');
}

async function _getVectors() {
  console.log('vectors start');
  var feature = await imageFeatureExtraction.featureExtraction(IMG_PATH + IMG_SHOE1);
  const vector1 = feature.predictions[0].featureVectors;
  feature = await imageFeatureExtraction.featureExtraction(IMG_PATH + IMG_SHOE2);
  const vector2 = feature.predictions[0].featureVectors;
  feature = await imageFeatureExtraction.featureExtraction("croped.jpg");
  const vector0 = feature.predictions[0].featureVectors;
  console.log('vectors end');
  return [
    vector0,
    vector1,
    vector2
  ];
}

function _printResult(scoring) {
  const firstPrediction = scoring.predictions[0];
  const firstSimilarVector = firstPrediction.similarVectors[0];
  const secondSimilarVector = firstPrediction.similarVectors[1];
  console.log(
    "result:", firstPrediction.id + ":",
    firstSimilarVector.id + "=" + firstSimilarVector.score,
    secondSimilarVector.id + "=" + secondSimilarVector.score
  );
}

async function whichShoe() {
  try {
    const segmentor = await multiInstanceImageSegmentation.instanceSegmentor(IMG_PATH + IMG_SHOE_TEST);
    await _crop(segmentor.predictions[0].results[0].bbox);
    const vectors = await _getVectors();
    const data =
    {
      "0": [
        {
          "id": "which_shoe",
          "vector": vectors[0]
        },
        {
          "id": "shoe_1",
          "vector": vectors[1]
        },
        {
          "id": "shoe_2",
          "vector": vectors[2]
        }
      ]
    };
    const options = JSON.stringify({ numSimilarVectors: 2 });
    const scoring = await similarityScoring.similarityScoring(null, JSON.stringify(data), options);
    _printResult(scoring);
  }
  catch (err) {
    console.error(err);
  }
}

whichShoe();
